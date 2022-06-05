import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import Coupon from 'components/LoggedInStack/User/Coupon';
import SpecialCoupon from 'components/LoggedInStack/User/SpecialCoupon';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const CouponContainer = (props: any) => {
    let navigation = useNavigation();
    let {item: coupon, index} = props;
    let [activatedAt, setActivatedAt] = useState(coupon?.dateActivated);
    let [expired, setExpired] = useState(false);
    let [timer, setTimer] = useState(null);

    useEffect(() => {
        let interval = null;
        let expire = moment(coupon?.dateActivated).add(5, 'minutes').add(1, 'seconds');

        if (
            !coupon?.isSpecialCoupon &&
            coupon?.dateActivated &&
            moment().isBefore(expire) &&
            !coupon?.isUsed
        ) {
            setTimer(moment(expire - moment()).format('mm:ss'));

            interval = setInterval(() => {
                let newTime = moment();
                let diff = moment(expire - newTime);
                let diffString = moment(diff).format('mm:ss');
                if (moment.duration(diff).asSeconds() < 0) {
                    setExpired(true);
                    clearInterval(interval);
                } else setTimer(diffString);
            }, 1000);
        } else if (moment().isAfter(moment(expire)) || coupon?.isUsed) {
            setExpired(true);
            clearInterval(interval);
        }
        // setTime(moment().format('HH:mm:ss'));

        return () => clearInterval(interval);
    }, [coupon]);

    // useEffect(() => {}, [coupon]);

    // let x = useSelector((state) => state.x);
    // let [x, setx] = useState(null);
    // const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );
    return coupon?.isSpecialCoupon ? (
        <SpecialCoupon {...props} {...{t, coupon, expired, timer}} />
    ) : (
        <Coupon {...props} {...{t, coupon, expired, timer}} />
    );
};

export default CouponContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
