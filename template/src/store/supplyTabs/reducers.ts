import * as types from './types';

const INITIAL_STATE = {
    loading: false,
    finished: false,
    isEnabled: false,
    tabs: [],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'RESET_SUPPLY':
            return {...INITIAL_STATE, finished: true};
        case types.SUPPLYTABS:
            return {...state};
        case types.SUPPLYTABS_REQUEST:
            return {...state, loading: true, finished: false};
        case types.SUPPLYTABS_FAILURE:
            return {
                ...state,
                loading: false,
                finished: true,
            };
        case types.SUPPLYTABS_SUCCESS:
            return {
                ...state,
                loading: false,
                finished: true,
                isEnabled: true,
                tabs: action.payload.filter((category) => category.parentCategoryId === null),
                // ...action.payload,
            };
        default:
            return state;
    }
}
