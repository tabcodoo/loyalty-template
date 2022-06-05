import * as types from './types';
import api from 'services/api';

export function setWasGuest() {
    return {
        type: types.WASGUEST,
    };
}
