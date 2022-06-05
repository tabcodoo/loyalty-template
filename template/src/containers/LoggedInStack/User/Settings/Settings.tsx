import React, {useState, useEffect, useContext, useRef} from 'react';
import {View, StyleSheet, Platform, AppState} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import messaging from '@react-native-firebase/messaging';

import Settings from 'components/LoggedInStack/User/Settings';
import constants from '@constants';
import actions from 'store/actions';

const SettingsContainer = (props: any) => {
    let user = useSelector((state) => state.user);
    let notificationAllowed = useSelector((state) => state.notificationAllowed);
    let offerCategoriesSettings = useSelector((state) => state.offerCategoriesSettings);

    let [permissionsGranted, setPermissionsGranted] = useState(notificationAllowed);
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    let {t} = useContext(LocalizationContext);
    let dispatch = useDispatch();

    const _handleAppStateChange = (nextAppState) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
            messaging()
                .hasPermission()
                .then((res) => {
                    setPermissionsGranted(!!res);
                    dispatch(actions.setNotificationAllowed(!!res && notificationAllowed));
                });
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
    };

    useEffect(() => {
        messaging()
            .hasPermission()
            .then((res) => {
                setPermissionsGranted(!!res);
                dispatch(actions.setNotificationAllowed(!!res && notificationAllowed));
            });

        AppState.addEventListener('change', _handleAppStateChange);

        return () => {
            AppState.removeEventListener('change', _handleAppStateChange);
        };
    }, []);

    let changeLanguage = async () => {
        dispatch(actions.changeLanguage(user?.language === 'ba' ? 'en' : 'ba'));
    };

    let toggleNotification = async () => {
        try {
            dispatch(actions.setNotificationAllowed(!notificationAllowed));
            if (!notificationAllowed) {
                await messaging().subscribeToTopic(constants.applicationId);
                await messaging().subscribeToTopic(`threshold-${user.uid}`);
                await messaging().subscribeToTopic(`survey-${user.uid}`);
            } else {
                await messaging().unsubscribeFromTopic(constants.applicationId);
                await messaging().unsubscribeFromTopic(`threshold-${user.uid}`);
                await messaging().unsubscribeFromTopic(`survey-${user.uid}`);
            }
        } catch (e) {
            // console.tron.log('AAAA', e);
        }
    };

    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );
    return (
        <Settings
            {...props}
            {...{
                t,
                user,
                notificationAllowed,
                toggleNotification,
                permissionsGranted,
                offerCategoriesSettings,
                changeLanguage,
            }}
        />
    );
};

export default SettingsContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
