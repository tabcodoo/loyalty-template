import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, ScrollView, Dimensions, Platform, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import Header from 'components/common/HeaderForCoupon';
import Text from 'components/common/Text';
import Button from 'components/common/Button';
import Stopwatch from 'components/common/icons/Stopwatch';
import Info from 'components/common/icons/Info';
import Info2 from 'components/common/icons/Info2';
// import {BlurView} from '@react-native-community/blur';

import BottomSheet, {
    TouchableOpacity as BottomSheetTouchableOpacity,
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet-old';

import QRCode from 'react-native-qrcode-svg';

import Success from 'components/common/icons/Success';
import Error from 'components/common/icons/Error';
import * as Animatable from 'react-native-animatable';
import constants from '@constants';
import moment from 'moment';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CommonActions} from '@react-navigation/native';
import PriceContainer from 'components/common/icons/PriceContainer';
import SplashScreen from 'react-native-splash-screen';
import {Image as ProgressiveImage} from 'react-native-expo-image-cache/src/index';
import CustomImage from 'components/common/Image';

let {height, width} = Dimensions.get('window');

// const BlurredBackground = () =>
//     Platform.OS === 'ios' ? (
//         <View style={styles.blurContainer}>
//             <BlurView blurType="chromeMaterial" style={styles.blurView} />
//         </View>
//     ) : (
//         <View style={[styles.blurContainer, styles.androidContainer]} />
//     );

