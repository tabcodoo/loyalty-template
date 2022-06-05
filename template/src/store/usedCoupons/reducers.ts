import * as types from './types';
import moment from 'moment';

const INITIAL_STATE = {
    loading: false,
    finished: false,
    data: [],
    totalSavings: 0,
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
            count: 100,
        },
    },
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'RESET':
            return {...INITIAL_STATE};
        case 'RESET_USED_COUPONS':
            return {...INITIAL_STATE};
        case types.USEDCOUPONS:
            return {...state};
        case types.USEDCOUPONS_REQUEST:
            return {...state, loading: true, finished: false};
        case types.USEDCOUPONS_FAILURE:
            return {...state, loading: false, finished: false};
        case types.USEDCOUPONS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: [...state.data, ...action.payload.response],
                requestObject: action.payload.requestObject,
                totalSavings: action.payload.totalSavings,
            };
        default:
            return state;
    }
}
