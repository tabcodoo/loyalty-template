import * as types from './types';

const INITIAL_STATE = {
    loading: true,
    finished: false,
    currentOrder: null,
    history: [],
    requestObject: {
        filterModels: [
            {
                filterDescriptor: 'string',
                filterValue: 'string',
            },
        ],
        sortingModels: [
            {
                sortingDescriptor: 'dateProcessed',
                sortingValue: 'DESC',
                sortingOrder: 0,
            },
        ],
        paginationModel: {
            index: 0,
            count: 100,
        },
    },
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.ORDERS:
            return {...state};
        case types.ORDERS_REQUEST:
            return {...state, loading: true, finished: false};
        case types.ORDERS_FAILURE:
            return {...state, loading: false, finished: false};
        case types.ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                finished: true,
                history: action.payload,
            };
        case types.CREATED_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                finished: true,
                currentOrder: action.payload,
            };
        case types.RESET_ORDERS:
            return INITIAL_STATE;
        default:
            return state;
    }
}
