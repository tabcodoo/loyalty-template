import React, {useState, useContext, useEffect, useRef, useMemo} from 'react';

import {createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer';

import {View, Image, Linking, TouchableOpacity, StatusBar, Platform, Button} from 'react-native';

import {Appbar, useTheme} from 'react-native-paper';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {StackActions} from '@react-navigation/native';

import Text from 'components/common/Text';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaIcon from 'react-native-vector-icons/MaterialIcons';
import MaComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import History from 'components/common/icons/History';
import User from 'components/common/icons/User';
import Settings from 'components/common/icons/Settings';
import Logout from 'components/common/icons/Logout';
import Left from 'components/common/icons/Left';
import Kupon from 'components/common/icons/Kupon';
import Instagram from 'components/common/icons/Instagram';
import Facebook from 'components/common/icons/Facebook';
import About from 'components/common/icons/About';
import ReservationInactive from 'components/common/icons/ReservationInactive';
import SurveyIcon from 'components/common/icons/SurveyIcon';
import DownloadFile from 'components/common/icons/DownloadFile';

import GlobalBottomSheetOld from 'containers/LoggedInStack/User/GlobalBottomSheetOld';
import GlobalBottomSheetNew from 'containers/LoggedInStack/User/GlobalBottomSheet';

import ContentActive from 'components/common/icons/ContentActive';
import ContentInactive from 'components/common/icons/ContentInactive';

import SupplyActive from 'components/common/icons/SupplyActive';
import SupplyInactive from 'components/common/icons/SupplyInactive';

import NotificationBell from 'components/common/icons/NotificationBell';
import LoyaltyIcons from 'components/common/icons/LoyaltyIcons';

import LocalizationContext from 'translation/context';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';

import Coupon from './CouponStack';
import actions from 'store/actions';
import api from 'services/api';
import constants from '@constants';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
// import {exportModules, getUser} from 'store/user/actions';
import {createStackNavigator} from '@react-navigation/stack';
import BottomSheet from '@gorhom/bottom-sheet';
import QRCode from 'react-native-qrcode-svg';
import * as Animatable from 'react-native-animatable';
import color from 'color';
// import Offer from 'containers/LoggedInStack/User/OfferTabs/Offer';
// import Content from 'containers/LoggedInStack/User/ContentTabs/Content';
import messaging from '@react-native-firebase/messaging';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DoorClosed from '../../../components/common/icons/DoorClosed';

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
    const {top, bottom} = useSafeAreaInsets();

    let isGuest = useSelector((state) => state.user?.role?.name === 'admin');
    let [focused, setFocused] = useState('Kuponi');
    let user = useSelector((state) => state.user);
    const {hasRoomServiceEnabled, hasInstructionsEnabled} = user ?? {};
    let displayCustomLinks = useSelector((state) => state.user.displayCustomLinks);
    // let supplyActivated = useSelector((state) => state.settings.supply);
    let supplyActivated = useSelector((state) => state.supply.isEnabled);
    // let contentActivated = useSelector((state) => state.settings.content);
    let contentActivated = useSelector((state) => state.content.isEnabled);

    // BottomMenu je aktivan kada:
    //     su ukljucene minimalno 2 dodatne funkcionalnosti
    //
    let arr = [contentActivated, supplyActivated, displayCustomLinks];
    let bottomMenuActivated = arr.filter((feature) => feature).length > 1;
    // console.tron.log(
    //     'arr',
    //     arr,
    //     arr.filter((feature) => feature),
    //     arr.filter((feature) => feature).length,
    // );
    let {colors, fonts} = useTheme();
    let navigate = (route, params = {}) => props.navigation.navigate(route, params);
    const dispatch = useDispatch();

    let signOutAuth = () => {
        auth().signOut();
        GoogleSignin.signOut();
    };

    return (
        <View style={{flex: 1, paddingHorizontal: 16}}>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 50,
                    // marginBottom: 32,
                    marginTop: statusBarHeight,

                    // backgroundColor: '#faf',
                }}
                onPress={() => props.navigation.closeDrawer()}>
                <IonicIcon
                    name={'chevron-back'}
                    size={26}
                    style={{left: -6, marginRight: 8}}
                    color={'#000'}
                />
                <Text type={'header2'}>{constants.appName}</Text>
            </TouchableOpacity>

            <DrawerContentScrollView
                {...props}
                // scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                style={
                    {
                        // paddingHorizontal: 16,
                        // paddingTop: statusBarHeight,
                        // paddingBottom: 24,
                    }
                }
                contentContainerStyle={
                    {
                        // justifyContent: 'space-between',
                        // flex: 1,
                        // backgroundColor: '#ff0',
                    }
                }>
                <View style={{top: -top / 2}}>
                    {user.userRole.toLowerCase() !== 'guest' && (
                        <TouchableOpacity
                            onPress={() => {
                                navigate('Profile');
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 24,
                            }}>
                            <User />

                            <Text type={'medium'} style={{marginLeft: 24}}>
                                {t('drawer.profile')}
                                {/* profile Moj račun */}
                            </Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={() => {
                            setFocused('Kuponi');
                            // navigate('Coupons');
                            if (bottomMenuActivated) {
                                navigate('Coupons');
                            } else {
                                props.navigation.dispatch(StackActions.popToTop());
                            }
                            props.navigation.closeDrawer();
                        }}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 24,
                        }}>
                        <Kupon />

                        <Text type={'medium'} style={{marginLeft: 24}}>
                            {t('drawer.coupons')}
                            {/* coupons Kuponi */}
                        </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                    onPress={() => {
                        // setFocused('Kuponi');
                        navigate('UsedCoupons');
                        // props.navigation.dispatch(StackActions.popToTop());
                        // props.navigation.closeDrawer();
                    }}
                    style={{flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                    <Kupon />

                    <Text type={'medium'} style={{marginLeft: 24}}>
                        Iskorišteni kuponi
                    </Text>
                </TouchableOpacity> */}
                    {!bottomMenuActivated && supplyActivated && (
                        <TouchableOpacity
                            onPress={() => {
                                hasRoomServiceEnabled
                                    ? navigate('Rooms')
                                    : constants.applicationId ===
                                      '8265e2ee-d9a3-48d8-a209-99779c8509b3' //bracom ID
                                    ? navigate('CategorySelection')
                                    : navigate('Supply');
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 24,
                            }}>
                            {hasRoomServiceEnabled ? (
                                <DoorClosed width={16} height={16} fill="#000" />
                            ) : (
                                <SupplyInactive size={16} thin />
                            )}

                            <Text type={'medium'} style={{marginLeft: 24}}>
                                {hasRoomServiceEnabled ? t('room.title') : t('drawer.offer')}
                                {/* offer Ponuda */}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {!bottomMenuActivated && contentActivated && (
                        <TouchableOpacity
                            onPress={() => {
                                // setFocused('Kuponi');fromNotification
                                navigate('Content');
                                // props.navigation.dispatch(StackActions.popToTop());
                                // props.navigation.closeDrawer();
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 24,
                            }}>
                            <ContentInactive size={16} thin />

                            <Text type={'medium'} style={{marginLeft: 24}}>
                                {t('drawer.content')}
                                {/* content Sadržaj */}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {!bottomMenuActivated && displayCustomLinks && (
                        <TouchableOpacity
                            onPress={() => {
                                // setFocused('Kuponi');fromNotification
                                navigate('Reservations');
                                // props.navigation.dispatch(StackActions.popToTop());
                                // props.navigation.closeDrawer();
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 24,
                            }}>
                            <ReservationInactive size={16} />

                            <Text type={'medium'} style={{marginLeft: 24}}>
                                {t('drawer.reservations')}
                                {/* reservations Rezervacije */}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {(user?.pointsEnabled || user?.hasRoomServiceEnabled) && (
                        <TouchableOpacity
                            onPress={() => {
                                navigate('OrderHistory');
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 24,
                            }}>
                            <History size={18} />

                            <Text type={'medium'} style={{marginLeft: 22}}>
                                {user?.hasRoomServiceEnabled
                                    ? t('orderHistory.titleRoomService')
                                    : t('orderHistory.title')}
                            </Text>
                        </TouchableOpacity>
                    )}

                    {user.userRole.toLowerCase() !== 'guest' && (
                        <TouchableOpacity
                            onPress={() => {
                                navigate('Notifications');
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 24,
                            }}>
                            <NotificationBell />

                            <Text type={'medium'} style={{marginLeft: 24}}>
                                {t('drawer.notifications')}
                                {/* notifications Notifikacije */}
                            </Text>
                            {user?.mobileAppSettings?.unreadNotificationsCount > 0 &&
                                user.userRole.toLowerCase() !== 'guest' && (
                                    <View
                                        style={{
                                            position: 'absolute',
                                            right: 0,
                                            height: 24,
                                            width: 24,
                                            borderRadius: 6,
                                            backgroundColor: color('red')
                                                .alpha(0.2)
                                                .rgb()
                                                .toString(),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Text type={'small'} color={'#f00'}>
                                            {user?.mobileAppSettings?.unreadNotificationsCount}
                                        </Text>
                                    </View>
                                )}
                        </TouchableOpacity>
                    )}

                    {user?.hasSurveyEnabled && user.userRole.toLowerCase() !== 'guest' && (
                        <TouchableOpacity
                            onPress={() => {
                                navigate('Survey');
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 24,
                            }}>
                            <SurveyIcon />

                            <Text type={'medium'} style={{marginLeft: 24}}>
                                {/* survey Anketa */}
                                {t('drawer.survey')}
                            </Text>
                            {/* {user?.surveyProgress?.isCompleted && ( */}
                            <View
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    // height: 24,
                                    // width: 24,
                                    paddingVertical: 2,
                                    paddingHorizontal: 6,
                                    borderRadius: 6,
                                    backgroundColor: color(
                                        user?.surveyProgress?.isCompleted ? '#aeee7b' : '#e39a22',
                                    )
                                        .alpha(0.2)
                                        .rgb()
                                        .toString(),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    type={'smallMedium'}
                                    color={
                                        user?.surveyProgress?.isCompleted ? '#aeee7b' : '#e39a22'
                                    }>
                                    {user?.surveyProgress?.isCompleted
                                        ? t('drawer.surveyFinished')
                                        : t('drawer.surveyNotFinished')}
                                </Text>
                            </View>
                            {/* )} */}
                        </TouchableOpacity>
                    )}

                    {user?.userBadgesEnabled && user.userRole.toLowerCase() !== 'guest' && (
                        <TouchableOpacity
                            onPress={() => {
                                navigate('PointsPreview');
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 24,
                            }}>
                            <SimpleLineIcons
                                name="badge"
                                size={13}
                                style={{
                                    marginLeft: 2,
                                }}
                            />

                            <Text type={'medium'} style={{marginLeft: 24}}>
                                {t('badges.title')}
                            </Text>
                        </TouchableOpacity>
                    )}

                    {hasInstructionsEnabled && (
                        <TouchableOpacity
                            onPress={() => {
                                navigate('HowToVoucher');
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 24,
                            }}>
                            <SimpleLineIcons
                                name="notebook"
                                size={13}
                                style={{
                                    marginLeft: 2,
                                }}
                            />

                            <Text type={'medium'} style={{marginLeft: 24}}>
                                {t('instructions.title')}
                            </Text>
                        </TouchableOpacity>
                    )}

                    {user?.displayDocumentDownloads && (
                        <TouchableOpacity
                            onPress={() => {
                                navigate('Documents');
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 24,
                            }}>
                            {/* <Entypo name="attachment" color="#000" size={13} style={{marginRight: 2}} /> */}
                            <View style={{marginLeft: 2}}>
                                <DownloadFile color="#000" size={13} />
                            </View>
                            <Text type={'medium'} style={{marginLeft: 24}}>
                                {t('drawer.documents')}
                                {/* documents Dokumenti */}
                            </Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={() => {
                            navigate('About');
                        }}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 24,
                        }}>
                        <About />

                        <Text type={'medium'} style={{marginLeft: 24}}>
                            {t('drawer.aboutUs')}
                            {/* aboutUs O nama */}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigate('Settings');
                        }}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 24,
                        }}>
                        <Settings />

                        <Text type={'medium'} style={{marginLeft: 24}}>
                            {t('drawer.settings')}
                            {/* settingsPostavke */}
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            width: '100%',
                            height: 0.7,
                            backgroundColor: '#ccc',
                        }}></View>
                    <TouchableOpacity
                        onPress={() => {
                            messaging().unsubscribeFromTopic(constants.applicationId);
                            messaging().unsubscribeFromTopic(`threshold-${user.uid}`);
                            messaging().unsubscribeFromTopic(`survey-${user.uid}`);
                            signOutAuth();
                            api.setToken('');
                            dispatch(actions.reset());
                            dispatch(actions.resetNotifications());
                        }}
                        style={{flexDirection: 'row', alignItems: 'center', marginTop: 24}}>
                        {user.userRole.toLowerCase() !== 'guest' ? (
                            <Logout />
                        ) : (
                            <MaComIcon name="login-variant" size={15} />
                        )}

                        {user.userRole.toLowerCase() !== 'guest' ? (
                            <Text type={'medium'} style={{marginLeft: 24}}>
                                {t('drawer.logout')}
                                {/* Odjava */}
                            </Text>
                        ) : (
                            <Text type={'medium'} style={{marginLeft: 24}}>
                                {t('drawer.login')}
                                {/* Prijava */}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>
            {/* <LanguageSelector t={t} /> */}
            <View
                style={{
                    paddingTop: 8,
                    paddingBottom: bottom + 16,
                    // height: 200,
                    // justifyContent: 'flex-end',
                    // backgroundColor: '#faf',
                }}>
                <Text type={'medium'}>{t('drawer.followUs')}</Text>
                {user?.mobileAppSettings?.socialMediaLinks ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            // justifyContent: 'space-between',
                            // paddingTop: 8,
                        }}>
                        {user?.mobileAppSettings?.socialMediaLinks.map((link) => {
                            let openURL = () => {
                                if (link.icon.includes('facebook')) {
                                    let isIdNumber = !isNaN(parseInt(link.url));
                                    let url = isIdNumber
                                        ? `fb://${Platform.OS === 'ios' ? 'profile' : 'page'}/${
                                              link.url
                                          }`
                                        : link.url;
                                    // console.tron.log(isNaN(parseInt(link.url)), parseInt(link.url));
                                    Linking.openURL(url).catch((err) => {});
                                } else {
                                    Linking.openURL(link.url).catch((err) => {
                                        console.log('err', err);
                                        Linking.openURL(link.url).catch((err) => {
                                            console.log('err nested', err);
                                        });
                                    });
                                }
                            };
                            return (
                                <TouchableOpacity
                                    style={{
                                        justifyContent: 'center',
                                        // alignItems: 'center',
                                        marginTop: 16,
                                        width: '25%',
                                        // flex: 1,
                                    }}
                                    onPress={
                                        openURL
                                        //     () => {
                                        //     Linking.openURL(constants.FACEBOOK_P1).catch((err) =>
                                        //         Linking.openURL(
                                        //             constants.FACEBOOK_P2,
                                        //         ).catch((err) => {}),
                                        //     );
                                        // }
                                    }>
                                    {/* <Facebook fill={colors.primary} />  */}
                                    <LoyaltyIcons
                                        name={link.icon}
                                        // name={'youtube'}
                                        size={30}
                                        color={colors.primary}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ) : (
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            // justifyContent: 'space-between',
                            paddingTop: 16,
                        }}>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                // alignItems: 'center',
                                // marginRight: 16,
                                width: '20%',
                                // flex: 1,
                            }}
                            onPress={() => {
                                Linking.openURL(constants.FACEBOOK_P1).catch((err) =>
                                    Linking.openURL(constants.FACEBOOK_P2).catch((err) => {}),
                                );
                            }}>
                            <Facebook fill={colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                // alignItems: 'center',
                                width: '20%',
                                // flex: 1,
                            }}
                            onPress={() => {
                                Linking.openURL(constants.INSTAGRAM_P1).catch((err) =>
                                    Linking.openURL(constants.INSTAGRAM_P2).catch((err) => {}),
                                );
                            }}>
                            <Instagram fill={colors.primary} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
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
    let token = useSelector((state) => state.user?.token);
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            setTimeout(() => {
                dispatch(actions.exportModules());
                // if (user.userRole.toLowerCase() !== 'guest')
                dispatch(
                    actions.getUser(false, () => {
                        dispatch(actions.getSelectedSettingsCategories());
                        dispatch(actions.getSelectedFilterCategories());
                    }),
                );
                dispatch(actions.getCart());
                // dispatch(actions.getOrderHistory());
                dispatch(actions.getNotifications());
            }, 5);
        }
    }, [token]);

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
                    name="CouponsStack"
                    component={Coupon}
                    // options={{title:s gt('coupons.title', 'ba')}}
                />
            </Drawer.Navigator>
            <GlobalBottomSheetOld />
            <GlobalBottomSheetNew />
        </>
    );
};

export default DrawerStack;
