import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import SupplyDetails from 'components/LoggedInStack/User/SupplyTabs/SupplyDetails';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from 'react-native-paper';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';

import Text from 'components/common/Text';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import actions from 'store/actions';

const SupplyDetailsContainer = (props: any) => {
    let {
        navigation,
        route: {
            params: {supply},
        },
    } = props;
    // const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );
    let order = useSelector((state) => !!state.orders.currentOrder);

    let itemsFromCart = useSelector((state) => state.cart.shoppingCartItems);
    let itemFromCart = useSelector((state) =>
        state.cart.shoppingCartItems.find((i) => i.id === supply.id),
    );
    let user = useSelector((state) => state.user);
    const {hasRoomServiceEnabled} = user ?? {};
    let dispatch = useDispatch();

    const shoppingType = useSelector((state) => state.cart.type);

    const isArticleAvailable = () => {
        if (!user?.useStockOnApp) return true;

        return supply?.stock;
    };

    const cart = useSelector((state) => state.cart);
    const {badge: myBadge} = cart ?? {};

    const pointDisplayStyle = useSelector((state) => state.user?.pointDisplayStyle);

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

    let handleItemInCart = () => {
        // console.tron.log('handleItemInCart', addedToCart);

        if (!addedToCart) {
            if (hasRoomServiceEnabled) {
                addItemToCart();
                return;
            }

            // navigation.navigate('SupplyCheckout');
            // if (!itemsFromCart.length && user?.mobileShopEnabled) openShoppingLocationSheet();
            // else 
            if (user?.mobileShopEnabled)
                navigation.replace('SupplyCheckout', {supply});
            else {
                addItemToCart();
            }
        } else {
            removeItemFromCart();
            setQuantity(1);
        }
        // setAddedToCart(!addedToCart);
    };
    let addItemToCart = () => {
        dispatch(
            actions.addItemToCart({
                item: supply,
                quantity,
                successCallback: () => {
                    DropDownHolder.dropDown.alertWithType(
                        'success',
                        '',
                        hasRoomServiceEnabled ? t('room.added') : t('supplyDetails.addedToCart'),
                    );
                },
            }),
        );
    };
    let removeItemFromCart = () => {
        dispatch(actions.removeItemFromCart(supply));
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
                        navigation.replace('SupplyCheckout', {supply});
                        // addItemToCart();
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
                        dispatch(actions.setShoppingType('online'));
                        closeInputSheet();
                        navigation.replace('SupplyCheckout', {supply});
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
                    // backgroundColor: '#ff0',
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

    return (
        <SupplyDetails
            {...props}
            {...{
                t,
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
            }}
        />
    );
};

export default SupplyDetailsContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
