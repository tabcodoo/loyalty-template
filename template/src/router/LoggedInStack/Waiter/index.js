import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import Orders from 'containers/LoggedInStack/Waiter/Orders';
import Rooms from 'containers/LoggedInStack/User/Rooms';
import SupplyTabs from '../User/SupplyTabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme, TouchableRipple} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Text from 'components/common/Text';
import constants from '@constants';
import User from 'components/common/icons/User';
import {useNavigation} from '@react-navigation/native';
import About from 'components/common/icons/About';
import Settings from 'components/common/icons/Settings';
import Logout from 'components/common/icons/Logout';
import OrderPreview from 'containers/LoggedInStack/Waiter/OrderPreview';
import RoomCheckout from 'containers/LoggedInStack/User/RoomCheckout';
import RoomComplete from 'containers/LoggedInStack/User/RoomComplete';
import SupplyDetails from 'containers/LoggedInStack/User/SupplyTabs/SupplyDetails';
import SupplySearch from 'containers/LoggedInStack/User/SupplySearch';
import Profile from 'containers/LoggedInStack/User/Profile';
import AboutScreen from 'containers/LoggedInStack/User/About';
import SettingsScreens from 'containers/LoggedInStack/User/Settings';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import api from 'services/api';
import actions from 'store/actions';
import SplashScreen from 'react-native-splash-screen';
import GlobalBottomSheetOld from 'containers/LoggedInStack/User/GlobalBottomSheetOld';
import Scanner from 'containers/LoggedInStack/Owner/Scanner';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MainStackNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="Orders" component={Orders} options={{headerShown: false}} />
        <Stack.Screen name="OrderPreview" component={OrderPreview} options={{headerShown: false}} />
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
        <Stack.Screen name="About" component={AboutScreen} options={{headerShown: false}} />
        <Stack.Screen name="Settings" component={SettingsScreens} options={{headerShown: false}} />
    </Stack.Navigator>
);

const NewOrderStackNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="Rooms" component={Rooms} options={{headerShown: false}} />
        <Stack.Screen name="Supply" component={SupplyTabs} options={{headerShown: false}} />
        <Stack.Screen
            name="SupplyDetails"
            component={SupplyDetails}
            options={{headerShown: false}}
        />
        <Stack.Screen name="SupplySearch" component={SupplySearch} options={{headerShown: false}} />
        <Stack.Screen name="RoomCheckout" component={RoomCheckout} options={{headerShown: false}} />
        <Stack.Screen name="RoomComplete" component={RoomComplete} options={{headerShown: false}} />
    </Stack.Navigator>
);

const SupplyStack = ({navigation}) => {
    navigation.setOptions({tabBarVisible: false});
    return (
        <Stack.Navigator>
            <Stack.Screen name="Supply" component={SupplyTabs} options={{headerShown: false}} />
            <Stack.Screen
                name="SupplyDetails"
                component={SupplyDetails}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SupplySearch"
                component={SupplySearch}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

const BottomTabNavigator = () => {
    const {colors} = useTheme();
    const {t} = useContext(LocalizationContext);
    const user = useSelector((state) => state.user);
    const {userRole, hasScannerEnabled} = user ?? {};

    const isWaiter = userRole.toLowerCase() === 'waiter';
    const isSalesman = userRole.toLowerCase() === 'salesman';
    const isBarmen = userRole.toLowerCase() === 'bartender';
    const isReception = userRole.toLowerCase() === 'reception';
    const isKitchen = userRole.toLowerCase() === 'kitchen';

    const getTabBarVisibility = (route) => {
        const routeName = route.state ? route.state.routes[route.state.index].name : '';
        switch (routeName) {
            case 'Supply':
            case 'SupplyDetails':
            case 'SupplySearch':
            case 'RoomCheckout':
            case 'RoomComplete':
                return false;

            default:
                return true;
        }
    };

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: colors.text,
                inactiveTintColor: colors.text,
            }}>
            {hasScannerEnabled ? (
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
            ) : null}
            <Tab.Screen
                name="Orders"
                component={MainStackNavigator}
                options={{
                    tabBarButton: (props) => (
                        <TouchableRipple rippleColor="rgba(240, 240, 240, 1)" {...props} />
                    ),
                    tabBarLabel: t('waiter.orders'),
                    tabBarIcon: ({focused, color}) => {
                        return focused ? (
                            <Ionicons name="list-circle" size={22} />
                        ) : (
                            <Ionicons name="list-circle-outline" size={22} />
                        );
                    },
                }}
            />
            {isWaiter || isSalesman ? (
                <Tab.Screen
                    name="NewOrder"
                    component={NewOrderStackNavigator}
                    options={({route}) => ({
                        tabBarVisible: getTabBarVisibility(route),
                        tabBarButton: (props) => (
                            <TouchableRipple rippleColor="rgba(240, 240, 240, 1)" {...props} />
                        ),
                        tabBarLabel: t('waiter.newOrder'),
                        tabBarIcon: ({focused, color}) => {
                            return focused ? (
                                <AntDesign name="pluscircle" size={18} />
                            ) : (
                                <AntDesign name="pluscircleo" size={18} />
                            );
                        },
                    })}
                />
            ) : null}
        </Tab.Navigator>
    );
};

