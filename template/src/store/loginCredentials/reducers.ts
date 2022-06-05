import * as types from './types';

const INITIAL_STATE = '';

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGINCREDENTIALS:
      return action.payload;
    default:
      return state;
  }
}
