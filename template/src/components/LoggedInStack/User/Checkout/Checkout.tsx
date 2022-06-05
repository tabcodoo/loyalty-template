import React, {useState, useCallback} from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    FlatList,
} from 'react-native';
import {useTheme, Divider} from 'react-native-paper';
import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';
import constants from '@constants';
import CheckBox from 'components/common/CheckBox';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const Checkout = (props: any) => {
    const {
        t,
        navigation,
        currentOrder,
        cart,
        deliveryData,
        paymentMethod,
        deliveryMethod,
        onOrderPress,
        unlockedCoupons,
        setSelectedCoupon,
        currentPoints,
        totalAmount,
        usedPoints,
        totalDiscount,
        cartTotalAmount,
    } = props;
    const {colors} = useTheme();

    const getDeliveryPrice = () => {
        const {freeDeliveryAbove, deliveryPrice} = deliveryMethod ?? {};
        if (freeDeliveryAbove) {
            if (cartTotalAmount >= freeDeliveryAbove) return 0;
            else return deliveryPrice;
        } else return deliveryPrice;
    };

    const renderItem = useCallback(
        ({item, index}) => {
            return (
                <View
                    pointerEvents={
                        currentPoints >= item?.threshold?.thresholdValue
                            ? 'auto'
                            : item?.isPressed
                            ? 'auto'
                            : 'none'
                    }
                    opacity={
                        currentPoints >= item?.threshold?.thresholdValue
                            ? 1
                            : item?.isPressed
                            ? 1
                            : 0.5
                    }>
                    <TouchableOpacity
                        onPress={() => setSelectedCoupon(item)}
                        style={{
                            height: 60,
                            backgroundColor: '#f1f1f1',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 5,
                            borderRadius: 2,
                            // justifyContent: 'space-between',
                            marginBottom: 20,
                            flex: 1,
                        }}>
                        <View
                            style={{
                                flex: 0.13,
                            }}>
                            <CheckBox
                                onPress={() => setSelectedCoupon(item)}
                                checked={item.isPressed}
                            />
                        </View>
                        <View
                            style={{
                                flex: 0.85,
                            }}>
                            <View
                                style={{
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        maxWidth: '70%',
                                    }}
                                    numberOfLines={2}
                                    type={'small14SemiBold'}>
                                    {item?.name}
                                </Text>

                                {item?.discountTypeId === 1 ? (
                                    <Text
                                        type={
                                            'small8Text'
                                        }>{`-${item?.discount}${constants.currency}`}</Text>
                                ) : item?.discountTypeId === 2 ? (
                                    <Text type={'small8Text'}>{`-${item?.discount}%`}</Text>
                                ) : null}
                            </View>
                            {item?.threshold?.thresholdValue ? (
                                <Text
                                    style={{fontSize: 10}}
                                    type={
                                        'small8Text'
                                    }>{`${item?.threshold?.thresholdValue} bodova`}</Text>
                            ) : null}
                        </View>
                    </TouchableOpacity>
                </View>
            );
        },
        [setSelectedCoupon],
    );

    const ListEmptyComponent = () =>
        !unlockedCoupons ? (
            <ActivityIndicator size="small" color={colors.primary} style={{alignSelf: 'center'}} />
        ) : (
            <View
                style={{
                    height: 60,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f2f1f2',
                }}>
                <SimpleLineIcons
                    name="info"
                    size={20}
                    style={{
                        marginRight: 10,
                    }}
                />
                <Text>{t('checkout.noCoupons')}</Text>
            </View>
        );

    const CheckoutDetailsComponent = ({headline, value}) => (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 7,
                justifyContent: 'space-between',
                backgroundColor: '#F8F8F8',
            }}>
            <Text>{headline}</Text>
            <Text type="bold">{value}</Text>
        </View>
    );

    const Footer = () => (
        <View
            style={{
                width: Dimensions.get('screen').width,
                backgroundColor: '#f1f1f1',
                position: 'absolute',
                bottom: 0,
            }}>
            {usedPoints ? (
                <CheckoutDetailsComponent
                    headline={t('checkout.pointsUsed')}
                    value={`${usedPoints} bodova`}
                />
            ) : null}
            {totalDiscount ? (
                <CheckoutDetailsComponent
                    headline={t('checkout.totalDiscount')}
                    value={`${totalDiscount.toFixed(2).replace('.', ',')} ${constants.currency}`}
                />
            ) : null}

            {deliveryMethod ? (
                <CheckoutDetailsComponent
                    headline={t('checkout.deliveryPrice')}
                    value={`${getDeliveryPrice().toFixed(2).replace('.', ',')} ${
                        constants.currency
                    }`}
                />
            ) : null}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 16,
                }}>
                <View>
                    <Text type={'bold'}>{t('supplyCheckout.total')}</Text>
                    <Text color={colors.primary} type={'bold'}>
                        {`${totalAmount.toFixed(2)} ${constants.currency}`}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={onOrderPress}
                    style={{
                        backgroundColor: colors.primary,
                        borderRadius: 2,
                        height: 52,
                        width: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text type="header2Text" color="#fff">
                        {t('checkout.order')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                    }}>
                    <Text type={'small14SemiBold'}>{t('checkout.deliveryData')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('DeliveryDataInput')}>
                        <Text type={'small8Text'} style={{fontSize: 13}} color={colors.primary}>
                            {t('checkout.change')}
                        </Text>
                    </TouchableOpacity>
                </View>
                {deliveryData ? (
                    <View
                        style={{
                            marginBottom: 40,
                        }}>
                        <Text type={'small8Text'} style={{fontSize: 13, marginBottom: 5}}>
                            {deliveryData?.name}
                        </Text>
                        <Text type={'small8Text'} style={{fontSize: 13, marginBottom: 5}}>
                            {deliveryData?.address}
                        </Text>
                        <Text type={'small8Text'} style={{fontSize: 13, marginBottom: 5}}>
                            {deliveryData?.phoneNumber}
                        </Text>
                        <Text type={'small8Text'} style={{fontSize: 13, marginBottom: 5}}>
                            {deliveryData?.country?.name}
                        </Text>
                        <Text type={'small8Text'} style={{fontSize: 13, marginBottom: 5}}>
                            {deliveryData?.city?.name}
                        </Text>
                        <Text type={'small8Text'} style={{fontSize: 13, marginBottom: 5}}>
                            {deliveryData?.zipCode}
                        </Text>
                        {deliveryData?.additionalInfo ? (
                            <Text numberOfLines={1} type={'small8Text'} style={{fontSize: 13}}>
                                {deliveryData?.additionalInfo}
                            </Text>
                        ) : null}
                    </View>
                ) : (
                    <Text type={'small8Text'} style={{fontSize: 13, marginBottom: 40}}>
                        {t('checkout.noData')}
                    </Text>
                )}

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                    }}>
                    <Text type={'small14SemiBold'}>{t('checkout.deliveryMethod')}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('DeliveryMethod');
                        }}>
                        <Text type={'small8Text'} style={{fontSize: 13}} color={colors.primary}>
                            {t('checkout.change')}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text type={'small8Text'} style={{fontSize: 13, marginBottom: 40}}>
                    {!deliveryMethod ? t('checkout.noData') : deliveryMethod.name}
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                    }}>
                    <Text type={'small14SemiBold'}>{t('checkout.paymentMethod')}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('PaymentMethod');
                        }}>
                        <Text type={'small8Text'} style={{fontSize: 13}} color={colors.primary}>
                            {t('checkout.change')}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text type={'small8Text'} style={{fontSize: 13, marginBottom: 40}}>
                    {!paymentMethod ? t('checkout.noData') : paymentMethod.name}
                </Text>

                <FlatList
                    data={unlockedCoupons}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id.toString()}
                    ListEmptyComponent={ListEmptyComponent}
                />
            </ScrollView>
            <Header
                title="Checkout"
                onPress={() => navigation.pop()}
                style={{
                    position: 'absolute',
                    paddingHorizontal: 16,
                    top: -4,
                    backgroundColor: 'white',
                    width: '100%',
                }}
                color={'#fff'}
            />
            <Footer />
        </>
    );
};

export default Checkout;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        paddingTop: 100,
        paddingHorizontal: 16,
        paddingBottom: 190,
    },
});
