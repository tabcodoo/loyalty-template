import React, {useRef, useCallback, useMemo} from 'react';
import {View, StyleSheet, FlatList, RefreshControl, Animated} from 'react-native';
import {useTheme, ActivityIndicator} from 'react-native-paper';
import Text from 'components/common/Text';
import ContentItem from '../ContentItem';
import ContentItemBig from '../ContentItemBig';
import ContentSubCategory from '../ContentSubCategory';
import SubCategoryPills from '../SubCategoryPills';
import Tag from '../../SupplyTabs/Tag';

const Content = (props: any) => {
    const {
        t,
        categoryFromStore,
        categoryIndex,
        endReached,
        loading,
        refreshItems,
        getSubCategoryItems,
        cartEnabled,
        getCategoryItems,
        lastIndex,
    } = props;
    const {colors} = useTheme();

    const scrollY = useRef(new Animated.Value(0)).current;

    const onScroll = Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: true,
    });

    const subCategoryTranslateY = useMemo(
        () =>
            scrollY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
            }),
        [],
    );

    const minusScrollY = useMemo(() => Animated.multiply(subCategoryTranslateY, -1), []);

    const translateY = useMemo(() => Animated.diffClamp(minusScrollY, -70, 0), []);

    const renderItem = useCallback(
        ({item, index}) =>
            item?.type && item?.type.toLowerCase() === 'small' ? (
                <ContentItem title={item.name} item={item} />
            ) : (
                <View
                    style={{
                        marginTop: categoryFromStore?.hasSubCategories ? 0 : index === 0 ? 24 : 0,
                    }}>
                    <ContentItemBig title={item.name} item={item} />
                </View>
            ),
        [categoryFromStore],
    );

    const renderSubCategoryItem = useCallback(
        ({item, index}) => (
            <SubCategoryPills
                item={item}
                categoryIndex={categoryIndex}
                getSubCategoryItems={getSubCategoryItems}
            />
        ),
        [categoryIndex, getSubCategoryItems],
    );

    const getSelectedSubCategory = () => {
        if (categoryFromStore?.hasSubCategories) {
            const selectedSubCategory = categoryFromStore?.subCategories.find(
                (item) => item.isPressed,
            );
            return selectedSubCategory;
        } else {
            return false;
        }
    };

    const getRelevantData = () => {
        if (categoryFromStore?.hasSubCategories) {
            const selectedSubCategory = getSelectedSubCategory();
            return selectedSubCategory?.items;
        } else {
            return categoryFromStore?.items;
        }
    };

    const getIsRefreshing = () => {
        if (categoryFromStore?.hasSubCategories) {
            const selectedSubCategory = getSelectedSubCategory();
            return selectedSubCategory?.loading || loading;
        } else {
            return categoryFromStore?.loading;
        }
    };

    const onEndReached = () => {
        if (categoryFromStore?.hasSubCategories) {
            const selectedSubCategory = getSelectedSubCategory();
            const {endReached} = selectedSubCategory ?? {};
            !endReached &&
                getSubCategoryItems({subCategoryItem: selectedSubCategory, categoryIndex});
        } else {
            !endReached && getCategoryItems();
        }
    };

    const ListHeaderComponent = () => {
        const selectedSubCategory = getSelectedSubCategory();
        const {tags} = selectedSubCategory ?? {};

        return tags && tags.length ? (
            <View
                style={{
                    height: 30,
                    marginBottom: 20,
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    backgroundColor: 'white',
                }}>
                {tags.map((item) => (
                    <Tag
                        item={item}
                        categoryIndex={categoryIndex}
                        subCategoryItem={selectedSubCategory}
                    />
                ))}
            </View>
        ) : null;
    };

    const ListFooterComponent = () => {
        if (categoryFromStore?.hasSubCategories) {
            const selectedSubCategory = getSelectedSubCategory();
            const {endReached, lastIndex} = selectedSubCategory ?? {};
            return !endReached && lastIndex >= 20 ? (
                <ActivityIndicator
                    color={colors.primary}
                    size="small"
                    style={{
                        alignSelf: 'center',
                        paddingTop: 10,
                        paddingBottom: 20,
                    }}
                />
            ) : null;
        } else {
            return !endReached && lastIndex >= 20 ? (
                <ActivityIndicator
                    color={colors.primary}
                    size="small"
                    style={{
                        alignSelf: 'center',
                        paddingTop: 10,
                        paddingBottom: 20,
                    }}
                />
            ) : null;
        }
    };

    return (
        <View
            style={{
                flex: 1,
            }}>
            <Animated.FlatList
                data={getRelevantData()}
                renderItem={renderItem}
                // ListHeaderComponent={ListHeaderComponent}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: categoryFromStore?.hasSubCategories ? 80 : 10,
                    paddingBottom: 10,
                }}
                style={{
                    flex: 1,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={getIsRefreshing()}
                        onRefresh={() => {
                            refreshItems();
                        }}
                        progressViewOffset={170}
                    />
                }
                onScroll={onScroll}
                bounces={false}
                alwaysBounceVertical={false}
                keyExtractor={(item, index) => item.id.toString()}
                initialNumToRender={50}
                windowSize={50}
                removeClippedSubviews={false}
                onEndReached={onEndReached}
                ListFooterComponent={ListFooterComponent}
                showsVerticalScrollIndicator={false}
            />

            {categoryFromStore?.hasSubCategories && (
                <Animated.View
                    style={{
                        position: 'absolute',
                        backgroundColor: 'white',
                        width: '100%',
                        height: 52,
                        transform: [{translateY: translateY}],
                        borderBottomWidth: 1,
                        borderBottomColor: '#eeeeee',
                    }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categoryFromStore?.subCategories}
                        renderItem={renderSubCategoryItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{
                            paddingLeft: 16,
                            alignItems: 'center',
                            height: 50,
                        }}
                        style={{
                            flexGrow: 0,
                        }}
                    />
                </Animated.View>
            )}
        </View>
    );
};

export default Content;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
