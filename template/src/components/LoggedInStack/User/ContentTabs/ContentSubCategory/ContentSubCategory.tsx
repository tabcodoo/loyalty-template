import React, {useRef, memo, useEffect, useCallback} from 'react';
import {useState} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Text from 'components/common/Text';
import constants from '@constants';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ContentItem from '../ContentItem';
import ContentItemBig from '../ContentItemBig';
import SupplyItem from 'components/LoggedInStack/User/SupplyTabs/SupplyItem';
import Animated, {
    Easing,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import actions from 'store/actions';

let {width} = Dimensions.get('window');

const Offer = (props: any) => {
    const {
        t,
        title = '',
        last = false,
        item,
        categoryIndex,
        getSubCategoryItems,
        cartEnabled,
    } = props;

    const dispatch = useDispatch();

    const {colors} = useTheme();

    const {loading, endReached, items} = item;

    const itemHeight = (width - 32) / (16 / 9) + 84;

    const [expanded, setExpanded] = useState(false);

    const keyExtractor = useCallback((item) => item.id.toString(), []);

    const renderItem = useCallback(({item, index}) => <ContentItemBig {...{item}} />, []);

    const categoryContainerAnimation = useSharedValue({height: 0});

    const categoryContainerAnimationStyle = useAnimatedStyle(() => {
        return {
            height: withTiming(categoryContainerAnimation.value.height, {
                duration: 300,
            }),
        };
    });

    const arrowAnimation = useSharedValue(0);

    const arrowAnimationStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${arrowAnimation.value}deg`,
                },
            ],
        };
    });

    const expandAnimation = useCallback(() => {
        categoryContainerAnimation.value = {
            height: loading ? 0 : items.length ? itemHeight * items.length : 40,
        };
        arrowAnimation.value = withTiming(180, {
            duration: 300,
            easing: Easing.in(Easing.ease),
        });
    }, [items.length, endReached]);

    const minimizeAnimation = useCallback(() => {
        categoryContainerAnimation.value = {height: 0};
        arrowAnimation.value = withTiming(0, {
            duration: 300,
        });
    }, []);

    useEffect(() => {
        if (expanded) {
            expandAnimation();
        } else {
            minimizeAnimation();
        }
    }, [items.length, expanded, loading]);

    const onPress = () => {
        setExpanded(!expanded);
        !endReached && loading && getSubCategoryItems({subCategoryItem: item, categoryIndex});
    };

    return (
        <View style={[styles.container, last && {borderBottomWidth: 0}]}>
            <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={styles.titleContainer}>
                <Text style={{}} type={'header2'}>
                    {title}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {expanded && loading && (
                        <ActivityIndicator
                            size="small"
                            color={colors.primary}
                            style={{marginRight: 10}}
                        />
                    )}
                    <Animated.View style={arrowAnimationStyle}>
                        <MaterialIcons name={'keyboard-arrow-down'} size={22} />
                    </Animated.View>
                </View>
            </TouchableOpacity>
            <Animated.View style={categoryContainerAnimationStyle}>
                <FlatList
                    data={items}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    initialNumToRender={20}
                    windowSize={20}
                    removeClippedSubviews
                    getItemLayout={(data, index) => ({
                        length: itemHeight,
                        offset: itemHeight * index,
                        index,
                    })}
                    onEndReached={() => {
                        !endReached && getSubCategoryItems({subCategoryItem: item, categoryIndex});
                    }}
                    onEndReachedThreshold={0.8}
                    ListFooterComponent={
                        items.length === 0 && !loading ? (
                            <Text style={{marginBottom: 16}} type={'small14'} center>
                                {t('supply.empty')}
                            </Text>
                        ) : null
                    }
                />
            </Animated.View>
        </View>
    );
};

export default memo(Offer);

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        overflow: 'hidden',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
});
