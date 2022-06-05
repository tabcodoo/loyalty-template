import {combineReducers} from 'redux';

import appAlreadyOpenedFromNotification from './appAlreadyOpenedFromNotification/reducers';
import offerCategoriesSettings from './offerCategoriesSettings/reducers';
import offerCategoriesFilters from './offerCategoriesFilters/reducers';
import globalBottomSheetNew from './globalBottomSheetNew/reducers';
import notificationAllowed from './notificationAllowed/reducers';
import globalBottomSheet from './globalBottomSheet/reducers';
import notifications from './notifications/reducers';
import usedCoupons from './usedCoupons/reducers';
import contentTabs from './contentTabs/reducers';
import surveyShown from './surveyShown/reducers';
import supplyTabs from './supplyTabs/reducers';
import settings from './settings/reducers';
import wasGuest from './wasGuest/reducers';
import coupons from './coupons/reducers';
import content from './content/reducers';
import orders from './orders/reducers';
import supply from './supply/reducers';
import user from './user/reducers';
import cart from './cart/reducers';
import shopDetails from './shopDetails/reducers';

export const rootReducer = combineReducers({
    appAlreadyOpenedFromNotification,
    offerCategoriesSettings,
    offerCategoriesFilters,
    globalBottomSheetNew,
    notificationAllowed,
    globalBottomSheet,
    notifications,
    usedCoupons,
    contentTabs,
    surveyShown,
    supplyTabs,
    settings,
    wasGuest,
    coupons,
    content,
    orders,
    supply,
    user,
    cart,
    shopDetails,
});
