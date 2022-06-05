import * as types from './types';
import api from 'services/api';

export function appAlreadyOpenedFromNotificationSuccess() {
    return {
        type: types.APPALREADYOPENEDFROMNOTIFICATION_SUCCESS,
    };
}
