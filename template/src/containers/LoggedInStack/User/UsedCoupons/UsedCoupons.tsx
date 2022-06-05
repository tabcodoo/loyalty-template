import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import UsedCoupons from 'components/LoggedInStack/User/UsedCoupons';
import actions from 'store/actions';

const UsedCouponsContainer = (props: any) => {
    let loading = useSelector((state) => state.usedCoupons.loading);
    let usedCoupons = useSelector((state) => state.usedCoupons.data);
    let totalSavings = useSelector((state) => state.usedCoupons.totalSavings);
    // let [x, setx] = useState(null);
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );

    let fetchUsedCoupons = (reset = false) => {
        if (reset) dispatch(actions.resetUsedCoupons());
        // dispatch(actions.getUsedCoupons());
    };

    useEffect(() => {
        fetchUsedCoupons();
    }, []);

    return (
        <UsedCoupons {...props} {...{t, usedCoupons, totalSavings, loading, fetchUsedCoupons}} />
    );
};

export default UsedCouponsContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
