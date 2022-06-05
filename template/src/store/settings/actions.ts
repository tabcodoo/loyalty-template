
import * as types from './types';
import api from 'services/api';

function settings(payload) {
    return {
      type: types.SETTINGS,
      payload
    };
  }

function settingsRequest() {
  return {
    type: types.SETTINGS_REQUEST,
  };
}

function settingsSuccess(response) {
  return {
    type: types.SETTINGS_SUCCESS,
    payload: response,
  };
}

function settingsFailure(error) {
  return {
    type: types.SETTINGS_FAILURE,
    payload: error,
  };
}

export function getsettings() {
  return async (dispatch) => {
    dispatch(settingsRequest());
    try {
      let response = await api.get('');
      
      dispatch(settingsSuccess(response.data.payload));
    } catch (error) {
      dispatch(settingsFailure(error.message));
    }
  };
}