const CouponDetails = (props: any) => {
    const {
        t,
        signOutGuest,
        user,
        pointDisplayStyle,
        userId,
        cart,
        coupon,
        expired,
        timer,
        activateCoupon,
        activatedAt,
        used,
        activated,
        setActivated,
        loading,
        navigation,
        fromNotification,
        quantity,
    } = props;
    const {colors} = useTheme();
    let [opened, setOpened] = React.useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    let hasDiscount = !!coupon?.discount;
    let isVaucher = coupon?.couponTypeId === 2;
    let isGift = coupon?.couponTypeId === 3;

    useEffect(() => {
        if (timer && bottomSheetRef) openBottomMenu();
    }, [activated]);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    // variables
    const snapPoints = useMemo(
        () => [
            0,
            // , '50%',
            '67%',
        ],
        [],
    );
    // callbacks

    let openBottomMenu = () => {
        if (coupon?.isSpecialCoupon) setActivated(true);
        setOpened(true);
        // bottomSheetRef.current.snapTo(1);
        bottomSheetRef.current.expand();
    };

    let closeBottomMenu = () => {
        setOpened(false);
        bottomSheetRef.current.close();
    };

    let startCoupon = () => {
        activateCoupon(() => {
            // bottomSheetRef.current.snapTo(2);
        });
    };

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                enableTouchThrough={true}
                closeOnPress={false}
                appearsOnIndex={2}
                disappearsOnIndex={1}
            />
        ),
        [],
    );

    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <View
                    style={{
                        width: '100%',
                        height: '38%',
                    }}>
                    <CustomImage
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        uri={coupon?.imageUrl}
                    />

                    <Animatable.View
                        animation={opened ? 'fadeIn' : 'fadeOut'}
                        style={{
                            position: 'absolute',
                            // bottom: height * 0.645,
                            bottom: 0,
                            top: 0,
                            // height: opened ? height : 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                        // transition={['top']}
                    >
                        <TouchableOpacity style={{flex: 1}} onPress={closeBottomMenu} />
                    </Animatable.View>

                    {coupon?.isSpecialCoupon && (
                        <View
                            style={[
                                styles.imageLabelContainer,
                                {
                                    backgroundColor:
                                        coupon?.isUnlocked &&
                                        parseFloat(cart.pointBalance) >=
                                            parseFloat(coupon?.unlocksAt)
                                            ? !!coupon?.reactivationDate
                                                ? colors.orange
                                                : colors.success
                                            : colors.error,
                                },
                            ]}>
                            {user.pointsEnabled && (
                                <Text type={'small10'} color="#fff" style={{marginBottom: 4}}>
                                    {t(`couponDetails.${pointDisplayStyle.toLowerCase()}`)}
                                </Text>
                            )}

                            <Text
                                type={'small14SemiBold'}
                                // color={colors.primary}
                                color="#fff">
                                {user.userRole.toLowerCase() === 'guest'
                                    ? `${coupon?.unlocksAt}`
                                    : `${cart.pointBalance.toFixed(2)}/${coupon?.unlocksAt}`}
                            </Text>
                        </View>
                    )}
                    {quantity !== null && (
                        <View style={styles.imageLabelContainer}>
                            <Text type={'small10'}>{t('couponDetails.youHave')}</Text>
                            <Text type={'small14SemiBold'} style={{marginTop: 4}}>
                                {quantity +
                                    (quantity === 1
                                        ? t('couponDetails.singleCoupon')
                                        : t('couponDetails.multipleCoupons'))}
                            </Text>
                        </View>
                    )}
                    {/* {quantity !== null && (
                        <View style={styles.imageLabelContainer}>
                            <Text type={'small10'}>Preostalo:</Text>
                            <Text type={'small14SemiBold'} style={{marginTop: 4}}>
                                {quantity + (quantity === 1 ? ' kupon' : ' kupona')}
                            </Text>
                        </View>
                    )} */}
                </View>

                <Header
                    onPress={() =>
                        fromNotification
                            ? navigation.dispatch(
                                  CommonActions.reset({
                                      index: 1,
                                      routes: [{name: 'CouponStack'}],
                                  }),
                              )
                            : navigation.goBack()
                    }
                    style={{position: 'absolute', paddingHorizontal: 16}}
                    color={'#fff'}
                />
                <ScrollView contentContainerStyle={{padding: 24}}>
                    <View>
                        <Text style={{marginBottom: 16}} type={'header1'}>
                            {coupon?.name}
                        </Text>
                        {coupon?.description && (
                            <Text style={{paddingBottom: 4, marginBottom: 12}}>
                                {coupon?.description}
                            </Text>
                        )}

                        {!isGift && (
                            <View
                                style={{
                                    height: 1,
                                    width: width - 32,
                                    left: -8,
                                    opacity: 0.12,
                                    backgroundColor: '#000',
                                }}
                            />
                        )}

                        {hasDiscount ? (
                            <View>
                                <Text
                                    type={'header2'}
                                    style={{
                                        // textDecorationLine: 'line-through',
                                        textDecorationStyle: 'solid',
                                        marginTop: 32,
                                        // marginBottom: 16,
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
                                    <Text type={'header1'}>
                                        {coupon?.discount}
                                        {coupon?.currency || ' ' + constants.currency}
                                    </Text>
                                ) : (
                                    <Text type={'header1'}>-{coupon?.discount}%</Text>
                                )}
                            </View>
                        ) : isGift ? null : (
                            // <View style={{marginTop: 32}}>
                            //     <Text
                            //         type={'header1'}
                            //         style={{}}
                            //         // style={{marginVertical: 8}}
                            //         // color={'#fff'}
                            //     >
                            //         {t('couponDetails.gift')}
                            //         {/* {parseFloat(coupon?.newPrice).toFixed(2)} {constants.currency} */}
                            //     </Text>
                            // </View>
                            <View style={{marginTop: 32}}>
                                {!isVaucher ? (
                                    <Text
                                        type={'header2'}
                                        style={{
                                            textDecorationLine: 'line-through',
                                            textDecorationStyle: 'solid',
                                        }}
                                        color={colors.red}>
                                        {parseFloat(coupon?.oldPrice).toFixed(2)}{' '}
                                        {constants.currency}
                                    </Text>
                                ) : (
                                    <Text
                                        type={'header2'}
                                        style={{
                                            // textDecorationLine: 'line-through',
                                            textDecorationStyle: 'solid',
                                        }}
                                        color={colors.red}>
                                        {t('couponDetails.vaucher').toUpperCase()}

                                        {/* {parseFloat(coupon?.oldPrice).toFixed(2)}{' '}
                                        {constants.currency} */}
                                    </Text>
                                )}

                                <Text
                                    type={'header1'}
                                    style={{}}
                                    // style={{marginVertical: 8}}
                                    // color={'#fff'}
                                >
                                    {parseFloat(coupon?.newPrice).toFixed(2)} {constants.currency}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={{marginBottom: 40}} />
                </ScrollView>
                <View style={{padding: 16}}>
                    {expired && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 16,
                            }}>
                            <MaterialIcons name={'info-outline'} style={{marginHorizontal: 8}} />
                            <Text type={'small14'}>
                                {t('couponDetails.reactivationDate') +
                                    (!!coupon?.reactivationDate
                                        ? moment(coupon?.reactivationDate).format(
                                              'DD/MM/YYYY HH:mm',
                                          )
                                        : moment()
                                              .add(coupon?.daysDuration, 'days')
                                              .format('DD/MM/YYYY HH:mm'))}
                            </Text>
                        </View>
                    )}
                    {!coupon?.isUnlocked && coupon?.isSpecialCoupon && user.pointsEnabled && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 16,
                                width: '80%',
                            }}>
                            <Info2 size={22} />

                            {/* {user.pointsEnabled && ( */}
                            <Text type={'small14'} style={{marginLeft: 8, lineHeight: 16}}>
                                {`${t('couponDetails.unlocksAtP1' + pointDisplayStyle)} ${
                                    isVaucher
                                        ? t('couponDetails.vaucherTitle')
                                        : t('couponDetails.couponTitle')
                                } ${t('couponDetails.unlocksAtP2' + pointDisplayStyle)} ${
                                    coupon?.unlocksAt
                                } ${pointDisplayStyle === 'Money' ? constants.currency : ''}`}
                            </Text>
                            {/* )} */}
                        </View>
                    )}

                    {user.userRole.toLowerCase() === 'guest' ? (
                        <Button
                            mode={'contained'}
                            label={t('couponDetails.login')}
                            // label={'Prijavite se'}
                            // disabled
                            onPress={signOutGuest}
                        />
                    ) : coupon?.isSpecialCoupon ? (
                        <View>
                            {!opened && !expired && coupon?.isUnlocked && (
                                <Button
                                    mode={'contained'}
                                    label={timer ? timer : t('couponDetails.useCoupon')}
                                    onPress={openBottomMenu}
                                />
                            )}
                            {(expired || !coupon?.isUnlocked) && (
                                <Button
                                    mode={'contained'}
                                    disabled
                                    label={t('couponDetails.notActive')}
                                    // onPress={openBottomMenu}
                                />
                            )}
                        </View>
                    ) : (
                        <View>
                            {!opened && !expired && (
                                <Button
                                    mode={'contained'}
                                    label={timer ? timer : t('couponDetails.useCoupon')}
                                    onPress={openBottomMenu}
                                />
                            )}
                            {expired && (
                                <Button
                                    mode={'contained'}
                                    disabled
                                    label={t('couponDetails.notActive')}
                                    // onPress={openBottomMenu}
                                />
                            )}
                        </View>
                    )}
                </View>
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                // initialSnapIndex={0}
                snapPoints={snapPoints}
                borderRadius={8}
                onChange={(index) => {
                    if (!index) closeBottomMenu();
                }}
                // index={-1}
                // animateOnMount={true}
                // backdropComponent={renderBackdrop}
                // backgroundComponent={BlurredBackground}
            >
                <View
                    style={{
                        flex: 1,
                        padding: 16,
                        backgroundColor: '#fff',
                    }}>
                    {activated ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                // backgroundColor: '#ffa',
                            }}>
                            <Text type={'header1'}>{coupon?.name}</Text>
                        </View>
                    ) : (
                        <View
                            style={{
                                alignSelf: 'center',
                                flex: 2,
                                justifyContent: 'center',
                                alignItems: 'center',
                                // paddingTop: 24,
                                // backgroundColor: '#ff0',
                            }}>
                            <Stopwatch fill={colors.primary} />
                            <Text style={{marginTop: 24, lineHeight: 20}} center>
                                {t('couponDetails.duration')}
                            </Text>
                        </View>
                    )}

                    {expired ? (
                        <View
                            style={{
                                flex: 3,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                // backgroundColor: '#ff0',
                            }}>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // backgroundColor: '#faf',
                                    flex: 1,
                                }}>
                                {used ? <Success /> : <Error />}
                                <Text style={{marginTop: 24}} center>
                                    {used ? t('couponDetails.success') : t('couponDetails.error')}
                                </Text>
                            </View>
                            {/*<Button*/}
                            {/*    style={{marginTop: 16}}*/}
                            {/*    mode={'contained'}*/}
                            {/*    label={'Zatvori'}*/}
                            {/*    onPress={closeBottomMenu}*/}
                            {/*/>*/}
                        </View>
                    ) : activated ? (
                        <View
                            style={{
                                flex: 3,
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                // backgroundColor: '#ff0',
                                // backgroundColor: '#faf',
                            }}>
                            <Text
                                type={'header2'}
                                // style={{marginBottom: 16}}
                                center>
                                {t('couponDetails.scanQR')}
                            </Text>
                            <QRCode value={`${userId} ${coupon?.id}`} size={width / 2.3} />
                            <Text center>
                                {t('couponDetails.couponCode')} {userId + '-' + coupon?.id}
                            </Text>
                            <Text type={'header1'} center color={'#000'}>
                                {timer}
                            </Text>
                        </View>
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                // backgroundColor: '#ffd',
                            }}>
                            <View>
                                <Button
                                    mode={'contained'}
                                    label={t('couponDetails.activateCoupon')}
                                    onPress={startCoupon}
                                    loading={loading}
                                />
                                <Button
                                    style={{marginTop: 16}}
                                    mode={'text'}
                                    label={t('couponDetails.notNow')}
                                    onPress={closeBottomMenu}
                                />
                            </View>
                        </View>
                    )}
                </View>
            </BottomSheet>
        </View>
    );
};

export default CouponDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    blurView: {
        ...StyleSheet.absoluteFillObject,
    },
    blurContainer: {
        ...StyleSheet.absoluteFillObject,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden',
    },
    androidContainer: {
        backgroundColor: 'rgba(255,255,255, 0.95)',
    },
    imageLabelContainer: {
        // marginTop: 34,
        position: 'absolute',
        bottom: 24,
        left: 0,
        // flexDirection: 'row',
        // alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
});
