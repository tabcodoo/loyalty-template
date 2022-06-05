import * as types from './types';
import api from 'services/api';
import {convertFilterModelsToString, convertPaginationToString} from 'constants';
import actions from 'store/actions';
import constants from '@constants';

function supply(payload) {
    return {
        type: types.SUPPLY,
        payload,
    };
}

function supplyRequest() {
    return {
        type: types.SUPPLY_REQUEST,
    };
}

function supplySuccess(response) {
    return {
        type: types.SUPPLY_SUCCESS,
        payload: response,
    };
}

function supplyFailure(error) {
    return {
        type: types.SUPPLY_FAILURE,
        payload: error,
    };
}

export function setSupplies(response) {
    return {
        type: types.SET_SUPPLIES,
        payload: response,
    };
}

export function setSupply(object = {}) {
    return async (dispatch) => {
        dispatch(supplyRequest());

        try {
            dispatch(supplySuccess(object));
            dispatch(getCategories(object));
        } catch (error) {
            dispatch(supplyFailure(error.message));
        }
    };
}

export function resetSupply() {
    return async (dispatch) => {
        try {
            dispatch({type: 'RESET_SUPPLY'});
        } catch (error) {}
    };
}

function categoriesReset() {
    return {
        type: types.SUPPLY_CATEGORIES_RESET,
    };
}

export function resetSupplyCategories() {
    return async (dispatch, getState) => {
        dispatch(categoriesReset());
        let {supply} = getState();
        dispatch(getCategories(supply));
    };
}

function fetchItemsFromCategories(categories) {
    return async (dispatch, getState) => {
        categories.forEach((category, categoryIndex) => {
            if (category?.parentCategoryId === null) {
                if (category?.hasSubCategories) {
                    dispatch(getSupplySubCategoryItems(categoryIndex, categoryIndex));
                } else {
                    dispatch(getSupplyCategoryItems(categoryIndex, category));
                }
            }
        });
    };
}

// GET CATEGORIES FOR MODULE
function categoriesRequest() {
    return {
        type: types.SUPPLY_CATEGORIES_REQUEST,
    };
}

export function categoriesSuccess(response) {
    return {
        type: types.SUPPLY_CATEGORIES_SUCCESS,
        payload: response,
    };
}

export function categoriesFailure(error) {
    return {
        type: types.SUPPLY_CATEGORIES_FAILURE,
        payload: error,
    };
}

export function getCategories(supplyObject = {}) {
    return async (dispatch, getState) => {
        const {
            user: {language},
        } = getState();

        dispatch(categoriesRequest());
        try {
            let response = await api.get(
                'loyalty/categories' +
                    convertFilterModelsToString({
                        filterDescriptor: 'contentCategoryTypeId',
                        filterId: 1,
                    }) +
                    '&IsMobileRequest=true',
                language,
            );
            dispatch(actions.supplyTabsSuccess(response.data.payload));

            const categories = response.data.payload.map((item) => ({
                ...item,
                lastIndex: 0,
                loading: true,
                items: [],
                endReached: false,
                subCategories: [],
            }));
            dispatch(categoriesSuccess(categories));
        } catch (error) {
            dispatch(categoriesFailure(error.message));
        }
    };
}

export function refreshSupplyCategories() {
    return async (dispatch, getState) => {
        const {
            user: {language},
            supply,
        } = getState();
        try {
            dispatch(resetSupplyCategories());

            const response = await api.get(
                'loyalty/categories' +
                    convertFilterModelsToString({
                        filterDescriptor: 'contentCategoryTypeId',
                        filterId: 1,
                    }) +
                    '&IsMobileRequest=true',
                language,
            );

            dispatch(actions.supplyTabsSuccess(response.data.payload));

            const categories = response.data.payload.map((item) => ({
                ...item,
                lastIndex: 0,
                loading: true,
                items: [],
                endReached: false,
                subCategories: [],
            }));
            dispatch(categoriesSuccess(categories));
        } catch (error) {
            dispatch(categoriesFailure(error.message));
        }
    };
}

// GET SUBCATEGORIES FOR CATEGORIES

function subCategoriesRequest() {
    return {
        type: types.SUPPLY_SUBCATEGORIES_REQUEST,
    };
}

function subCategoriesSuccess(response) {
    return {
        type: types.SUPPLY_SUBCATEGORIES_SUCCESS,
        payload: response,
    };
}

function subCategoriesFailure(error) {
    return {
        type: types.SUPPLY_SUBCATEGORIES_FAILURE,
        payload: error,
    };
}

function categoryLoading(categoryId) {
    return {
        type: types.CATEGORY_LOADING,
        payload: categoryId,
    };
}

function setSubCategories(data) {
    return {
        type: types.SET_SUBCATEGORIES,
        payload: data,
    };
}

