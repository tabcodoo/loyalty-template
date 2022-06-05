import * as types from './types';

export function setDarkTheme(payload) {
  return {
    type: types.DARKTHEME,
    payload,
  };
}
