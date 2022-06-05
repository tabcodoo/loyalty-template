import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import PhoneAuth from 'components/LogInStack/PhoneAuth';
import auth from '@react-native-firebase/auth';
import parsePhoneNumber from 'libphonenumber-js';
import actions from 'store/actions';

const PhoneAuthContainer = (props: any) => {
    let userLoading = useSelector((state) => state.user.loading);
    let [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);

    const [phoneSent, setPhoneSent] = useState(false);
    const [invalidCode, setInvalidCode] = useState(false);
    const [confirm, setConfirm] = useState(null);

    useEffect(() => {
        setLoading(userLoading);
    }, [userLoading]);

    function onAuthStateChanged(user) {
        if (user) {
            let {phoneNumber} = user;
            if (phoneNumber) {
                dispatch(actions.phoneLogin({phoneNumber}));
            }
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    let signOutAuth = () => {
        auth().signOut();
    };

    async function signInAuth({phoneNumber}) {
        try {
            const phoneNum = parsePhoneNumber(phoneNumber);

            setLoading(true);
            setTimeout(() => {
                setPhoneSent(true);
                setLoading(false);
            }, 3000);
            const confirmation = await auth().signInWithPhoneNumber(
                phoneNum?.formatInternational(),
            );
            setConfirm(confirmation);
        } catch (e) {
            setLoading(false);
        }
    }

    async function confirmCode({code}) {
        try {
            setLoading(true);
            await confirm?.confirm(code);
        } catch (error) {
            setInvalidCode(true);
            setLoading(false);
        }
    }

    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );
    return (
        <PhoneAuth
            {...props}
            {...{t, invalidCode, loading, confirmCode, signInAuth, signOutAuth, phoneSent}}
        />
    );
};

export default PhoneAuthContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