export function getSupplySubcategories({parentCategoryId, categoryIndex}) {
    return async (dispatch, getState) => {
        const {
            user: {language},
            supply: {categories},
        } = getState() ?? {};

        const selectedSubCategory = categories[categoryIndex].subCategories.find(
            (item) => item.isPressed,
        );

        try {
            const {data} = await api.get(
                'loyalty/categories' +
                    convertFilterModelsToString({
                        filterDescriptor: 'parentCategoryId',
                        filterId: parentCategoryId,
                    }),
                language,
            );

            const subCategories = data.payload.map((item, index) => {
                return {
                    ...item,
                    lastIndex: 0,
                    loading: true,
                    items: [],
                    endReached: false,
                    isPressed: selectedSubCategory
                        ? selectedSubCategory.id === item.id
                            ? true
                            : false
                        : index === 0
                        ? true
                        : false,
                };
            });

            const newCategories = categories.map((item, index) => {
                return item.id === parentCategoryId
                    ? {...item, subCategories, loading: false}
                    : item;
            });

            dispatch(setSubCategories(newCategories));
        } catch (e) {
            console.log('GET SUB CATEGORIES ERROR', e);
        }
    };
}

export function setIsSubCategoryPillPressed({item, categoryIndex}) {
    return async (dispatch, getState) => {
        const {
            supply: {categories},
        } = getState();

        const newSubCategories = categories[categoryIndex].subCategories.map((subCategory) =>
            subCategory.id === item.id
                ? {...subCategory, isPressed: true}
                : {...subCategory, isPressed: false},
        );

        const newCategories = categories.map((category, index) => {
            return index == categoryIndex
                ? {...category, subCategories: newSubCategories}
                : category;
        });

        dispatch(setSubCategories(newCategories));
    };
}

export function setIsTagPressed({tagItem, categoryIndex}) {
    return async (dispatch, getState) => {
        const {
            supply: {categories},
        } = getState();

        const selectedSubCategory = categories[categoryIndex].subCategories.find(
            (item) => item?.isPressed,
        );

        const newTags = selectedSubCategory.tags.map((item) =>
            item.id === tagItem.id ? {...item, isPressed: !item?.isPressed} : item,
        );

        selectedSubCategory.tags = newTags;

        const newSubCategories = categories[categoryIndex].subCategories.map((subCategory) =>
            subCategory.id === selectedSubCategory.id ? selectedSubCategory : subCategory,
        );

        const newCategories = categories.map((category, index) =>
            index === categoryIndex ? {...category, subCategories: newSubCategories} : category,
        );

        dispatch(setSubCategories(newCategories));
        dispatch(
            getSupplySubCategoryItems({
                subCategoryItem: selectedSubCategory,
                categoryIndex,
                resetPagination: true,
            }),
        );
    };
}

const setSuppySubCategoryItemsLoading = ({subCategoryItem, categoryIndex}) => {
    return {
        type: types.SET_SUPPLY_SUBCATEGORY_ITEMS_LOADING,
        payload: {subCategoryItem, categoryIndex},
    };
};

export function getSupplySubCategoryItems({
    subCategoryItem,
    categoryIndex,
    resetPagination = false,
}) {
    return async (dispatch, getState) => {
        const {
            supply: {categories},
            user: {language},
        } = getState();

        resetPagination &&
            dispatch(setSuppySubCategoryItemsLoading({subCategoryItem, categoryIndex}));

        try {
            const tempSubCategories = categories[categoryIndex].subCategories;

            const {lastIndex, id, parentCategoryId, tags} = subCategoryItem ?? {};
            const count = 20;
            const paginationIndex = resetPagination ? 0 : lastIndex;

            const selectedTagsString = tags
                .filter((item) => item?.isPressed)
                .map((item) => item['id']);

            const tagFilterString = `&WebShopFilterModel.TagFilter=${selectedTagsString.join(',')}`;

            const categoryFilterString = `?WebShopFilterModel.CategoryFilter=${id}`;

            const paginationFilterString = `&WebShopFilterModel.Index=${paginationIndex}&WebShopFilterModel.Count=${count}`;

            const {data} = await api.get(
                `/loyalty/supplies` +
                    categoryFilterString +
                    paginationFilterString +
                    tagFilterString 
                    + '&IsMobileRequest=true'
                ,language,
            );

            const newSubCategories = tempSubCategories.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          items: resetPagination ? data.payload : [...item.items, ...data.payload],
                          lastIndex: paginationIndex + count,
                          loading: false,
                          endReached: data.payload.length
                              ? data.payload.length < count
                                  ? true
                                  : false
                              : true,
                      }
                    : item,
            );

            const newCategories = categories.map((item, index) => {
                return item.id === parentCategoryId
                    ? {...item, subCategories: newSubCategories, loading: false}
                    : item;
            });

            dispatch(setSubCategories(newCategories));
        } catch (error) {
            console.log('GET ITEMS ERROR', error);
            dispatch(subCategoriesFailure(error.message));
        }
    };
}

// GET ITEMS FOR SUBCATEGORIES/CATEGORIES

