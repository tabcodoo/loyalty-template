import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import Success from 'components/common/icons/Success';
import Text from 'components/common/Text';

import ProfileQRcode from 'components/LoggedInStack/User/ProfileQRcode';
import actions from 'store/actions';
import messaging from '@react-native-firebase/messaging';
import DeviceBrightness from '@adrianso/react-native-device-brightness';

const ProfileQRcodeContainer = (props: any) => {
    let user = useSelector((state) => state.user);
    let [brightness, setBrightness] = useState(0.5);
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );
    let topic = `user-${user.uid}`;
    let topicSuccess = `user-${user.uid}-success`;
    let subscribeToUserNotification = async () => messaging().subscribeToTopic(topic);
    let unsubscribeFromUserNotification = async () => messaging().unsubscribeFromTopic(topic);
    let subscribeToUserSuccessNotification = async () => messaging().subscribeToTopic(topicSuccess);
    let unsubscribeToUserSuccessNotification = async () =>
        messaging().unsubscribeFromTopic(topicSuccess);

    useEffect(() => {
        if (Platform.OS === 'ios') {
            DeviceBrightness.getBrightnessLevel().then((res) => setBrightness(res));
        }
        DeviceBrightness.setBrightnessLevel(1);

        subscribeToUserNotification();
        subscribeToUserSuccessNotification();

        let unsubscribe = messaging().onMessage(async (message) => {
            let data = message?.data?.data.length > 0 ? message?.data?.data : null;

            if (data?.includes(topicSuccess)) {
                openSuccessGlobalSheet();
                unsubscribeToUserSuccessNotification();
            } else if (data?.includes(topic)) {
                openGlobalSheet();
                unsubscribeFromUserNotification();
            }
        });

        return () => {
            // console.tron.log('Unsubscribe');
            unsubscribeFromUserNotification();
            if (Platform.OS === 'ios') {
                DeviceBrightness.setBrightnessLevel(brightness);
            } else {
                DeviceBrightness.setBrightnessLevel(-1);
            }

            // unsubscribe();
        };
    }, []);

    let openGlobalSheet = () => {
        subscribeToUserSuccessNotification();
        dispatch(
            actions.setGlobalBottomSheet(true, () => (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        // backgroundColor: '#faf',
                    }}>
                    <Text type={'header1'}>{t('profileQRcode.title')}</Text>
                    <Success fill={'#ccc'} />
                    <Text center>{t('profileQRcode.scanedStep1')}</Text>
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
                            {t('profileQRcode.scanSuccess')}
                        </Text>
                        <Success />
                        <Text center>{t('profileQRcode.scanedStep2')}</Text>
                    </View>
                ),
                // [0, '40%'],
            ),
        );
        dispatch(actions.getCart());
        fetchCoupons(true);
        getOrderHistory();
    };

    return <ProfileQRcode {...props} {...{t, user, openGlobalSheet}} />;
};

export default ProfileQRcodeContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
