import * as types from './types';

// Initial state is string so when system theme is set, theme cannot be changed
const INITIAL_STATE = '';

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case types.DARKTHEME:
      return action.payload;
    default:
      return state;
  }
}
