import * as types from './types';

export function contentTabsSuccess(response) {
    return {
        type: types.CONTENTTABS_SUCCESS,
        payload: response,
    };
}

export function contentTabsError(response) {
    return {
        type: types.CONTENTTABS_FAILURE,
        // payload: response,
    };
}
