import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import AsyncStorage from '@react-native-community/async-storage';
import HowToVoucher from 'components/LoggedInStack/User/HowToVoucher';

const HowToVoucherContainer = (props: any) => {
    const {navigation} = props;
    const {t} = useContext(LocalizationContext);
    const coupons = useSelector((state) => state.coupons.data);
    const user = useSelector((state) => state.user);

    const exampleCoupons = coupons.slice(0, 2);

    useEffect(() => {
        (() => {
            AsyncStorage.setItem('showInstructions', 'false');
        })();
    }, []);

    return <HowToVoucher {...props} {...{t, exampleCoupons, navigation, user}} />;
};

export default HowToVoucherContainer;
