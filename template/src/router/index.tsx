/**
 * This is the doc comment for ROUTER main file index.tsx
 * @packageDocumentation
 */
import React, {useEffect, createContext, useState, useMemo, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import actions from 'store/actions';
import constants from '@constants';
import {NavigationContainer, DefaultTheme, useNavigation} from '@react-navigation/native';
import UserLoggedInStack from './LoggedInStack/User';
import OwnerLoggedInStack from './LoggedInStack/Owner';
import WaiterStack from './LoggedInStack/Waiter';
import LogInStack from './LogInStack';
import PinScreen from 'containers/LoggedInStack/Owner/PinScreen';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import {Provider as PaperProvider} from 'react-native-paper';
import {lightTheme, darkTheme} from 'constants/theme';

import {useDarkMode} from 'react-native-dynamic';
import api from 'services/api';
import {View} from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Coupons from 'containers/LoggedInStack/User/Coupons';
import LocalizationContext from 'translation/context';
import Maintenance from 'containers/Maintenance';


const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        // primary: '#faf',
        background: '#fff',
    },
};

let router = () => {
    let {t} = useContext(LocalizationContext);

    const [loading, setLoading] = useState(true);
    const [initialRoute, setInitialRoute] = useState('LogInStack');


    let isDarkTheme = useSelector((state) => state.darkTheme);
    let userSignedIn = useSelector((state) => state.user?.token.length > 0);
    let user = useSelector((state) => state.user);
    const {userRole, language} = user ?? {}
    let wasGuest = useSelector((state) => state.wasGuest);

    let token = useSelector((state) => state.user?.token);
    // let user = useSelector((state) => state.user);
    const isDarkMode = useDarkMode();
    // const navigation = useNavigation();
    const dispatch = useDispatch();

    const isOwner = userRole.toLowerCase() === 'user' || userRole.toLowerCase() === 'shop';

    const isWaiter = userRole.toLowerCase() === 'waiter';
    const isSalesman = userRole.toLowerCase() === 'salesman';
    const isBarmen = userRole.toLowerCase() === 'bartender';
    const isReception = userRole.toLowerCase() === 'reception';
    const isKitchen = userRole.toLowerCase() === 'kitchen';

    const [isMaintenanceEnabled, setIsMaintenanceEnabled] = useState(null)
    // const isMaintenanceEnabled = useSelector((state) => state.user.isMaintenanceEnabled);


    useEffect(() => {
        // darkTheme has initial type string so when it is
        // set to boolean system theme can't influence further on
        if (typeof isDarkTheme === 'string') dispatch(actions.setDarkTheme(isDarkMode));
    }, []);

    useEffect(() => {
        if (token) api.setToken(token, user.language);
    }, [token]);

    const getUser = async ()=>{
        const {data} = await api.get('/identity', language )
        return data;
    }

    const getGuestUser = async () =>{
        const {data:{user}} = await api.post('/identity/guest-login',{
            moduleId: constants.moduleId,
            applicationId: constants.applicationId,
        })
        return user;
    }

    const startupRouterConfig = async () =>{
        

        if (userSignedIn) {
            const data = await getUser()

            if(data?.isMaintenanceEnabled){
                setIsMaintenanceEnabled(true)
                setInitialRoute('Maintenance')
                setLoading(false)
                return;
            }

            if (userRole.toLowerCase() === 'mobileuser' || userRole.toLowerCase() === 'guest') {
                setInitialRoute('UserLoggedInStack');
            } else if (isWaiter || isBarmen || isKitchen || isReception || isSalesman) {
                setInitialRoute('WaiterStack');
            } else {
                setInitialRoute('OwnerLoggedInStack');
            }
            setLoading(false);
            SplashScreen.hide()
        } else {
            const data = await getGuestUser()

            if(data?.isMaintenanceEnabled){
                setIsMaintenanceEnabled(true)
                setInitialRoute('Maintenance')
                setLoading(false)
                return;
            }
            if (wasGuest) {
                // navigation.navigate('LogInStack');
                setInitialRoute('LogInStack');
                setLoading(false);
            } else {
                // setInitialRoute('LogInStack');
                // setLoading(false);
                dispatch(
                    actions.guestLogin(() => {
                        setInitialRoute('UserLoggedInStack');

                        setTimeout(() => {
                            setLoading(false);
                            dispatch(actions.setWasGuest());
                        }, 100);
                    }),
                );
            }
            SplashScreen.hide()
        }
    }

    useEffect(() => {
        
        startupRouterConfig()
        
    }, []);

    const Stack = createStackNavigator();

    if (loading) {
        return null;
    }

    return (
        <PaperProvider
            settings={{
                icon: (props) => <AwesomeIcon {...props} />,
            }}
            theme={isDarkTheme ? darkTheme : lightTheme}>
            <View style={{flex: 1}}>
                <NavigationContainer theme={MyTheme}>
                    <Stack.Navigator
                        screenOptions={{
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                        initialRouteName={initialRoute}>

                        {isMaintenanceEnabled && (
                            <Stack.Screen
                                name="Maintenance"
                                component={Maintenance}
                                options={{headerShown: false}}
                            />
                        )}

                        {!userSignedIn && (
                            <Stack.Screen
                                name="LogInStack"
                                component={LogInStack}
                                options={{headerShown: false}}
                            />
                        )}

                        {(userRole.toLowerCase() === 'mobileuser' ||
                            userRole.toLowerCase() === 'guest') && (
                            <Stack.Screen
                                name="UserLoggedInStack"
                                component={UserLoggedInStack}
                                options={{headerShown: false}}
                            />
                        )}

                        {userSignedIn &&
                            (isWaiter || isBarmen || isKitchen || isReception || isSalesman) && (
                                <Stack.Screen
                                    name="WaiterStack"
                                    component={WaiterStack}
                                    options={{headerShown: false}}
                                />
                            )}

                        {userSignedIn &&
                            userRole.toLowerCase() !== 'mobileuser' &&
                            userRole.toLowerCase() !== 'guest' && (
                                <Stack.Screen
                                    name="OwnerLoggedInStack"
                                    component={OwnerLoggedInStack}
                                    options={{headerShown: false}}
                                />
                            )}

                        
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </PaperProvider>
    );
};

export default router;
