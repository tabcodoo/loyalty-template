import * as types from './types';
import api from 'services/api';
import constants from '@constants';
import DropdownHolder from 'services/DropDownHolder';
import actions from 'store/actions';

export function setUser(payload) {
    return {
        type: types.USER,
        payload,
    };
}

export function changeLanguage(payload) {
    return {
        type: types.CHANGE_LANGUAGE,
        payload,
    };
}

export function resetUser(payload) {
    return {
        type: types.RESET_USER,
        payload,
    };
}

function userRequest() {
    return {
        type: types.USER_REQUEST,
    };
}

export function userSuccess(response) {
    return {
        type: types.USER_SUCCESS,
        payload: response,
    };
}

function userFailure(error) {
    return {
        type: types.USER_FAILURE,
        payload: error,
    };
}

function deliveryData(data) {
    return {
        type: types.DELIVERY_DATA,
        payload: data,
    };
}
function deleteDeliveryData() {
    return {
        type: types.RESET_DELIVERY_DATA,
    };
}

export function setObject(data) {
    return {
        type: types.SELECT_OBJECT,
        payload: data,
    };
}

export function getUser(skipModules: boolean = false, callback: any = () => {}) {
    return async (dispatch, getState) => {
        const {user} = getState();

        dispatch(userRequest());
        try {
            let {data} = await api.get('/identity', user?.language);
            // console.tron.log('getUser', response);
            dispatch(userSuccess({...data, authProvider: user.authProvider}));
            callback();
            if (!skipModules) dispatch(exportModules());
        } catch (error) {
            // console.tron.log(error, error.response.status, error.response.data.errorCode);

            if (error.response.data.errorCode === 103) {
                dispatch(actions.reset());
            }
            dispatch(userFailure(error.message));
        }
    };
}

export function exportModules() {
    return async (dispatch, getState) => {
        const {user} = getState();
        try {
            let navigationModules = [
                {
                    key: 'supply',
                    action: (object = {}) => {
                        dispatch(actions.setSupply(object));
                    },
                    reset: () => {
                        dispatch(actions.resetSupply());
                    },
                },
                {
                    key: 'content',
                    action: (object = {}) => {
                        dispatch(actions.setContent(object));
                    },
                    reset: () => {
                        dispatch(actions.resetContent());
                    },
                },
            ];

            let createNavigationModules = (navigationItems = []) => {
                navigationModules.forEach((module) => {
                    let index = navigationItems.findIndex(
                        (item) => item?.name.toLowerCase() === module.key,
                    );
                    if (index !== -1) {
                        // console.tron.log('navigationItems[index]', navigationItems[index]);
                        module.action(navigationItems[index]);
                    } else {
                        module.reset();
                    }
                });
            };

            if (!!user?.modules) {
                let moduleIndex = user?.modules.findIndex(
                    (module) => module.id === constants.moduleId,
                );
                if (moduleIndex !== -1) {
                    let navigationModuleIndex = user?.modules[
                        moduleIndex
                    ]?.navigationModules.findIndex(
                        (navigationModule) => navigationModule.moduleId === constants.moduleId,
                    );

                    if (navigationModuleIndex !== -1) {
                        // user?.modules[moduleIndex]?.navigationModules[navigationModuleIndex]
                        //     ?.navigationItems;
                        createNavigationModules(
                            user?.modules[moduleIndex]?.navigationModules[navigationModuleIndex]
                                ?.navigationItems,
                        );
                    }
                }
            }
        } catch (error) {
            // dispatch(userFai&lure(error.message));
        }
    };
}

export function login(user, errorCallback = (key) => {}, callback = () => {}) {
    return async (dispatch, getState) => {
        let {
            user: {language},
        } = getState();
        dispatch(userRequest());
        try {
            let {data} = await api.post('/identity/mobile-login', {
                ...user,
                moduleId: constants.moduleId,
                applicationId: constants.applicationId,
            });
            let {token, refreshToken} = data;
            if (token) {
                api.setToken(token, language);
                dispatch(
                    userSuccess({
                        ...data.user,
                        token,
                    }),
                );
                callback();
            } else {
                if (data.errorCode === 24) {
                    DropdownHolder.dropDown.alertWithType(
                        'error',
                        '',
                        errorCallback(`errors.err_24`),
                    );
                } else if (data.errorCode === 11)
                    DropdownHolder.dropDown.alertWithType(
                        'error',
                        'Greška',
                        errorCallback(`errors.err_11`),
                    );
                else if (data.errorCode === 2)
                    DropdownHolder.dropDown.alertWithType(
                        'error',
                        'Greška',
                        errorCallback(`errors.err_2`),
                    );
                else
                    DropdownHolder.dropDown.alertWithType(
                        'error',
                        'Greška',
                        errorCallback(`errors.err_1`),
                    );
                dispatch(userFailure(''));
            }
        } catch (error) {
            dispatch(userFailure(error.message));
        }
    };
}

