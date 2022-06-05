import * as types from './types';
import api from 'services/api';
import {convertPaginationToString, convertSortingToString} from 'constants';
import actions from 'store/actions';

function notifications(payload) {
    return {
        type: types.NOTIFICATIONS,
        payload,
    };
}

function notificationsRequest() {
    return {
        type: types.NOTIFICATIONS_REQUEST,
    };
}

function notificationsSuccess(response, requestObject) {
    return {
        type: types.NOTIFICATIONS_SUCCESS,
        payload: {response, requestObject},
    };
}

function notificationsFailure(error) {
    return {
        type: types.NOTIFICATIONS_FAILURE,
        payload: error,
    };
}
export function resetNotifications() {
    return {
        type: 'RESET_NOTIFICATIONS',
    };
}

export function getNotifications() {
    return async (dispatch, getState) => {
        const {
            notifications,
            user: {language},
        } = getState();
        if (notifications.loading) return;
        dispatch(notificationsRequest());
        try {
            // let response = await api.get('app/mobile-notifications');
            let reqString = convertPaginationToString(notifications.requestObject.paginationModel);
            // let sortingString = convertSortingToString(notifications.requestObject.sortingModels);
            let {
                data: {payload},
            } = await api.get('app/mobile-notifications' + reqString, language);
            // console.tron.log('payload', payload);
            // dispatch(notificationsSuccess(response.data.payload));
            dispatch(
                notificationsSuccess(payload, {
                    ...notifications.requestObject,
                    paginationModel: {
                        ...notifications.requestObject.paginationModel,
                        index: payload.length + notifications.data.length,
                    },
                }),
            );
        } catch (error) {
            dispatch(notificationsFailure(error.message));
        }
    };
}

export function deleteNotification(
    index = -1,
    indexInArray = -1,
    callback: () => {},
    errCallback: () => {},
) {
    return async (dispatch, getState) => {
        const {data: notifications} = getState().notifications;
        dispatch(actions.getUser(true));

        try {
            let arr = notifications.slice();

            if (indexInArray !== -1) {
                arr.splice(indexInArray, 1);
            }

            // let {
            //     data: {payload},
            // } = await api.get('loyalty/coupons');
            // dispatch()

            dispatch({
                type: types.DELETE_NOTIFICATION,
                payload: arr,
            });
            let res = await api.delete('app/delete-mobile-notification/' + index);

            // dispatch(getNotifications());
        } catch (error) {
            errCallback();
            // dispatch(couponsFailure(error.message));
        }
    };
}
