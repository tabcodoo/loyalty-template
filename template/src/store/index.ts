import {applyMiddleware, createStore, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import {rootReducer} from './reducers';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {Platform} from 'react-native';

const persistConfig = {
    timeout: null,
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    blacklist: [
        'registerFormObject',
        'surveys',
        'undesirableFood',
        // 'myActivities',
        'availableActivities',
        'supply',
        'content',
        'appAlreadyOpenedFromNotification',
    ],
    whitelist: [
        'user',
        'loginCredentials',
        'dashboard',
        'notificationAllowed',
        'cart',
        'wasGuest',
        'surveyShown',
        'orders',
        // 'offerCategoriesFilters',
    ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
let middleware = [thunk];

if (__DEV__ && Platform.OS === 'android') {
    const createDebugger = require('redux-flipper').default;
    middleware.push(createDebugger());
}

let store = createStore(persistedReducer, compose(applyMiddleware(...middleware)));

export default store;
export const persistor = persistStore(store);
