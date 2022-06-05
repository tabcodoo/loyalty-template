import * as React from 'react';
import {useState, useRef} from 'react';

import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Platform,
    RefreshControl,
    Animated,
} from 'react-native';
import {ActivityIndicator, useTheme, Divider} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import Header from 'components/common/HeaderForCoupon';
import {CommonActions} from '@react-navigation/native';
import Text from 'components/common/Text';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoyaltyIcons from 'components/common/icons/LoyaltyIcons';

import moment from 'moment';
import Button from 'components/common/Button';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Image as ProgressiveImage} from 'react-native-expo-image-cache/src/index';
import {FlatList} from 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import constants from '@constants';

// import Animated from 'react-native-reanimated';
import Menu from 'components/common/icons/Menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import CustomImage from 'components/common/Image';

let {width, height} = Dimensions.get('window');
let height16_9 = width / (16 / 10);
let imageHeight = height * 0.38;

let Slideshow = (props) => {
    let [activeIndex, setActiveIndex] = useState(0);
    let [carouselRef, setCarouselRef] = useState(null);
    let data = props?.images;
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                // height: height16_9,
                // width,
                width: '100%',
                height: imageHeight,
            }}>
            <Carousel
                ref={(c) => {
                    setCarouselRef(c);
                }}
                // enableSnap={true}
                disableIntervalMomentum={true}
                // shouldOptimizeUpdates
                // removeClippedSubviews={true}
                // activeAnimationType={'decay'}
                // layout={'default'}
                // swipeThreshold={0}
                // activeAnimationOptions={
                //
                // }

                slideInterpolatedStyle={(index, animatedValue, carouselProps) => {
                    return {};
                }}
                data={data}
                renderItem={({item, index}) => {
                    return (
                        <CustomImage
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            uri={item}
                        />
                    );
                    // <ProgressiveImage
                    //     tint={'light'}
                    //     style={{
                    //         // height: height16_9,
                    //         // width,
                    //         width: '100%',
                    //         height: '38%',
                    //         flex: 1,
                    //     }}
                    //     transitionDuration={200}
                    //     // source={{uri: coupon?.imageUrl}}
                    //     {...{
                    //         // preview: {uri: `${item}`},
                    //         uri: `${item}`,
                    //     }}
                    //     // resizeMode={FastImage.resizeMode.cover}
                    //     // onLoadStart={() => setImageLoading(true)}
                    //     // onLoadEnd={() => setImageLoading(false)}
                    // />
                    // <FastImage
                    //     source={{
                    //         uri: `${item}`,
                    //         priority:
                    //             index < 2 ? FastImage.priority.high : FastImage.priority.low,
                    //     }}
                    //     style={{
                    //         // height: height16_9,
                    //         // width,
                    //         width: '100%',
                    //         height: '38%',
                    //         flex: 1,
                    //     }}
                    //     resizeMode={'cover'}
                    // />
                }}
                sliderWidth={width}
                itemWidth={width}
                onSnapToItem={(index) => setActiveIndex(index)}
            />

            <Pagination
                dotsLength={data.length}
                activeDotIndex={activeIndex}
                style={{height: 24}}
                containerStyle={{
                    paddingVertical: 12,
                    position: 'absolute',
                    bottom: 0,
                }}
                dotContainerStyle={{
                    marginHorizontal: 3,
                    // paddingHorizontal: 0,
                    // backgroundColor: 'rgba(255, 255, 255, 0.92)',
                }}
                dotStyle={{
                    width: 9,
                    height: 9,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    paddingHorizontal: 0,
                    // backgroundColor: 'rgba(255, 255, 255, 0.92)',
                }}
                dotColor={'#fff'}
                inactiveDotColor={'#fff'}
                activeDotColor={'#fff'}
                // inactiveDotStyle={
                //     {
                //         // Define styles for inactive dots here
                //     }
                // }
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    );
};

let statusBarHeight = getStatusBarHeight();

