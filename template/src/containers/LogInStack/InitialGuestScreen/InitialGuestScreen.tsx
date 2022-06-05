import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import InitialGuestScreen from 'components/LogInStack/InitialGuestScreen';
import SplashScreen from 'react-native-splash-screen';
import actions from 'store/actions';

const InitialGuestScreenContainer = (props: any) => {
    // let x = useSelector((state) => state.x);
    // let [x, setx] = useState(null);
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);

    useEffect(() => {
        //SplashScreen.hide();
    }, []);

    let guestLogin = () => {
        dispatch(actions.guestLogin());
    };
    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );
    return <InitialGuestScreen {...props} {...{t, guestLogin}} />;
};

export default InitialGuestScreenContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
