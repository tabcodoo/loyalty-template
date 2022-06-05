import * as types from './types';

export function setLoginCredentials(payload) {
  return {
    type: types.LOGINCREDENTIALS,
    payload,
  };
}