export function guestLogin(callback = () => {}, language = 'ba') {
    return async (dispatch, getState) => {
        let {
            user: {language},
        } = getState();

        dispatch(userRequest());
        try {
            let {data} = await api.post('/identity/guest-login', {
                moduleId: constants.moduleId,
                applicationId: constants.applicationId,
            });
            let {token, refreshToken} = data;
            if (token) {
                callback();
                api.setToken(token, language);
                dispatch(
                    userSuccess({
                        ...data.user,
                        // userRole: 'shop',
                        token,
                    }),
                );
            } else {
                // if (data.errorCode === 3) {
                //     DropdownHolder.dropDown.alertWithType(
                //         'error',
                //         '',
                //         errorCallback(`errors.err_1`),
                //     );
                // }
                // dispatch(userFailure(''));
            }
        } catch (error) {
            dispatch(userFailure(error.message));
        }
    };
}

export function phoneLogin(user, errorCallback = (key) => {}, language = 'ba') {
    return async (dispatch, getState) => {
        let {
            user: {language},
        } = getState();
        dispatch(userRequest());
        try {
            let {data} = await api.post('/identity/sms-login', {
                ...user,
                moduleId: constants.moduleId,
                applicationId: constants.applicationId,
            });
            let {token, refreshToken} = data;
            if (token) {
                api.setToken(token, language);
                dispatch(
                    userSuccess({
                        ...data.user,
                        // userRole: 'shop',
                        token,
                    }),
                );
            } else {
                if (data.errorCode === 3) {
                    DropdownHolder.dropDown.alertWithType(
                        'error',
                        '',
                        errorCallback(`errors.err_1`),
                    );
                }
                dispatch(userFailure(''));
            }
        } catch (error) {
            dispatch(userFailure(error.message));
        }
    };
}

export function shopLogin(user, errorCallback = (key) => {}) {
    return async (dispatch, getState) => {
        let {
            user: {language},
        } = getState();
        dispatch(userRequest());
        try {
            let {data} = await api.post('/identity/shop-login', {
                ...user,
                moduleId: constants.moduleId,
                applicationId: constants.applicationId,
            });
            let {token, refreshToken} = data;
            if (token) {
                api.setToken(token, language);
                dispatch(
                    userSuccess({
                        ...data.user,
                        userRole: 'shop',
                        token,
                    }),
                );
            } else {
                if (data.errorCode === 3) {
                    DropdownHolder.dropDown.alertWithType(
                        'error',
                        '',
                        errorCallback(`errors.err_1`),
                    );
                }
                dispatch(userFailure(''));
            }
        } catch (error) {
            dispatch(userFailure(error.message));
        }
    };
}

export function register(user, callback = () => {}) {
    return async (dispatch) => {
        dispatch(userRequest());
        try {
            let response = await api.post('/identity/register', {
                ...user,
                requestedModules: [{moduleId: constants.moduleId}],
                applicationId: constants.applicationId,
                tosAgreement: true,
            });
            dispatch({
                type: types.REGISTER_SUCCESS,
            });
            callback();
        } catch (error) {
            dispatch(userFailure(error.message));
        }
    };
}

export function changePassword(requestObject, callback = () => {}) {
    return async (dispatch) => {
        dispatch(userRequest());
        try {
            let response = await api
                .post('/identity/changePassword', {
                    ...requestObject,
                    applicationId: constants.applicationId,
                })
                .then(() => {
                    DropdownHolder.dropDown.alertWithType(
                        'success',
                        '',
                        callback(`success.changePassword`),
                    );
                });

            dispatch({
                type: types.REGISTER_SUCCESS,
            });
            callback();
        } catch (error) {
            dispatch(userFailure(error.message));
        }
    };
}

export function setDeliveryData(data) {
    return (dispatch) => {
        dispatch(deliveryData(data));
    };
}
export function resetDeliveryData() {
    return (dispatch) => {
        dispatch(deleteDeliveryData());
    };
}

export function updateLanguageSettings(languageString) {
    return async (dispatch, getState) => {
        const {
            user: {language},
        } = getState();

        try {
            const {data} = await api.get('/settings/getUserSettings', language);
            const newData = {...data, language: language};
            await api.put('/settings/updateSettings', newData);
            dispatch(changeLanguage(languageString));
            dispatch(actions.getAllSupplies());
            dispatch(actions.getContentCategories());
            dispatch(actions.getCategories());
            dispatch(actions.getCoupons());
            dispatch(actions.getCart());
        } catch (e) {
            console.log('UPDATE LANGUAGE ERROR', e);
        }
    };
}
