import React, {useState, useContext} from 'react';
import {Platform} from 'react-native';
import {useTheme} from 'react-native-paper';

import {
    CardStyleInterpolators,
    createStackNavigator,
    HeaderBackButton,
} from '@react-navigation/stack';

import InitialGuestScreen from 'containers/LogInStack/InitialGuestScreen';
import InitialHome from 'containers/LogInStack/InitialHome';
import PhoneAuth from 'containers/LogInStack/PhoneAuth';

import Login from 'containers/LogInStack/Login';
import ForgotPassword from 'containers/LogInStack/ForgotPassword';
import Register from 'containers/LogInStack/Register';
import TermsAndConditions from 'containers/LogInStack/TermsAndConditions';

import Ionicons from 'react-native-vector-icons/Ionicons';
import LocalizationContext from 'translation/context';

const Stack = createStackNavigator();

let stackRouter = () => {
    let {t} = useContext(LocalizationContext);
    let {colors} = useTheme();
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: '#faf',
                headerStyle: {
                    backgroundColor: colors.primary,
                    height: 90,
                },
                headerTitleStyle: {
                    // backgroundColor: '#faf',
                    // marginLeft: 16, // fontSize: 14,
                    // fontWeight: 'bold',
                },
                headerTitleContainerStyle: {
                    left: 56,
                    // fontSize: 14,
                    // fontWeight: 'bold',
                },
                headerBackImage: () => (
                    <Ionicons
                        name="chevron-back"
                        size={30}
                        color={'#000'}
                        style={{marginLeft: Platform.OS === 'ios' ? 16 : 0}}
                    />
                ),
                headerPressColorAndroid: 'transparent',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            <Stack.Screen
                name="InitialGuestScreen"
                component={InitialGuestScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="InitialHome"
                component={InitialHome}
                options={{
                    headerShown: false,
                    title: '',
                    headerBackTitle: '',
                    headerBackTitleVisible: false,
                    headerStyle: {
                        // tintColor: 'red',
                        // headerTintColor: 'red', // YAY! Proper format!
                        // backgroundColor: '#faf',
                        backgroundColor: 'transparent',
                        shadow: 0,
                        elevation: 0,
                        shadowOpacity: 0,
                        shadowOffset: {
                            height: 0,
                        },
                        shadowRadius: 0,
                        ...(Platform.OS === 'ios' ? {height: 76} : {}),
                    },
                }}
            />

            <Stack.Screen name="PhoneAuth" component={PhoneAuth} options={{headerShown: false}} />
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                    headerShown: false,
                    title: t('forgotPassword.title'),
                }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false,
                    title: t('register.title'),
                }}
            />
            <Stack.Screen
                name="TermsAndConditions"
                component={TermsAndConditions}
                options={{
                    headerShown: false,
                    title: t('termsAndConditions.title'),
                }}
            />
        </Stack.Navigator>
    );
};

export default stackRouter;