const DrawerNavigator = () => {
    const {t} = useContext(LocalizationContext);
    const navigation = useNavigation();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const {userRole, hasScannerEnabled} = user ?? {};

    const isWaiter = userRole.toLowerCase() === 'waiter';
    const isSalesman = userRole.toLowerCase() === 'salesman';
    const isBarmen = userRole.toLowerCase() === 'bartender';
    const isReception = userRole.toLowerCase() === 'reception';
    const isKitchen = userRole.toLowerCase() === 'kitchen';

    const signOutAuth = () => {
        auth().signOut();
        GoogleSignin.signOut();
    };

    useEffect(() => {
        //SplashScreen.hide();
        dispatch(actions.getCategories());
        dispatch(actions.getCart());
    }, []);

    const DrawerContent = (props) => (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 16,
            }}>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 50,
                    marginTop: getStatusBarHeight(),
                    marginBottom: 20,
                }}
                onPress={() => props.navigation.closeDrawer()}>
                <Ionicons
                    name={'chevron-back'}
                    size={26}
                    style={{left: -6, marginRight: 8}}
                    color={'#000'}
                />
                <Text type={'header2'}>{constants.appName}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Profile');
                }}
                style={{flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                <User />

                <Text type={'medium'} style={{marginLeft: 24}}>
                    {t('drawer.profile')}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('About');
                }}
                style={{flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                <About />

                <Text type={'medium'} style={{marginLeft: 24}}>
                    {t('drawer.aboutUs')}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Settings');
                }}
                style={{flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                <Settings />

                <Text type={'medium'} style={{marginLeft: 24}}>
                    {t('drawer.settings')}
                </Text>
            </TouchableOpacity>
            <View style={{width: '100%', height: 0.7, backgroundColor: '#ccc'}} />

            <View style={{width: '100%', height: 0.7, backgroundColor: '#ccc'}}></View>
            <TouchableOpacity
                onPress={() => {
                    messaging().unsubscribeFromTopic(user.uid + '-Waiter');
                    signOutAuth();
                    api.setToken('');
                    dispatch(actions.resetOrders());
                    dispatch(actions.reset());
                    dispatch(actions.resetNotifications());
                }}
                style={{flexDirection: 'row', alignItems: 'center', marginTop: 24}}>
                <Logout />

                <Text type={'medium'} style={{marginLeft: 24}}>
                    {t('drawer.logout')}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            <Drawer.Navigator
                drawerType={'slide'}
                drawerContent={(props) => <DrawerContent {...props} />}>
                <Drawer.Screen
                    name="WaiterStack"
                    component={
                        isWaiter || isSalesman
                            ? BottomTabNavigator
                            : hasScannerEnabled
                            ? BottomTabNavigator
                            : MainStackNavigator
                    }
                />
            </Drawer.Navigator>
            <GlobalBottomSheetOld />
        </>
    );
};

export default DrawerNavigator;
