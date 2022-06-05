import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import Success from 'components/common/icons/Success';
import Text from 'components/common/Text';

import CartQRcode from 'components/LoggedInStack/User/CartQRcode';
import actions from 'store/actions';
import messaging from '@react-native-firebase/messaging';
import DeviceBrightness from '@adrianso/react-native-device-brightness';

const CartQRcodeContainer = (props: any) => {
    let currentOrder = useSelector((state) => state.orders.currentOrder);
    let user = useSelector((state) => state.user);
    let [brightness, setBrightness] = useState(0.5);

    // let x = useSelector((state) => state.x);
    let [qrCode, setQrCode] = useState('');
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );

    let topic = `cart-${currentOrder?.orderId}`;
    let topicSuccess = `cart-${currentOrder?.orderId}-success`;
    let subscribeToCartNotification = async () => messaging().subscribeToTopic(topic);
    let unsubscribeFromCartNotification = async () => messaging().unsubscribeFromTopic(topic);
    let subscribeToCartSuccessNotification = async () => messaging().subscribeToTopic(topicSuccess);
    let unsubscribeToCartSuccessNotification = async () =>
        messaging().unsubscribeFromTopic(topicSuccess);

    useEffect(() => {
        if (Platform.OS === 'ios') {
            DeviceBrightness.getBrightnessLevel().then((res) => setBrightness(res));
        }
        DeviceBrightness.setBrightnessLevel(1);

        setQrCode(
            `cart ${currentOrder?.orderId} ${user?.uid} ${currentOrder?.totalAmount} ${currentOrder?.id}`,
        );
        subscribeToCartNotification();
        subscribeToCartSuccessNotification();
        // console.tron.log(topic, topicSuccess);
        let unsubscribe = messaging().onMessage(async (message) => {
            let data = message?.data?.data.length > 0 ? message?.data?.data : null;

            if (data?.includes(topicSuccess)) {
                openSuccessGlobalSheet();
                unsubscribeToCartSuccessNotification();
            } else if (data?.includes(topic)) {
                openGlobalSheet();
                unsubscribeFromCartNotification();
            }
        });

        return () => {
            // console.tron.log('Unsubscribe');
            unsubscribeFromCartNotification();
            if (Platform.OS === 'ios') {
                DeviceBrightness.setBrightnessLevel(brightness);
            } else {
                DeviceBrightness.setBrightnessLevel(-1);
            }
            // unsubscribe();
        };
    }, []);

    let openGlobalSheet = () => {
        subscribeToCartSuccessNotification();
        dispatch(
            actions.setGlobalBottomSheet(true, () => (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        // backgroundColor: '#faf',
                    }}>
                    <Text type={'header1'}>{t('cartQRcode.title')}</Text>
                    <Success fill={'#ccc'} />
                    <Text center>{t('cartQRcode.scanedStep1')}</Text>
                </View>
            )),
        );
    };

    let fetchCoupons = (reset = false) => {
        if (reset) dispatch(actions.resetCoupons());
        setTimeout(() => dispatch(actions.getCoupons()), 100);
    };

    let getOrderHistory = () => {
        dispatch(actions.getOrderHistory());
    };

    let openSuccessGlobalSheet = () => {
        dispatch(
            actions.setGlobalBottomSheet(
                true,
                () => (
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            // backgroundColor: '#faf',
                        }}>
                        <Text center type={'header1'}>
                            {t('cartQRcode.scanSuccess')}
                        </Text>
                        <Success />
                        <Text center>{t('cartQRcode.scanedStep2')}</Text>
                    </View>
                ),
                // [0, '40%'],
            ),
        );
        dispatch(actions.clearCart());
        dispatch(actions.getCart());
        dispatch(actions.resetCurrentOrder());
        fetchCoupons(true);
        getOrderHistory();
    };

    return <CartQRcode {...props} {...{t, user, qrCode, currentOrder}} />;
};

export default CartQRcodeContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
