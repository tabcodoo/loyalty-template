import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import InitialHome from 'components/LogInStack/InitialHome';

import auth from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import api from 'services/api';
import actions from 'store/actions';
import constants from '@constants';
// import SplashScreen from 'react-native-splash-screen';
import {appleAuth} from '@invertase/react-native-apple-authentication';

const InitialHomeContainer = (props: any) => {
    // let x = useSelector((state) => state.x);
    let [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );

    let guestLogin = () => {
        dispatch(actions.guestLogin());
    };

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: constants.webClientId,
        });
        // SplashScreen.hide();
    }, []);

    let oAuthApiCall = (firstName, lastName, email, imageUrl, userId, provider) => {
        api.post('identity/oAuth-callback', {
            givenName: firstName,
            surname: lastName,
            email,
            imageUrl,
            userId,
            provider,
            language: 'en',
            moduleId: constants.moduleId,
            applicationId: constants.applicationId,
        })
            .then(({data: {token, user}}) => {
                if (token && user) {
                    api.setToken(token);
                    setLoading(false);
                    // dispatch(actions.resetUser({}));
                    // setTimeout(() => {
                    dispatch(actions.userSuccess({...user, token}));
                    // }, 1000);
                }
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    async function onGoogleButtonPress() {
        try {
            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();
            setLoading(true);
            // // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // // Sign-in the user with the credential
            const user = await auth().signInWithCredential(googleCredential);
            oAuthApiCall(
                user?.additionalUserInfo?.profile?.given_name,
                user?.additionalUserInfo?.profile?.family_name,
                user?.user?.email,
                user?.user?.photoURL,
                user?.user?.providerData[0].uid,
                'Google',
            ).catch(() => {
                setLoading(false);
                GoogleSignin.signOut();
            });
        } catch (error) {
            GoogleSignin.signOut();
            setLoading(false);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    async function onAppleButtonPress() {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.

        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
            throw 'Apple Sign-In failed - no identify token returned';
        }

        // Create a Firebase credential from the response
        const {identityToken, nonce} = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

        // Sign the user in with the credential
        let user = await auth().signInWithCredential(appleCredential);

        oAuthApiCall(
            appleAuthRequestResponse?.fullName?.givenName
                ? appleAuthRequestResponse?.fullName?.givenName
                : 'Apple ',
            appleAuthRequestResponse?.fullName?.familyName
                ? appleAuthRequestResponse?.fullName?.familyName
                : 'User ',
            user?.user?.email,
            user?.user?.photoURL,
            user?.user?.providerData[0].uid,
            'Apple',
        ).catch(() => {
            setLoading(false);
            // GoogleSignin.signOut();
        });
    }

    return (
        <InitialHome
            {...props}
            {...{t, loading, onGoogleButtonPress, onAppleButtonPress, guestLogin}}
        />
    );
};

export default InitialHomeContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
