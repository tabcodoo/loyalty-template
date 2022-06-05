import React, {useMemo, useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import Text from 'components/common/Text';
import PriceContainer from 'components/common/icons/PriceContainer';
import LockLocked from 'components/common/icons/LockLocked';
import LockUnlocked from 'components/common/icons/LockUnlocked';
import Gift from 'components/common/icons/Gift';

import FastImage from 'react-native-fast-image';
import {Image as ProgressiveImage} from 'react-native-expo-image-cache/src';

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

    let isVaucher = coupon?.couponTypeId === 2;
    let isGift = coupon?.couponTypeId === 3;

    return (
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
                    {/* <ProgressiveImage
                        transitionDuration={200}
                        tint={'light'}
                        style={{
                            ...styles.container,
                            // opacity: expired || !coupon?.isUnlocked ? 0.25 : 1,
                            // borderBottomWidth: 1,
                            // borderBottomColor: colors.primary,
                            // opacity: 0.3,
                        }}
                        // source={{uri: coupon?.imageUrl}}
                        {...{
                            preview: {uri: coupon?.imageUrl},
                            uri: coupon?.imageUrl,
                        }}
                        // resizeMode={FastImage.resizeMode.cover}
                        // onLoadStart={() => setImageLoading(true)}
                        // onLoadEnd={() => setImageLoading(false)}
                    /> */}
                </View>

                {coupon?.unlocksAt ? (
                    <View
                        style={{
                            position: 'absolute',
                            top: 16,
                            left: -0.01,
                            // backgroundColor: timer || expired ? (expired ? 'red' : '#34bfa3') : '#fff',
                            backgroundColor: coupon?.isUnlocked
                                ? !!coupon?.reactivationDate
                                    ? colors.orange
                                    : colors.success
                                : colors.error,
                            paddingHorizontal: 8,
                            paddingVertical: 6,
                            minWidth: '30%',
                            borderTopRightRadius: 8,
                            borderBottomRightRadius: 8,
                            flexDirection: 'row',
                            alignItems: 'center',
                            // right: 0,
                        }}>
                        {coupon?.isUnlocked ? <LockUnlocked /> : <LockLocked />}
                        <Text type="small10" color="#fff">
                            {coupon?.unlocksAt}
                        </Text>
                    </View>
                ) : null}

                <View
                    style={{
                        position: 'absolute',
                        bottom: 16,
                        left: -0.01,
                        backgroundColor: isGift ? 'transparent' : '#fff',
                        // timer || expired ? (expired ? colors.error : colors.success) : '#fff',
                        paddingHorizontal: 8,
                        paddingVertical: 6,
                        paddingRight: 12,
                        minWidth: '25%',
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                        // right: 0,
                    }}>
                    {hasDiscount ? (
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
                    ) : isGift ? null : (
                        // <View>
                        //     {/* <Text
                        //         type={'small10SemiBold'}
                        //         style={{
                        //             textDecorationLine: isVaucher ? 'none' : 'line-through',
                        //             textDecorationStyle: 'solid',
                        //             // position: 'absolute',
                        //             // bottom: 24,
                        //             // left: 8,
                        //         }}
                        //         color={colors.red}>
                        //         {isVaucher
                        //             ? t('couponDetails.vaucher').toUpperCase()
                        //             : `${parseFloat(coupon?.oldPrice).toFixed(2)} ${
                        //                   constants.currency
                        //               }`}
                        //     </Text> */}
                        //     {/* <Text
                        //         type={'small14SemiBold'}
                        //         style={
                        //             {
                        //                 // position: 'absolute',
                        //                 // bottom: 8,
                        //                 // left: 8,
                        //             }
                        //         }>
                        //         {t('couponDetails.giftCoupon')}

                        //     </Text> */}
                        //     <Gift fill={colors.primary} size={30} />
                        // </View>
                        <View>
                            <Text
                                type={'small10SemiBold'}
                                style={{
                                    textDecorationLine: isVaucher ? 'none' : 'line-through',
                                    textDecorationStyle: 'solid',
                                    // position: 'absolute',
                                    // bottom: 24,
                                    // left: 8,
                                }}
                                color={colors.red}>
                                {isVaucher
                                    ? t('couponDetails.vaucher').toUpperCase()
                                    : `${parseFloat(coupon?.oldPrice).toFixed(2)} ${
                                          constants.currency
                                      }`}
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

            <View
                style={{
                    width: imageWidth,
                    borderRadius: 8,
                    paddingTop: 8,
                    backgroundColor: '#fff',
                    // backgroundColor: '#faf',
                }}>
                <Text
                    type={'bold'}
                    // type={'small14SemiBold'}
                    // color={colors.primary}
                >
                    {coupon?.name}
                </Text>
            </View>
        </TouchableOpacity>
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
