import * as types from './types';

const INITIAL_STATE = {
    loading: false,
    finished: false,
    categoriesLoading: false,
    isEnabled: false,
    categories: [],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'RESET_CONTENT':
        case 'RESET':
            return {...INITIAL_STATE};
        case types.CONTENT:
            return {...state};
        case types.CONTENT_REQUEST:
            return {...state, loading: true, finished: false};
        case types.CONTENT_FAILURE:
            return {...state, loading: false, finished: false};
        case types.CONTENT_SUCCESS:
            return {
                ...state,
                loading: false,
                finished: true,
                ...action.payload,
            };
        case types.CONTENT_CATEGORIES_RESET:
            return {...state, categoriesLoading: true, categories: []};
        case types.CONTENT_CATEGORIES_REQUEST:
            return {...state, categoriesLoading: true};
        case types.CONTENT_CATEGORIES_FAILURE:
            return {...state, categoriesLoading: false};
        case types.CONTENT_CATEGORIES_SUCCESS:
            return {
                ...state,
                categoriesLoading: false,
                categories: action.payload.filter((category) => category.parentCategoryId === null),
            };
        case types.CONTENT_CATEGORY_LOADING:
            const newCategories = state.categories.map((item) =>
                item.id === action.payload ? {...item, loading: true} : item,
            );
            return {
                ...state,
                categories: newCategories,
            };
        case types.SET_CONTENT_SUBCATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };

        default:
            return state;
    }
}
