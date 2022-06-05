import React, {memo, useContext, useEffect, useState} from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
// import * as firebase from 'react-native-firebase';
import {TouchableOpacity, Linking, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import actions from 'store/actions';
import {useTheme, TouchableRipple} from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';

import {Link, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Text from 'components/common/Text';
import Ionicons from 'react-native-vector-icons/Ionicons';

import About from 'containers/LoggedInStack/User/About';
import Instructions from 'containers/LoggedInStack/User/Instructions';
import TermsAndConditions from 'containers/LogInStack/TermsAndConditions';

import Supply from './SupplyTabs';
import SupplyDetails from 'containers/LoggedInStack/User/SupplyTabs/SupplyDetails';
import SupplyCheckout from 'containers/LoggedInStack/User/SupplyTabs/SupplyCheckout';

import Content from './ContentTabs';
import ContentDetails from 'containers/LoggedInStack/User/ContentTabs/ContentDetails';
import SuccessIcon from 'components/common/icons/Success';

import Coupons from 'containers/LoggedInStack/User/Coupons';
import Coupon from 'containers/LoggedInStack/User/Coupon';
import CouponDetails from 'containers/LoggedInStack/User/CouponDetails';
import Notifications from 'containers/LoggedInStack/User/Notifications';
import Notification from 'containers/LoggedInStack/User/Notification';
import Success from 'containers/LoggedInStack/User/Success';
import CouponCode from 'containers/LoggedInStack/User/CouponCode';
import Review from 'containers/LoggedInStack/User/Review';
import UsedCoupons from 'containers/LoggedInStack/User/UsedCoupons';
import Settings from 'containers/LoggedInStack/User/Settings';
import ProfileQRcode from 'containers/LoggedInStack/User/ProfileQRcode';
import CartQRcode from 'containers/LoggedInStack/User/CartQRcode';
import Cart from 'containers/LoggedInStack/User/Cart';
import Checkout from 'containers/LoggedInStack/User/Checkout';
import DeliveryDataInput from 'containers/LoggedInStack/User/DeliveryDataInput';
import PaymentMethod from 'containers/LoggedInStack/User/PaymentMethod';
import DeliveryMethod from 'containers/LoggedInStack/User/DeliveryMethod';
import OrderComplete from 'containers/LoggedInStack/User/OrderComplete';
import PointsPreview from 'containers/LoggedInStack/User/PointsPreview';
import HowToVoucher from 'containers/LoggedInStack/User/HowToVoucher';
import SupplySearch from 'containers/LoggedInStack/User/SupplySearch';
import Reservations from 'containers/LoggedInStack/User/Reservations';
import Survey from 'containers/LoggedInStack/User/Survey';
import Documents from 'containers/LoggedInStack/User/Documents';

import Profile from 'containers/LoggedInStack/User/Profile';
import ChangePassword from 'containers/LoggedInStack/User/ChangePassword';
import OrderHistory from 'containers/LoggedInStack/User/OrderHistory';

import CouponInactive from 'components/common/icons/CouponInactive';
import Kupon from 'components/common/icons/Kupon';
import CouponActive from 'components/common/icons/CouponActive';

import ContentActive from 'components/common/icons/ContentActive';
import ContentInactive from 'components/common/icons/ContentInactive';

import SupplyActive from 'components/common/icons/SupplyActive';
import SupplyInactive from 'components/common/icons/SupplyInactive';
import Rooms from 'containers/LoggedInStack/User/Rooms';
import RoomCheckout from 'containers/LoggedInStack/User/RoomCheckout';
import RoomComplete from 'containers/LoggedInStack/User/RoomComplete';
import CategorySelection from 'containers/LoggedInStack/User/CategorySelection';

import ReservationActive from 'components/common/icons/ReservationActive';
import ReservationInactive from 'components/common/icons/ReservationInactive';

import LocalizationContext from 'translation/context';
import constants from '@constants';
import DoorClosed from 'components/common/icons/DoorClosed';
import DoorOpened from 'components/common/icons/DoorOpened';

const Tab = createBottomTabNavigator();

function CouponTabs() {
    let {colors, customFonts} = useTheme();
    let {t} = useContext(LocalizationContext);

    let displayCustomLinks = useSelector((state) => state.user.displayCustomLinks);
    const user = useSelector((state) => state.user);
    const {hasRoomServiceEnabled, userRole} = user ?? {};
    const isWaiter = userRole.toLowerCase() === 'waiter';
    const isSalesman = userRole.toLowerCase() === 'salesman';
    let supplyActivated = useSelector((state) => state.supplyTabs.isEnabled);
    let contentActivated = useSelector((state) => state.contentTabs.isEnabled);

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({})}
            tabBarOptions={{
                // activeBackgroundColor: '#faf',
                // inactiveBackgroundColor: '#faf',
                // activeTintColor: colors.primary,
                activeTintColor: colors.text,
                inactiveTintColor: colors.text,
                showLabel: true,
                style: {
                    // backgroundColor: '#faf',
                    borderBottomWidth: 0,
                    // borderBottomColor: '#ccc',
                    // height: 49,
                    // justifyContent: 'space-around',
                    // // paddingRight: 38,
                    // alignItems: 'center',
                    borderTopWidth: 1,
                    borderTopColor: '#f0f0f0',
                    shadowOpacity: 0,
                    shadowOffset: {
                        height: 0,
                    },
                    shadowRadius: 0,
                    elevation: 0,
                },
                tabStyle: {
                    // backgroundColor: '#faf',
                    paddingVertical: 5,
                },
                labelStyle: {
                    ...customFonts.smallMediumText,
                },
            }}
            lazy={true}
            shifting={true}
            activeColor={colors.text}
            inactiveColor={colors.text}
            // barStyle={{
            //     // alignItems: 'center',
            //     // height: 49,
            //     // justifyContent: 'flex-end',
            //     // paddingBottom: 10,
            //     backgroundColor: '#fff',
            //     borderTopWidth: 1,
            //     borderTopColor: '#f0f0f0',
            //     borderBottomWidth: 0,
            //
            //     shadowOpacity: 0,
            //     shadowOffset: {
            //         height: 0,
            //     },
            //     shadowRadius: 0,
            //     elevation: 0,
            // }}
        >
            <Tab.Screen
                name="Coupons"
                component={Coupons}
                rippleColor={'#ff0'}
                options={{
                    tabBarButton: (props) => (
                        <TouchableRipple rippleColor="rgba(240, 240, 240, 1)" {...props} />
                    ),
                    tabBarLabel: t('coupons.tabBarLabel'),
                    tabBarIcon: ({focused, color, size}) => {
                        return focused ? (
                            <CouponActive fill={color} size={22} />
                        ) : (
                            <CouponInactive fill={color} size={22} />
                        );
                    },
                    // labelStyle: {
                    //
                    // },
                    // tabBarStyle: {
                    //     backgroundColor: '#aff',
                    // },
                }}
            />
            {/* {supplyActivated && (
                <Tab.Screen
                    name={'Rooms'}
                    component={Rooms}
                    options={{
                        tabBarButton: (props) => (
                            <TouchableRipple rippleColor="rgba(240, 240, 240, 1)" {...props} />
                        ),
                        tabBarLabel: t('room.title'),
                        tabBarIcon: ({focused, color, size}) => {
                            return focused ? (
                                <DoorOpened fill={color} width={27} height={27} />
                            ) : (
                                <DoorClosed fill={color} width={28} height={28} />
                            );
                        },
                    }}
                />
            )} */}
            {supplyActivated && (
                <Tab.Screen
                    name={hasRoomServiceEnabled || isWaiter || isSalesman ? 'Rooms' : 'Supply'}
                    component={hasRoomServiceEnabled || isWaiter || isSalesman ? Rooms : Supply}
                    options={{
                        tabBarButton: (props) => (
                            <TouchableRipple rippleColor="rgba(240, 240, 240, 1)" {...props} />
                        ),
                        tabBarLabel:
                            hasRoomServiceEnabled || isWaiter || isSalesman
                                ? t('room.title')
                                : t('supply.tabBarLabel'),
                        tabBarIcon: ({focused, color, size}) => {
                            return hasRoomServiceEnabled || isWaiter || isSalesman ? (
                                focused ? (
                                    <DoorOpened fill={color} width={22} height={22} />
                                ) : (
                                    <DoorClosed fill={color} width={22} height={22} />
                                )
                            ) : focused ? (
                                <SupplyActive fill={color} size={22} />
                            ) : (
                                <SupplyInactive fill={color} size={22} />
                            );
                        },
                    }}
                />
            )}

            {contentActivated && (
                <Tab.Screen
                    name="Content"
                    component={Content}
                    options={{
                        tabBarButton: (props) => (
                            <TouchableRipple rippleColor="rgba(240, 240, 240, 1)" {...props} />
                        ),
                        tabBarLabel: t('content.tabBarLabel'),
                        tabBarIcon: ({focused, color, size}) => {
                            return focused ? (
                                <ContentActive fill={color} size={22} />
                            ) : (
                                <ContentInactive fill={color} size={22} />
                            );
                        },
                    }}
                />
            )}

            {displayCustomLinks && (
                <Tab.Screen
                    name="Reservations"
                    component={Reservations}
                    options={{
                        tabBarButton: (props) => (
                            <TouchableRipple
                                {...props}
                                rippleColor="rgba(240, 240, 240, 1)"
                                // onPress={() => {
                                //     Linking.openURL('https://github.com/');
                                // }}
                            />
                        ),
                        tabBarLabel: t('reservations.tabBarLabel'),
                        tabBarIcon: ({focused, color, size}) => {
                            return focused ? (
                                <ReservationActive fill={color} size={22} />
                            ) : (
                                <ReservationInactive fill={color} size={22} />
                            );
                        },
                    }}
                />
            )}
        </Tab.Navigator>
    );
}
const Stack = createStackNavigator();

