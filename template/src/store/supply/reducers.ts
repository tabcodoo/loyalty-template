import * as types from './types';

const INITIAL_STATE = {
    loading: false,
    categoriesLoading: false,
    finished: false,
    isEnabled: false,
    categories: [],
    filteredSupplies: {
        loading: true,
        lastIndex: 0,
        endReached: false,
        supplies: [],
    },
    objects: [],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'RESET_SUPPLY':
        case 'RESET':
            return {...INITIAL_STATE};
        case types.SUPPLY:
            return {...state};
        case types.SUPPLY_REQUEST:
            return {...state, loading: true, finished: false};
        case types.SUPPLY_FAILURE:
            return {...state, loading: false, finished: false};
        case types.SUPPLY_SUCCESS:
            return {
                ...state,
                loading: false,
                finished: true,
                ...action.payload,
            };
        case types.SUPPLY_CATEGORIES_RESET:
            return {...state, categoriesLoading: true, categories: []};
        case types.SUPPLY_CATEGORIES_REQUEST:
            return {...state, categoriesLoading: true};
        case types.SUPPLY_CATEGORIES_FAILURE:
            return {...state, categoriesLoading: false};
        case types.SUPPLY_CATEGORIES_SUCCESS:
            return {
                ...state,
                categoriesLoading: false,
                categories: action.payload.filter((category) => category.parentCategoryId === null),
            };
        case types.CATEGORY_LOADING:
            const newCategories = state.categories.map((item) =>
                item.id === action.payload ? {...item, loading: true} : item,
            );
            return {
                ...state,
                categories: newCategories,
            };
        case types.SET_SUBCATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };

        case types.SET_SUPPLY_SUBCATEGORY_ITEMS_LOADING:
            const {subCategoryItem, categoryIndex} = action.payload ?? {};
            const newSubCategories = state.categories[categoryIndex]?.subCategories.map((item) =>
                item.id === subCategoryItem.id ? {...item, loading: true} : item,
            );
            const newData = state.categories.map((item, index) =>
                index == categoryIndex ? {...item, subCategories: newSubCategories} : item,
            );
            return {
                ...state,
                categories: newData,
            };

        case types.SET_SUPPLIES:
            return {
                ...state,
                filteredSupplies: action.payload,
            };
        case types.SET_SUPPLIES_LOADING:
            return {
                ...state,
                filteredSupplies: {
                    ...state.filteredSupplies,
                    loading: true,
                },
            };
        case types.SET_OBJECTS:
            return {
                ...state,
                objects: action.payload,
            };

        default:
            return state;
    }
}
