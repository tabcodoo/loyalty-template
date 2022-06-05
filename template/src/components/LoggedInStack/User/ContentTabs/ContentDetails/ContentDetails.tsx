import * as React from 'react';
import {useState} from 'react';

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
import {ActivityIndicator, useTheme} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import Header from 'components/common/HeaderForCoupon';
import {CommonActions} from '@react-navigation/native';
import Text from 'components/common/Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoyaltyIcons from 'components/common/icons/LoyaltyIcons';

import moment from 'moment';
import Button from 'components/common/Button';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Image as ProgressiveImage} from 'react-native-expo-image-cache/src/index';
import {FlatList} from 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-status-bar-height';

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
                disableIntervalMomentum={true}
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
                                // height: '38%',
                                // flex: 1,
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

const ContentDetails = (props: any) => {
    // let [carouselRef, setx] = useState(null);

    const {t, navigation, content} = props;
    const {colors} = useTheme();
    // console.tron.log('ContentDetails', content);

    let ContentTag = ({item}) => {
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

    let scrollY = new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
    );
    const scrollYAnimation = scrollY;

    // const headerTranslate = scrollYAnimation.interpolate({
    //     inputRange: [0, HEADER_SCROLL_DISTANCE],
    //     outputRange: [0, -HEADER_SCROLL_DISTANCE],
    //     extrapolate: 'clamp',
    // });

    const headerTitleOpacity = scrollYAnimation.interpolate({
        inputRange: [1, HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE * 2],
        outputRange: [0, 0, 1],
        // extrapolate: 'clamp',
    });

    const headerOpacity = scrollYAnimation.interpolate({
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
                showsVerticalScrollIndicator={false}
                // style={{}}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={coupons.length === 0 && loading}
                //         onRefresh={() => fetchCoupons(true)}
                //         progressViewOffset={statusBarHeight + 200}
                //     />
                // }
                // iOS offset for RefreshControl
                contentInset={{
                    top: -statusBarHeight,
                }}
                // contentOffset={{
                //     y: -statusBarHeight,
                // }}
            >
                <Slideshow
                    images={
                        content?.imageGallery && content?.imageGallery.length > 0
                            ? [content, ...content?.imageGallery].map((image) => image.imageUrl)
                            : [content?.imageUrl]
                    }
                />
                <View style={{padding: 24, paddingHorizontal: 16}}>
                    <Text style={{marginBottom: 16}} type={'header1'}>
                        {content?.name}
                    </Text>
                    {content?.description && (
                        <Text style={{paddingBottom: 4, marginBottom: 16}}>
                            {content?.description}
                        </Text>
                    )}

                    {content?.contentTags && content?.contentTags.length > 0 && (
                        <View>
                            <View
                                style={{
                                    height: 1,
                                    width: width - 16,
                                    left: -8,
                                    opacity: 0.12,
                                    backgroundColor: '#000',
                                    marginBottom: 24,
                                }}
                            />

                            {content?.contentTags &&
                                content?.contentTags.map((item) => <ContentTag {...{item}} />)}
                        </View>
                    )}
                </View>

                <View style={{marginBottom: 40}} />
            </Animated.ScrollView>
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
                        // paddingHorizontal: 16,
                        opacity: headerTitleOpacity,
                        // elevation: 14,
                        backgroundColor: '#fff',
                        borderBottomWidth: 1,
                        borderBottomColor: '#f0f0f0',
                    },
                ]}>
                <Animatable.View
                    style={{
                        // backgroundColor: '#faf',
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
                            {content?.name}
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
