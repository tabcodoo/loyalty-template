import * as types from './types';

const INITIAL_STATE = null;

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.NOTIFICATIONALLOWED:
            return action.payload;
        default:
            return state;
    }
}
