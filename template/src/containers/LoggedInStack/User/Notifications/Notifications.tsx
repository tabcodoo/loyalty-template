import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import Notifications from 'components/LoggedInStack/User/Notifications';
import actions from 'store/actions';

const NotificationsContainer = (props: any) => {
    let notifications = useSelector((state) => state.notifications);
    let user = useSelector((state) => state.user);
    let [deleteStarted, setDeleteStarted] = useState(false);
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );

    let fetchNotifications = (reset = false) => {
        if (reset) {
            dispatch(actions.resetNotifications());
            dispatch(actions.getNotifications());
        } else dispatch(actions.getNotifications());
    };
    let deleteNotification = (index = -1, indexInArray = -1) => {
        dispatch(actions.deleteNotification(index, indexInArray));
    };
    return (
        <Notifications
            {...props}
            {...{
                t,
                notifications,
                fetchNotifications,
                user,
                deleteStarted,
                setDeleteStarted,
                deleteNotification,
            }}
            // notifications={notifications}
        />
    );
};

export default NotificationsContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
