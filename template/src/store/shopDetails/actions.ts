
import * as types from './types';
import api from 'services/api';

function shopDetails(payload) {
    return {
      type: types.SHOPDETAILS,
      payload
    };
  }

function shopDetailsRequest() {
  return {
    type: types.SHOPDETAILS_REQUEST,
  };
}

function shopDetailsSuccess(response) {
  return {
    type: types.SHOPDETAILS_SUCCESS,
    payload: response,
  };
}

function shopDetailsFailure(error) {
  return {
    type: types.SHOPDETAILS_FAILURE,
    payload: error,
  };
}

export function getshopDetails() {
  return async (dispatch) => {
    dispatch(shopDetailsRequest());
    try {
      let response = await api.get('');
      
      dispatch(shopDetailsSuccess(response.data.payload));
    } catch (error) {
      dispatch(shopDetailsFailure(error.message));
    }
  };
}