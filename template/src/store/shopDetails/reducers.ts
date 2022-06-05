import * as types from './types';

const INITIAL_STATE = {
  loading: false,
  finished: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SHOPDETAILS:
      return { ...state};
    case types.SHOPDETAILS_REQUEST:
      return { ...state, loading: true, finished: false };
    case types.SHOPDETAILS_FAILURE:
      return { ...state, loading: false, finished: false };
    case types.SHOPDETAILS_SUCCESS:
      return { ...state, loading: false, finished: true };
    default:
      return state;
  }
}