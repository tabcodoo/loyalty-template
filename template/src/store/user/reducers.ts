import * as types from './types';

export const initialUser = {
    loading: false,
    token: '',
    userRole: '',
    language: 'ba',
    deliveryData: null,
    selectedObject: null,
};

export default function (state = initialUser, action) {
    switch (action.type) {
        case types.USER:
            return {...state, ...action.payload};
        case types.RESET_USER:
            return {
                ...initialUser,
                ...action.payload,
                token: null,
                loading: false,
            };
        case types.USER_REQUEST:
            return {...state, loading: true};
        case types.USER_FAILURE:
            return {...state, loading: false};
        case types.USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
            };
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case types.DELIVERY_DATA:
            return {
                ...state,
                deliveryData: action.payload,
            };
        case types.RESET_DELIVERY_DATA:
            return {
                ...state,
                deliveryData: null,
            };
        case types.CHANGE_LANGUAGE:
            return {...state, language: action.payload};
        case types.SELECT_OBJECT: {
            return {...state, selectedRoom: action.payload};
        }
        case 'RESET':
            return {
                ...initialUser,
                language: state.language,
            };
        default:
            return state;
    }
}
