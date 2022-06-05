import * as types from './types';

const INITIAL_STATE = false;

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.SURVEYSHOWN_TOGGLE:
            return true;
        default:
            return state;
    }
}
