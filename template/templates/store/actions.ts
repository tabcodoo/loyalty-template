
import * as types from './types';
import api from 'services/api';

function <%= name %>(payload) {
    return {
      type: types.<%= name.toUpperCase() %>,
      payload
    };
  }

function <%= name %>Request() {
  return {
    type: types.<%= name.toUpperCase() %>_REQUEST,
  };
}

function <%= name %>Success(response) {
  return {
    type: types.<%= name.toUpperCase() %>_SUCCESS,
    payload: response,
  };
}

function <%= name %>Failure(error) {
  return {
    type: types.<%= name.toUpperCase() %>_FAILURE,
    payload: error,
  };
}

export function get<%= name %>() {
  return async (dispatch) => {
    dispatch(<%= name %>Request());
    try {
      let response = await api.get('');
      
      dispatch(<%= name %>Success(response.data.payload));
    } catch (error) {
      dispatch(<%= name %>Failure(error.message));
    }
  };
}