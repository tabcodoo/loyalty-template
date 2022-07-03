import * as types from './types';
import moment from 'moment';

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
            count: 100,
        },
    },
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'RESET':
            return {...INITIAL_STATE};
        case 'RESET_COUPONS':
            return {...INITIAL_STATE};
        case types.COUPONS:
            return {...state};
        case types.COUPONS_REQUEST:
            return {...state, loading: true, finished: true};
        case types.COUPONS_FAILURE:
            return {...state, loading: false, finished: true};
        case types.COUPONS_SUCCESS:
            return {
                ...state,
                loading: false,
                finished: true,
                data: [...state.data, ...action.payload.response].sort(
                    (x, y) =>
                        // false values first
                        (x.isUsed ||
                            moment().isAfter(
                                moment.utc(x.dateActivated).add(5, 'minutes').add(1, 'seconds'),
                            )) -
                        (y.isUsed ||
                            moment().isAfter(
                                moment.utc(y.dateActivated).add(5, 'minutes').add(1, 'seconds'),
                            )),
                ),
                requestObject: action.payload.requestObject,
            };
        case types.COUPONS_REFRESH:
            return {
                ...state,
                data: action.payload.sort(
                    (x, y) =>
                        // false values first
                        (x.isUsed ||
                            moment().isAfter(
                                moment.utc(x.dateActivated).add(5, 'minutes').add(1, 'seconds'),
                            )) -
                        (y.isUsed ||
                            moment().isAfter(
                                moment.utc(y.dateActivated).add(5, 'minutes').add(1, 'seconds'),
                            )),
                ),
                requestObject: {
                    ...state.requestObject,
                    paginationModel: {
                        ...state.requestObject.paginationModel,
                        index: action.payload.length,
                    },
                },
            };
        case types.ACTIVATE_COUPON:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        default:
            return state;
    }
}
