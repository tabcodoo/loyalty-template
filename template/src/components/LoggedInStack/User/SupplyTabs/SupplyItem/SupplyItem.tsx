import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform, Keyboard} from 'react-native';
import {useTheme} from 'react-native-paper';

import Text from 'components/common/Text';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import {useNavigation} from '@react-navigation/native';
import DropDownHolder from 'services/DropDownHolder';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import ShoppingBag from 'components/common/icons/ShoppingBag';
import Trash from 'components/common/icons/Trash';
import constants from '@constants';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Image as ProgressiveImage} from 'react-native-expo-image-cache/src';
import {useDispatch, useSelector} from 'react-redux';
import actions from 'store/actions';
import Success from 'components/common/icons/Success';
import LocalizationContext from 'translation/context';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';

import CustomImage from 'components/common/Image';
import {addItemToCart} from 'store/cart/actions';

const Offer = (props: any) => {
    const {title = '', item = {}, cart = false} = props;
    let order = useSelector((state) => !!state.orders.currentOrder);
    let itemsFromCart = useSelector((state) => state.cart.shoppingCartItems);
    let itemFromCart = useSelector((state) =>
        state.cart.shoppingCartItems.find(
            (i) => i?.articleId === item?.articleId && i?.id === item?.id,
        ),
    );
    let user = useSelector((state) => state.user);
    const {hasRoomServiceEnabled, userRole} = user ?? {};
    const isWaiter = userRole.toLowerCase() === 'waiter';
    const isSalesman = userRole.toLowerCase() === 'salesman';
    let dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    const {disableBadges, isService} = item ?? {};
    const usedCoupons = useSelector((state) => state.cart.usedCoupons);
    const thisCoupon = usedCoupons.find((coupon) => coupon?.articleId === item?.articleId);
    const shoppingType = useSelector((state) => state.cart.type);
    useEffect(() => {
        // console.tron.log('itemFromCart', itemFromCart);
        if (itemFromCart) {
            setQuantity(itemFromCart?.quantity);
            setAddedToCart(true);
        } else {
            // setQuantity(1);
            setAddedToCart(false);
        }
    }, [itemFromCart, itemsFromCart]);

    let [addedToCart, setAddedToCart] = useState(false);
    let [quantity, setQuantity] = useState(1);

    const {colors} = useTheme();
    const navigation = useNavigation();

    const isArticleAvailable = () => {
        if (!user?.useStockOnApp) return true;

        return item?.stock;
    };

    let handleItemInCart = () => {
        // console.tron.log('handleItemInCart', addedToCart);

        if (!addedToCart) {
            if (hasRoomServiceEnabled) {
                if (!isArticleAvailable()) {
                    DropDownHolder.dropDown.alertWithType('error', '', t('supply.noStock'));
                    return;
                }
                addItemToCart();
                return;
            }

            // if (!itemsFromCart.length && user?.mobileShopEnabled) openShoppingLocationSheet();
            // else
            if (shoppingType === 'online' && user?.mobileShopEnabled) {
                if (!isArticleAvailable()) {
                    DropDownHolder.dropDown.alertWithType('error', '', t('supply.noStock'));
                    return;
                }
                navigation.navigate('SupplyCheckout', {supply: item});
            } else {
                // if (item?.isVariation) {
                //     navigation.navigate('SupplyCheckout', {supply: item});
                // } else {
                //     addItemToCart();
                // }
                navigation.navigate('SupplyCheckout', {supply: item});
            }
        } else {
            if (item?.isVariation) {
                if (cart) removeItemFromCart();
                else navigation.navigate('SupplyCheckout', {supply: item});
            } else {
                removeItemFromCart();
                setQuantity(1);
            }
        }
        // setAddedToCart(!addedToCart);
    };
    let addItemToCart = () => {
        dispatch(actions.addItemToCart({item, quantity}));
    };
    let removeItemFromCart = () => {
        dispatch(actions.removeItemFromCart(item, thisCoupon));
    };

    let QuantityInput = () => {
        const schema = yup.object().shape({
            quantity: yup
                .string()
                .required(t('errors.required'))
                .test('is-zero', t('errors.numberNoZero'), (value) => {
                    return parseInt(value) !== 0;
                })
                .test('is-decimal', t('errors.decimalNumber'), (value) => {
                    return value.match(/^\d+$/);
                }),
        });

        const {control, handleSubmit, errors} = useForm({
            resolver: yupResolver(schema),
        });

        let confirmQuantity = ({quantity}) => {
            // console.tron.log('confirmQuantity', quantity);
            Keyboard.dismiss();
            setQuantity(parseInt(quantity));
            dispatch(actions.editItemInCart(item, quantity));
            closeInputSheet();
            // openCartSheet();
        };

        return (
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="always"
                extraScrollHeight={24}
                contentContainerStyle={{
                    flex: 1,
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                    //   overflow: 'hidden',
                    //   backgroundColor: '#ff0',
                }}>
                <Text type={'header3'} center>
                    {t('supply.enterQty')}
                </Text>
                <View style={{width: '100%'}}>
                    <Controller
                        control={control}
                        render={({onChange, onBlur, value}) => (
                            <Input
                                focusOnLoad
                                mode="flat"
                                label={t('supply.qty')}
                                placeholder={t('supply.qty')}
                                keyboardType={
                                    Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'
                                }
                                error={errors.quantity?.message}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                // onChangeText={(text) => {
                                // console.tron.log(
                                //     'onChangeText',
                                //     text,
                                //     parseFloat(text.replace(',', '.1')),
                                //     'text,text,text,text'.replace(',', '.'),
                                // );
                                // onChange(
                                //     text
                                //         .replace(',', '')
                                //         .replace('.', '')
                                //         .replace(' ', ''),
                                // );
                                // }}
                                value={value}
                            />
                        )}
                        name="quantity"
                        defaultValue={quantity.toString()}
                    />
                </View>
                <Button
                    mode={'contained'}
                    label={t('supply.accept')}
                    style={{marginBottom: 16}}
                    onPress={handleSubmit(confirmQuantity)}
                />
                {/*<Success fill={'#ccc'} />*/}
                {/*<Text>{t('profileQRcode.scanedStep1')}</Text>*/}
            </KeyboardAwareScrollView>
        );
    };

    let closeInputSheet = () => dispatch(actions.resetGlobalBottomSheet());

    let openInputSheet = () => {
        dispatch(
            actions.setGlobalBottomSheet(
                true,
                () => <QuantityInput />,
                Platform.OS === 'ios' ? [0, '50%'] : [0, '40%'],
            ),
        );
    };

    const ShoppingLocationSelectorComponent = () => {
        return (
            <View
                style={{
                    padding: 16,
                }}>
                <Text
                    type="bold"
                    color="#000"
                    style={{
                        alignSelf: 'center',
                        fontSize: 17,
                    }}>
                    {t('supply.where_are_you_shopping')}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        dispatch(actions.setShoppingType('onsite'));
                        closeInputSheet();
                        // addItemToCart();
                        navigation.navigate('SupplyCheckout', {supply: item});
                    }}
                    style={{
                        backgroundColor: colors.primary,
                        borderRadius: 2,
                        height: 52,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 60,
                    }}>
                    <Text type="header2Text" color="#fff">
                        {t('supply.in_store')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (!isArticleAvailable()) {
                            DropDownHolder.dropDown.alertWithType('error', '', t('supply.noStock'));
                            closeInputSheet();
                            return;
                        }
                        dispatch(actions.setShoppingType('online'));
                        closeInputSheet();
                        // addItemToCart();
                        navigation.navigate('SupplyCheckout', {supply: item});
                    }}
                    style={{
                        borderRadius: 2,
                        borderWidth: 1,
                        borderColor: colors.primary,
                        height: 52,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 16,
                    }}>
                    <Text type="header2Text" color={colors.primary}>
                        {t('supply.online')}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    const openShoppingLocationSheet = () => {
        dispatch(
            actions.setGlobalBottomSheet(
                true,
                () => <ShoppingLocationSelectorComponent />,
                Platform.OS === 'ios' ? [0, '40%'] : [0, '40%'],
            ),
        );
    };

    return (
        <Animatable.View animation="fadeIn" duration={200}>
            {user?.cartEnabled || isWaiter || isSalesman ? (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        if (user?.displaySupplyDetails && !cart)
                            navigation.navigate('SupplyDetails', {supply: item});
                    }}
                    style={[
                        styles.contentContainer,
                        {
                            height: 80,
                        },
                        // cart && {
                        //     // paddingBottom: 16,
                        //     borderBottomWidth: 0.5,
                        //     borderBottomColor: '#faf',
                        // },
                    ]}>
                    <View style={styles.detailsContainer}>
                        {item?.imageUrl ? (
                            <View>
                                <CustomImage
                                    style={{
                                        ...styles.imageContainer,
                                        marginRight: 10,
                                    }}
                                    uri={item?.imageUrl}
                                />
                            </View>
                        ) : null}
                        <View
                            style={{
                                flex: 1,
                                height: '100%',
                                marginRight: 8,
                                // backgroundColor: '#faf',
                                // alignItems: 'center',
                                justifyContent: 'space-around',
                                paddingBottom: 4,
                            }}>
                            <Text
                                // style={{textWrap: 'wrap'}}
                                type={'bold'}
                                // color={!isFocused ? '#000' : '#fff'}
                                numberOfLines={2}>
                                {item?.name}
                            </Text>
                            {item?.description ? (
                                <Text
                                    style={{
                                        marginTop: Platform.OS !== 'ios' ? 4 : 0,
                                        flexWrap: 'wrap',
                                        lineHeight: 15,
                                    }}
                                    type={'smallMedium'}
                                    numberOfLines={
                                        item?.name.length > (item?.imageUrl ? 25 : 33) ? 1 : 2
                                    }
                                    // color={!isFocused ? '#000' : '#fff'}
                                >
                                    {item?.description}
                                </Text>
                            ) : null}
                            {!isService ? (
                                <View>
                                    {user?.userBadgesEnabled ? (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                            {!cart ? (
                                                <>
                                                    {!disableBadges ? (
                                                        <>
                                                            <Text
                                                                style={{
                                                                    marginTop: 4,
                                                                    textDecorationLine: item?.discountedPrice
                                                                        ? 'line-through'
                                                                        : 'none',
                                                                    marginRight: 10,
                                                                }}
                                                                type={
                                                                    !item?.discountedPrice
                                                                        ? 'small14SemiBold'
                                                                        : 'smallMedium'
                                                                }
                                                                color={
                                                                    !item?.discountedPrice
                                                                        ? colors.primary
                                                                        : 'gray'
                                                                }>
                                                                {item?.price
                                                                    .toFixed(2)
                                                                    .replace('.', ',')}
                                                                {constants.currency}
                                                            </Text>
                                                            {item?.discountedPrice ? (
                                                                <Text
                                                                    style={{marginTop: 4}}
                                                                    type={'small14SemiBold'}
                                                                    color={colors.primary}>
                                                                    {item?.discountedPrice
                                                                        .toFixed(2)
                                                                        .replace('.', ',')}
                                                                    {constants.currency}
                                                                </Text>
                                                            ) : null}
                                                        </>
                                                    ) : (
                                                        <Text
                                                            style={{marginTop: 4}}
                                                            type={'small14SemiBold'}
                                                            color={colors.primary}>
                                                            {item?.price
                                                                .toFixed(2)
                                                                .replace('.', ',')}
                                                            {constants.currency}
                                                        </Text>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    <Text
                                                        style={{marginTop: 4}}
                                                        type={'small14SemiBold'}
                                                        color={colors.primary}>
                                                        {(
                                                            item?.price * item?.quantity -
                                                            item?.totalDiscount
                                                        )
                                                            .toFixed(2)
                                                            .replace('.', ',')}
                                                        {constants.currency}
                                                    </Text>
                                                    {item?.totalDiscount ? (
                                                        <Text
                                                            style={{
                                                                marginTop: 4,
                                                                marginLeft: 5,
                                                                fontSize: 12,
                                                            }}>
                                                            {`(popust ${item?.totalDiscount
                                                                .toFixed(2)
                                                                .replace('.', ',')} ${
                                                                constants.currency
                                                            })`}
                                                        </Text>
                                                    ) : null}
                                                </>
                                            )}
                                        </View>
                                    ) : (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                            {cart ? (
                                                <>
                                                    <Text
                                                        style={{marginTop: 4}}
                                                        type={'small14SemiBold'}
                                                        color={colors.primary}>
                                                        {(
                                                            item?.price * item?.quantity -
                                                            item?.totalDiscount
                                                        )
                                                            .toFixed(2)
                                                            .replace('.', ',')}
                                                        {constants.currency}
                                                    </Text>
                                                    {item?.totalDiscount ? (
                                                        <Text
                                                            style={{
                                                                marginTop: 4,
                                                                marginLeft: 5,
                                                                fontSize: 12,
                                                            }}>
                                                            {`(popust ${item?.totalDiscount
                                                                .toFixed(2)
                                                                .replace('.', ',')} ${
                                                                constants.currency
                                                            })`}
                                                        </Text>
                                                    ) : null}
                                                </>
                                            ) : (
                                                <Text
                                                    style={{marginTop: 4}}
                                                    type={'small14SemiBold'}
                                                    color={colors.primary}>
                                                    {item?.price.toFixed(2).replace('.', ',')}
                                                    {constants.currency}
                                                </Text>
                                            )}
                                        </View>
                                    )}
                                </View>
                            ) : null}
                        </View>
                    </View>

                    <View
                        style={{
                            height: '100%',
                            minWidth: 40,
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}>
                        {order ? (
                            item?.quantity ? (
                                <TouchableOpacity
                                    activeOpacity={!order ? 0.7 : 1}
                                    // onPress={!order ? handleItemInCart : () => {}}
                                    onPress={() => {
                                        if (!order) {
                                            handleItemInCart();
                                        }
                                    }}
                                    style={[
                                        styles.shoppingBagContainer,
                                        itemFromCart && {
                                            backgroundColor: cart ? '#f1f1f1' : '#333',
                                        },
                                        // {backgroundColor: 'yellow'},

                                        // order && {opacity: item?.quantity ? 1 : 0},
                                    ]}>
                                    {order ? (
                                        item?.quantity ? (
                                            <Text type={'smallSemiBold'}>{item?.quantity}</Text>
                                        ) : (
                                            <ShoppingBag fill={itemFromCart ? '#fff' : '#333'} />
                                        )
                                    ) : cart ? (
                                        <Trash />
                                    ) : (
                                        <ShoppingBag fill={itemFromCart ? '#fff' : '#333'} />
                                    )}
                                </TouchableOpacity>
                            ) : null
                        ) : item?.isVariation ? (
                            <TouchableOpacity
                                activeOpacity={!order ? 0.7 : 1}
                                // onPress={!order ? handleItemInCart : () => {}}
                                onPress={() => {
                                    if (cart) {
                                        handleItemInCart();
                                    } else navigation.navigate('SupplyCheckout', {supply: item});
                                }}
                                style={[
                                    styles.shoppingBagContainer,
                                    // itemFromCart && {backgroundColor: cart ? '#f1f1f1' : '#333'},
                                    {backgroundColor: '#f1f1f1'},
                                ]}>
                                {order ? (
                                    item?.quantity ? (
                                        <Text type={'smallSemiBold'}>{item?.quantity}</Text>
                                    ) : (
                                        <ShoppingBag fill={itemFromCart ? '#fff' : '#333'} />
                                    )
                                ) : cart ? (
                                    <Trash />
                                ) : (
                                    // <ShoppingBag fill={itemFromCart ? '#fff' : '#333'} />
                                    <Entypo name="chevron-thin-right" size={20} color={'#333'} />
                                )}
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                activeOpacity={!order ? 0.7 : 1}
                                // onPress={!order ? handleItemInCart : () => {}}
                                onPress={() => {
                                    if (!order) {
                                        handleItemInCart();
                                    }
                                }}
                                style={[
                                    styles.shoppingBagContainer,
                                    itemFromCart && {backgroundColor: cart ? '#f1f1f1' : '#333'},
                                    // {backgroundColor: 'yellow'},
                                ]}>
                                {order ? (
                                    item?.quantity ? (
                                        <Text type={'smallSemiBold'}>{item?.quantity}</Text>
                                    ) : (
                                        <ShoppingBag fill={itemFromCart ? '#fff' : '#333'} />
                                    )
                                ) : cart ? (
                                    <Trash />
                                ) : (
                                    <ShoppingBag fill={itemFromCart ? '#fff' : '#333'} />
                                )}
                            </TouchableOpacity>
                        )}

                        {!item?.isVariation ? (
                            <View style={{minHeight: 24}}>
                                {itemFromCart ? (
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-around',
                                            backgroundColor: '#f1f1f1',
                                            borderRadius: 6,
                                            paddingHorizontal: 3,
                                            minHeight: 24,
                                            minWidth: 35,
                                        }}
                                        onPress={openInputSheet}>
                                        <Text type={'smallSemiBold'}>{itemFromCart?.quantity}</Text>
                                        <MaterialIcons
                                            name={'keyboard-arrow-down'}
                                            size={14}
                                            style={{padding: 0, margin: 0}}
                                        />
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                        ) : null}
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        if (user?.displaySupplyDetails)
                            navigation.navigate('SupplyDetails', {supply: item});
                    }}
                    style={styles.contentContainer}>
                    <View style={styles.detailsContainer}>
                        {item?.imageUrl ? (
                            <CustomImage
                                style={{...styles.imageContainer, marginRight: 8}}
                                uri={item?.imageUrl}
                            />
                        ) : null}
                        <View
                            style={{
                                flex: 1,
                                height: '100%',
                                marginRight: 8,
                                // backgroundColor: '#faf',
                                justifyContent: 'center',
                                paddingBottom: 4,
                            }}>
                            <Text
                                // style={{textWrap: 'wrap'}}
                                type={'bold'}
                                // color={!isFocused ? '#000' : '#fff'}
                                numberOfLines={2}>
                                {item?.name}
                            </Text>
                            <Text
                                style={{
                                    marginTop: Platform.OS !== 'ios' ? 4 : 0,
                                    flexWrap: 'wrap',
                                    lineHeight: 15,
                                }}
                                type={'smallMedium'}
                                numberOfLines={
                                    item?.name.length > (item?.imageUrl ? 25 : 33) ? 1 : 2
                                }
                                // color={!isFocused ? '#000' : '#fff'}
                            >
                                {item?.description}
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.priceContainer]}>
                        <Text
                            // style={{opacity}}
                            type={'small14Bold'}
                            // color={!isFocused ? '#000' : '#fff'}
                        >
                            {item?.price.toFixed(2).replace('.', ',')}
                        </Text>
                        <Text
                            style={{marginTop: 4}}
                            type={'smallBold'}
                            // color={!isFocused ? '#000' : '#fff'}
                        >
                            {constants.currency}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        </Animatable.View>
    );
};

export default React.memo(Offer);

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#ff0',
        paddingVertical: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        maxWidth: '100%',
        // backgroundColor: '#ff0',
        height: 60,
        // overflow: 'hidden',
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 3 : 0,
        // flexWrap: 'wrap',
        // maxWidth: '55%',
        // justifyContent: 'space-between',
        // backgroundColor: '#ff0',
    },
    priceContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        height: 60,
        padding: 16,
        borderRadius: 8,
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    // Shopping
    shoppingBagContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // alignItems: 'space-around',
        backgroundColor: '#f1f1f1',
        alignSelf: 'flex-end',
        height: 40,
        width: '100%',
        // width: 40,
        // padding: 12,
        borderRadius: 8,
    },
});