const HEADER_MAX_HEIGHT = statusBarHeight + 200;
const HEADER_MIN_HEIGHT = statusBarHeight + 56;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const PRICE_DISCOUNT_ITEM_HEIGHT = 40;

const PriceDiscountConponent = ({item}) => (
    <View
        style={{
            height: PRICE_DISCOUNT_ITEM_HEIGHT,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
            justifyContent: 'space-between',
        }}>
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
            <View
                style={{
                    height: 30,
                    width: 30,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 20,
                    backgroundColor:
                        item?.badgeIcon === 'bronze'
                            ? '#8f5f1b'
                            : item?.badgeIcon === 'silver'
                            ? '#959696'
                            : item?.badgeIcon === 'gold'
                            ? '#e4bb18'
                            : '#ebeae8',
                }}>
                <View
                    style={{
                        height: 20,
                        width: 20,
                        borderRadius: 15,
                        backgroundColor:
                            item?.badgeIcon === 'bronze'
                                ? '#b08d57'
                                : item?.badgeIcon === 'silver'
                                ? '#bec0c2'
                                : item?.badgeIcon === 'gold'
                                ? '#f2da30'
                                : '#faf9f6',
                    }}
                />
            </View>
            <Text style={{fontSize: 16}} type="bold">
                {item?.name}{' '}
            </Text>
        </View>
        <View
            style={{
                backgroundColor: '#eeeeee',
                borderRadius: 13,
                paddingVertical: 5,
                paddingHorizontal: 10,
            }}>
            <Text type={'small14SemiBold'}>{`${item?.price.toFixed(2)} ${
                constants.currency
            }`}</Text>
        </View>
    </View>
);

