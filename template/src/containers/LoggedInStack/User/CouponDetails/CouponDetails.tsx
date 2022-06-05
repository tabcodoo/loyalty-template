import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import CouponDetails from 'components/LoggedInStack/User/CouponDetails';
import actions from 'store/actions';
import moment from 'moment';
import messaging from '@react-native-firebase/messaging';
import constants from '@constants';
import DeviceBrightness from '@adrianso/react-native-device-brightness';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import api from 'services/api';

const CouponDetailsContainer = (props: any) => {
    let {
        navigation,
        route: {
            params: {coupon, fromNotification = false},
        },
    } = props;
    let cart = useSelector((state) => state.cart);

    let user = useSelector((state) => state.user);
    let pointDisplayStyle = useSelector((state) => state.user?.pointDisplayStyle);
    let userId = useSelector((state) => state.user?.mobileUserId);
    let notificationAllowed = useSelector((state) => state.notificationAllowed);

    let [loading, setLoading] = useState(false);
    let [expired, setExpired] = useState(coupon?.isUsed);
    let [activatedAt, setActivatedAt] = useState(coupon?.dateActivated);
    let [used, setUsed] = useState(false);
    let [timer, setTimer] = useState(null);
    let [activated, setActivated] = React.useState(false);
    let [quantity, setQuantity] = React.useState(coupon?.quantity);

    let subscribeToNotification = async () => messaging().subscribeToTopic(constants.applicationId);
    let subscribeToCouponNotification = async () =>
        messaging().subscribeToTopic(constants.applicationId + '-' + userId + '-' + coupon?.id);
    let unsubscribeFromCouponNotification = async () =>
        messaging().unsubscribeFromTopic(constants.applicationId + '-' + userId + '-' + coupon?.id);

    let fetchCoupons = (reset = false) => {
        if (reset) dispatch(actions.resetCoupons());
        setTimeout(() => dispatch(actions.getCoupons()), 100);
    };
    let getOrderHistory = () => {
        dispatch(actions.getOrderHistory());
    };

    useEffect(() => {
        if (!!activatedAt && fromNotification && !expired) {
            useCoupon();
            setUsed(true);
            setExpired(true);

            // clearInterval(interval);
            setTimeout(() => {
                unsubscribeFromCouponNotification();
                // console.tron.log('CouponDetailsCocntainer useEffect1', notificationAllowed);
                if (notificationAllowed) {
                    subscribeToNotification();
                }
            }, 1000);
        }

        if (coupon?.isSpecialCoupon) subscribeToCouponNotification();
        unsubscribe = messaging().onMessage(async (message) => {
            // console.tron.log('messaging().onMessage', message);
            let data = message?.data?.data.length > 0 ? JSON.parse(message?.data?.data) : null;

            if (data && data?.Id == coupon?.id) {
                useCoupon();
                setUsed(true);
                setExpired(true);
                if (quantity) setQuantity(quantity - 1);
                dispatch(actions.getCart());
                if (coupon?.isSpecialCoupon) {
                    fetchCoupons(true);
                    getOrderHistory();
                }

                // clearInterval(interval);
                setTimeout(() => {
                    unsubscribeFromCouponNotification();
                    // console.tron.log('CouponDetailsContainer useEffect3', notificationAllowed);
                    if (notificationAllowed) {
                        subscribeToNotification();
                    }
                }, 1000);
            }
        });

        return () => {
            unsubscribeFromCouponNotification();
        };
    }, [coupon]);

    useEffect(() => {
        let interval = null;
        let unsubscribe = null;
        let expire = moment(activatedAt).add(5, 'minutes').add(1, 'seconds');

        if (activatedAt && moment().isBefore(expire) && !coupon?.isUsed) {
            setTimer(moment(expire - moment()).format('mm:ss'));

            subscribeToCouponNotification();
            DeviceBrightness.setBrightnessLevel(1);

            interval = setInterval(() => {
                let newTime = moment();
                let diff = moment(expire - newTime);
                let diffString = moment(diff).format('mm:ss');
                if (moment.duration(diff).asSeconds() < 0 && !expired) {
                    useCoupon();
                    setExpired(true);
                    unsubscribeFromCouponNotification();
                    // console.tron.log('CouponDetailsContainer useEffect2', notificationAllowed);
                    if (notificationAllowed) {
                        subscribeToNotification();
                    }
                } else setTimer(diffString);
            }, 1000);

            unsubscribe = messaging().onMessage(async (message) => {
                // console.tron.log('messaging().onMessage', message);
                let data = message?.data?.data.length > 0 ? JSON.parse(message?.data?.data) : null;

                if (data && data?.Id == coupon?.id) {
                    // useCoupon();
                    // setUsed(true);
                    // setExpired(true);
                    // if (quantity) setQuantity(quantity - 1);

                    clearInterval(interval);
                    // setTimeout(() => {
                    //     unsubscribeFromCouponNotification();
                    //     // console.tron.log('CouponDetailsContainer useEffect3', notificationAllowed);
                    //     if (notificationAllowed) {
                    //         subscribeToNotification();
                    //     }
                    // }, 1000);
                }
            });
        } else if (moment().isAfter(moment(expire) || coupon?.isUsed)) {
            useCoupon();
            setExpired(true);
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
            if (unsubscribe) unsubscribe();
        };
    }, [activatedAt]);

    // let x = useSelector((state) => state.x);
    // let [x, setx] = useState(null);
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);

    let signOutGuest = () => {
        auth().signOut();
        GoogleSignin.signOut();
        api.setToken('');
        dispatch(actions.reset());
    };

    let activateCoupon = (callback = () => {}) => {
        setLoading(true);
        dispatch(
            actions.activateCoupon(
                {
                    couponId: coupon?.id,
                    userId,
                },
                (activatedTime) => {
                    callback();
                    setActivatedAt(activatedTime);
                    setActivated(true);
                    setLoading(false);
                },
                () => {
                    DropDownHolder.dropDown.alertWithType(
                        'error',
                        '',
                        t('errors.couponActivation'),
                    );
                    setLoading(false);
                },
            ),
        );
    };

    let useCoupon = () => {
        dispatch(actions.useCoupon(coupon?.id));
    };

    useEffect(() => {
        if (!expired && timer) {
            // bottomSheetRef.current.expand();
            setActivated(true);
            // setOpened(true);
        }
    }, [timer]);

    return (
        <CouponDetails
            {...props}
            {...{
                t,
                user,
                signOutGuest,
                pointDisplayStyle,
                userId,
                cart,
                coupon,
                expired,
                timer,
                used,
                activated,
                activatedAt,
                setActivated,
                loading,
                fromNotification,
                quantity,
                activateCoupon,
            }}
        />
    );
};

export default CouponDetailsContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
