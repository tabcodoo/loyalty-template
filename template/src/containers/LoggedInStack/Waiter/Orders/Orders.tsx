import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import actions from 'store/actions';
import Orders from 'components/LoggedInStack/Waiter/Orders';
import {useFocusEffect} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import constants from '@constants';
import {addNewOrder} from 'store/orders/actions';

const OrdersContainer = (props: any) => {
    const {navigation} = props;
    const user = useSelector((state) => state.user);
    const {userRole, uid} = user ?? {};
    const isWaiter = userRole.toLowerCase() === 'waiter';
    const isSalesman = userRole.toLowerCase() === 'salesman';
    const isBarmen = userRole.toLowerCase() === 'bartender';
    const isReception = userRole.toLowerCase() === 'reception';
    const isKitchen = userRole.toLowerCase() === 'kitchen';
    const isOwner = userRole.toLowerCase() === 'shop' || userRole.toLowerCase() === 'user';
    const dispatch = useDispatch();
    const {t} = useContext(LocalizationContext);
    const ordersData = useSelector((state) => state.orders);
    const {history: orders, loading, finished} = ordersData ?? {};
    console.log('ORDERS', orders);
    const notificationsAllowed = useSelector((state) => state.notificationAllowed);

    const onRefresh = useCallback(() => {
        dispatch(actions.getOrderHistory(true));
    }, []);

    const listenerTrigger = useCallback(() => {
        const unsubscribe = () => {
            dispatch(actions.getOrderHistory(true));
        };
        return unsubscribe();
    }, []);

    const requestUserPermission = async () => {
        try {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;
            if (Platform.OS === 'ios') {
                if (enabled) {
                    // console.tron.log('Request notifications enabled');
                    dispatch(actions.setNotificationAllowed(true));
                    if (isReception) {
                        messaging().subscribeToTopic(constants.applicationId + '-Reception');
                    }
                    if (isKitchen) {
                        messaging().subscribeToTopic(constants.applicationId + '-Kitchen');
                    }
                    if (isBarmen) {
                        messaging().subscribeToTopic(constants.applicationId + '-Bartender');
                    }
                    if (isWaiter) {
                        messaging().subscribeToTopic(uid + '-Waiter');
                    }
                } else {
                    dispatch(actions.setNotificationAllowed(false));
                }
            } else {
                if (notificationsAllowed === null) {
                    dispatch(actions.setNotificationAllowed(true));
                    if (isReception) {
                        messaging().subscribeToTopic(constants.applicationId + '-Reception');
                    }
                    if (isKitchen) {
                        messaging().subscribeToTopic(constants.applicationId + '-Kitchen');
                    }
                    if (isBarmen) {
                        messaging().subscribeToTopic(constants.applicationId + '-Bartender');
                    }
                    if (isWaiter) {
                        messaging().subscribeToTopic(uid + '-Waiter');
                    }
                }
            }
        } catch (e) {
            console.log('Request notifications err', e);
        }
    };

    useEffect(() => {
        dispatch(actions.getOrderHistory(true));
        // dispatch(actions.getNewOrder());

        if (notificationsAllowed === null) {
            requestUserPermission();
        } else if (!notificationsAllowed) {
            if (isReception) {
                messaging().unsubscribeFromTopic(constants.applicationId + '-Reception');
            }
            if (isKitchen) {
                messaging().unsubscribeFromTopic(constants.applicationId + '-Kitchen');
            }
            if (isBarmen) {
                messaging().unsubscribeFromTopic(constants.applicationId + '-Bartender');
            }
            if (isWaiter) {
                messaging().unsubscribeFromTopic(uid + '-Waiter');
            }
        } else {
            if (isReception) {
                messaging().subscribeToTopic(constants.applicationId + '-Reception');
            }
            if (isKitchen) {
                messaging().subscribeToTopic(constants.applicationId + '-Kitchen');
            }
            if (isBarmen) {
                messaging().subscribeToTopic(constants.applicationId + '-Bartender');
            }
            if (isWaiter) {
                messaging().subscribeToTopic(uid + '-Waiter');
            }
        }

        const unsubscribe = messaging().onMessage((remoteMessage) => {
            console.log('REMOTE MESSAGE', remoteMessage);

            if (isReception || isKitchen || isBarmen) {
                if (remoteMessage?.data?.data) {
                    const newOrder = remoteMessage?.data?.data.split('"')[1];

                    dispatch(actions.addOrderFromNotification(newOrder));
                } else {
                    dispatch(actions.getOrderHistory(true));
                }
            }
            if (isWaiter) {
                const newOrder = remoteMessage?.data?.data.split('"')[1];

                setTimeout(() => {
                    dispatch(actions.updateOrderFromNotification(newOrder));
                }, 100);
            }
        });

        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                dispatch(actions.getOrderHistory(true));
            });

        messaging().onNotificationOpenedApp((remoteMessage) => {
            dispatch(actions.getOrderHistory(true));
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Orders
            {...props}
            {...{
                t,
                navigation,
                isWaiter,
                isSalesman,
                orders,
                onRefresh,
                loading,
                isOwner,
                finished,
                isKitchen,
                isReception,
                isBarmen,
            }}
        />
    );
};

export default OrdersContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
