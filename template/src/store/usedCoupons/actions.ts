import * as types from './types';
import api from 'services/api';
import {convertPaginationToString} from 'constants';

export function resetUsedCoupons() {
    return {
        type: 'RESET_USED_COUPONS',
    };
}

function usedCouponsRequest() {
    return {
        type: types.USEDCOUPONS_REQUEST,
    };
}

function usedCouponsSuccess(response, requestObject, totalSavings) {
    return {
        type: types.USEDCOUPONS_SUCCESS,
        payload: {response, requestObject, totalSavings},
    };
}

function usedCouponsFailure(error) {
    return {
        type: types.USEDCOUPONS_FAILURE,
        payload: error,
    };
}

export function getUsedCoupons() {
    return async (dispatch, getState) => {
        const {
            usedCoupons,
            user: {language},
        } = getState();

        dispatch(usedCouponsRequest());
        try {
            let reqString = convertPaginationToString(usedCoupons.requestObject.paginationModel);
            let {
                data: {
                    payload: {data: payload, totalSavings},
                },
            } = await api.get('loyalty/my-used-coupons' + reqString, language);

            dispatch(
                usedCouponsSuccess(
                    payload,
                    {
                        ...usedCoupons.requestObject,
                        paginationModel: {
                            ...usedCoupons.requestObject.paginationModel,
                            index: payload.length + usedCoupons.data.length,
                        },
                    },
                    totalSavings,
                ),
            );
        } catch (error) {
            dispatch(usedCouponsFailure(error.message));
        }
    };
}
