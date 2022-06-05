import * as types from './types';

const INITIAL_STATE = {
    opened: false,
    body: null,
    snapPoints: [0, '60%'],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GLOBALBOTTOMSHEET_NEW:
            return {...state};
        case types.SET_GLOBAL_SHEET_NEW:
            return {
                ...state,
                ...action.payload,
            };
        case types.RESET_GLOBAL_SHEET_NEW:
            return {
                ...INITIAL_STATE,
            };

        default:
            return state;
    }
}
