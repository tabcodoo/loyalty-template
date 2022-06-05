import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Login from 'components/LogInStack/Login';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import actions from 'store/actions';
import messaging from '@react-native-firebase/messaging';
import constants from '@constants';

import auth from '@react-native-firebase/auth';

const LoginContainer = (props: any) => {
    let user = useSelector((state) => state.user);
    let loading = useSelector((state) => state.user.loading);
    // let [x, setx] = useState(null);
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );

    let login = (user) => {
        dispatch(actions.login(user, (key) => t(key)));
    };

    useEffect(() => {
        messaging().unsubscribeFromTopic(constants.applicationId);
        messaging().unsubscribeFromTopic(`threshold-${user.uid}`);
        messaging().unsubscribeFromTopic(`survey-${user.uid}`);
    }, []);

    return <Login {...props} {...{t, login, loading}} />;
};

export default LoginContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
