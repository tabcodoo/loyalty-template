import * as types from './types';
import api from 'services/api';

function globalBottomSheetSuccessNew(response) {
    return {
        type: types.SET_GLOBAL_SHEET_NEW,
        payload: response,
    };
}

export function setGlobalBottomSheetNew(opened = true, body = null, snapPoints = [0, '60%']) {
    return async (dispatch) => {
        // console.tron.log('setGlobalBottomSheet', {opened, body, snapPoints});
        dispatch(globalBottomSheetSuccessNew({opened, body, snapPoints}));
    };
}

export function resetGlobalBottomSheetNew() {
    return {
        type: types.RESET_GLOBAL_SHEET_NEW,
    };
}
