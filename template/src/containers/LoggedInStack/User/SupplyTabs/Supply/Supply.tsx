import React, {useState, useCallback, useEffect, useContext} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import FocusAwareStatusBar from 'components/common/FocusAwareStatusBar';
import api from 'services/api';
import Supply from 'components/LoggedInStack/User/SupplyTabs/Supply';
import {useFocusEffect} from '@react-navigation/native';
import actions from 'store/actions';

const SupplyContainer = (props: any) => {
    let {
        navigation,
        route: {name},
    } = props;
    const user = useSelector((state) => state?.user);
    const {language, cartEnabled, hasRoomServiceEnabled, userRole} = user ?? {};
    const isWaiter = userRole.toLowerCase() === 'waiter';
    const isSalesman = userRole.toLowerCase() === 'salesman';
    let categoryIndex = name.split('-')[1];
    let supply = useSelector((state) => state.supply);
    const categoryFromStore = useSelector((state) => state.supply.categories[categoryIndex]);
    const {endReached, loading, lastIndex} = categoryFromStore ?? {};
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);

    const refreshItems = useCallback(async () => {
        fetchData(true);
    }, []);

    const getSubCategoryItems = ({subCategoryItem, categoryIndex}) => {
        dispatch(actions.getSupplySubCategoryItems({subCategoryItem, categoryIndex}));
    };

    const getCategoryItems = useCallback(() => {
        dispatch(actions.getSupplyCategoryItems(categoryFromStore));
    }, [dispatch, categoryFromStore]);

    const fetchData = useCallback(
        (resetPagination) => {
            categoryFromStore?.hasSubCategories
                ? dispatch(
                      actions.getSupplySubcategories({
                          parentCategoryId: categoryFromStore.id,
                          categoryIndex,
                      }),
                  )
                : dispatch(actions.getSupplyCategoryItems(categoryFromStore, resetPagination));
        },
        [dispatch, categoryFromStore],
    );

    const listenerTrigger = useCallback(() => {
        const unsubscribe = () => {
            if (loading) fetchData();
        };

        return unsubscribe();
    }, [loading]);

    useFocusEffect(listenerTrigger);

    return (
        <>
            <FocusAwareStatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <Supply
                {...props}
                {...{
                    t,
                    categoryFromStore,
                    endReached,
                    loading,
                    categoryIndex,
                    refreshItems,
                    getSubCategoryItems,
                    cartEnabled,
                    getCategoryItems,
                    hasRoomServiceEnabled,
                    isWaiter,
                    isSalesman,
                    lastIndex,
                }}
            />
        </>
    );
};

export default SupplyContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
