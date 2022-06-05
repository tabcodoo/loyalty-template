import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import Notification from 'components/LoggedInStack/User/Notification';
import actions from 'store/actions';
import SplashScreen from 'react-native-splash-screen';
import api from 'services/api';

const NotificationContainer = (props: any) => {
    // console.tron.log('Notification', props);
    const {
        route: {
            params: {notification, fromNotification = false},
        },
    } = props;
    // let notifications = useSelector((state) => state.x);
    // let [x, setx] = useState(null);
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );

    useEffect(() => {
        SplashScreen.hide();
        api.put(`app/mark-mobile-notification-as-seen/${notification?.id}`).then(() => {
            dispatch(actions.resetNotifications());
            setTimeout(() => {
                dispatch(actions.getNotifications());
            }, 500);
        });
        dispatch(actions.getUser(true));
    }, []);

    return (
        <Notification
            {...props}
            {...{
                t,
                notification,
                fromNotification,
            }}
        />
    );
};

export default NotificationContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
