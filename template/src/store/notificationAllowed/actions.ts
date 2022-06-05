import * as types from './types';

export function setNotificationAllowed(payload) {
    return {
        type: types.NOTIFICATIONALLOWED,
        payload,
    };
}
