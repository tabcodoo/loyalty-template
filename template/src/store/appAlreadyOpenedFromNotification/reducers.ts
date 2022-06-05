import * as types from './types';

const INITIAL_STATE = false;

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.APPALREADYOPENEDFROMNOTIFICATION_SUCCESS:
            return true;
        default:
            return state;
    }
}
