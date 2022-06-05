import * as types from './types';
import api from 'services/api';
import {convertFilterModelsToString, convertPaginationToString} from 'constants';
import actions from 'store/actions';
import FastImage from 'react-native-fast-image';

function content(payload) {
    return {
        type: types.CONTENT,
        payload,
    };
}

function contentRequest() {
    return {
        type: types.CONTENT_REQUEST,
    };
}

export function contentSuccess(response) {
    return {
        type: types.CONTENT_SUCCESS,
        payload: response,
    };
}

export function contentFailure(error) {
    return {
        type: types.CONTENT_FAILURE,
        payload: error,
    };
}

export function setContent(object = {}) {
    return async (dispatch) => {
        dispatch(contentRequest());
        try {
            dispatch(contentSuccess(object));
            dispatch(getContentCategories(object));
        } catch (error) {
            dispatch(contentFailure(error.message));
        }
    };
}

export function resetContent() {
    return async (dispatch) => {
        try {
            dispatch({type: 'RESET_CONTENT'});
        } catch (error) {}
    };
}

function categoriesReset() {
    return {
        type: types.CONTENT_CATEGORIES_RESET,
    };
}

export function resetContentCategories() {
    return async (dispatch, getState) => {
        dispatch(categoriesReset());
        let {content} = getState();
        dispatch(getContentCategories(content));
    };
}

function fetchItemsFromCategories(categories) {
    return async (dispatch, getState) => {
        // let {
        //     content: {categories},
        // } = getState();
        // console.tron.log('fetchItemsFromCategories', categories);
        categories.forEach((category, categoryIndex) => {
            // console.tron.log('category, categoryIndex', category, categoryIndex);

            if (category?.parentCategoryId === null) {
                if (category?.hasSubCategories) {
                    dispatch(getContentSubCategoryItems(categoryIndex, categoryIndex));
                } else {
                    dispatch(getContentCategoryItems(categoryIndex, category));
                }
            }
        });
    };
}

function categoriesRequest() {
    return {
        type: types.CONTENT_CATEGORIES_REQUEST,
    };
}

function categoriesSuccess(response) {
    return {
        type: types.CONTENT_CATEGORIES_SUCCESS,
        payload: response,
    };
}

function categoriesFailure(error) {
    return {
        type: types.CONTENT_CATEGORIES_FAILURE,
        payload: error,
    };
}

export function getContentCategories(contentObject = {}) {
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
                        filterId: 2,
                    }) +
                    '&IsMobileRequest=true',
                language,
            );
            dispatch(actions.contentTabsSuccess(response.data.payload));

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

export function refreshContentCategories() {
    return async (dispatch, getState) => {
        const {
            user: {language},
            content,
        } = getState();
        try {
            dispatch(resetContentCategories());

            const response = await api.get(
                'loyalty/categories' +
                    convertFilterModelsToString({
                        filterDescriptor: 'contentCategoryTypeId',
                        filterId: 2,
                    }) +
                    '&IsMobileRequest=true',
                language,
            );

            dispatch(actions.contentTabsSuccess(response.data.payload));

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
        type: types.CONTENT_SUBCATEGORIES_REQUEST,
    };
}

function subCategoriesSuccess(response) {
    return {
        type: types.CONTENT_SUBCATEGORIES_SUCCESS,
        payload: response,
    };
}

function subCategoriesFailure(error) {
    return {
        type: types.CONTENT_SUBCATEGORIES_FAILURE,
        payload: error,
    };
}

function setContentSubCategories(data) {
    return {
        type: types.SET_CONTENT_SUBCATEGORIES,
        payload: data,
    };
}

export function getContentSubcategories({parentCategoryId, categoryIndex}) {
    return async (dispatch, getState) => {
        const {
            user: {language},
            content: {categories},
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

            dispatch(setContentSubCategories(newCategories));
        } catch (e) {
            console.log('GET SUB CATEGORIES ERROR', e);
        }
    };
}

export function setIsContentSubCategoryPillPressed({item, categoryIndex}) {
    return async (dispatch, getState) => {
        const {
            content: {categories},
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

        dispatch(setContentSubCategories(newCategories));
    };
}

export function setIsTagPressed({tagItem, categoryIndex}) {
    return async (dispatch, getState) => {
        const {
            content: {categories},
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

        dispatch(setContentSubCategories(newCategories));
        dispatch(
            getContentSubCategoryItems({
                subCategoryItem: selectedSubCategory,
                categoryIndex,
                resetPagination: true,
            }),
        );
    };
}

export function getContentSubCategoryItems({
    subCategoryItem,
    categoryIndex,
    resetPagination = false,
}) {
    return async (dispatch, getState) => {
        const {
            content: {categories},
            user: {language},
        } = getState();
        try {
            const tempSubCategories = categories[categoryIndex].subCategories;

            const {lastIndex, id, parentCategoryId} = subCategoryItem ?? {};
            const count = 20;
            const paginationIndex = resetPagination ? 0 : lastIndex;

            const {data} = await api.get(
                '/loyalty/contents' +
                    convertFilterModelsToString({
                        filterDescriptor: 'categoryId',
                        filterId: id,
                    }) +
                    convertPaginationToString({
                        index: paginationIndex,
                        count,
                    }).replace('?', '&') +
                    '&IsMobileRequest=true',
                language,
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

            dispatch(setContentSubCategories(newCategories));
        } catch (error) {
            console.log('GET ITEMS ERROR', error);

            dispatch(subCategoriesFailure(error.message));
        }
    };
}

// GET ITEMS FOR CATEGORY
function itemsRequest() {
    return {
        type: types.CONTENT_CATEGORY_ITEMS_REQUEST,
    };
}

function itemsSuccess(response) {
    return {
        type: types.CONTENT_CATEGORY_ITEMS_SUCCESS,
        payload: response,
    };
}

function itemsFailure(error) {
    return {
        type: types.CONTENT_CATEGORY_ITEMS_FAILURE,
        payload: error,
    };
}

export function getContentCategoryItems(categoryItem) {
    return async (dispatch, getState) => {
        const {
            content: {categories},
            user: {language},
        } = getState();

        const {lastIndex, id} = categoryItem ?? {};
        const count = 20;

        try {
            let {data} = await api.get(
                'loyalty/contents' +
                    convertFilterModelsToString({
                        filterDescriptor: 'categoryId',
                        filterId: id,
                    }) +
                    convertPaginationToString({
                        index: lastIndex,
                        count,
                    }).replace('?', '&'),
                language,
            );
            const newCategories = categories.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          items: [...item.items, ...data.payload],
                          lastIndex: lastIndex + count,
                          loading: false,
                          endReached: data.payload.length
                              ? data.payload.length < count
                                  ? true
                                  : false
                              : true,
                      }
                    : item,
            );

            dispatch(setContentSubCategories(newCategories));
        } catch (error) {
            dispatch(itemsFailure(error.message));
        }
    };
}

export function resetContentCategory(index = -1) {
    return async (dispatch, getState) => {
        const {
            content: {categories},
        } = getState();
        try {
            categories[index].lastIndex = 0;
            categories[index].loading = true;
            categories[index].endReached = false;
            categories[index].contentCategories = [];
            categories[index].subcategories = [];
            categories[index].items = [];
            dispatch(categoriesSuccess(categories));
        } catch (error) {}
    };
}
