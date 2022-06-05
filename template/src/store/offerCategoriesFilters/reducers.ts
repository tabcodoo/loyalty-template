import * as types from './types';

const INITIAL_STATE = {
    loading: false,
    edited: false,
    categories: [],
    categoriesSelected: [],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.OFFERCATEGORIESFILTERS:
            return {...state};
        case types.OFFERCATEGORIESFILTERS_REQUEST:
            return {...state, loading: true, finished: false};
        case types.OFFERCATEGORIESFILTERS_FAILURE:
            return {...state, loading: false, finished: false};
        case types.TOGGLE_EDIT:
            return {
                ...state,
                edited: true,
            };
        case types.OFFERCATEGORIESFILTERS_SUCCESS:
            // console.tron.log(types.OFFERCATEGORIESFILTERS_SUCCESS, state);
            return {
                ...state,
                loading: false,
                finished: true,
                categories: action.payload,
            };
        // case types.CATEGORIES_SELECTED_SUCCESS:
        //     // console.tron.log(types.CATEGORIES_SELECTED_SUCCESS, state);

        //     return {
        //         ...state,
        //         categoriesSelected: state.edited ? state.categoriesSelected : action.payload,
        //         edited: true,
        //     };
        // case types.FILTER_CATEGORIES_SELECTED_SUCCESS:
        //     return {
        //         ...state,
        //         categoriesSelected: action.payload,
        //         edited: true,
        //     };
        default:
            return state;
    }
}