const ContentDetails = (props: any) => {
    const {
        t,
        navigation,
        supply,
        handleItemInCart,
        itemFromCart,
        order,
        user,
        cart,
        pointDisplayStyle,
        myBadge,
        isArticleAvailable,
        hasRoomServiceEnabled,
    } = props;
    const {colors} = useTheme();

    const [isPriceDetailsVisible, setIsPriceDetailsVisible] = useState(false);

    const PointsDetailsCompoenent = () => (
        <View
            style={{
                position: 'absolute',
                width: width * 0.925,
                top: 35,
                right: 0,
                shadowOpacity: 0.3,
                shadowOffset: {
                    height: 2,
                },
                shadowRadius: 5,
            }}>
            <View
                style={{
                    position: 'absolute',
                    height: 15,
                    width: 15,
                    transform: [{rotate: '45deg'}],
                    backgroundColor: 'white',
                    elevation: 5,
                    zIndex: 10,
                    top: -8,
                    right: 20,
                }}
            />
            <View
                style={{
                    padding: 20,
                    backgroundColor: 'white',
                    borderRadius: 3,
                    elevation: 5,
                }}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#dce1e8',
                        // padding: 15,
                        borderRadius: 3,
                        height: 40,
                        marginBottom: 10,
                        zIndex: 10,
                    }}>
                    <Text style={{fontSize: 13}}>
                        {`Vi ste ${myBadge?.name} level (popust ${myBadge?.discountValue}%)`}
                    </Text>
                </View>
                {supply?.priceDiscounts
                    ? supply?.priceDiscounts.map((item, index) => (
                          <>
                              <PriceDiscountConponent item={item} />
                              {index < supply?.priceDiscounts.length - 1 ? <Divider /> : null}
                          </>
                      ))
                    : null}
            </View>
        </View>
    );

    let SupplyTag = ({item}) => {
        return (
            <View
                style={{
                    // backgroundColor: '#faf',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 16,
                }}>
                <View
                    style={{
                        width: 20,
                        alignItems: 'center',
                    }}>
                    <LoyaltyIcons name={item.icon} size={16} />
                </View>
                {/*<Text>{item.icon}</Text>*/}
                <Text type={'small14'} style={{marginLeft: 16, lineHeight: 17}}>
                    {item.description}
                </Text>
            </View>
        );
    };

    let scrollY = useRef(
        new Animated.Value(
            // iOS has negative initial scroll value because content inset...
            Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
        ),
    ).current;

    const headerTitleOpacity = scrollY.interpolate({
        inputRange: [1, HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE * 2],
        outputRange: [0, 1, 1],
        // extrapolate: 'clamp',
    });

    const getViewHeight = () => {
        if (user.userRole.toLowerCase() === 'guest') return 'auto';

        if (!supply?.imageUrl) return height * 0.81;
        else return height * 0.81;
    };

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0.99, 0, 0],
        // extrapolate: 'clamp',
    });
    return (
        <View style={{flex: 1}}>
            <Animated.ScrollView
                scrollEventThrottle={Platform.OS === 'ios' ? 1 : 100}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
                    useNativeDriver: true,
                })}
                showsVerticalScrollIndicator={false}>
                {supply?.imageUrl ? (
                    <Slideshow
                        images={
                            supply?.imageGallery && supply?.imageGallery.length > 0
                                ? [supply, ...supply?.imageGallery].map((image) => image.imageUrl)
                                : [supply?.imageUrl]
                        }
                    />
                ) : (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            height: height16_9,
                            width,
                            backgroundColor: '#f1f1f1',
                        }}
                    />
                )}

                <View
                    style={{
                        padding: 24,
                        paddingHorizontal: 16,
                        height: getViewHeight(),
                    }}>
                    <Text
                        color={
                            user?.stockEnabled && !supply?.stock && !supply?.isVariation
                                ? '#ff6060'
                                : '#484848'
                        }
                        style={{marginBottom: 10}}
                        type={'header1'}>
                        {supply?.name}
                    </Text>
                    {user?.stockEnabled && !supply?.stock && !supply?.isVariation ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#f16565',
                                padding: 5,
                                marginBottom: 10,
                            }}>
                            <IonicIcon name={'close-circle-outline'} size={20} color="white" />
                            <Text
                                color="white"
                                style={{
                                    fontSize: 13,
                                    marginLeft: 5,
                                    paddingRight: 20,
                                }}>
                                {`${t('supplyDetails.noStock')} ${
                                    isArticleAvailable() ? t('supplyDetails.noStockBut') : ''
                                } `}
                            </Text>
                        </View>
                    ) : null}
                    {user?.cartEnabled ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: supply?.articleId ? 'space-between' : 'flex-end',
                                marginBottom: 16,
                            }}>
                            {supply?.articleId ? (
                                <Text type={'header4'}>{`SKU: ${supply?.articleId}`}</Text>
                            ) : null}
                            {supply?.points && user?.pointsEnabled ? (
                                <View>
                                    <TouchableOpacity
                                        onPress={() =>
                                            user?.userBadgesEnabled &&
                                            setIsPriceDetailsVisible(!isPriceDetailsVisible)
                                        }
                                        style={{
                                            backgroundColor: '#eeeeee',
                                            borderRadius: 13,
                                            padding: 5,
                                            paddingHorizontal: 10,
                                        }}>
                                        <Text type={'small14SemiBold'}>
                                            {`${supply?.points.toFixed(2)} ${t('supply.points')}`}
                                        </Text>
                                    </TouchableOpacity>
                                    {isPriceDetailsVisible ? <PointsDetailsCompoenent /> : null}
                                </View>
                            ) : null}
                        </View>
                    ) : null}
                    <Divider style={{elevation: -1, zIndex: -1}} />
                    <Divider style={{elevation: -1, zIndex: -1}} />
                    {user?.userBadgesEnabled ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 5,
                                elevation: -1,
                                zIndex: -1,
                            }}>
                            {!supply?.disableBadges && user?.userRole.toLowerCase() !== 'guest' ? (
                                <>
                                    <Text
                                        style={{
                                            textDecorationLine: supply?.discountedPrice
                                                ? 'line-through'
                                                : 'none',
                                            marginRight: 10,
                                        }}
                                        type={!supply?.discountedPrice ? 'header1' : 'header2'}
                                        color={!supply?.discountedPrice ? '#484848' : 'gray'}>
                                        {supply?.price.toFixed(2).replace('.', ',')}{' '}
                                        {constants.currency}
                                    </Text>
                                    {supply?.discountedPrice ? (
                                        <Text type={'header1'} color={'#484848'}>
                                            {supply?.discountedPrice.toFixed(2).replace('.', ',')}{' '}
                                            {constants.currency}
                                        </Text>
                                    ) : null}
                                </>
                            ) : (
                                <Text type={'header1'} color={'#484848'}>
                                    {supply?.price.toFixed(2).replace('.', ',')}{' '}
                                    {constants.currency}
                                </Text>
                            )}
                        </View>
                    ) : (
                        <Text type={'header1'} color={'#484848'}>
                            {supply?.price.toFixed(2).replace('.', ',')} {constants.currency}
                        </Text>
                    )}

                    {user?.stockEnabled && supply?.stock && user?.showStockOnApp ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 10,
                                zIndex: -1,
                            }}>
                            <IonicIcon
                                name={
                                    supply?.stock
                                        ? 'checkmark-circle-outline'
                                        : 'close-circle-outline'
                                }
                                size={20}
                                color="gray"
                            />
                            <Text
                                style={{
                                    marginLeft: 5,
                                    fontSize: 13,
                                }}>
                                {t('supplyDetails.stock')}
                                <Text
                                    type="bold"
                                    style={{
                                        fontSize: 13,
                                    }}>
                                    {` ${supply?.stock}`}
                                </Text>
                            </Text>
                        </View>
                    ) : null}

                    <Text
                        style={{
                            paddingBottom: 4,
                            marginTop: 16,
                            zIndex: -1,
                        }}>
                        {supply?.description}
                    </Text>
                </View>
            </Animated.ScrollView>
            {user?.cartEnabled && !order ? (
                <View style={{margin: 16, elevation: -1}}>
                    {supply?.isVariation ? (
                        <Button
                            mode="contained"
                            label={t('supplyDetails.showVariations')}
                            onPress={() => {
                                navigation.navigate('SupplyCheckout', {supply});
                            }}
                        />
                    ) : (
                        <Button
                            mode="contained"
                            disabled={itemFromCart || !isArticleAvailable()}
                            label={
                                hasRoomServiceEnabled ? t('room.add') : t('supplyDetails.addToCart')
                            }
                            onPress={handleItemInCart}
                        />
                    )}
                </View>
            ) : null}

            <Header
                onPress={() => navigation.goBack()}
                style={{position: 'absolute', paddingHorizontal: 16, top: -4}}
                color={'#fff'}
            />
            <Animatable.View
                style={[
                    styles.bar,
                    {
                        paddingTop: statusBarHeight,
                        opacity: headerTitleOpacity,
                        backgroundColor: '#fff',
                        borderBottomWidth: 1,
                        borderBottomColor: '#f0f0f0',
                    },
                ]}>
                <Animatable.View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 56,
                        opacity: headerTitleOpacity,
                        paddingHorizontal: 16,
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <Ionicons
                            name="chevron-back"
                            style={{left: -6, marginRight: 14}}
                            size={26}
                            color={'#000'}
                        />
                    </TouchableOpacity>

                    <View style={{flex: 1}}>
                        <Text
                            color={'#000'}
                            type={'header2'}
                            numberOfLines={1}
                            style={{lineHeight: 36}}>
                            {supply?.name}
                        </Text>
                    </View>
                </Animatable.View>
            </Animatable.View>
        </View>
    );
};

export default ContentDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bar: {
        backgroundColor: 'transparent',
        // backgroundColor: '#faf',
        // height: 32,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
});
