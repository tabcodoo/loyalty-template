import * as types from './types';
import api from 'services/api';

function cart(payload) {
    return {
        type: types.CART,
        payload,
    };
}

function cartRequest() {
    return {
        type: types.CART_REQUEST,
    };
}

function cartSuccess(response) {
    return {
        type: types.CART_SUCCESS,
        payload: response,
    };
}

function getCartSuccess(response) {
    return {
        type: types.GET_CART_SUCCESS,
        payload: response,
    };
}

function cartFailure(error) {
    return {
        type: types.CART_FAILURE,
        payload: error,
    };
}

function cartType(type) {
    return {
        type: types.SHOPPING_TYPE,
        payload: type,
    };
}
function paymentMethod(method) {
    return {
        type: types.PAYMENT_METHOD,
        payload: method,
    };
}
function deliveryMethod(method) {
    return {
        type: types.DELIVERY_METHOD,
        payload: method,
    };
}
function addCoupon(coupon) {
    return {
        type: types.ADD_USED_COUPON,
        payload: coupon,
    };
}
function removeCoupon(coupon) {
    return {
        type: types.REMOVE_USED_COUPON,
        payload: coupon,
    };
}

export function getCart() {
    return async (dispatch, getState) => {
        const {
            user: {language},
        } = getState();
        dispatch(cartRequest());
        try {
            let response = await api.get('cart/my-cart', language);

            dispatch(cartSuccess(response.data.payload));
        } catch (error) {
            dispatch(cartFailure(error.message));
        }
    };
}

export function clearCart() {
    return async (dispatch, getState) => {
        const {
            user: {language},
        } = getState();
        dispatch(cartRequest());
        try {
            let response = await api.get('cart/clear-cart', language);

            dispatch(cartSuccess(response.data.payload));
        } catch (error) {
            dispatch(cartFailure(error.message));
        }
    };
}

export function addItemToCart({
    item = {},
    quantity = 0,
    successCallback = () => {},
    attributeValues = '',
    isCouponChecked = false,
    variationId = null,
}) {
    return async (dispatch, getState) => {
        dispatch(cartRequest());
        try {
            let response = await api.post('cart/add-item', {
                itemId: item?.id,
                quantity,
                isCouponChecked,
                attributeValues,
                variationId,
                ...item,
            });
            delete response.data.payload.pointBalance;
            dispatch(cartSuccess(response.data.payload));
            successCallback();
        } catch (error) {
            dispatch(cartFailure(error.message));
        }
    };
}

export function editItemInCart(item = {}, quantity = 0) {
    return async (dispatch, getState) => {
        dispatch(cartRequest());
        try {
            let response = await api.post('cart/update-item', {
                itemId: item?.id,
                ...item,
                quantity,
            });

            delete response.data.payload.pointBalance;
            dispatch(cartSuccess(response.data.payload));
        } catch (error) {
            dispatch(cartFailure(error.message));
        }
    };
}

export function removeItemFromCart(item = {}, coupon) {
    return async (dispatch, getState) => {
        dispatch(cartRequest());
        try {
            let response = await api.delete('cart/remove-item/' + item?.id);
            delete response.data.payload.pointBalance;
            dispatch(cartSuccess(response.data.payload));
            if (coupon) dispatch(removeCoupon(coupon));
        } catch (error) {
            dispatch(cartFailure(error.message));
        }
    };
}

export function setShoppingType(type) {
    return async (dispatch) => {
        dispatch(cartType(type));
    };
}
export function setPaymentMethod(method) {
    return async (dispatch) => {
        dispatch(paymentMethod(method));
    };
}
export function setDeliveryMethod(method) {
    return async (dispatch) => {
        dispatch(deliveryMethod(method));
    };
}
export function addUsedCoupon(coupon) {
    return async (dispatch) => {
        dispatch(addCoupon(coupon));
    };
}
export function removeUsedCoupon(coupon) {
    return async (dispatch) => {
        dispatch(removeCoupon(coupon));
    };
}
