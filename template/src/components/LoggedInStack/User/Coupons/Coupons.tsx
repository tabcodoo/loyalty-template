import React, {useState, useCallback} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Animated,
    RefreshControl,
    Platform,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Linking,
    Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useSelector, useDispatch} from 'react-redux';

import Text from 'components/common/Text';
import CustomImage from 'components/common/Image';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {ActivityIndicator, Badge, useTheme, Divider} from 'react-native-paper';
import Menu from 'components/common/icons/Menu';
import Coupon from 'containers/LoggedInStack/User/Coupon';
import {FlatList} from 'react-native-gesture-handler';
import FocusAwareStatusBar from 'components/common/FocusAwareStatusBar';
import EmptyCoupons from 'components/common/icons/EmptyCoupons';

let statusBarHeight = getStatusBarHeight();

const HEADER_MAX_HEIGHT = statusBarHeight + 200;
const HEADER_MIN_HEIGHT = statusBarHeight + 56;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
let ITEM_HEIGHT = (Dimensions.get('window').width - 64) / 2;

import {Image as ProgressiveImage} from 'react-native-expo-image-cache/src';
import {CommonActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import ProfileQRcode from 'components/LoggedInStack/User/ProfileQRcode';
import ShoppingBag from 'components/common/icons/ShoppingBag';
import constants from '@constants';

let FeaturedCategories = (props) => {
    const {colors, roundness} = useTheme();
    let {type = 'Supply', categories = [], title = '', loading = true, t} = props;

    const navigation = useNavigation();
    let filteredCategories = categories
        .map((c, index) => (c.isFeaturedCategory ? {...c, index} : null))
        .filter((item) => item !== null);

    return (
        <View
            style={{
                // marginTop: 24,
                marginBottom: 8,
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                    marginHorizontal: 16,
                }}>
                <Text type={'header3'}>{title}</Text>
                <TouchableOpacity
                    onPress={() => {
                        constants?.applicationId === '8265e2ee-d9a3-48d8-a209-99779c8509b3'
                            ? navigation.navigate('CategorySelection')
                            : navigation.navigate(type);
                    }}>
                    <Text type={'smallMedium'} color={colors.primary}>
                        {t('coupons.lookAll')}
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                    // refreshing={true}
                    // onRefresh={() => fetchCoupons(true)}
                    // progressViewOffset={statusBarHeight + 200 + 250}
                    />
                }>
                {filteredCategories.map((category, index) => (
                    <TouchableOpacity
                        key={index.toString() + type + '-' + index}
                        onPress={() => {
                            // console.tron.log(type + '-' + index);
                            // navigation.navigate(type + '-' + index);
                            if (!loading)
                                navigation.navigate(type, {
                                    screen: type + '-' + category?.index,
                                    item: category,
                                });
                        }}
                        activeOpacity={0.7}
                        style={{
                            marginLeft: 16,
                            marginRight: index === filteredCategories.length - 1 ? 16 : 0,
                            maxWidth: 80,
                        }}>
                        <CustomImage
                            style={{width: 80, height: 80, borderRadius: 6}}
                            uri={category?.imageUrl}
                        />
                        <Text type={'smallMedium'} style={{marginTop: 8}}>
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const Coupons = (props: any) => {
    const {
        t,
        pointDisplayStyle,
        user,
        navigation,
        currentOrder,
        coupons,
        cart,
        fetchCoupons,
        mobileAppSettings,
        displayFeaturedContentCategory,
        displayFeaturedSupplyCategory,
        contentCategories,
        supplyCategories,
        fetchModules,
        loading,
        openCategories,
        finished,
        redirectToLogin,
        bottomMenuActivated,
    } = props;
    const {colors, roundness} = useTheme();

    let uniqueItemCount = useSelector((state) => state.cart.uniqueItemCount);
    const {hasRoomServiceEnabled} = user ?? {};

    const renderItem = useCallback(({item, index}) => <Coupon {...{item, index}} />, []);

    const ListEmptyComponent = useCallback(
        () =>
            !loading && finished && !coupons.length ? (
                <View
                    style={{
                        height: bottomMenuActivated
                            ? !showFeaturedSupplyCategory
                                ? Dimensions.get('screen').height * 0.7
                                : Dimensions.get('screen').height * 0.3
                            : Dimensions.get('screen').height * 0.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    {/* <EmptyCoupons width={100} height={100} fill={colors.primary} /> */}
                    <Text color="#484848" type="bold">
                        {t('coupons.noCoupons')}
                    </Text>
                    <Text color="rgba(72, 72, 72, 0.8)">{t('coupons.emptyCouponsDetails')}</Text>
                </View>
            ) : null,
        [loading, finished, coupons.length, bottomMenuActivated],
    );

    const [scrollY, setScrollY] = useState(
        new Animated.Value(
            // iOS has negative initial scroll value because content inset...
            Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
        ),
    );
    // let scrollY = new Animated.Value(
    //     // iOS has negative initial scroll value because content inset...
    //     Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
    // );
    // const scrollYAnimation = scrollY;

    const headerTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp',
    });

    const headerTitleOpacity = scrollY.interpolate({
        inputRange: [1, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0, 1],
        // extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0.99, 0, 0],
        // extrapolate: 'clamp',
    });

    let showFeaturedContentCategory =
        displayFeaturedContentCategory &&
        contentCategories &&
        contentCategories.filter((category) => category.isFeaturedCategory).length > 0;

    let showFeaturedSupplyCategory =
        displayFeaturedSupplyCategory &&
        supplyCategories &&
        supplyCategories.filter((category) => category.isFeaturedCategory).length > 0;

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            <Animated.ScrollView
                scrollEventThrottle={Platform.OS === 'ios' ? 1 : 100}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
                    useNativeDriver: true,
                })}
                showsVerticalScrollIndicator={false}
                style={{}}
                refreshControl={
                    <RefreshControl
                        refreshing={coupons.length === 0 && loading}
                        onRefresh={() => {
                            // console.tron.log('Refreshing');
                            fetchModules();
                            fetchCoupons(true);
                        }}
                        progressViewOffset={
                            statusBarHeight + 200
                            // +
                            // (showFeaturedContentCategory ? 200 : 0) +
                            // (showFeaturedSupplyCategory ? 200 : 0)
                        }
                    />
                }
                // iOS offset for RefreshControl
                contentInset={{
                    top: HEADER_MAX_HEIGHT,
                }}
                contentOffset={{
                    y: -HEADER_MAX_HEIGHT,
                }}>
                <View
                    style={[
                        styles.scrollViewContent,
                        (showFeaturedContentCategory || showFeaturedSupplyCategory) && {
                            marginTop: 24,
                        },
                    ]}>
                    {showFeaturedContentCategory && (
                        <FeaturedCategories
                            type={'Content'}
                            categories={contentCategories}
                            title={t('coupons.featuredContent')}
                            loading={coupons.length === 0 && loading}
                            t={t}
                        />
                    )}
                    {showFeaturedSupplyCategory && (
                        <FeaturedCategories
                            categories={supplyCategories}
                            title={t('coupons.featuredSupply')}
                            loading={coupons.length === 0 && loading}
                            t={t}
                        />
                    )}
                    {/* {coupons.length > 0 && ( */}
                    <View
                        style={{
                            flexDirection: 'row',
                            // alignItems: 'center',
                            justifyContent: 'space-between',
                            // backgroundColor: '#faf',
                            paddingHorizontal: 16,
                            paddingVertical: 16,
                        }}>
                        <Text
                            type={'header3'}
                            // style={{marginHorizontal: 16}}
                        >
                            {t('coupons.currentCouponsTitle')}
                        </Text>
                        {user.groupCouponsByCategory && (
                            <View>
                                <TouchableOpacity
                                    onPress={openCategories}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        // marginRight: 16,
                                        marginVertical: 1,
                                    }}>
                                    <Text type={'medium'}>{t('coupons.categories')}</Text>
                                    <AntDesign
                                        name="down"
                                        size={14}
                                        color="#000"
                                        style={{marginLeft: 16}}
                                    />
                                </TouchableOpacity>
                                <Divider />
                            </View>
                        )}
                    </View>
                    {/* )} */}
                    <FlatList
                        scrollEnabled={false}
                        data={coupons}
                        renderItem={renderItem}
                        numColumns={2}
                        contentContainerStyle={{paddingHorizontal: 16}}
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={false}
                        //         // onRefresh={() => fetchCoupons(true)}
                        //     />
                        // }
                        keyExtractor={(item, index) => index.toString()}
                        getItemLayout={(data, index) => ({
                            length: ITEM_HEIGHT,
                            offset: ITEM_HEIGHT * index,
                            index,
                        })}
                        initialNumToRender={50}
                        windowSize={24}
                        removeClippedSubviews={false}
                        // onEndReached={({distanceFromEnd}) => {
                        //     console.log('onEndReached');

                        //     fetchCoupons();
                        // }}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={() =>
                            coupons.length > 0 && loading ? (
                                <ActivityIndicator size={'small'} />
                            ) : null
                        }
                        ListFooterComponentStyle={{
                            height: 16,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        ListEmptyComponent={ListEmptyComponent}
                    />
                </View>
            </Animated.ScrollView>

            {/*------------------------------------------------------------------*/}
            {/*<Animatable.View></Animatable.View>*/}
            <Animatable.View
                // pointerEvents="none"
                style={[
                    styles.header,
                    {
                        backgroundColor: colors.header,
                        transform: [{translateY: headerTranslate}],
                        shadowColor: 'rgba(0,0,0,1)',
                        shadowOffset: {
                            width: 0,
                            height: 24,
                        },
                        shadowOpacity: 1,
                        elevation: 13,
                    },
                ]}>
                <View style={{flex: 1, justifyContent: 'center', paddingLeft: 24}} />

                {constants.applicationId === 'b2eed16a-2188-4840-aedb-dfc7e1413b7a' ? ( //FEDI ID
                    <Image
                        style={{
                            ...styles.header,
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                        }}
                        source={require('../../../../assets/images/fediHeader.jpg')}
                        resizeMode="cover"
                    />
                ) : null}

                <Animatable.View
                    style={[
                        {
                            flexDirection: 'row',
                            alignItems: 'center',

                            flex: 2,
                            paddingLeft: 16,
                            // backgroundColor: '#faf',
                        },
                        {
                            opacity: headerOpacity,
                        },
                    ]}
                    transtion={'opacity'}>
                    <View style={{flex: 1}}>
                        {user.userRole.toLowerCase() === 'guest' ? (
                            <>
                                <Text color={'#fff'} type={'header1'}>
                                    {t('coupons.headerP1')}
                                    {/* Dobrodošli, */}
                                </Text>

                                <Text color={'#fff'} type={'header3'}>
                                    {t('coupons.headerP2Guest')}
                                    {/* {`Koristite aplikaciju kao gost.`} */}
                                </Text>
                                <TouchableOpacity
                                    onPress={redirectToLogin}
                                    style={{
                                        flexDirection: 'row',
                                        textWrap: 'wrap',
                                        flexWrap: 'wrap',
                                    }}>
                                    <Text
                                        color={
                                            colors.primary === colors.header
                                                ? '#fff'
                                                : colors.primary
                                        }
                                        type={'header3'}
                                        style={{textDecorationLine: 'underline'}}>
                                        {t('coupons.headerP3Guest')}
                                        {/* {`Prijavite se`} */}
                                    </Text>
                                    <Text color={'#fff'} type={'header3'}>
                                        {t('coupons.headerP4Guest')}
                                        {/* {' i koristite sve mogućnosti.'} */}
                                    </Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            // constants.appName.toLowerCase().includes('bracom') ? (
                            //     <>
                            //         <Text color={'#fff'} type={'header1'}>
                            //             {t('coupons.headerP1')}
                            //             {/* Dobrodošli, */}
                            //         </Text>

                            //         <Text color={'#fff'} type={'header3'}>
                            //             {t('coupons.headerP2Bracom')}
                            //         </Text>
                            //         <TouchableOpacity
                            //             onPress={() => {
                            //                 Linking.openURL(
                            //                     'https://bracom.ba/beta-verzije-bracom-loyalty/',
                            //                 );
                            //             }}>
                            //             <Text
                            //                 color={colors.primary}
                            //                 type={'header3'}
                            //                 style={{textDecorationLine: 'underline'}}>
                            //                 {t('coupons.headerP3Bracom')}
                            //                 {/* Pročitaj više. */}
                            //             </Text>
                            //         </TouchableOpacity>
                            //     </>
                            // ) :
                            <>
                                <Text color={'#fff'} type={'header1'}>
                                    {t('coupons.headerP1')}
                                    {/* Dobrodošli, */}
                                </Text>
                                <Text color={'#fff'} type={'header3'}>
                                    {mobileAppSettings?.headerText}
                                </Text>
                            </>
                        )}
                    </View>

                    {user?.pointsEnabled && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                navigation.navigate('OrderHistory');
                            }}
                            style={{
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                backgroundColor: '#fff',
                                alignItems: 'flex-end',
                                borderTopLeftRadius: 6,
                                borderBottomLeftRadius: 6,
                            }}>
                            <Text type={'small10SemiBold'}>
                                {pointDisplayStyle &&
                                    t(`coupons.${pointDisplayStyle.toLowerCase()}`)}
                                :
                            </Text>

                            <Text color={colors.primary} type={'small14SemiBold'}>
                                {cart?.pointBalance ? cart.pointBalance.toFixed(2) : '0.00'}{' '}
                                {pointDisplayStyle && pointDisplayStyle.toLowerCase() === 'money'
                                    ? cart.currency
                                    : ''}
                            </Text>
                        </TouchableOpacity>
                    )}
                </Animatable.View>
            </Animatable.View>
            <Animatable.View
                style={[
                    styles.bar,
                    {
                        marginTop: statusBarHeight + 12,
                        elevation: 14,
                    },
                ]}>
                <View
                    style={{
                        // flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // alignItems: 'center',
                        // backgroundColor: '#faf',
                    }}>
                    <View
                        style={{
                            // paddingHorizontal: 16,
                            paddingLeft: 16,
                            height: 56,
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            // backgroundColor: '#faf',
                            // width: '100%',
                        }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                // backgroundColor: '#faf',
                            }}
                            onPress={() => {
                                navigation.openDrawer();
                            }}>
                            <Menu />
                            <Animatable.View style={{marginLeft: 16, opacity: headerTitleOpacity}}>
                                <Text color={'#fff'} type={'header2'} style={{marginBottom: 2}}>
                                    {t('coupons.tabBarLabel')}
                                </Text>
                            </Animatable.View>
                        </TouchableOpacity>
                        <View>
                            {(user?.cartEnabled && uniqueItemCount !== 0) || currentOrder ? (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Cart')}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingRight: 16,
                                    }}>
                                    <Text type={'small'} color={'#fff'} style={{marginRight: 4}}>
                                        {currentOrder
                                            ? t('coupons.myOrder')
                                            : hasRoomServiceEnabled
                                            ? t('room.order')
                                            : t('coupons.myCart')}
                                    </Text>
                                    <View>
                                        <ShoppingBag fill={'#fff'} />
                                        <Badge
                                            size={12}
                                            // color={'#fff'}
                                            style={{
                                                backgroundColor: '#fff',
                                                position: 'absolute',
                                                // top: 0,
                                                // right: 0,
                                            }}>
                                            <Text type={'small8'} color={'#000'}>
                                                {currentOrder
                                                    ? currentOrder.shoppingCartItems.length
                                                    : uniqueItemCount}
                                            </Text>
                                        </Badge>
                                    </View>
                                </TouchableOpacity>
                            ) : user?.personalQrEnabled ? (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProfileQRcode')}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingRight: 16,
                                    }}>
                                    <Text type={'small'} color={'#fff'}>
                                        {t('coupons.myQrcode')}
                                    </Text>
                                    <FontAwesome
                                        color={'#fff'}
                                        name={'qrcode'}
                                        size={20}
                                        style={{marginLeft: 8}}
                                    />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    </View>
                </View>
            </Animatable.View>
        </View>
    );
};

export default Coupons;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        // backgroundColor: 'green',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    bar: {
        backgroundColor: 'transparent',
        // backgroundColor: '#faf',
        height: 32,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    title: {
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
        // paddingHorizontal: 16,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
