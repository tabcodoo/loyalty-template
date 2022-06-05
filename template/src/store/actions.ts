import * as appAlreadyOpenedFromNotification from './appAlreadyOpenedFromNotification/actions';
import * as offerCategoriesSettings from './offerCategoriesSettings/actions';
import * as offerCategoriesFilters from './offerCategoriesFilters/actions';
import * as globalBottomSheetNew from './globalBottomSheetNew/actions';
import * as notificationAllowed from './notificationAllowed/actions';
import * as globalBottomSheet from './globalBottomSheet/actions';
import * as notifications from './notifications/actions';
import * as usedCoupons from './usedCoupons/actions';
import * as contentTabs from './contentTabs/actions';
import * as surveyShown from './surveyShown/actions';
import * as supplyTabs from './supplyTabs/actions';
import * as settings from './settings/actions';
import * as wasGuest from './wasGuest/actions';
import * as coupons from './coupons/actions';
import * as content from './content/actions';
import * as orders from './orders/actions';
import * as supply from './supply/actions';
import * as user from './user/actions';
import * as cart from './cart/actions';
import * as shopDetails from './shopDetails/actions';

export default {
    ...appAlreadyOpenedFromNotification,
    ...offerCategoriesSettings,
    ...offerCategoriesFilters,
    ...globalBottomSheetNew,
    ...notificationAllowed,
    ...globalBottomSheet,
    ...notifications,
    ...usedCoupons,
    ...contentTabs,
    ...surveyShown,
    ...supplyTabs,
    ...settings,
    ...wasGuest,
    ...coupons,
    ...content,
    ...orders,
    ...supply,
    ...user,
    ...cart,
    ...shopDetails,
    reset: () => ({type: 'RESET'}),
};
