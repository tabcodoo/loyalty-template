import * as types from './types';

const INITIAL_STATE = {
    loading: false,
    finished: false,
    uniqueItemCount: 0,
    totalAmount: 0,
    shoppingCartItems: [],
    type: null,
    paymentMethod: null,
    deliveryMethod: null,
    usedCoupons: [],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.CART:
            return {...state};
        // case types.GET_CART_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         finished: true,
        //         ...action.payload,
        //     };
        case types.CART_REQUEST:
            return {...state, loading: true, finished: false};
        case types.CART_FAILURE:
            return {...state, loading: false, finished: false};
        case types.CART_SUCCESS:
            return {
                ...state,
                loading: false,
                finished: true,
                ...action.payload,
                // shoppingCartItems: action.payload,
            };
        case types.SHOPPING_TYPE:
            return {
                ...state,
                type: action.payload,
            };
        case types.PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };
        case types.DELIVERY_METHOD:
            return {
                ...state,
                deliveryMethod: action.payload,
            };
        case types.ADD_USED_COUPON:
            const isCouponAdded = state.usedCoupons.find((item) => item.id === action.payload.id);
            return {
                ...state,
                usedCoupons: isCouponAdded
                    ? state.usedCoupons
                    : [...state.usedCoupons, action.payload],
            };
        case types.REMOVE_USED_COUPON:
            const tempCoupons = state.usedCoupons.filter(
                (item) => item?.id !== action?.payload?.id,
            );
            return {
                ...state,
                usedCoupons: tempCoupons,
            };
        default:
            return state;
    }
}
