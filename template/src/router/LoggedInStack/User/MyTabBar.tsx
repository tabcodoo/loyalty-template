import React, {useContext, useRef, useState} from 'react';
import {TouchableOpacity, ScrollView, findNodeHandle} from 'react-native';

import Text from 'components/common/Text';

import {useTheme} from 'react-native-paper';

let MyTabBar = ({state, descriptors, navigation, position}) => {
    let {colors} = useTheme();
    const [scrollRef, setScrollRef] = useState(null);
    // const [scrollOffset, setScrollOffset] = useState(0);

    const handleClick = (itemRef = null, index = 0) => {
        if (scrollRef && itemRef)
            itemRef.measureLayout(findNodeHandle(scrollRef), (x, y) => {
                scrollRef.scrollTo({
                    x: x - 16,
                    y: 0,
                    animated: true,
                });
            });
    };

    // scrollToItem = () => {
    //     this.productCardRef.measureLayout(
    //         ReactNative.findNodeHandle(this.scrollViewRef),
    //         (x, y) => {
    //             this.scrollViewRef.scrollTo({x: 0, y: y, animated: true});
    //         }
    //     );
    // }

    return (
        <ScrollView
            ref={(ref) => {
                setScrollRef(ref);
            }}
            // onScroll={(res) => {
            //     console.tron.log(res?.contentOffset);
            // }}
            // scrollEventThrottle={10}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
                maxHeight: 40,
                // marginBottom: 4,
                paddingLeft: 16,
            }}>
            {state.routes.map((route, index) => {
                const [itemRef, setItemRef] = useState(null);

                const {options} = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;
                // if (isFocused) handleClick(itemRef, index);

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                // const inputRange = state.routes.map((_, i) => i);
                // const opacity = Animated.interpolate(position, {
                //     inputRange,
                //     outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
                // });

                return (
                    <TouchableOpacity
                        ref={(ref) => {
                            setItemRef(ref);
                        }}
                        key={index.toString() + label}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? {selected: true} : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={() => {
                            handleClick(itemRef, index);
                            onPress();
                        }}
                        onLongPress={onLongPress}
                        style={{
                            height: 32,
                            // marginRight: 8,
                            marginRight: index === state.routes.length - 1 ? 40 : 8,
                            paddingHorizontal: 12,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // backgroundColor: isFocused ? colors.primary : '#fff',
                            borderBottomWidth: 4,
                            borderBottomColor: isFocused ? colors.primary : '#fff',
                            // borderRadius: 24,
                            // marginTop: 8,
                        }}>
                        <Text
                            // style={{opacity}}
                            type={'small14Bold'}
                            // color={!isFocused ? '#000' : '#fff'}
                        >
                            {label.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

export default MyTabBar;
