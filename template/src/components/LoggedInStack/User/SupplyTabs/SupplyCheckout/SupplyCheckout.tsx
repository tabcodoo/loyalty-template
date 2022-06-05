import React, {useState, useCallback} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Header from 'components/common/HeaderForCoupon';
import CustomImage from 'components/common/Image';
import Text from 'components/common/Text';
import constants from '@constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

const SupplyCheckout = (props: any) => {
    const {
        t,
        navigation,
        supply,
        quantity,
        changeQuantity,
        getTotalAmount,
        getAttributesData,
        attributeTypes,
        selectAttribute,
        selectedAttributesString,
        addItemToCart,
        getSelectedAttribute,
        coupon,
        getCouponPrice,
        isThisCouponUsed,
        useCoupon,
        removeUsedCoupon,
        user,
        isValid,
        useStockInApp,
        selectedVariation,
        handleItemInCart,
    } = props;
    const {colors} = useTheme();

    const keyExtractor = useCallback((item, index) => item.id.toString(), []);

    const AttributeSliderComponent = useCallback(
        ({data, renderItem, contentContainerStyle, title, selectedItem, isVisible, index}) => (
            <View key={index.toString()} style={{display: !isVisible ? 'flex' : 'none'}}>
                <Text style={{marginTop: 20, marginLeft: 16}} type={'small14SemiBold'}>
                    {`${title}: `}
                    <Text style={{fontSize: 13, textTransform: 'capitalize'}} type={'small8Text'}>
                        {selectedItem ? selectedItem?.name : t('supplyCheckout.not_selected')}
                    </Text>
                </Text>
                <FlatList
                    data={data}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    horizontal
                    style={{flexGrow: 0}}
                    contentContainerStyle={contentContainerStyle}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        ),
        [],
    );

    const colorsRenderItem = useCallback(
        ({item}) => (
            <TouchableOpacity
                onPress={() => selectAttribute(item)}
                style={{
                    height: 40,
                    width: 40,
                    backgroundColor: item.value,
                    marginRight: 20,
                    borderRadius: 6,
                    elevation: 4,
                    borderWidth: 4,
                    borderColor: item.isPressed ? '#000' : item.value,
                }}
            />
        ),
        [selectAttribute],
    );

    const textRenderItem = useCallback(
        ({item}) => (
            <TouchableOpacity
                onPress={() => selectAttribute(item)}
                style={{
                    height: 40,
                    paddingHorizontal: 15,
                    backgroundColor: '#f1f1f1',
                    marginRight: 20,
                    borderRadius: 6,
                    elevation: 4,
                    borderWidth: 4,
                    borderColor: item.isPressed ? '#000' : '#f1f1f1',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text type={'small8Text'}>{item?.value}</Text>
            </TouchableOpacity>
        ),
        [selectAttribute],
    );

    const renderAttributeSliders = useCallback(() => {
        if (!attributeTypes)
            return (
                <ActivityIndicator
                    size="small"
                    color={colors.primary}
                    style={{alignSelf: 'center'}}
                />
            );

        return attributeTypes.map((item, index) => {
            return (
                <AttributeSliderComponent
                    data={getAttributesData(item.id)}
                    renderItem={item.attributeTypeId === 1 ? colorsRenderItem : textRenderItem} //attributeTypeId for color is always 1 (with this we differ renderItem)
                    contentContainerStyle={styles.slider}
                    title={item.name}
                    index={index}
                    selectedItem={getSelectedAttribute(item.id)}
                />
            );
        });
    }, [attributeTypes, getAttributesData, getSelectedAttribute]);

    const QuantitiyCounter = () => (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
            }}>
            <TouchableOpacity
                onPress={() => changeQuantity('down')}
                style={{
                    padding: 16,
                }}>
                <AntDesign name="minus" size={20} color="#000" />
            </TouchableOpacity>
            <View
                style={{
                    height: 40,
                    width: 40,
                    // paddingHorizontal: 15,
                    borderWidth: 1,
                    borderColor: '#979797',
                    borderRadius: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text
                    style={{
                        textAlign: 'center',
                        textAlignVertical: 'center',
                    }}>
                    {quantity}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => changeQuantity('up')}
                style={{
                    padding: 16,
                }}>
                <AntDesign name="plus" size={20} color="#000" />
            </TouchableOpacity>
        </View>
    );

    const Footer = () => (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                backgroundColor: '#f1f1f1',
                position: 'absolute',
                bottom: 0,
                padding: 16,
            }}>
            <View>
                <Text type={'bold'}>{t('supplyCheckout.total')}</Text>
                <Text color={colors.primary} type={'bold'}>
                    {getTotalAmount().toFixed(2).replace('.', ',')} {constants.currency}
                </Text>
            </View>
            <TouchableOpacity
                disabled={!isValid()}
                onPress={() => {
                    // addItemToCart();
                    // navigation.goBack();
                    handleItemInCart();
                }}
                style={{
                    backgroundColor: colors.primary,
                    borderRadius: 2,
                    height: 52,
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isValid() ? 1 : 0.5,
                }}>
                <Text type="header2Text" color="#fff">
                    {t('supplyDetails.addToCart')}
                </Text>
            </TouchableOpacity>
        </View>
    );

    const Coupon = () => (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                margin: 16,
                opacity: coupon?.isUsed ? 0.5 : 1,
            }}>
            <View
                style={{
                    width: '60%',
                }}>
                <Text
                    style={{
                        marginBottom: 4,
                    }}
                    type="bold">
                    {coupon?.name}
                </Text>
                {coupon?.discountTypeId === 1 ? (
                    <Text type={'small8Text'}>{`-${coupon?.oldPrice - coupon?.newPrice} ${
                        constants.currency
                    }`}</Text>
                ) : (
                    coupon?.discountTypeId === 2 && (
                        <Text type={'small8Text'}>{`-${coupon?.discount}%`}</Text>
                    )
                )}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            marginTop: 4,
                            textDecorationLine: 'line-through',
                            marginRight: 10,
                        }}
                        type={'small14SemiBold'}
                        color={'gray'}>
                        {getCouponPrice().oldPrice.toFixed(2).replace('.', ',')}{' '}
                        {constants.currency}
                    </Text>
                    <Text style={{marginTop: 4}} type={'small14SemiBold'} color={colors.primary}>
                        {getCouponPrice().newPrice.toFixed(2).replace('.', ',')}{' '}
                        {constants.currency}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    width: '40%',
                }}>
                <TouchableOpacity
                    disabled={coupon?.isUsed}
                    onPress={() => {
                        isThisCouponUsed ? removeUsedCoupon() : useCoupon();
                    }}>
                    <Text style={{fontSize: 13}} type={'small8Text'} color={colors.primary}>
                        {isThisCouponUsed
                            ? t('supplyCheckout.deleteCoupon')
                            : t('supplyCheckout.useCoupon')}
                    </Text>
                </TouchableOpacity>
                {isThisCouponUsed ? (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AntDesign name="checkcircle" color={colors.primary} size={15} />
                        <Text
                            style={{fontSize: 13, marginLeft: 5}}
                            type={'small8Text'}
                            color="gray">
                            {t('supplyCheckout.couponUsed')}
                        </Text>
                    </View>
                ) : null}
            </View>
        </View>
    );

    return (
        <>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{paddingTop: 80, paddingBottom: 100}}
                showsVerticalScrollIndicator={false}>
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingHorizontal: 16,
                        }}>
                        {supply?.imageUrl && (
                            <View>
                                <CustomImage
                                    style={{
                                        ...styles.imageContainer,
                                        marginRight: 8,
                                        height: 80,
                                        width: 80,
                                    }}
                                    uri={supply?.imageUrl}
                                />
                            </View>
                        )}
                        <View
                            style={{
                                justifyContent: 'space-around',
                                flex: 1,
                            }}>
                            <Text
                                type={'bold'}
                                style={{
                                    maxWidth: '85%',
                                }}
                                numberOfLines={3}>
                                {supply?.name}
                            </Text>
                            {user?.userBadgesEnabled ? (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    {!supply?.disableBadges ? (
                                        <>
                                            <Text
                                                style={{
                                                    marginTop: 4,
                                                    textDecorationLine: supply?.discountedPrice
                                                        ? 'line-through'
                                                        : 'normal',
                                                    marginRight: 10,
                                                }}
                                                type={
                                                    !supply?.discountedPrice
                                                        ? 'small14SemiBold'
                                                        : 'smallMedium'
                                                }
                                                color={
                                                    !supply?.discountedPrice
                                                        ? colors.primary
                                                        : 'gray'
                                                }>
                                                {supply?.price &&
                                                    supply?.price.toFixed(2).replace('.', ',')}{' '}
                                                {constants.currency}
                                            </Text>
                                            {supply?.discountedPrice ? (
                                                <Text
                                                    style={{marginTop: 4}}
                                                    type={'small14SemiBold'}
                                                    color={colors.primary}>
                                                    {supply?.discountedPrice
                                                        .toFixed(2)
                                                        .replace('.', ',')}{' '}
                                                    {constants.currency}
                                                </Text>
                                            ) : null}
                                        </>
                                    ) : (
                                        <Text
                                            style={{marginTop: 4}}
                                            type={'small14SemiBold'}
                                            color={colors.primary}>
                                            {supply?.price.toFixed(2).replace('.', ',')}{' '}
                                            {constants.currency}
                                        </Text>
                                    )}
                                </View>
                            ) : (
                                <Text
                                    style={{marginTop: 4}}
                                    type={'small14SemiBold'}
                                    color={colors.primary}>
                                    {supply?.price.toFixed(2).replace('.', ',')}{' '}
                                    {constants.currency}
                                </Text>
                            )}
                        </View>
                    </View>
                    <Text style={{paddingHorizontal: 16, marginTop: 10}}>
                        {selectedVariation?.description}
                    </Text>
                </View>
                {renderAttributeSliders()}

                <Text style={{marginTop: 20, marginLeft: 16}} type={'small14SemiBold'}>
                    {useStockInApp
                        ? supply?.stock
                            ? t('supplyCheckout.quantity')
                            : t('supplyCheckout.noStock')
                        : t('supplyCheckout.quantity')}
                </Text>
                {!useStockInApp ? (
                    <QuantitiyCounter />
                ) : supply?.stock ? (
                    <QuantitiyCounter />
                ) : null}
                <Text style={{marginTop: 20, marginLeft: 16}} type={'small14SemiBold'}>
                    {t('supplyCheckout.coupon')}
                    {!coupon ? (
                        <Text style={{fontSize: 13}} type={'small14SemiBold'}>
                            {' '}
                            {t('supplyCheckout.not_available')}
                        </Text>
                    ) : coupon?.isUsed ? (
                        <Text style={{fontSize: 13}} type={'small14SemiBold'}>
                            {`${t('supplyCheckout.couponAlreadyUsed')} ${moment(coupon?.dateUsed)
                                .add(coupon?.daysDuration, 'days')
                                .format('DD.MM.YYYY. HH:mm')}`}
                        </Text>
                    ) : null}
                </Text>
                {coupon ? <Coupon /> : null}
            </ScrollView>
            <Header
                onPress={() => navigation.goBack()}
                style={{position: 'absolute', paddingHorizontal: 16, top: -4}}
                color={'#fff'}
            />
            <Footer />
        </>
    );
};

export default SupplyCheckout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingHorizontal: 16,
        // paddingTop: 100,
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    slider: {
        height: 70,
        alignItems: 'center',
        marginTop: 5,
        paddingLeft: 16,
    },
});
