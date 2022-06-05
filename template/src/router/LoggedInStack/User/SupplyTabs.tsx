import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    InteractionManager,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector, useDispatch} from 'react-redux';
import Animated from 'react-native-reanimated';
import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';
import EmptyContent from 'components/common/EmptyContent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LocalizationContext from 'translation/context';
import Supply from 'containers/LoggedInStack/User/SupplyTabs/Supply';
import {useTheme, Badge} from 'react-native-paper';
import MyTabBar from './MyTabBar';
import ShoppingBag from 'components/common/icons/ShoppingBag';
import RoomHeader from 'components/common/RoomHeader';
import RoomFooter from 'components/common/RoomFooter';
import constants from '@constants';

const Tab = createMaterialTopTabNavigator();

let SupplyTabs = (props) => {
    let {navigation, route} = props;
    const {item} = route.params ?? {};
    const {mapToName} = item ?? {};
    let {colors, customFonts} = useTheme();
    let {t} = useContext(LocalizationContext);
    let user = useSelector((state) => state.user);
    const {hasRoomServiceEnabled, userRole} = user ?? {};
    const isWaiter = userRole.toLowerCase() === 'waiter';
    const isSalesman = userRole.toLowerCase() === 'salesman';
    let currentOrder = useSelector((state) => state.orders.currentOrder);

    const [isLoading, setIsLoading] = useState(true);

    let uniqueItemCount = useSelector((state) => state.cart.uniqueItemCount);

    let displayCustomLinks = useSelector((state) => state.user.displayCustomLinks);
    // let supplyActivated = useSelector((state) => state.settings.supply);
    const allCategories = useSelector((state) => state.supplyTabs.tabs);

    let supplyTabs = useSelector((state) => {
        if (mapToName) {
            return state.supplyTabs.tabs.filter((item) => item?.mapToName === mapToName);
        } else {
            return state.supplyTabs.tabs;
        }
    });

    const getCategoryIndex = (category) => {
        let categoryIndex = 0;
        allCategories.forEach((item, index) => {
            if (item?.id === category?.id) {
                categoryIndex = index;
                return;
            }
        });
        return categoryIndex;
    };

    // let supplyCategories = useSelector((state) => state.supply);
    let supplyActivated = useSelector((state) => state.supplyTabs.isEnabled);
    // let contentActivated = useSelector((state) => state.settings.content);
    let contentActivated = useSelector((state) => state.contentTabs.isEnabled);

    // let bottomMenuActivated = (contentActivated || supplyActivated) && displayCustomLinks;
    let arr = [contentActivated, supplyActivated, displayCustomLinks];
    let bottomMenuActivated = arr.filter((feature) => feature).length > 1;

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <View style={{flex: 1}}>
            <Header
                menu={
                    isWaiter || isSalesman || constants.applicationId === '8265e2ee-d9a3-48d8-a209-99779c8509b3' //bracomID
                        ? false
                        : true
                }
                title={
                    hasRoomServiceEnabled || isWaiter || isSalesman
                        ? isWaiter || isSalesman
                            ? t('room.order')
                            : t('room.title')
                        : t('supply.title')
                }
                goBack={
                    isWaiter || isSalesman || constants.applicationId === '8265e2ee-d9a3-48d8-a209-99779c8509b3' //BRACOM
                        ? true
                        : false
                }
                renderRightItem={
                    user?.cartEnabled || isWaiter || isSalesman
                        ? () => (
                              <TouchableOpacity
                                  style={{flexDirection: 'row', alignItems: 'center'}}
                                  onPress={() =>
                                      navigation.navigate(
                                          hasRoomServiceEnabled || isWaiter || isSalesman
                                              ? 'RoomCheckout'
                                              : 'Cart',
                                      )
                                  }>
                                  {currentOrder ? (
                                      <Text
                                          type={'smallMedium'}
                                          color={'#000'}
                                          style={{marginRight: 4}}>
                                          {t('coupons.myOrder')}
                                      </Text>
                                  ) : (
                                      <Text
                                          type={'smallMedium'}
                                          color={'#000'}
                                          style={{marginRight: 4}}>
                                          {hasRoomServiceEnabled || isWaiter || isSalesman
                                              ? t('room.order')
                                              : t('coupons.myCart')}
                                      </Text>
                                  )}

                                  <View>
                                      <ShoppingBag />
                                      {(uniqueItemCount !== 0 || currentOrder) && (
                                          <Badge
                                              size={12}
                                              color={'#000'}
                                              style={{
                                                  backgroundColor: '#000',
                                                  position: 'absolute',
                                              }}>
                                              <Text type={'small8'} color={'#fff'}>
                                                  {currentOrder
                                                      ? currentOrder.shoppingCartItems.length
                                                      : uniqueItemCount}
                                              </Text>
                                          </Badge>
                                      )}
                                  </View>
                              </TouchableOpacity>
                          )
                        : () => null
                }
            />

            {(hasRoomServiceEnabled || isWaiter || isSalesman) && <RoomHeader />}

            <TouchableOpacity
                onPress={() => navigation.navigate('SupplySearch')}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#f1f1f1',
                    height: 35,
                    marginHorizontal: 16,
                    borderRadius: 2,
                    paddingHorizontal: 10,
                }}>
                <AntDesign name="search1" size={15} color="gray" />
                <Text
                    color="gray"
                    style={{
                        marginLeft: 10,
                        fontSize: 12,
                    }}>
                    {t('supplySearch.searchPlaceholder')}
                </Text>
            </TouchableOpacity>

            {isLoading ? (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View
                        style={{
                            padding: 10,
                            backgroundColor: 'white',
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 5,
                        }}>
                        <ActivityIndicator size={'small'} color={'black'} />
                    </View>
                </View>
            ) : supplyTabs?.length === 0 ? (
                <EmptyContent text={t('supply.noItems')} />
            ) : (
                <Tab.Navigator
                    // lazy={!bottomMenuActivated}
                    lazy={true}
                    // tabBar={(props) => <MyTabBar {...props} />}
                    swipeEnabled={true}
                    tabBarOptions={{
                        scrollEnabled: true,
                        activeTintColor: colors.text,
                        inactiveTintColor: colors.text,
                        style: {
                            // borderBottomWidth: 0.5,
                            // borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            borderBottomColor: '#eeeeee',
                            shadowOpacity: 0,
                            shadowOffset: {
                                height: 0,
                            },
                            shadowRadius: 0,
                            elevation: 0,
                        },
                        labelStyle: {
                            textTransform: 'none',
                            ...customFonts.small14BoldText,
                            fontSize: 14,
                        },
                        tabStyle: {
                            // backgroundColor: '#faf',
                            // borderBottomWidth: 1,
                            // height: 30,
                            width: 'auto',
                        },
                        indicatorStyle: {
                            backgroundColor: colors.text,
                            height: 3,
                            // marginHorizontal: 16,
                        },
                    }}>
                    {supplyTabs.map((category, categoryIndex) => (
                        <Tab.Screen
                            name={'Supply-' + getCategoryIndex(category)}
                            component={Supply}
                            options={{title: category.name}}
                        />
                    ))}
                </Tab.Navigator>
            )}
            {(hasRoomServiceEnabled || isWaiter || isSalesman) && <RoomFooter />}
        </View>
    );
};

export default SupplyTabs;
