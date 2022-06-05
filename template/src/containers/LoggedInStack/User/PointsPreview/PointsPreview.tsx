import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import api from 'services/api';
import PointsPreview from 'components/LoggedInStack/User/PointsPreview';
import actions from 'store/actions';

const PointsPreviewContainer = (props: any) => {
    const {navigation} = props;
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);

    const cart = useSelector((state) => state?.cart);
    const {badge: myBadge, badges} = cart ?? {};

    const BADGE_ITEM_COMPONENT_HEIGHT = 40 + 10; //padding

    const getProgressBarHeight = () => {
        if (!badges) return 0;

        let counter = 0;
        for (let i = 0; i < badges.length; i++) {
            if (badges[i]?.id === myBadge?.id) counter = i;
        }

        if (counter === badges.length - 1) {
            return counter + 1 * BADGE_ITEM_COMPONENT_HEIGHT;
        } else {
            const nextLimit = badges[counter + 1]?.requiredAmount;

            const currentBadgeProgress =
                BADGE_ITEM_COMPONENT_HEIGHT / (nextLimit / cart?.totalMoneySpent);

            return counter * BADGE_ITEM_COMPONENT_HEIGHT + currentBadgeProgress;
        }
    };

    const isItemLocked = (item) => {
        return cart?.totalMoneySpent < item?.requiredAmount;
    };

    useEffect(() => {
        dispatch(actions.getCart());
    }, []);

    return (
        <PointsPreview
            {...props}
            {...{t, navigation, cart, myBadge, badges, getProgressBarHeight, isItemLocked}}
        />
    );
};

export default PointsPreviewContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
