import * as types from './types';
import api from 'services/api';
import {convertPaginationToString, convertSortingToString} from 'constants';

function orders(payload) {
    return {
        type: types.ORDERS,
        payload,
    };
}

function ordersRequest() {
    return {
        type: types.ORDERS_REQUEST,
    };
}

function ordersSuccess(response) {
    return {
        type: types.ORDERS_SUCCESS,
        payload: response,
    };
}

function ordersFailure(error) {
    return {
        type: types.ORDERS_FAILURE,
        payload: error,
    };
}

export function resetOrders() {
    return {
        type: types.RESET_ORDERS,
    };
}

export function getOrderHistory(refresh = false) {
    return async (dispatch, getState) => {
        const {
            orders,
            user: {language},
        } = getState();

        !refresh && dispatch(ordersRequest());
        try {
            let sortingString = convertSortingToString(orders.requestObject.sortingModels);

            let response = await api.get(`cart/order-history?${sortingString.slice(1)}`, language);
            let orderStatuses = response.data.payload.orderStatuses.slice();

            // let createdId = orderStatuses.findIndex((order) => order.statusCode === 'created');
            // if (createdId !== -1) {
            //     dispatch(getCurrentOrder(orderStatuses[createdId]));
            //     orderStatuses.splice(createdId, 1);
            // }

            dispatch(ordersSuccess(orderStatuses));
        } catch (error) {
            dispatch(ordersFailure(error.message));
        }
    };
}

export function getNewOrder() {
    return async (dispatch, getState) => {
        const {
            orders: {history},
            user: {language},
        } = getState();

        try {
            const {data} = await api.get(
                'cart/order-history' +
                    '?' +
                    convertSortingToString([
                        {
                            sortingDescriptor: 'changeCheck',
                            sortingValue: 'ASC',
                            sortingOrder: 0,
                        },
                    ]).slice(1),
                //  +
                // convertPaginationToString({
                //     index: history.length,
                //     count: 1,
                // }).replace('?', '&')
                language,
            );
        } catch (e) {
            console.log('GET NEW ORDER ERR', e);
        }
    };
}

export function updateOrderHistory(order) {
    return async (dispatch, getState) => {
        const {
            orders: {history},
        } = getState();

        const newHistory = history.map((item) => (item.id === order.id ? order : item));

        dispatch(ordersSuccess(newHistory));
    };
}

export function addNewOrder(order) {
    return async (dispatch, getState) => {
        const {
            orders: {history},
        } = getState();

        const doesOrderExist = history.find((item) => item.id === order.id);

        if (!doesOrderExist) {
            const newHistory = [...history, order];
            dispatch(ordersSuccess(newHistory));
        }
    };
}

export function addOrderFromNotification(orderId) {
    return async (dispatch, getState) => {
        const {
            orders: {history},
            user: {language},
        } = getState();

        const doesOrderExist = history.find((item) => item.orderId === orderId);

        if (doesOrderExist) {
            dispatch(updateOrderFromNotification(orderId));
            return;
        }

        try {
            const {data} = await api.get(`loyalty/order/${orderId}`, language);
            if (data.success) {
                dispatch(addNewOrder(data.payload));
            }
        } catch (e) {
            console.log('GET ORDER BY ID ERR', e);
        }
    };
}

export function updateOrderFromNotification(orderId) {
    return async (dispatch, getState) => {
        const {
            orders: {history},
            user: {language},
        } = getState();

        try {
            const {data} = await api.get(`loyalty/order/${orderId}`, language);
            if (data.success) {
                dispatch(updateOrderHistory(data.payload));
            }
        } catch (e) {
            console.log('GET ORDER BY ID ERR', e);
        }
    };
}

export function getCurrentOrder(order, callback = () => {}) {
    return async (dispatch, getState) => {
        // dispatch(ordersRequest());
        const {
            user: {language},
        } = getState();
        try {
            let response = await api.get(`cart/order-details/${order?.orderId}`, language);

            dispatch({
                type: types.CREATED_ORDERS_SUCCESS,
                payload: {
                    ...order,
                    shoppingCartItems: response.data.payload.orderItems.map((item) => ({
                        ...item,
                        ...item.supply,
                    })),
                },
            });
            callback();
        } catch (error) {
            // dispatch(ordersFailure(error.message));
        }
    };
}

export function createCurrentOrder(id = -1, callback = () => {}) {
    return async (dispatch, getState) => {
        const {
            user: {language},
        } = getState();

        try {
            let response = await api.get(`cart/confirm-order?id=${id}`, language);
            // console.tron.log('createOrder', response);

            dispatch(getCurrentOrder(response.data.payload, callback));
        } catch (error) {
            // dispatch(cartFailure(error.message));
        }
    };
}

export function resetCurrentOrder() {
    return async (dispatch) => {
        dispatch({
            type: types.CREATED_ORDERS_SUCCESS,
            payload: null,
        });
    };
}

export function cancelCurrentOrder(order) {
    return async (dispatch, getState) => {
        const {
            user: {language},
        } = getState();

        try {
            let response = await api.get(`cart/cancel-order/${order?.orderId}`, language);
            // console.tron.log('getCurrentOrder', response.data.payload);
            dispatch({
                type: types.CREATED_ORDERS_SUCCESS,
                payload: null,
            });
        } catch (error) {
            // dispatch(ordersFailure(error.message));
        }
    };
}
