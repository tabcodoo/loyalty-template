import React, {useContext, useEffect} from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
// import * as firebase from 'react-native-firebase';
import {useSelector, useDispatch} from 'react-redux';
import {actions} from 'store/actions';
import {useTheme, TouchableRipple} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';

import ScanOptions from 'containers/LoggedInStack/Owner/ScanOptions';
import Scanner from 'containers/LoggedInStack/Owner/Scanner';
import PinScreen from 'containers/LoggedInStack/Owner/PinScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LocalizationContext from 'translation/context';
import {useNavigation} from '@react-navigation/native';
import Orders from 'containers/LoggedInStack/Waiter/Orders';
import OrderPreview from 'containers/LoggedInStack/Waiter/OrderPreview';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

let ScannerStack = (props) => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.user);
    const {userRole, hasInternalOrdersEnabled, hasScannerEnabled} = user ?? {};
    let {t} = useContext(LocalizationContext);
    let {colors} = useTheme();

    const isOwner = userRole.toLowerCase() === 'user' || userRole.toLowerCase() === 'shop';
    const isBarmen = userRole.toLowerCase() === 'bartender';
    const isReception = userRole.toLowerCase() === 'reception';
    const isKitchen = userRole.toLowerCase() === 'kitchen';

    // useEffect(() => {
    //     if (userRole === 'shop') navigation.navigate('Scanner');
    // }, [userRole]);

    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: {
                    backgroundColor: colors.primary,
                    height: 90,
                },
                headerTitleStyle: {
                    marginLeft: 0,
                },
                headerTitleContainerStyle: {
                    left: 56,
                },
                headerBackImage: () => <Ionicons name="chevron-back" size={24} color={'#fff'} />,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName={'PinScreen'}>
            {userRole.toLowerCase() === 'user' && (
                <Stack.Screen
                    name="PinScreen"
                    component={PinScreen}
                    options={{headerShown: false}}
                />
            )}

            <Stack.Screen
                name={'Scanner'}
                component={Scanner}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

const OrdersStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            <Stack.Screen name="Orders" component={Orders} options={{headerShown: false}} />
            <Stack.Screen
                name="OrderPreview"
                component={OrderPreview}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

const BottomTabNavigator = () => {
    const {colors} = useTheme();

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: colors.text,
                inactiveTintColor: colors.text,
            }}>
            <Tab.Screen
                name="Scanner"
                component={Scanner}
                options={{
                    tabBarButton: (props) => (
                        <TouchableRipple rippleColor="rgba(240, 240, 240, 1)" {...props} />
                    ),
                    tabBarLabel: 'Skeniranje',
                    tabBarIcon: ({focused, color}) => {
                        return focused ? (
                            <Ionicons name="qr-code" size={22} />
                        ) : (
                            <Ionicons name="qr-code-outline" size={22} />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Orders"
                component={OrdersStack}
                options={{
                    tabBarButton: (props) => (
                        <TouchableRipple rippleColor="rgba(240, 240, 240, 1)" {...props} />
                    ),
                    tabBarLabel: 'Narudžbe',
                    tabBarIcon: ({focused, color}) => {
                        return focused ? (
                            <Ionicons name="list-circle" size={22} />
                        ) : (
                            <Ionicons name="list-circle-outline" size={22} />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default ScannerStack;
