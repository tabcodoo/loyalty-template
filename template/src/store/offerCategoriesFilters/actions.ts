import * as types from './types';
import api from 'services/api';
import actions from 'store/actions';

function offerCategoriesFilters(payload) {
    return {
        type: types.OFFERCATEGORIESFILTERS,
        payload,
    };
}

function offerCategoriesFiltersRequest() {
    return {
        type: types.OFFERCATEGORIESFILTERS_REQUEST,
    };
}

function offerCategoriesFiltersFailure(error) {
    return {
        type: types.OFFERCATEGORIESFILTERS_FAILURE,
        payload: error,
    };
}

export function offerCategoriesFiltersSuccess(response) {
    return {
        type: types.OFFERCATEGORIESFILTERS_SUCCESS,
        payload: response,
    };
}

export function toggleEdit() {
    return {
        type: types.TOGGLE_EDIT,
    };
}

export function categoriesFiltersSuccess(response) {
    return {
        type: types.FILTER_CATEGORIES_SELECTED_SUCCESS,
        payload: response,
    };
}

export function getSelectedFilterCategories() {
    return async (dispatch, getState) => {
        // dispatch(categoriesSelectedRequest());
        const {user} = getState();
        if (!user?.groupCouponsByCategory) return;
        try {
            let response = await api.get('loyalty/user-filters?filterType=view', user?.language);
            dispatch(offerCategoriesFiltersSuccess(response.data.payload));
            dispatch(actions.resetCoupons());
            dispatch(actions.getCoupons());
        } catch (error) {
            // dispatch(categoriesSelectedFailure(error.message));
        }
    };
}

// export function addCategoriesFilter(categoryId) {
//     // return async (dispatch, getState) => {
//     //     let {offerCategoriesFilters} = getState();
//     //     let copy = offerCategoriesFilters.categoriesSelected.slice();
//     //     copy.push({categoryId});
//     //     dispatch(categoriesFiltersSuccess(copy));
//     //     // setTimeout(() => {
//     //     dispatch(actions.resetCoupons());
//     //     dispatch(actions.getCoupons());
//     //     // }, 200);
//     // };
// }

// export function removeCategoriesFilter(categoryId) {
//     // return async (dispatch, getState) => {
//     //     let {offerCategoriesFilters} = getState();
//     //     let copy = offerCategoriesFilters.categoriesSelected.slice();
//     //     let index = copy.findIndex((category) => category.categoryId === categoryId);
//     //     if (index !== -1) copy.splice(index, 1);
//     //     // console.tron.log('removeCategoriesFilter', index, categoryId, offerCategoriesFilters, copy);
//     //     dispatch(categoriesFiltersSuccess(copy));
//     //     dispatch(actions.resetCoupons());
//     //     dispatch(actions.getCoupons());
//     // };
// }

export function addCategoriesFilter(id) {
    return async (dispatch) => {
        // dispatch(categoriesSelectedRequest());
        try {
            let response = await api.post(`loyalty/enable-user-filter?categoryId=${id}`);
            // console.tron.log(response);

            // dispatch(getSelectedCategories());
            dispatch(offerCategoriesFiltersSuccess(response.data.payload));
            dispatch(actions.resetCoupons());
            dispatch(actions.getCoupons());
        } catch (error) {
            // dispatch(categoriesSelectedFailure(error.message));
        }
    };
}

export function addCategoriesFilterBracom(categories) {
    return async (dispatch) => {
        // dispatch(categoriesSelectedRequest());
        try {
            categories.forEach(async (category, index) => {
                api.post(`loyalty/enable-user-filter?categoryId=${category?.id}`);
            });
            const response = await api.post(
                `loyalty/enable-user-filter?categoryId=${categories.pop()?.id}`,
            );
            dispatch(offerCategoriesFiltersSuccess(response.data.payload));
            dispatch(actions.resetCoupons());
            dispatch(actions.getCoupons());
        } catch (error) {
            // dispatch(categoriesSelectedFailure(error.message));
        }
    };
}

export function removeCategoriesFilterBracom(categories) {
    return async (dispatch) => {
        // dispatch(categoriesSelectedRequest());
        try {
            categories.forEach((category) => {
                api.delete(`loyalty/disable-user-filter/${category?.id}`);
            });
            const response = await api.delete(
                `loyalty/disable-user-filter/${categories.pop()?.id}`,
            );

            dispatch(offerCategoriesFiltersSuccess(response.data.payload));
            dispatch(actions.resetCoupons());
            dispatch(actions.getCoupons());
        } catch (error) {
            // dispatch(categoriesSelectedFailure(error.message));
        }
    };
}

export function removeCategoriesFilter(id) {
    return async (dispatch) => {
        // dispatch(categoriesSelectedRequest());
        try {
            let response = await api.delete(`loyalty/disable-user-filter/${id}`);
            // dispatch(getSelectedCategories());
            dispatch(offerCategoriesFiltersSuccess(response.data.payload));
            dispatch(actions.resetCoupons());
            dispatch(actions.getCoupons());
        } catch (error) {
            // dispatch(categoriesSelectedFailure(error.message));
        }
    };
}

export function toggleAllFilterCategories(enable = false, filterType = 'view') {
    return async (dispatch) => {
        // dispatch(categoriesSelectedRequest());
        try {
            let response = await api.post(
                `loyalty/${
                    enable ? 'enable' : 'disable'
                }-all-user-filters?filterType=${filterType}`,
            );

            dispatch(offerCategoriesFiltersSuccess(response.data.payload));
            dispatch(actions.resetCoupons());
            dispatch(actions.getCoupons());
        } catch (error) {
            // dispatch(categoriesSelectedFailure(error.message));
        }
    };
}
