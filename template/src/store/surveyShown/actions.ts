import * as types from './types';
import api from 'services/api';

export function toggleSurveyOpened() {
    return {
        type: types.SURVEYSHOWN_TOGGLE,
    };
}
