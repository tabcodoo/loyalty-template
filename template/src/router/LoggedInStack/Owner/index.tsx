import React, {useState, useContext, useEffect} from 'react';

import {createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer';

import {View, Image, Linking, TouchableOpacity, StatusBar, Platform} from 'react-native';

import {Appbar, useTheme} from 'react-native-paper';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {StackActions} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import Text from 'components/common/Text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaIcon from 'react-native-vector-icons/MaterialIcons';

import User from 'components/common/icons/User';
import Settings from 'components/common/icons/Settings';
import Logout from 'components/common/icons/Logout';
import Left from 'components/common/icons/Left';
import Kupon from 'components/common/icons/Kupon';
import Instagram from 'components/common/icons/Instagram';
import Facebook from 'components/common/icons/Facebook';
import About from 'components/common/icons/About';

import LocalizationContext from 'translation/context';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import api from 'services/api';
import constants from '@constants';
import ScannerStack from './ScannerStack';
import actions from 'store/actions';
import GlobalBottomSheetOld from 'containers/LoggedInStack/User/GlobalBottomSheetOld';
import messaging from '@react-native-firebase/messaging';

let DrawerHeader = ({navigation}) => {
    let {t} = useContext(LocalizationContext);
    let {colors, fonts} = useTheme();

    return (
        <View
            style={{
                backgroundColor: 'transparent',
                top: 0,
                position: 'absolute',
                left: 0,
                right: 0,
                height: statusBarHeight + 200,
                justifyContent: 'center',
            }}>
            <Appbar.Header
                dark
                style={{
                    backgroundColor: colors.drawer,
                    height: '100%',
                    width: '120%',
                    alignItems: 'flex-start',
                    paddingTop: statusBarHeight + 12,
                }}>
                {/*<Image*/}
                {/*    style={{position: 'absolute', height: '100%', width: '100%'}}*/}
                {/*    source={require('assets/images/background-layover.png')}*/}
                {/*    resizeMode="cover"*/}
                {/*/>*/}

                <Appbar.Content
                    title={t('name')}
                    titleStyle={[fonts.header2Text, {marginBottom: 16}]}
                />
            </Appbar.Header>
        </View>
    );
};
let DrawerItem = (renderIcon = null, title = '', onPress = () => {}) => (
    <TouchableOpacity onPress={onPress} style={{flexDirection: 'row', alignItems: 'center'}}>
        {/*{!!renderIcon && renderIcon()}*/}
        {/*<Text type={'medium'} color={'#fff'}>*/}
        {/*    {title}*/}
        {/*</Text>*/}
    </TouchableOpacity>
);

let DrawerList = (props) => {
    let {t} = useContext(LocalizationContext);
    const user = useSelector((state) => state.user);
    const {userRole, hasInternalOrdersEnabled, hasScannerEnabled} = user ?? {};
    let {colors, fonts} = useTheme();
    let navigate = (route, params = {}) => props.navigation.navigate(route, params);
    const dispatch = useDispatch();

    return (
        <DrawerContentScrollView
            {...props}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            style={{
                paddingHorizontal: 16,
                // paddingTop: statusBarHeight,
                paddingBottom: 24,
            }}
            contentContainerStyle={{
                justifyContent: 'space-between',
                flex: 1,
            }}>
            <View>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 56,
                        marginBottom: 32,
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

                <>
                    <TouchableOpacity
                        onPress={() => {
                            navigate('Scanner');
                        }}
                        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                        <FontAwesomeIcon name={'qrcode'} size={14} style={{marginLeft: 4}} />

                        <Text type={'medium'} style={{marginLeft: 24}}>
                            {t('drawer.scan')}
                        </Text>
                    </TouchableOpacity>

                    {/* {hasInternalOrdersEnabled && (
                        <TouchableOpacity
                            onPress={() => {
                                navigate('Orders');
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 24,
                            }}>
                            <Ionicons
                                name="list-circle-outline"
                                size={16}
                                style={{
                                    marginLeft: 3,
                                }}
                            />

                            <Text type={'medium'} style={{marginLeft: 20}}>
                                {t('room.orders')}
                            </Text>
                        </TouchableOpacity>
                    )} */}
                </>

                <View style={{width: '100%', height: 0.7, backgroundColor: '#ccc'}}></View>

                <TouchableOpacity
                    onPress={() => {
                        messaging().unsubscribeFromTopic(`${constants.applicationId}-User`);
                        api.setToken('');
                        dispatch(actions.resetOrders());
                        dispatch(actions.reset());
                    }}
                    style={{flexDirection: 'row', alignItems: 'center', marginTop: 24}}>
                    <Logout />

                    <Text type={'medium'} style={{marginLeft: 24}}>
                        {t('drawer.logout')}
                        {/* Odjava */}
                    </Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};

const Drawer = createDrawerNavigator();
let statusBarHeight = getStatusBarHeight();

export const useInitialRender = (): boolean => {
    const [isInitialRender, setIsInitialRender] = useState(false);

    if (!isInitialRender) {
        setTimeout(() => setIsInitialRender(true), 1);
        return true;
    }
    return false;
};

let DrawerStack = (props) => {
    let guest = props.role === 'guest';
    let {colors, fonts} = useTheme();

    useEffect(() => {
        //SplashScreen.hide();
    }, []);

    return (
        <>
            <Drawer.Navigator
                drawerType={'slide'}
                drawerStyle={{
                    backgroundColor: colors.drawer,
                    width: useInitialRender() ? 0 : 270,
                    padding: 0,
                }}
                drawerContentOptions={{
                    activeBackgroundColor: colors.gray2,
                    itemStyle: {
                        flex: 1,
                        width: '100%',
                        marginLeft: 0,
                        borderRadius: 0,
                    },
                    activeTintColor: colors.primary,
                    inactiveTintColor: '#000',
                }}
                drawerContent={(props) => <DrawerList {...props} guest={guest} />}>
                <Drawer.Screen
                    name="ScanOptions"
                    component={ScannerStack}
                    // options={{title:s gt('coupons.title', 'ba')}}
                />
            </Drawer.Navigator>
            <GlobalBottomSheetOld />
        </>
    );
};

export default DrawerStack;
