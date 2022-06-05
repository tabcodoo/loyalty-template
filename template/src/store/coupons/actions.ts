import * as types from './types';
import api from 'services/api';
import {convertPaginationToString, convertSortingToString} from 'constants';
import moment from 'moment';
import constants from '@constants';
import actions from 'store/actions';
import FastImage from 'react-native-fast-image';
export function resetCoupons() {
    return {
        type: 'RESET_COUPONS',
    };
}

function couponsRequest() {
    return {
        type: types.COUPONS_REQUEST,
    };
}

function couponsSuccess(response, requestObject) {
    return {
        type: types.COUPONS_SUCCESS,
        payload: {response, requestObject},
    };
}

function couponsFailure(error) {
    return {
        type: types.COUPONS_FAILURE,
        payload: error,
    };
}
function couponsRefresh(response) {
    return {
        type: types.COUPONS_REFRESH,
        payload: response,
    };
}

export function getCoupons() {
    return async (dispatch, getState) => {
        const {
            coupons,
            offerCategoriesFilters: {categories},
            user,
        } = getState();
        if (coupons.loading) return;

        dispatch(couponsRequest());
        try {
            let reqString = convertPaginationToString(coupons.requestObject.paginationModel);
            let sortingString = convertSortingToString(coupons.requestObject.sortingModels);
            // console.tron.log(
            //     categories,
            //     user?.groupCouponsByCategory &&
            //         categories &&
            //         categories.length > 0 &&
            //         categories.filter((c) => c.isEnabled).length > 0,
            //     user?.groupCouponsByCategory &&
            //         categories &&
            //         categories.length > 0 &&
            //         categories.filter((c) => c.isEnabled).length === 0,
            // );
            if (
                user?.groupCouponsByCategory &&
                categories &&
                categories.length > 0 &&
                categories.filter((c) => c.isEnabled).length > 0
            )
                reqString += `&categoryFilter=${categories
                    .filter((c) => c.isEnabled)
                    .map((c) => c.categoryId)
                    .join('|')}`;
            else if (
                user?.groupCouponsByCategory &&
                categories &&
                categories.length > 0 &&
                categories.filter((c) => c.isEnabled).length === 0
            )
                reqString += `&categoryFilter=${0}`;
            // console.tron.log(
            //     categoriesSelected,
            //     categoriesSelected.map((c) => c.categoryId).join('|'),
            // );
            let {
                data: {payload},
            } = await api.get(
                'loyalty/coupons' + reqString + '&IsMobileRequest=true',
                user?.language,
            );

            FastImage.preload(payload.map((coupon) => ({uri: coupon?.imageUrl})));

            setTimeout(() => {
                dispatch(
                    couponsSuccess(payload, {
                        ...coupons.requestObject,
                        paginationModel: {
                            ...coupons.requestObject.paginationModel,
                            index: payload.length + coupons.data.length,
                        },
                    }),
                );
            }, 100);
        } catch (error) {
            dispatch(couponsFailure(error.message));
        }
    };
}

export function activateCoupon(reqObject = {}, callback: () => {}, errCallback: () => {}) {
    return async (dispatch, getState) => {
        const {data: coupons} = getState().coupons;

        dispatch(couponsRequest());
        try {
            let dateUsed = moment();
            let res = await api.post('loyalty/activate-coupon', {
                dateUsed,
                ...reqObject,
                applicationId: constants.applicationId,
            });
            let arr = coupons.slice();
            let id = arr.findIndex((coupon) => coupon?.id === reqObject.couponId);
            if (id !== -1) {
                arr[id] = {...arr[id], dateActivated: dateUsed};
                // callback(dateUsed);
            }
            callback(dateUsed);

            // let {
            //     data: {payload},
            // } = await api.get('loyalty/coupons');
            // dispatch()

            dispatch({
                type: types.ACTIVATE_COUPON,
                payload: arr,
            });
        } catch (error) {
            errCallback();
            dispatch(couponsFailure(error.message));
        }
    };
}

export function useCoupon(couponId = -1) {
    return async (dispatch, getState) => {
        const {data: coupons} = getState().coupons;

        dispatch(couponsRequest());
        try {
            let arr = coupons.slice();
            let id = arr.findIndex((coupon) => coupon?.id === couponId);

            if (id !== -1) {
                arr[id] = {
                    ...arr[id],
                    isUsed: true,
                    quantity: arr[id]?.quantity ? arr[id]?.quantity - 1 : arr[id]?.quantity,
                };
            }
            dispatch({
                type: types.ACTIVATE_COUPON,
                payload: arr,
            });
            // setTimeout(() => {
            //     dispatch(actions.resetUsedCoupons());
            //     dispatch(actions.getUsedCoupons());
            // }, 2000);
        } catch (error) {
            dispatch(couponsFailure(error.message));
        }
    };
}

export function refreshCoupons() {
    return async (dispatch, getState) => {
        const {
            coupons,
            offerCategoriesFilters: {categories},
            user,
        } = getState();

        try {
            const paginationModel = {
                index: 0,
                count: 100,
            };
            let reqString = convertPaginationToString(paginationModel);
            if (
                user?.groupCouponsByCategory &&
                categories &&
                categories.length > 0 &&
                categories.filter((c) => c.isEnabled).length > 0
            )
                reqString += `&categoryFilter=${categories
                    .filter((c) => c.isEnabled)
                    .map((c) => c.categoryId)
                    .join('|')}`;
            else if (
                user?.groupCouponsByCategory &&
                categories &&
                categories.length > 0 &&
                categories.filter((c) => c.isEnabled).length === 0
            )
                reqString += `&categoryFilter=${0}`;
            let {
                data: {payload},
            } = await api.get(
                'loyalty/coupons' + reqString + '&IsMobileRequest=true',
                user?.language,
            );

            FastImage.preload(payload.map((coupon) => ({uri: coupon?.imageUrl})));

            dispatch(couponsRefresh(payload));
        } catch (error) {
            dispatch(couponsFailure(error.message));
        }
    };
}
