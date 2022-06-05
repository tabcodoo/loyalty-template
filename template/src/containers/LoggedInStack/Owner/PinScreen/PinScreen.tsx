import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import PinScreen from 'components/LoggedInStack/Owner/PinScreen';
import api from 'services/api';
import actions from 'store/actions';

const PinScreenContainer = (props: any) => {
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

    let login = (reqObject) => {
        dispatch(actions.shopLogin({email: user.email, ...reqObject}));
    };

    let logout = () => {
        api.setToken('');
        dispatch(actions.reset());
    };

    return <PinScreen {...props} {...{t, loading, logout, login}} />;
};

export default PinScreenContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
