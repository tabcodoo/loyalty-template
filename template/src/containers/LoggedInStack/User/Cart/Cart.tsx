import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import {useTheme} from 'react-native-paper';
import Text from 'components/common/Text';
import Button from 'components/common/Button';

import Cart from 'components/LoggedInStack/User/Cart';
import actions from 'store/actions';

const CartContainer = (props: any) => {
    const {navigation} = props;
    let currentOrder = useSelector((state) => state.orders.currentOrder);
    let cart = useSelector((state) => state.cart);
    let itemsFromCart = cart.shoppingCartItems;
    const {colors} = useTheme();

    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    const shoppingType = useSelector((state) => state.cart.type);

    const user = useSelector((state) => state?.user);

    let openCurrentOrder = () => {
        navigation.navigate('CartQRcode');
    };

    let clearCart = () => {
        dispatch(
            actions.setGlobalBottomSheet(
                true,
                () => (
                    <View style={{paddingHorizontal: 16, justifyContent: 'space-around', flex: 1}}>
                        <Text center style={{lineHeight: 24}}>
                            {currentOrder
                                ? t('cart.cancelOrderConfirmation')
                                : t('cart.deleteAllConfirmation')}
                        </Text>

                        <View>
                            <Button
                                mode={'contained'}
                                label={t('cart.yes')}
                                style={{marginBottom: 8}}
                                onPress={() => {
                                    dispatch(actions.clearCart());
                                    dispatch(actions.resetGlobalBottomSheet());
                                    if (currentOrder)
                                        dispatch(actions.cancelCurrentOrder(currentOrder));
                                }}
                            />
                            <Button
                                mode={'text'}
                                label={t('cart.no')}
                                onPress={() => {
                                    dispatch(actions.resetGlobalBottomSheet());
                                }}
                            />
                        </View>
                    </View>
                ),
                [0, '40%'],
            ),
        );
    };

    let openInputSheet = () => {
        dispatch(
            actions.setGlobalBottomSheet(
                true,
                () => (
                    <View style={{paddingHorizontal: 16, justifyContent: 'space-around', flex: 1}}>
                        <Text center style={{lineHeight: 24}}>
                            {t('cart.showQRPrompt')}
                        </Text>

                        <View>
                            <Button
                                mode={'contained'}
                                label={t('cart.showQR')}
                                style={{marginBottom: 8}}
                                onPress={() => {
                                    dispatch(
                                        actions.createCurrentOrder(cart.cartId, () => {
                                            dispatch(actions.resetGlobalBottomSheet());
                                            navigation.navigate('CartQRcode');
                                            dispatch(actions.getCart());
                                        }),
                                    );
                                }}
                            />
                            <Button
                                mode={'text'}
                                label={t('cart.notNow')}
                                onPress={() => {
                                    dispatch(actions.resetGlobalBottomSheet());
                                }}
                            />
                        </View>
                    </View>
                ),
                [0, '40%'],
            ),
        );
    };

    let closeInputSheet = () => dispatch(actions.resetGlobalBottomSheet());

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

    useEffect(() => {
        if (itemsFromCart.length && !shoppingType && user?.mobileShopEnabled)
            openShoppingLocationSheet();
    }, []);

    return (
        <Cart
            {...props}
            {...{
                t,
                openCurrentOrder,
                openInputSheet,
                itemsFromCart,
                currentOrder,
                cart,
                clearCart,
                shoppingType,
                user,
            }}
        />
    );
};

export default CartContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
