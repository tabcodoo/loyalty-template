import * as types from './types';

const INITIAL_STATE = {
    loading: false,
    finished: false,
    data: [],
    requestObject: {
        filterModels: [
            {
                filterDescriptor: 'string',
                filterValue: 'string',
            },
        ],
        sortingModels: [
            {
                sortingDescriptor: 'dateCreated',
                sortingValue: 'ASC',
                sortingOrder: 0,
            },
        ],
        paginationModel: {
            index: 0,
            count: 10,
        },
    },
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'RESET_NOTIFICATIONS':
            // console.tron.log('RESET_NOTIFICATIONS');
            return {
                ...INITIAL_STATE,
                // loading: true,
            };
        case types.NOTIFICATIONS:
            return {...state};
        case types.NOTIFICATIONS_REQUEST:
            return {...state, loading: true, finished: false};
        case types.NOTIFICATIONS_FAILURE:
            return {...state, loading: false, finished: false};
        case types.NOTIFICATIONS_SUCCESS:
            // console.tron.log(types.NOTIFICATIONS_SUCCESS);

            return {
                ...state,
                loading: false,
                finished: true,
                data: [...state.data, ...action.payload.response],
                requestObject: action.payload.requestObject,
            };
        case types.DELETE_NOTIFICATION:
            return {
                ...state,
                loading: false,
                finished: true,
                data: action.payload,
            };
        default:
            return state;
    }
}
