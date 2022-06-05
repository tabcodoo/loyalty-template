import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import Coupons from 'components/LoggedInStack/User/Coupons';
import actions from 'store/actions';
import messaging from '@react-native-firebase/messaging';
import constants from '@constants';
import SplashScreen from 'react-native-splash-screen';
import CategoriesSelection from 'components/common/CategoriesSelection';
import Text from 'components/common/Text';
import api from 'services/api';
import AsyncStorage from '@react-native-community/async-storage';

const CouponsContainer = (props: any) => {
    const {navigation} = props;
    let pointDisplayStyle = useSelector((state) => state.user?.pointDisplayStyle);
    let cart = useSelector((state) => state.cart);
    let currentOrder = useSelector((state) => state.orders.currentOrder);
    let user = useSelector((state) => state.user);
    const {hasInstructionsEnabled, isMaintenanceEnabled} = user ?? {};
    let mobileAppSettings = useSelector((state) => state.user?.mobileAppSettings);
    let displayFeaturedContentCategory = useSelector(
        (state) => state.user?.displayFeaturedContentCategory,
    );
    let contentTabs = useSelector((state) => state.contentTabs);
    let [contentCategories, setContentCategories] = useState(null);

    const contentActivated = useSelector((state) => state.contentTabs.isEnabled);
    const supplyActivated = useSelector((state) => state.supplyTabs.isEnabled);
    const displayCustomLinks = useSelector((state) => state.user.displayCustomLinks);
    const arr = [contentActivated, supplyActivated, displayCustomLinks];
    const bottomMenuActivated = arr.filter((feature) => feature).length > 1;

    let displayFeaturedSupplyCategory = useSelector(
        (state) => state.user?.displayFeaturedSupplyCategory,
    );
    let supplyTabs = useSelector((state) => state.supplyTabs);
    let [supplyCategories, setSupplyCategories] = useState(null);

    let fetchModules = () => {
        // if (user.userRole.toLowerCase() !== 'guest')
        dispatch(actions.getUser());

        if (contentTabs.isEnabled) {
            setContentCategories(null);
            dispatch(actions.resetContentCategories());
        }
        if (supplyTabs.isEnabled) {
            setSupplyCategories(null);
            dispatch(actions.resetSupplyCategories());
        }
        // dispatch(actions.getSelectedSettingsCategories());
        // dispatch(actions.getSelectedFilterCategories());
    };

    useEffect(() => {
        if (contentTabs.finished && contentTabs.isEnabled && contentCategories === null) {
            setContentCategories(contentTabs.tabs);
        }
    }, [contentTabs]);
    useEffect(() => {
        if (supplyTabs.finished && supplyTabs.isEnabled && supplyCategories === null) {
            setSupplyCategories(supplyTabs.tabs);
        }
    }, [supplyTabs]);

    let coupons = useSelector((state) => state.coupons.data);
    let loading = useSelector((state) => state.coupons.loading);
    let finished = useSelector((state) => state.coupons.finished);

    useEffect(() => {
        if (contentTabs.finished && supplyTabs.finished)
            setTimeout(() => {
                //SplashScreen.hide();
            }, 1100);
    }, [contentTabs, supplyTabs]);

    let notificationsAllowed = useSelector((state) => state.notificationAllowed);
    // let [x, setx] = useState(null);s
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);

    let requestUserPermission = async () => {
        try {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;
            if (Platform.OS === 'ios') {
                if (enabled) {
                    // console.tron.log('Request notifications enabled');
                    dispatch(actions.setNotificationAllowed(true));
                    messaging().subscribeToTopic(constants.applicationId);
                    messaging().subscribeToTopic(`threshold-${user.uid}`);
                    messaging().subscribeToTopic(`survey-${user.uid}`);
                } else {
                    // console.tron.log('Request notifications disabled');
                    dispatch(actions.setNotificationAllowed(false));
                }
            } else {
                if (notificationsAllowed === null) {
                    // console.tron.log('notificationsAllowed === null');
                    dispatch(actions.setNotificationAllowed(true));
                    messaging().subscribeToTopic(constants.applicationId);
                    messaging().subscribeToTopic(`threshold-${user.uid}`);
                    messaging().subscribeToTopic(`survey-${user.uid}`);
                }
            }
        } catch (e) {
            // console.tron.log('Request notifications err', e);
        }
    };

    const openInstructionsScreen = async () => {
        const showInstructions = await AsyncStorage.getItem('showInstructions');
        if (user.userRole.toLowerCase() === 'guest' && showInstructions !== 'false') {
            navigation.navigate('HowToVoucher');
        }
    };

    useEffect(() => {
        dispatch(actions.getAllSupplies({isRefresh: false}));

        if (currentOrder) {
            dispatch(actions.getCurrentOrder(currentOrder));
        }

        const unsubscribe = navigation.addListener('focus', () => {
            refreshCoupons();
        });

        hasInstructionsEnabled && openInstructionsScreen();

        if (!user?.groupCouponsByCategory) {
            // console.tron.log('AAAAA setTimeout(() => fetchCoupons(), 1);');
            setTimeout(() => fetchCoupons(), 1000);
        }

        // console.tron.log('CouponsContainer ', notificationsAllowed);
        if (notificationsAllowed === null) {
            requestUserPermission();
        } else if (!notificationsAllowed) {
            messaging().unsubscribeFromTopic(constants.applicationId);
            messaging().unsubscribeFromTopic(`threshold-${user.uid}`);
            messaging().unsubscribeFromTopic(`survey-${user.uid}`);
        } else {
            messaging().subscribeToTopic(constants.applicationId);
            messaging().subscribeToTopic(`threshold-${user.uid}`);
            messaging().subscribeToTopic(`survey-${user.uid}`);
        }

        return unsubscribe;
    }, []);

    let fetchCoupons = (reset = false) => {
        // console.tron.log('fetchCoupons', reset);
        if (reset) dispatch(actions.resetCoupons());
        dispatch(actions.getCoupons());
        dispatch(actions.getCart());
    };

    const refreshCoupons = () => {
        dispatch(actions.refreshCoupons());
        // dispatch(actions.getCategories({}));
        dispatch(actions.getCart());
    };

    let openCategories = () => {
        dispatch(
            actions.setGlobalBottomSheetNew(
                true,
                () => (
                    <View
                        style={{
                            paddingHorizontal: 16,
                            justifyContent: 'space-around',
                            flex: 1,
                        }}>
                        <Text type="header2" style={{lineHeight: 24, marginVertical: 16}}>
                            {t('coupons.categoriesHeader')}
                        </Text>

                        <View style={{flex: 1}}>
                            <CategoriesSelection bottomSheet filters />
                        </View>
                    </View>
                ),
                [0, '70%'],
            ),
        );
    };

    let redirectToLogin = () => {
        api.setToken('');
        dispatch(actions.reset());
        dispatch(actions.resetNotifications());
    };

    return (
        <Coupons
            {...props}
            {...{
                t,
                pointDisplayStyle,
                currentOrder,
                user,
                cart,
                coupons,
                loading,
                mobileAppSettings,
                displayFeaturedContentCategory,
                displayFeaturedSupplyCategory,
                contentCategories,
                supplyCategories,
                fetchCoupons,
                fetchModules,
                openCategories,
                finished,
                redirectToLogin,
                bottomMenuActivated,
            }}
        />
    );
};

export default CouponsContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
