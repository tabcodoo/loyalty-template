import React, {useCallback, useRef, useMemo} from 'react';
import {FlatList, RefreshControl, StyleSheet, View, Animated, Dimensions} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import Text from 'components/common/Text';
import SupplyItem from '../SupplyItem';
import SupplyItemBig from '../SupplyItemBig';
import WaiterItem from './WaiterItem';
import SupplySubCategory from '../SupplySubCategory';
import SubCategoryPills from '../SubCategoryPills';
import Tag from '../Tag';

const Supply = React.memo((props: any) => {
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
        hasRoomServiceEnabled,
        isWaiter,
        isSalesman,
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
    const translateYTags = useMemo(() => Animated.diffClamp(minusScrollY, -130, 0), []);

    const renderItem = useCallback(
        ({item, index}) =>
            item?.type && item?.type.toLowerCase() === 'big' ? (
                <SupplyItemBig title={item.name} item={item} />
            ) : (
                <View
                    style={{
                        marginTop: categoryFromStore?.hasSubCategories ? 0 : index === 0 ? 20 : 0,
                    }}>
                    {isWaiter || isSalesman ? (
                        <WaiterItem item={item} t={t} />
                    ) : (
                        <SupplyItem title={item.name} item={item} />
                    )}
                </View>
            ),
        [isWaiter, isSalesman, categoryFromStore],
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

    const ListHeaderComponent = useCallback(
        ({selectedSubCategory}) => {
            const {tags} = selectedSubCategory ?? {};

            return tags && tags.length ? (
                <Animated.View
                    style={{
                        marginTop: 52,
                        position: 'absolute',
                        width: '100%',
                        backgroundColor: 'white',
                        height: 52,
                        justifyContent: 'center',
                        transform: [{translateY: translateYTags}],
                        borderBottomWidth: 1,
                        borderBottomColor: '#eeeeee',
                    }}>
                    <FlatList
                        data={tags}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item, index}) => (
                            <Tag
                                item={item}
                                categoryIndex={categoryIndex}
                                subCategoryItem={selectedSubCategory}
                            />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{flexGrow: 0}}
                        contentContainerStyle={{
                            paddingLeft: 16,
                            height: 50,
                            alignItems: 'center',
                        }}
                    />
                </Animated.View>
            ) : null;
        },
        [categoryIndex, translateYTags],
    );

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
        <View style={{flex: 1}}>
            <Animated.FlatList
                data={getRelevantData()}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: categoryFromStore?.hasSubCategories
                        ? getSelectedSubCategory()?.tags.length
                            ? 120
                            : 75
                        : 0,
                    paddingBottom: hasRoomServiceEnabled || isSalesman || isWaiter ? 90 : 0,
                }}
                ListHeaderComponentStyle={{
                    paddingHorizontal: -16,
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
            <ListHeaderComponent selectedSubCategory={getSelectedSubCategory()} />
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
});

export default React.memo(Supply);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        // flex: 1,
        // backgroundColor: '#fff',
    },
});
