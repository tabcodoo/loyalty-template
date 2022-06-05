import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import CategorySelection from 'components/LoggedInStack/User/CategorySelection';

const CategorySelectionContainer = (props: any) => {
    const {navigation} = props ?? {};
    // let x = useSelector((state) => state.x);
    // let [x, setx] = useState(null);
    // const dispatch = useDispatch();
    const {t} = useContext(LocalizationContext);
    const user = useSelector((state) => state.user);
    const uniqueItemCount = useSelector((state) => state.cart.uniqueItemCount);
    const currentOrder = useSelector((state) => state.orders.currentOrder);

    return (
        <CategorySelection {...props} {...{t, user, navigation, uniqueItemCount, currentOrder}} />
    );
};

export default CategorySelectionContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
