import React, {useRef, useState, useLayoutEffect, useCallback} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity, FlatList, Platform} from 'react-native';
import {useTheme} from 'react-native-paper';
import Text from 'components/common/Text';
import CouponsStep from './StepOne';
import PointsStep from './StepTwo';
import FinishStep from './StepThree';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('screen');

const starterData = [
    {
        name: 'Coupon step',
        isEnabled: true,
    },
    {
        name: 'Points step',
        isEnabled: true,
    },
    {
        name: 'Finish step',
        isEnabled: true,
    },
];

const HowToVoucher = (props: any) => {
    const {t, exampleCoupons, navigation, user} = props;
    const {colors} = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const [contentData, setContentData] = useState(starterData);

    const handleVieaweableItemsChanged = useRef(({viewableItems, changed}) => {
        if (changed.length > 1) {
            setActiveIndex(changed[0].index);
        }
    });

    const flatListRef = useRef(null);

    const scrollToIndex = (index) => {
        flatListRef.current.scrollToIndex({
            animated: true,
            index,
        });
    };

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };

    const NavigationComponent = () => (
        <View
            style={{
                position: 'absolute',
                width,
                bottom: Platform.OS === 'ios' ? 10 : 0,
                backgroundColor: 'white',
                paddingHorizontal: 20,
            }}>
            <TouchableOpacity
                onPress={() => {
                    if (activeIndex === contentData.length - 1) {
                        scrollToIndex(0);
                        navigation.navigate('CouponStack');
                        return;
                    }
                    scrollToIndex(activeIndex + 1);
                }}
                style={{
                    backgroundColor: colors.primary,
                    height: 50,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 3,
                }}>
                {activeIndex === contentData.length - 1 ? (
                    <Text color="white">{t('instructions.startShopping')} </Text>
                ) : (
                    <Text color="white">{t('instructions.next')}</Text>
                )}
                <AntDesign
                    name="arrowright"
                    size={20}
                    color={'white'}
                    style={{
                        position: 'absolute',
                        right: 20,
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => scrollToIndex(activeIndex - 1)}
                disabled={activeIndex > 0 ? false : true}
                style={{
                    height: 50,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 3,
                    marginTop: 5,
                }}>
                {activeIndex > 0 && <Text color={colors.primary}>{t('instructions.back')}</Text>}
            </TouchableOpacity>
        </View>
    );

    const ExitComponent = () => (
        <TouchableOpacity
            onPress={() => {
                scrollToIndex(0);
                navigation.navigate('CouponStack');
            }}
            style={{
                position: 'absolute',
                top: 50,
                right: 20,
            }}>
            <AntDesign
                name="plus"
                size={20}
                style={{
                    transform: [{rotate: '45deg'}],
                }}
            />
        </TouchableOpacity>
    );

    const keyExtractor = useCallback((item, index) => index.toString(), []);

    const renderItem = useCallback(
        ({item, index}) => {
            if (item?.name === 'Coupon step' && item?.isEnabled)
                return <CouponsStep t={t} coupons={exampleCoupons} />;

            if (item?.name === 'Points step' && item?.isEnabled) return <PointsStep t={t} />;

            if (item?.name === 'Finish step' && item?.isEnabled) return <FinishStep t={t} />;
        },
        [exampleCoupons, t],
    );

    useLayoutEffect(() => {
        const arrayOfEnabledSteps = starterData.filter((item) => item?.isEnabled);
        setContentData(arrayOfEnabledSteps);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                onViewableItemsChanged={handleVieaweableItemsChanged.current}
                viewabilityConfig={viewabilityConfig}
                horizontal
                pagingEnabled
                data={contentData}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
            <NavigationComponent />
            <ExitComponent />
        </View>
    );
};

export default HowToVoucher;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
});
