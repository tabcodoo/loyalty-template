import * as types from './types';
import api from 'services/api';

function offerCategoriesSettings(payload) {
    return {
        type: types.OFFERCATEGORIESSETTINGS,
        payload,
    };
}

function offerCategoriesSettingsRequest() {
    return {
        type: types.OFFERCATEGORIESSETTINGS_REQUEST,
    };
}

export function offerCategoriesSettingsSuccess(response) {
    return {
        type: types.OFFERCATEGORIESSETTINGS_SUCCESS,
        payload: response,
    };
}

function offerCategoriesSettingsFailure(error) {
    return {
        type: types.OFFERCATEGORIESSETTINGS_FAILURE,
        payload: error,
    };
}

// export function getofferCategoriesSettings() {
//   return async (dispatch) => {
//     dispatch(offerCategoriesSettingsRequest());
//     try {
//       let response = await api.get('');

//       dispatch(offerCategoriesSettingsSuccess(response.data.payload));
//     } catch (error) {
//       dispatch(offerCategoriesSettingsFailure(error.message));
//     }
//   };
// }

function categoriesSelectedRequest() {
    return {
        type: types.CATEGORIES_SELECTED_REQUEST,
    };
}

export function categoriesSelectedSuccess(response) {
    return {
        type: types.CATEGORIES_SELECTED_SUCCESS,
        payload: response,
    };
}

function categoriesSelectedFailure(error) {
    return {
        type: types.CATEGORIES_SELECTED_FAILURE,
        payload: error,
    };
}

export function getSelectedSettingsCategories() {
    return async (dispatch, getState) => {
        const {user} = getState();
        if (!user?.groupCouponsByCategory) return;
        dispatch(categoriesSelectedRequest());
        try {
            let response = await api.get(
                'loyalty/user-filters?filterType=notification',
                user?.location,
            );
            dispatch(offerCategoriesSettingsSuccess(response.data.payload));
        } catch (error) {
            dispatch(categoriesSelectedFailure(error.message));
        }
    };
}

export function setSelectedCategory(id) {
    return async (dispatch) => {
        dispatch(categoriesSelectedRequest());
        try {
            let response = await api.post(`loyalty/enable-user-filter?categoryId=${id}`);
            // console.tron.log(response);

            // dispatch(getSelectedCategories());
            dispatch(offerCategoriesSettingsSuccess(response.data.payload));
        } catch (error) {
            dispatch(categoriesSelectedFailure(error.message));
        }
    };
}

export function deleteSelectedCategory(id) {
    return async (dispatch) => {
        // dispatch(categoriesSelectedRequest());
        try {
            let response = await api.delete(`loyalty/disable-user-filter/${id}`);
            // dispatch(getSelectedCategories());
            dispatch(offerCategoriesSettingsSuccess(response.data.payload));
        } catch (error) {
            // dispatch(categoriesSelectedFailure(error.message));
        }
    };
}

export function toggleAllSettingsCategories(enable = false, filterType = 'notification') {
    return async (dispatch) => {
        // dispatch(categoriesSelectedRequest());
        try {
            let response = await api.post(
                `loyalty/${
                    enable ? 'enable' : 'disable'
                }-all-user-filters?filterType=${filterType}`,
            );

            dispatch(offerCategoriesSettingsSuccess(response.data.payload));
        } catch (error) {
            // dispatch(categoriesSelectedFailure(error.message));
        }
    };
}
