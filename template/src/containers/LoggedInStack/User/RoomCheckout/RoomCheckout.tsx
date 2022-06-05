import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import api from 'services/api';
import actions from 'store/actions';
import RoomCheckout from 'components/LoggedInStack/User/RoomCheckout';

const RoomCheckoutContainer = (props: any) => {
    const {navigation} = props ?? {};
    let {t} = useContext(LocalizationContext);

    const orderLocationsInitData = [
        {
            id: 0,
            name: t('room.kitchen'),
            locationString: 'Kitchen',
            isPressed: false,
        },
        {
            id: 1,
            name: t('room.bartender'),
            locationString: 'Bartender',
            isPressed: false,
        },
    ];
    const [orderLocations, setOrderLocations] = useState(orderLocationsInitData);
    let cart = useSelector((state) => state.cart);
    const {shoppingCartItems: itemsFromCart, totalAmount, cartId, usedCoupons} = cart ?? {};
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const {selectedRoom, userRole} = user ?? {};
    const isUser = userRole.toLowerCase() === 'mobileuser';
    const isWaiter = userRole.toLowerCase() === 'waiter';
    const isSalesman = userRole.toLowerCase() === 'salesman';
    const currentOrder = useSelector((state) => state.orders.currentOrder);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const setIsLocationPressed = (orderItem) => {
        const newData = orderLocations.map((item) =>
            item.id === orderItem.id ? {...item, isPressed: true} : {...item, isPressed: false},
        );
        setOrderLocations(newData);
    };

    const selectedOrder = orderLocations.find((item) => item.isPressed);

    const placeOrder = async () => {
        setIsLoading(true);
        try {
            const requestBody = {
                cartId,
                message,
                coupons: usedCoupons,
                [isWaiter ? 'tableId' : isSalesman ? 'storeId' : 'roomId']: selectedRoom.id,
                deliveryPath: isWaiter ? selectedOrder?.locationString : isUser && 'Reception',
            };

            console.log('REQUEST BODY', requestBody);

            const {data} = await api.post(
                `cart/${
                    isWaiter
                        ? 'place-table-order'
                        : isSalesman
                        ? 'place-store-order'
                        : 'place-room-order'
                }`,
                requestBody,
            );

            if (data.success) {
                DropDownHolder.dropDown.alertWithType('success', '', t('room.orderSuccess'));
                setIsLoading(false);
                finishShopping();
                dispatch(actions.addNewOrder(data.payload));
                navigation.navigate('RoomComplete');
                return data.payload;
            }
        } catch (e) {
            console.log('PLACE ORDER ERROR', e);
            setIsLoading(false);
            DropDownHolder.dropDown.alertWithType('error', '', t('room.orderFail'));
        }
    };

    const finishShopping = () => {
        dispatch(actions.clearCart());
        if (currentOrder) dispatch(actions.cancelCurrentOrder(currentOrder));
    };

    const isOrderDisabled = () => {
        if (isLoading || !itemsFromCart.length || !selectedRoom || (isWaiter && !selectedOrder)) {
            return true;
        }

        return false;
    };

    return (
        <RoomCheckout
            {...props}
            {...{
                t,
                navigation,
                itemsFromCart,
                totalAmount,
                message,
                setMessage,
                placeOrder,
                isLoading,
                isOrderDisabled,
                orderLocations,
                setIsLocationPressed,
                isWaiter,
            }}
        />
    );
};

export default RoomCheckoutContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
