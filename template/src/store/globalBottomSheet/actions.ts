import * as types from './types';
import api from 'services/api';

function globalBottomSheetSuccess(response) {
    return {
        type: types.SET_GLOBAL_SHEET,
        payload: response,
    };
}

export function setGlobalBottomSheet(opened = true, body = null, snapPoints = [0, '60%']) {
    return async (dispatch) => {
        // console.tron.log('setGlobalBottomSheet', {opened, body, snapPoints});
        dispatch(globalBottomSheetSuccess({opened, body, snapPoints}));
    };
}

export function resetGlobalBottomSheet() {
    return {
        type: types.RESET_GLOBAL_SHEET,
    };
}
