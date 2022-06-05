import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import actions from 'store/actions';
import OrderComplete from 'components/LoggedInStack/User/OrderComplete';
import constants from '@constants';

const OrderCompleteContainer = (props: any) => {
    const {
        navigation,
        route: {
            params: {order},
        },
    } = props;

    const dispatch = useDispatch();
    const {t} = useContext(LocalizationContext);
    const cart = useSelector((state) => state.cart);
    const {paymentMethod, deliveryMethod} = cart ?? {};
    const currentOrder = useSelector((state) => state.orders.currentOrder);

    const finishShopping = () => {
        dispatch(actions.clearCart());
        if (currentOrder) dispatch(actions.cancelCurrentOrder(currentOrder));
        if (constants.applicationId === '8265e2ee-d9a3-48d8-a209-99779c8509b3')
            // bracom ID
            navigation.navigate('CategorySelection');
        else navigation.navigate('Supply');
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', finishShopping);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', finishShopping);
        };
    }, []);

    return (
        <OrderComplete
            {...props}
            {...{t, navigation, finishShopping, order, paymentMethod, deliveryMethod}}
        />
    );
};

export default OrderCompleteContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
