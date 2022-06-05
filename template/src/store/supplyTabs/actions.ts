import * as types from './types';

export function supplyTabsSuccess(response) {
    return {
        type: types.SUPPLYTABS_SUCCESS,
        payload: response,
    };
}

export function supplyTabsError(response) {
    return {
        type: types.SUPPLYTABS_FAILURE,
        // payload: response,
    };
}
