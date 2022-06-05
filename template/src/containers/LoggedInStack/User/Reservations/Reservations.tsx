import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import Reservations from 'components/LoggedInStack/User/Reservations';

const ReservationsContainer = (props: any) => {
    let customLinkUrl = useSelector((state) => state.user?.mobileAppSettings?.customLinkUrl);
    let displayCustomLinks = useSelector((state) => state.user.displayCustomLinks);
    // let supplyActivated = useSelector((state) => state.settings.supply);
    let supplyTabs = useSelector((state) => state.supplyTabs);
    // let supplyCategories = useSelector((state) => state.supply);
    let supplyActivated = useSelector((state) => state.supplyTabs.isEnabled);
    // let contentActivated = useSelector((state) => state.settings.content);
    let contentActivated = useSelector((state) => state.contentTabs.isEnabled);

    // let bottomMenuActivated = (contentActivated || supplyActivated) && displayCustomLinks;
    let arr = [contentActivated, supplyActivated, displayCustomLinks];
    let bottomMenuActivated = arr.filter((feature) => feature).length > 1;

    // let [x, setx] = useState(null);
    // const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );
    return <Reservations {...props} {...{t, customLinkUrl, bottomMenuActivated}} />;
};

export default ReservationsContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
