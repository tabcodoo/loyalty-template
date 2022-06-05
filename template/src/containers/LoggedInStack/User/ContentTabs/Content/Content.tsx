import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import api from 'services/api';
import Content from 'components/LoggedInStack/User/ContentTabs/Content';
import actions from 'store/actions';
import FocusAwareStatusBar from 'components/common/FocusAwareStatusBar';
import {useFocusEffect} from '@react-navigation/native';
const ContentContainer = (props: any) => {
    let {
        navigation,
        route: {name},
    } = props;
    let categoryIndex = name.split('-')[1];
    let categoryFromStore = useSelector((state) => state.content.categories[categoryIndex]);
    const {endReached, loading, lastIndex} = categoryFromStore ?? {};

    const user = useSelector((state) => state?.user);
    const {language, cartEnabled} = user ?? {};

    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);

    const fetchData = useCallback(() => {
        categoryFromStore?.hasSubCategories
            ? dispatch(
                  actions.getContentSubcategories({
                      parentCategoryId: categoryFromStore.id,
                      categoryIndex,
                  }),
              )
            : dispatch(actions.getContentCategoryItems(categoryFromStore));
    }, [dispatch, categoryFromStore]);

    const refreshItems = useCallback(async () => {
        fetchData();
    }, []);

    const getSubCategoryItems = ({subCategoryItem, categoryIndex}) => {
        dispatch(actions.getContentSubCategoryItems({subCategoryItem, categoryIndex}));
    };

    const getCategoryItems = useCallback(() => {
        dispatch(actions.getContentCategoryItems(categoryFromStore));
    }, []);

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
            <Content
                {...props}
                {...{
                    t,
                    categoryFromStore,
                    refreshItems,
                    categoryIndex,
                    endReached,
                    loading,
                    getSubCategoryItems,
                    getCategoryItems,
                    cartEnabled,
                    lastIndex,
                }}
            />
        </>
    );
};

export default ContentContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
