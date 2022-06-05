import * as types from './types';

const INITIAL_STATE = {
  loading: false,
  finished: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.<%= name.toUpperCase() %>:
      return { ...state};
    case types.<%= name.toUpperCase() %>_REQUEST:
      return { ...state, loading: true, finished: false };
    case types.<%= name.toUpperCase() %>_FAILURE:
      return { ...state, loading: false, finished: false };
    case types.<%= name.toUpperCase() %>_SUCCESS:
      return { ...state, loading: false, finished: true };
    default:
      return state;
  }
}