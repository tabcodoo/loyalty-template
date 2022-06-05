import * as types from './types';

const INITIAL_STATE = {
  loading: false,
  finished: false,
};
export const initialForm = {
  username: '',
  email: '',
  phoneNumber: '',
  imageBase64: null,
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: null,
  gender: '1',
  weight: undefined,
  height: undefined,
};

export default function (state = initialForm, action) {
  switch (action.type) {
    case types.REGISTERFORMOBJECT:
      return {...state, ...action.payload};
    // case types.REGISTERFORMOBJECT_REQUEST:
    //   return { ...state, loading: true, finished: false };
    // case types.REGISTERFORMOBJECT_FAILURE:
    //   return { ...state, loading: false, finished: false };
    // case types.REGISTERFORMOBJECT_SUCCESS:
    //   return { ...state, loading: false, finished: true };
    default:
      return state;
  }
}
