import * as types from './types';

const INITIAL_STATE = {
    loading: false,
    finished: false,
    isEnabled: false,
    tabs: [],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'RESET_CONTENT':
            return {...INITIAL_STATE, finished: true};

        case types.CONTENTTABS:
            return {...state};
        case types.CONTENTTABS_REQUEST:
            return {...state, loading: true, finished: false};
        case types.CONTENTTABS_FAILURE:
            return {
                ...state,
                loading: false,
                finished: true,
            };
        case types.CONTENTTABS_SUCCESS:
            return {
                ...state,
                loading: false,
                finished: true,
                isEnabled: true,
                tabs: action.payload.filter((category) => category.parentCategoryId === null),
            };
        default:
            return state;
    }
}
