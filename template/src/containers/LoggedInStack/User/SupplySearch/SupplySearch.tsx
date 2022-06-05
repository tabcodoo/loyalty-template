import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import actions from 'store/actions';
import SupplySearch from 'components/LoggedInStack/User/SupplySearch';
import api from 'services/api';
import {useDebouncedEffect} from './useDebounce';

const SupplySearchContainer = (props: any) => {
    const dispatch = useDispatch();
    const {t} = useContext(LocalizationContext);
    const currentOrder = useSelector((state) => state.orders.currentOrder);
    const user = useSelector((state) => state.user);
    const {language, userRole, hasRoomServiceEnabled} = user ?? {};
    const isWaiter = userRole.toLowerCase() === 'waiter';
    const isSalesman = userRole.toLowerCase() === 'salesman';
    const cart = useSelector((state) => state.cart);
    const {uniqueItemCount} = cart ?? {};
    const filteredSupplies = useSelector((state) => state.supply.filteredSupplies);

    const {supplies: allSupplies, loading, endReached, searchTerm: prevSearchTerm} =
        filteredSupplies ?? {};

    const [searchTerm, setSearchTerm] = useState(prevSearchTerm);

    const onRefresh = async () => {
        dispatch(actions.getAllSupplies({isRefresh: true, searchTerm}));
    };

    const onEndReached = useCallback(() => {
        !endReached && dispatch(actions.getAllSupplies({isRefresh: false, searchTerm}));
    }, [searchTerm, endReached]);

    useDebouncedEffect(
        () => dispatch(actions.getAllSupplies({isRefresh: false, searchTerm})),
        [searchTerm],
        300,
    );

    return (
        <SupplySearch
            {...props}
            {...{
                t,
                currentOrder,
                user,
                uniqueItemCount,
                searchTerm,
                setSearchTerm,
                allSupplies,
                onRefresh,
                onEndReached,
                loading,
                isWaiter,
                isSalesman,
                hasRoomServiceEnabled,
            }}
        />
    );
};

export default SupplySearchContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
