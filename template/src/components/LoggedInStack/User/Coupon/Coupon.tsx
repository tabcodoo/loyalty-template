import React, {useMemo, useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import Text from 'components/common/Text';
// import Gradient from 'components/common/icons/Gradient';
import PriceContainer from 'components/common/icons/PriceContainer';

import FastImage from 'react-native-fast-image';
import {Image as ProgressiveImage} from 'react-native-expo-image-cache/src';

// import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import constants from '@constants';
import CustomImage from 'components/common/Image';

let imageWidth = (Dimensions.get('window').width - 48) / 2;
let imageHeight = imageWidth * (16 / 9);

const Coupon = (props: any) => {
    const {t, coupon, index, expired, timer} = props;
    let navigation = useNavigation();
    const {colors} = useTheme();
    let [imageLoading, setImageLoading] = useState(true);
    let hasDiscount = !!coupon?.discount;

    return (
        // <Shimmer animating={imageLoading} opacity={imageLoading ? 0.5 : 1}>
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('CouponDetails', {coupon, fromNotification: false})}
            style={[
                // styles.container,
                {
                    // width: imageWidth,
                    marginBottom: 16,
                    borderRadius: 8,
                    marginRight: 16,
                },
                index % 2 === 0 && {
                    marginRight: 16,
                },
                // imageLoading && {backgroundColor: '#f0f0f0'},
            ]}>
            <View>
                <View style={styles.container}>
                    <CustomImage style={styles.container} uri={coupon?.imageUrl} />
                </View>
                {/*<LinearGradient*/}
                {/*    start={{x: 1, y: 1}}*/}
                {/*    end={{x: 1.0, y: 0.0}}*/}
                {/*    colors={['transparent', 'rgba(0,0,0,0.7)']}*/}
                {/*    locations={[0, 1]}*/}
                {/*    style={{*/}
                {/*        height: '50%',*/}
                {/*        width: '100%',*/}
                {/*        borderRadius: 8,*/}
                {/*        position: 'absolute',*/}
                {/*    }}></LinearGradient>*/}
                <View
                    style={{
                        position: 'absolute',
                        bottom: 16,
                        left: -0.01,
                        backgroundColor:
                            timer || expired ? (expired ? colors.error : colors.success) : '#fff',
                        paddingHorizontal: 8,
                        paddingVertical: 6,
                        minWidth: '50%',
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                        // right: 0,
                    }}>
                    {/*<PriceContainer*/}
                    {/*    fill={timer || expired ? (expired ? 'red' : '#34bfa3') : '#fff'}*/}
                    {/*/>*/}
                    {timer || expired ? (
                        <View>
                            <Text
                                type={'small10SemiBold'}
                                style={{
                                    textDecorationStyle: 'solid',
                                    // position: 'absolute',
                                    // bottom: 24,
                                    // left: 8,
                                }}
                                color={'#fff'}>
                                {expired ? 'Kupon je' : 'Ističe za'}
                            </Text>
                            <Text
                                type={'small14SemiBold'}
                                style={
                                    {
                                        // position: 'absolute',
                                        // bottom: 8,
                                        // left: 8,
                                    }
                                }
                                color={'#fff'}>
                                {/*{expired ?"Kupon je istekao":"Ističe za" }*/}
                                {expired ? 'iskorišten' : timer}
                            </Text>
                        </View>
                    ) : hasDiscount ? (
                        <View>
                            <Text
                                type={'small10SemiBold'}
                                style={{
                                    // textDecorationLine: 'line-through',
                                    textDecorationStyle: 'solid',
                                    // position: 'absolute',
                                    // bottom: 24,
                                    // left: 8,
                                }}
                                color={colors.red}>
                                {t('couponDetails.couponDiscount').toUpperCase()}
                            </Text>
                            {/* 
                                2 percent 
                                1 fixni 
                                dicountTypeId 
                                */}
                            {coupon?.discountTypeId === 1 ? (
                                <Text type={'small14SemiBold'}>
                                    {coupon?.discount}
                                    {coupon?.currency || ' ' + constants.currency}
                                </Text>
                            ) : (
                                <Text type={'small14SemiBold'}>-{coupon?.discount}%</Text>
                            )}
                            {/* <Text
                                type={'small14SemiBold'}
                                style={
                                    {
                                        // position: 'absolute',
                                        // bottom: 8,
                                        // left: 8,
                                    }
                                }>
                                -{coupon?.discount}%
                            </Text> */}
                        </View>
                    ) : (
                        <View>
                            <Text
                                type={'small10SemiBold'}
                                style={{
                                    textDecorationLine: 'line-through',
                                    textDecorationStyle: 'solid',
                                    // position: 'absolute',
                                    // bottom: 24,
                                    // left: 8,
                                }}
                                color={colors.red}>
                                {parseFloat(coupon?.oldPrice).toFixed(2)} {constants.currency}
                            </Text>
                            <Text
                                type={'small14SemiBold'}
                                style={
                                    {
                                        // position: 'absolute',
                                        // bottom: 8,
                                        // left: 8,
                                    }
                                }>
                                {parseFloat(coupon?.newPrice).toFixed(2)} {constants.currency}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
            {expired && (
                <View
                    style={{
                        opacity: 0.6,
                        ...styles.container,
                        backgroundColor: '#fff',
                        position: 'absolute',
                    }}
                />
            )}
            {/*{imageLoading && (*/}
            {/*    <View*/}
            {/*        style={{*/}
            {/*            position: 'absolute',*/}
            {/*            left: 0,*/}
            {/*            right: 0,*/}
            {/*            top: 0,*/}
            {/*            bottom: 0,*/}
            {/*            alignItems: 'center',*/}
            {/*            justifyContent: 'center',*/}
            {/*        }}>*/}
            {/*        <ActivityIndicator />*/}
            {/*    </View>*/}
            {/*)}*/}

            {/* <Gradient
                style={{
                    position: 'absolute',
                    top: -2,
                    // left: 0,
                    // right: 0,
                }}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
            /> */}

            {/*<Text*/}
            {/*    type={'small14SemiBold'}*/}
            {/*    color={'#fff'}*/}
            {/*    style={{marginHorizontal: 16, marginTop: 8}}>*/}
            {/*    {coupon?.name}*/}
            {/*</Text>*/}
            <View
                style={{
                    width: imageWidth,
                    borderRadius: 8,
                    paddingTop: 8,
                    backgroundColor: '#fff',
                    // backgroundColor: '#faf',
                }}>
                {/*{!imageLoading && (*/}
                <Text
                    type={'bold'}
                    // type={'small14SemiBold'}
                    // color={'#fff'}
                >
                    {coupon?.name}
                </Text>
                {/*)}*/}
            </View>
        </TouchableOpacity>
        // </Shimmer>
    );
};

export default Coupon;

const styles = StyleSheet.create({
    container: {
        width: imageWidth,
        height: imageWidth,
        backgroundColor: '#fff',
        // marginBottom: 16,
        borderRadius: 8,
        // borderWidth: 0.5,
        // borderColor: '#ccc',
    },
    gradient: {
        // flex: 1,
        width: '100%',
        height: '50%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    priceContainer: {
        // width: '60%',
        marginRight: 48,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        padding: 8,
        paddingVertical: 6,
        backgroundColor: '#fff',
    },
});
