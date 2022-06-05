import * as types from './types';

export function setRegisterForm(payload) {
  return {
    type: types.REGISTERFORMOBJECT,
    payload,
  };
}

// function registerFormObjectRequest() {
//   return {
//     type: types.REGISTERFORMOBJECT_REQUEST,
//   };
// }

// function registerFormObjectSuccess(response) {
//   return {
//     type: types.REGISTERFORMOBJECT_SUCCESS,
//     payload: response,
//   };
// }

// function registerFormObjectFailure(error) {
//   return {
//     type: types.REGISTERFORMOBJECT_FAILURE,
//     payload: error,
//   };
// }

// export function registerFormObject() {
//   return async (dispatch) => {
//     dispatch(registerFormObjectRequest());
//     try {
//       const response = 'Success';
//       dispatch(registerFormObjectSuccess(response));
//     } catch (error) {
//       dispatch(registerFormObjectFailure(error.message));
//     }
//   };
// }
