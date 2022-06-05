import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Register from 'components/LogInStack/Register';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import api from 'services/api';
import actions from 'store/actions';

const RegisterContainer = (props: any) => {
    let loading = useSelector((state) => state.user.loading);
    let [interests, setInterests] = useState([]);
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);

    // useEffect(() => {
    //   if (interests.length === 0) {
    //     api
    //       .get('statistics/interests')
    //       .then((res) => {
    //         res.data.map((interest) => (interest.active = false));
    //         setInterests(res.data);
    //       })
    //       .catch((err) => {});
    //   }
    // });

    let register = (data) => {
        dispatch(
            actions.register(data, () => {
                DropDownHolder.dropDown.alertWithType(
                    'success',
                    t('success.title'),
                    t('success.register'),
                );
                props.navigation.goBack();
            }),
        );
    };
    return <Register {...props} {...{t, register, interests, setInterests, loading}} />;
};

export default RegisterContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
