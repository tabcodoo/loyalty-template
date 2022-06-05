import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import ForgotPassword from 'components/LogInStack/ForgotPassword';
import api from 'services/api';
import constants from '@constants';

const ForgotPasswordContainer = (props: any) => {
    // let x = useSelector((state) => state.x);
    let [loading, setLoading] = useState(false);
    // const dispatch = useDispatch();

    let {t} = useContext(LocalizationContext);
    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );

    let sendRequest = (data) => {
        setLoading(true);
        api.post('identity/resetPassword', {...data, applicationId: constants.applicationId})
            .then((res) => {
                setLoading(false);
                DropDownHolder.dropDown.alertWithType(
                    'success',
                    t('success.title'),
                    t('forgotPassword.success'),
                );
            })
            .catch((err) => {
                setLoading(false);
                DropDownHolder.dropDown.alertWithType('error', t('errors.title'));
            });
        // dispatch(actions.login(user));
    };

    return (
        <View style={styles.container}>
            <ForgotPassword {...props} {...{t, sendRequest, loading}} />
        </View>
    );
};

export default ForgotPasswordContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
