import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import api from 'services/api';
import OrderPreview from 'components/LoggedInStack/Waiter/OrderPreview';
import Text from 'components/common/Text';
import Button from 'components/common/Button';
import actions from 'store/actions';
import BottomSheet from '@gorhom/bottom-sheet';
import * as Animatable from 'react-native-animatable';

const statusData = [
    {
        id: 1,
        description: 'Konobar zavrsava narudžbu',
        permissions: ['waiter'],
    },
    {
        id: 2,
        description: 'Konobar otkaziva narudžbu',
        permissions: ['waiter'],
    },
    {
        id: 5,
        description: 'Kuhinja otkaziva narudžbu',
        permissions: ['user'],
    },
    {
        id: 6,
        description: 'Kuhinja zavrsava narudžbu',
        permissions: ['user'],
    },
];

const OrderPreviewContainer = (props: any) => {
    const {navigation, route} = props ?? {};
    const {
        params: {id},
    } = route ?? {};
    const data = useSelector((state) => state.orders.history.find((item) => item.id === id));
    const user = useSelector((state) => state.user);
    const {userRole, language} = user ?? {};
    const isWaiter = userRole.toLowerCase() === 'waiter';
    const isSalesman = userRole.toLowerCase() === 'salesman';
    const isBarmen = userRole.toLowerCase() === 'bartender';
    const isReception = userRole.toLowerCase() === 'reception';
    const isKitchen = userRole.toLowerCase() === 'kitchen';
    const isOwner = userRole.toLowerCase() === 'shop' || userRole.toLowerCase() === 'user';
    let {t} = useContext(LocalizationContext);
    const dispatch = useDispatch();

    const bottomSheetRef = useRef(null);
    const [accept, setAccept] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isBottomSheetOpened, setIsBottomSheetOpened] = useState(false);

    const updateOrderStatus = async ({orderId, statusId}) => {
        setIsLoading(true);

        try {
            const {data} = await api.get(`loyalty/order/${orderId}/${statusId}`, language);
            if (data.success) {
                // setData(data.payload);
                dispatch(actions.updateOrderHistory(data.payload));
                setIsLoading(false);

                return data.payload;
            }
        } catch (e) {
            console.log('UPDATE ORDER ERR', e);
            setIsLoading(false);
        }
    };

    const AreYouSureComponent = useCallback(
        () => (
            <View
                style={{
                    paddingHorizontal: 16,
                    justifyContent: 'space-around',
                    flex: 1,
                }}>
                <Text center style={{lineHeight: 24}}>
                    {accept === 'accept'
                        ? isWaiter
                            ? t('waiter.areYouSureDone')
                            : t('waiter.areYouSureAccept')
                        : accept === 'done'
                        ? t('waiter.areYouSureDone')
                        : t('waiter.areYouSureReject')}
                </Text>

                <View>
                    <Button
                        mode={'contained'}
                        label={t('cart.yes')}
                        style={{marginBottom: 8}}
                        loading={isLoading}
                        disabled={isLoading}
                        onPress={async () => {
                            const response = accept
                                ? await acceptOrder(accept)
                                : await rejectOrder();
                            if (response) {
                                DropDownHolder.dropDown.alertWithType(
                                    'success',
                                    '',
                                    accept === 'accept'
                                        ? isWaiter
                                            ? t('waiter.orderDone')
                                            : t('waiter.orderAccepted')
                                        : accept === 'done'
                                        ? t('waiter.orderDone')
                                        : t('waiter.orderRejected'),
                                    navigation.pop(),
                                );
                            }
                            // dispatch(actions.resetGlobalBottomSheet());
                            closeBottomSheet();
                        }}
                    />
                    <Button
                        mode={'outlined'}
                        label={t('cart.no')}
                        onPress={() => {
                            // dispatch(actions.resetGlobalBottomSheet());
                            closeBottomSheet();
                        }}
                    />
                </View>
            </View>
        ),
        [isLoading, accept, data],
    );

    const acceptOrder = useCallback(
        async (accept) => {
            return await updateOrderStatus({
                orderId: data.orderId,
                statusId: isWaiter ? 1 : accept === 'accept' ? 6 : 1,
            });
        },
        [data, isWaiter],
    );

    const rejectOrder = useCallback(async () => {
        return await updateOrderStatus({
            orderId: data.orderId,
            statusId: isWaiter ? 2 : 5,
        });
    }, [data, isWaiter]);

    const closeBottomSheet = useCallback(() => {
        setIsBottomSheetOpened(false);
        bottomSheetRef.current.close();
    }, []);

    const openBottomSheet = useCallback((accept) => {
        setIsBottomSheetOpened(true);
        setAccept(accept);
        setTimeout(() => {
            bottomSheetRef.current.expand();
        }, 100);
    }, []);

    const BottomSheetComponent = useCallback(
        ({children}) => (
            <BottomSheet ref={bottomSheetRef} snapPoints={[0, '30%']}>
                {children}
            </BottomSheet>
        ),
        [],
    );

    return (
        <>
            <OrderPreview
                {...props}
                {...{
                    t,
                    navigation,
                    data,
                    isWaiter,
                    isSalesman,
                    isOwner,
                    updateOrderStatus,
                    openBottomSheet,
                    isBarmen,
                    isReception,
                    isKitchen,
                }}
            />

            {isBottomSheetOpened && (
                <Animatable.View animation={'fadeIn'} duration={500} style={styles.backDrop}>
                    <TouchableOpacity style={{flex: 1}} onPress={() => closeBottomSheet()} />
                </Animatable.View>
            )}
            <BottomSheetComponent>
                <AreYouSureComponent />
            </BottomSheetComponent>
        </>
    );
};

export default OrderPreviewContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backDrop: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        // flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});