let CouponStack = (props) => {
    // console.tron.log(
    // messaging.NotificationAndroidVisibility =
    //     messaging.NotificationAndroidVisibility.VISIBILITY_PRIVATE;
    // );
    // messaging().setBackgroundMessageHandler((message: RemoteMessage) => {
    //     console.log('remoteMessage', message, {
    //         ...message,
    //         notification: {
    //             ...message.notification,
    //             android: {
    //                 ...message.notification.android,
    //                 priority: messaging.NotificationAndroidPriority.PRIORITY_HIGH,
    //                 visibility: messaging.NotificationAndroidVisibility.VISIBILITY_PUBLIC,
    //             },
    //         },
    //     });
    //     return {
    //         ...message,
    //         notification: {
    //             ...message.notification,
    //             android: {
    //                 ...message.notification.android,
    //                 priority: messaging.NotificationAndroidPriority.PRIORITY_HIGH,
    //                 visibility: messaging.NotificationAndroidVisibility.VISIBILITY_PUBLIC,
    //             },
    //         },
    //     };
    // });
    const navigation = useNavigation();
    let user = useSelector((state) => state.user);
    const {userRole, hasRoomServiceEnabled} = user ?? {};
    const isWaiter = userRole.toLowerCase() === 'waiter';
    const isSalesman = userRole.toLowerCase() === 'salesman';
    let surveyShown = useSelector((state) => state.surveyShown);
    let topicSuccess = `user-${user.uid}-success`;
    let topicTreshold = `threshold-${user.uid}`;
    let topicSurvey = `survey-${user.uid}`;

    let notificationAllowed = useSelector((state) => state.notificationAllowed);
    let appAlreadyOpenedFromNotification = useSelector(
        (state) => state.appAlreadyOpenedFromNotification,
    );
    let displayCustomLinks = useSelector((state) => state.user.displayCustomLinks);
    let supplyActivated = useSelector((state) => state.supplyTabs.isEnabled);
    let contentActivated = useSelector((state) => state.contentTabs.isEnabled);
    // let bottomMenuActivated = (contentActivated || supplyActivated) && displayCustomLinks;
    // let bottomMenuActivated =
    //     (contentActivated && displayCustomLinks) || (supplyActivated && displayCustomLinks);

    let arr = [contentActivated, supplyActivated, displayCustomLinks];
    let bottomMenuActivated = arr.filter((feature) => feature).length > 1;

    const dispatch = useDispatch();

    let {t} = useContext(LocalizationContext);
    let {colors} = useTheme();
    const [loading, setLoading] = useState(true);
    const [initialRoute, setInitialRoute] = useState('CouponStack');
    const [initialCoupon, setInitialCoupon] = useState(null);
    const [fromNotification, setFromNotification] = useState(false);
    const [initialNotification, setInitialNotification] = useState(null);

    useEffect(() => {
        // console.tron.log('CouponStack', user, surveyShown);
        if (
            user?.hasSurveyEnabled &&
            user?.mobileAppSettings?.showSurveyOnStartup &&
            user.userRole.toLowerCase() !== 'guest'
        ) {
            // console.tron.log('Show Surver', user, surveyShown);
            setLoading(false);
            setInitialRoute('Survey');
            dispatch(actions.toggleSurveyOpened());
        }
        if (notificationAllowed) {
            messaging().subscribeToTopic(constants.applicationId);
            messaging().subscribeToTopic(topicTreshold);
            messaging().subscribeToTopic(topicSurvey);
        }
        //
        //     // Assume a message-notification contains a "type" property in the data payload of the screen to open
        //
        messaging().onNotificationOpenedApp((remoteMessage) => {
            console.log('NOTIFICATION FROM PAUSE', remoteMessage);

            if (remoteMessage?.data) {
                dispatch(actions.appAlreadyOpenedFromNotificationSuccess());

                if (
                    remoteMessage?.data?.type &&
                    remoteMessage?.data?.type.toLowerCase() === 'coupon'
                ) {
                    let couponFromNotif = JSON.parse(remoteMessage?.data?.data);
                    let coupon = {};

                    Object.keys(couponFromNotif).forEach((key) => {
                        let newKey = key.charAt(0).toLowerCase() + key.slice(1);
                        coupon[newKey] = couponFromNotif[key];
                    });

                    setInitialCoupon(coupon);
                    setInitialRoute('CouponDetails'); // e.g. "Settings"
                    dispatch(actions.resetCoupons());
                    dispatch(actions.getCoupons());
                    navigation.navigate('CouponDetails', {coupon, fromNotification: true});
                } else if (
                    remoteMessage?.data?.type &&
                    remoteMessage?.data?.type.toLowerCase() === 'threshold'
                ) {
                    navigation.navigate('OrderHistory');
                } else if (
                    remoteMessage?.data?.data &&
                    remoteMessage?.data?.data.includes(topicSuccess)
                ) {
                    dispatch(
                        actions.setGlobalBottomSheet(
                            true,
                            () => (
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                        // backgroundColor: '#faf',
                                    }}>
                                    <Text type={'header1'}>{t('profileQRcode.title')}</Text>
                                    <SuccessIcon />
                                    <Text>{t('profileQRcode.scanedStep1')}</Text>
                                </View>
                            ),
                            // [0, '40%'],
                        ),
                    );
                    messaging().unsubscribeFromTopic(topicSuccess);
                } else if (remoteMessage?.data?.type === 'screenview') {
                    // navigation.navigate('CouponDetails', {
                    //     notification: {
                    //         notificationDate: remoteMessage?.data?.sentTime,
                    //         subject: remoteMessage?.notification?.body,
                    //         message: remoteMessage?.notification?.title,
                    //     },
                    //     fromNotification: true,
                    // });
                    // setInitialNotification({
                    //     notificationDate: remoteMessage?.data?.sentTime,
                    //     subject: remoteMessage?.notification?.body,
                    //     message: remoteMessage?.notification?.title,
                    // });
                    // setFromNotification(true);
                    // setInitialRoute('Notification'); // e.g. "Settings"
                    navigation.navigate('Notification', {
                        notification: {
                            notificationDate: remoteMessage?.data?.sentTime,
                            subject: remoteMessage?.notification?.title,
                            message: remoteMessage?.notification?.body,
                            id: remoteMessage?.data?.notificationid,
                        },
                        fromNotification: true,
                    });
                }
                // else if (remoteMessage?.from.includes(topicTreshold)) {
                //     dispatch(
                //         actions.setGlobalBottomSheet(
                //             true,
                //             () => (
                //                 <View
                //                     style={{
                //                         flex: 1,
                //                         alignItems: 'center',
                //                         justifyContent: 'space-around',
                //                         // backgroundColor: '#faf',
                //                     }}>
                //                     <Text type={'header1'}>{t('cartQRcode.scanSuccess')}</Text>
                //                     <SuccessIcon />
                //                     <Text center>
                //                         {`${remoteMessage?.notification?.title}. ${remoteMessage?.notification?.body}`}
                //                     </Text>
                //                 </View>
                //             ),
                //             // [0, '40%'],
                //         ),
                //     );
                // }
            }
        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                // console.tron.log(
                //     'getInitialNotification',
                //     remoteMessage,
                //     appAlreadyOpenedFromNotification,
                // );
                console.log('NOTIFICATION FROM QUIT', remoteMessage);

                if (remoteMessage && !appAlreadyOpenedFromNotification) {
                    dispatch(actions.appAlreadyOpenedFromNotificationSuccess());
                    if (remoteMessage?.data) {
                        if (
                            remoteMessage?.data?.type &&
                            remoteMessage?.data?.type.toLowerCase() === 'coupon'
                        ) {
                            let couponFromNotif = JSON.parse(remoteMessage?.data?.data);
                            let coupon = {};

                            Object.keys(couponFromNotif).forEach((key) => {
                                let newKey = key.charAt(0).toLowerCase() + key.slice(1);
                                coupon[newKey] = couponFromNotif[key];
                            });
                            setInitialCoupon(coupon);
                            setFromNotification(true);
                            setInitialRoute('CouponDetails'); // e.g. "Settings"
                        } else if (
                            remoteMessage?.data?.type &&
                            remoteMessage?.data?.type.toLowerCase() === 'threshold'
                        ) {
                            setInitialRoute('OrderHistory');
                        } else if (remoteMessage?.from.includes(topicSuccess)) {
                            dispatch(
                                actions.setGlobalBottomSheet(
                                    true,
                                    () => (
                                        <View
                                            style={{
                                                flex: 1,
                                                alignItems: 'center',
                                                justifyContent: 'space-around',
                                                // backgroundColor: '#faf',
                                            }}>
                                            <Text type={'header1'}>{t('profileQRcode.title')}</Text>
                                            <SuccessIcon />
                                            <Text>{t('profileQRcode.scanedStep1')}</Text>
                                        </View>
                                    ),
                                    // [0, '40%'],
                                ),
                            );
                            messaging().unsubscribeFromTopic(topicSuccess);
                        } else if (remoteMessage?.data?.type === 'screenview') {
                            // navigation.navigate('CouponDetails', {
                            //     notification: {
                            //         notificationDate: remoteMessage?.data?.sentTime,
                            //         subject: remoteMessage?.notification?.body,
                            //         message: remoteMessage?.notification?.title,
                            //     },
                            //     fromNotification: true,
                            // });
                            setInitialNotification({
                                notificationDate: remoteMessage?.data?.sentTime,
                                subject: remoteMessage?.notification?.title,
                                message: remoteMessage?.notification?.body,
                                id: remoteMessage?.data?.notificationid,
                            });
                            setFromNotification(true);
                            setInitialRoute('Notification'); // e.g. "Settings"
                        }
                        // else if (remoteMessage?.from.includes(topicTreshold)) {
                        //     dispatch(
                        //         actions.setGlobalBottomSheet(
                        //             true,
                        //             () => (
                        //                 <View
                        //                     style={{
                        //                         flex: 1,
                        //                         alignItems: 'center',
                        //                         justifyContent: 'space-around',
                        //                         // backgroundColor: '#faf',
                        //                     }}>
                        //                     <Text type={'header1'}>
                        //                         {t('cartQRcode.scanSuccess')}
                        //                     </Text>
                        //                     <SuccessIcon />
                        //                     <Text center>
                        //                         {`${remoteMessage?.notification?.title}. ${remoteMessage?.notification?.body}`}
                        //                     </Text>
                        //                 </View>
                        //             ),
                        //             // [0, '40%'],
                        //         ),
                        //     );
                        // }
                    }
                }
                setLoading(false);
            });

        messaging().onMessage((message) => {
            // console.tron.log('onMessage CouponStack', message);
            // if (
            //     message?.data?.data &&
            //     typeof message?.data?.data === 'string' &&
            //     message?.data?.data.includes(topicTreshold)
            // ) {
            //     dispatch(
            //         actions.setGlobalBottomSheet(
            //             true,
            //             () => (
            //                 <View
            //                     style={{
            //                         flex: 1,
            //                         alignItems: 'center',
            //                         justifyContent: 'space-around',
            //                         // backgroundColor: '#faf',
            //                     }}>
            //                     <Text type={'header1'}>{t('cartQRcode.scanSuccess')}</Text>
            //                     <SuccessIcon />
            //                     <Text center>{`${message?.notification?.body}`}</Text>
            //                 </View>
            //             ),
            //             // [0, '40%'],
            //         ),
            //     );
            // }
        });
    }, []);

    if (loading) {
        return null;
    }

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
            initialRouteName={initialRoute}>
            <Stack.Screen
                name="CouponStack"
                component={bottomMenuActivated ? CouponTabs : Coupons}
                // component={CouponTabs}
                options={{headerShown: false}}
            />
            {(!bottomMenuActivated && supplyActivated) ||
            hasRoomServiceEnabled ||
            isWaiter ||
            isSalesman ? (
                <Stack.Screen
                    name="Supply"
                    component={Supply}
                    options={{
                        headerShown: false,
                    }}
                />
            ) : null}
            {supplyActivated && (
                <>
                    <Stack.Screen
                        name="SupplyDetails"
                        component={SupplyDetails}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="SupplyCheckout"
                        component={SupplyCheckout}
                        options={{
                            headerShown: false,
                        }}
                    />
                </>
            )}
            {!bottomMenuActivated && contentActivated && (
                <Stack.Screen
                    name="Content"
                    component={Content}
                    options={{
                        headerShown: false,
                    }}
                />
            )}
            {contentActivated && (
                <Stack.Screen
                    name="ContentDetails"
                    component={ContentDetails}
                    options={{
                        headerShown: false,
                    }}
                />
            )}
            {!bottomMenuActivated && displayCustomLinks && (
                <Stack.Screen
                    name="Reservations"
                    component={Reservations}
                    options={{
                        headerShown: false,
                    }}
                />
                // <Tab.Screen
                //     name="Reservations"
                //     component={Reservations}
                //     options={{
                //         tabBarButton: (props) => (
                //             <TouchableRipple
                //                 {...props}
                //                 rippleColor="rgba(240, 240, 240, 1)"
                //                 // onPress={() => {
                //                 //     Linking.openURL('https://github.com/');
                //                 // }}
                //             />
                //         ),
                //         tabBarLabel: t('reservations.tabBarLabel'),
                //         tabBarIcon: ({focused, color, size}) => {
                //             return focused ? (
                //                 <ReservationActive fill={color} size={22} />
                //             ) : (
                //                 <ReservationInactive fill={color} size={22} />
                //             );
                //         },
                //     }}
                // />
            )}
            <Stack.Screen
                name="Coupon"
                component={Coupon}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="RoomCheckout"
                component={RoomCheckout}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="RoomComplete"
                component={RoomComplete}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="CouponDetails"
                component={CouponDetails}
                options={{headerShown: false}}
                initialParams={{coupon: initialCoupon, fromNotification}}
            />
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Notification"
                component={Notification}
                options={{headerShown: false}}
                initialParams={{notification: initialNotification, fromNotification}}
            />

            <Stack.Screen name="Survey" component={Survey} options={{headerShown: false}} />

            <Stack.Screen name="Success" component={Success} options={{headerShown: false}} />
            <Stack.Screen name="CouponCode" component={CouponCode} options={{headerShown: false}} />
            <Stack.Screen
                name="UsedCoupons"
                component={UsedCoupons}
                options={{headerShown: false}}
            />

            <Stack.Screen name="Review" component={Review} options={{headerShown: false}} />

            <Stack.Screen name="About" component={About} options={{headerShown: false}} />
            <Stack.Screen
                name="Instructions"
                component={Instructions}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="TermsOfUsage"
                component={TermsAndConditions}
                options={{headerShown: false}}
            />

            <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{headerShown: false}}
            />
            <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}} />
            <Stack.Screen
                name="ProfileQRcode"
                component={ProfileQRcode}
                options={{headerShown: false}}
            />
            <Stack.Screen name="CartQRcode" component={CartQRcode} options={{headerShown: false}} />
            <Stack.Screen name="Cart" component={Cart} options={{headerShown: false}} />
            <Stack.Screen name="Checkout" component={Checkout} options={{headerShown: false}} />
            <Stack.Screen
                name="DeliveryDataInput"
                component={DeliveryDataInput}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="DeliveryMethod"
                component={DeliveryMethod}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="PaymentMethod"
                component={PaymentMethod}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="OrderComplete"
                component={OrderComplete}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="HowToVoucher"
                component={HowToVoucher}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="OrderHistory"
                component={OrderHistory}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="PointsPreview"
                component={PointsPreview}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SupplySearch"
                component={SupplySearch}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="CategorySelection"
                component={CategorySelection}
                options={{headerShown: false}}
            />
            <Stack.Screen name="Documents" component={Documents} options={{headerShown: false}} />
        </Stack.Navigator>
    );
};
export default memo(CouponStack);
