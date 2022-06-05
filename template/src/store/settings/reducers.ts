import * as types from './types';

const INITIAL_STATE = {
    loading: false,
    finished: false,
    supply: true,
    content: true,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.SETTINGS:
            return {...state};
        case types.SETTINGS_REQUEST:
            return {...state, loading: true, finished: false};
        case types.SETTINGS_FAILURE:
            return {...state, loading: false, finished: false};
        case types.SETTINGS_SUCCESS:
            return {...state, loading: false, finished: true};
        default:
            return state;
    }
}