function itemsForCategoriesRequest() {
    return {
        type: types.SUPPLY_ITEMS_CATEGORIES_REQUEST,
    };
}

function itemsForCategoriesSuccess(response) {
    return {
        type: types.SUPPLY_ITEMS_CATEGORIES_SUCCESS,
        payload: response,
    };
}

function itemsForCategoriesFailure(error) {
    return {
        type: types.SUPPLY_ITEMS_CATEGORIES_FAILURE,
        payload: error,
    };
}

export function getSupplyCategoryItems(categoryItem, resetPagination = false) {
    return async (dispatch, getState) => {
        const {
            supply: {categories},
            user: {language},
        } = getState();
        const {lastIndex, id} = categoryItem ?? {};
        const count = 20;
        const paginationIndex = resetPagination ? 0 : lastIndex;

        try {
            let {data} = await api.get(
                'loyalty/supplies' +
                    convertFilterModelsToString({
                        filterDescriptor: 'categoryId',
                        filterId: id,
                    }) +
                    convertPaginationToString({
                        index: paginationIndex,
                        count,
                    }).replace('?', '&'),
                language,
            );

            const newCategories = categories.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          items: resetPagination ? data.payload : [...item.items, ...data.payload],
                          lastIndex: paginationIndex + count,
                          loading: false,
                          endReached: data.payload.length
                              ? data.payload.length < count
                                  ? true
                                  : false
                              : true,
                      }
                    : item,
            );

            dispatch(setSubCategories(newCategories));
        } catch (error) {
            dispatch(itemsForCategoriesFailure(error.message));
        }
    };
}

export function resetSupplyCategory(index = -1) {
    return async (dispatch, getState) => {
        const {
            supply: {categories},
            supply,
        } = getState();
        try {
            categories[index].lastIndex = 0;
            categories[index].endReached = false;
            categories[index].loading = true;
            categories[index].contentCategories = [];
            categories[index].subCategories = [];
            categories[index].items = [];
            dispatch(categoriesSuccess(categories));
        } catch (error) {}
    };
}

function setSuppliesLoading() {
    return {
        type: types.SET_SUPPLIES_LOADING,
    };
}

export const getAllSupplies = ({isRefresh = false, searchTerm = ''}) => {
    return async (dispatch, getState) => {
        const {
            user: {language},
            supply: {filteredSupplies},
        } = getState();

        const {loading, endReached, lastIndex, supplies, searchTerm: prevSearchTerm} =
            filteredSupplies ?? {};

        if (isRefresh || searchTerm !== prevSearchTerm) {
            dispatch(setSuppliesLoading());
        }

        const count = 20;
        const paginationIndex = isRefresh || searchTerm !== prevSearchTerm ? 0 : lastIndex;
        const paginationFilterString = `?WebShopFilterModel.Index=${paginationIndex}&WebShopFilterModel.Count=${count}`;

        const searchFilterSting = `&WebShopFilterModel.SearchTerm=${searchTerm}`;

        try {
            const {data} = await api.get(
                'loyalty/supplies' + paginationFilterString + searchFilterSting,
                language,
            );

            const newFilteredSupplies = {
                loading: false,
                supplies:
                    isRefresh || searchTerm !== prevSearchTerm
                        ? data.payload
                        : [...supplies, ...data.payload],
                endReached: data.payload.length
                    ? data.payload.length < count
                        ? true
                        : false
                    : true,
                lastIndex: paginationIndex + count,
                searchTerm,
            };

            dispatch(setSupplies(newFilteredSupplies));
        } catch (e) {
            console.log('GET ALL SUPPLIES ERROR', e);
        }
    };
};

function setObjects(data) {
    return {
        type: types.SET_OBJECTS,
        payload: data,
    };
}

export const getObjects = () => {
    return async (dispatch, getState) => {
        const {user} = getState();
        const {language, selectedRoom, userRole} = user ?? {};

        const prepData = (data) => {
            return data.map((item) => {
                return selectedRoom
                    ? item.id === selectedRoom?.id
                        ? {...item, isPressed: true}
                        : {...item, isPressed: false}
                    : {...item, isPressed: false};
            });
        };

        const objectType =
            userRole.toLowerCase() === 'waiter'
                ? 'tables'
                : userRole.toLowerCase() === 'salesman'
                ? 'stores'
                : 'rooms';

        try {
            const {data} = await api.get(`loyalty/general-objects/${objectType}`, language);
            dispatch(setObjects(prepData(data.payload)));
        } catch (e) {
            console.log('GET ROOMS ERR', e);
        }
    };
};

export const setSelectedObject = (object) => {
    return async (dispatch, getState) => {
        const {
            supply: {objects},
        } = getState();
        const newData = objects.map((item) =>
            item.id === object.id ? {...item, isPressed: true} : {...item, isPressed: false},
        );
        dispatch(setObjects(newData));
        dispatch(actions.setObject(object));
    };
};
