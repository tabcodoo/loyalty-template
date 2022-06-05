import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {Badge, useTheme} from 'react-native-paper';
import ShoppingBag from 'components/common/icons/ShoppingBag';
import Text from 'components/common/Text';
import Button from 'components/common/Button';
import Header from 'components/common/LoggedInHeader';
import constants from '@constants';
import SupplyItem from 'components/LoggedInStack/User/SupplyTabs/SupplyItem';

const Cart = (props: any) => {
    const {
        t,
        itemsFromCart,
        currentOrder,
        cart,
        openCurrentOrder,
        openInputSheet,
        clearCart,
        shoppingType,
        navigation,
        user,
    } = props;
    const {colors} = useTheme();
    return (
        <View style={styles.container}>
            <Header
                // menu={bottomMenuActivated}
                goBack
                title={currentOrder ? t('cart.titleOrder') : t('cart.title')}
                renderRightItem={() =>
                    currentOrder ? (
                        <TouchableOpacity onPress={clearCart}>
                            <Text type={'small12'} color={colors.primary}>
                                {t('cart.cancelOrder')}
                            </Text>
                        </TouchableOpacity>
                    ) : itemsFromCart.length > 0 ? (
                        <TouchableOpacity onPress={clearCart}>
                            <Text type={'small12'} color={colors.primary}>
                                {t('cart.deleteAll')}
                            </Text>
                        </TouchableOpacity>
                    ) : null
                }
            />
            <View style={{flex: 1}}>
                <FlatList
                    data={currentOrder ? currentOrder.shoppingCartItems : itemsFromCart}
                    renderItem={({item}) => {
                        return (
                            <SupplyItem title={item.name} item={item} cart order={!!currentOrder} />
                        );
                    }}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={() => <Text type={'small12'}>{t('cart.empty')}</Text>}
                    contentContainerStyle={{
                        // height: '100%',
                        paddingHorizontal: 16,
                        paddingTop: 16,
                        // backgroundColor: '#faf',
                    }}
                />
            </View>
            <View style={[styles.priceContainer, {backgroundColor: colors.gray}]}>
                <View>
                    <Text type={'small14SemiBold'} style={{marginBottom: 4}}>
                        {t('cart.total')}
                    </Text>
                    <Text type={'small14SemiBold'} color={colors.primary}>
                        {currentOrder
                            ? currentOrder?.totalAmount.toFixed(2)
                            : cart?.totalAmount.toFixed(2)}{' '}
                        {constants.currency}
                    </Text>
                </View>
                {shoppingType && (
                    <View style={{width: '50%'}}>
                        {shoppingType === 'onsite' || !user?.mobileShopEnabled ? (
                            <Button
                                onPress={currentOrder ? openCurrentOrder : openInputSheet}
                                disabled={
                                    currentOrder
                                        ? currentOrder.shoppingCartItems.length == 0
                                        : itemsFromCart.length == 0
                                }
                                mode={'contained'}
                                label={t('cart.showQR')}
                            />
                        ) : (
                            <Button
                                onPress={() => navigation.push('Checkout')}
                                disabled={
                                    currentOrder
                                        ? currentOrder.shoppingCartItems.length == 0
                                        : itemsFromCart.length == 0
                                }
                                mode={'contained'}
                                label={t('cart.buy')}
                            />
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
});
