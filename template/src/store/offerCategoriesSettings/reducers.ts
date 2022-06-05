import * as types from './types';

const INITIAL_STATE = {
    loading: false,
    finished: false,
    categories: [],
    categoriesSelected: [],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.OFFERCATEGORIESSETTINGS:
            return {...state};
        case types.OFFERCATEGORIESSETTINGS_REQUEST:
            return {...state, loading: true, finished: false};
        case types.OFFERCATEGORIESSETTINGS_FAILURE:
            return {...state, loading: false, finished: false};
        case types.OFFERCATEGORIESSETTINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                finished: true,
                categories: action.payload,
            };
        // case types.CATEGORIES_SELECTED_SUCCESS:
        //     return {
        //         ...state,
        //         categoriesSelected: action.payload,
        //     };

        default:
            return state;
    }
}
