import React from 'react';
import {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions, Platform} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import Text from 'components/common/Text';
import constants from '@constants';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Image as ProgressiveImage} from 'react-native-expo-image-cache/src';
import LoyaltyIcons from 'components/common/icons/LoyaltyIcons';
import * as Animatable from 'react-native-animatable';
import CustomImage from 'components/common/Image';

let {width} = Dimensions.get('window');
const Offer = (props: any) => {
    const [opened, setOpened] = useState(false);
    const {t, title = '', item = {}} = props;
    const {colors} = useTheme();
    const navigation = useNavigation();
    // console.tron.log('Content item', item);

    return (
        <Animatable.View animation="fadeIn" duration={200}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ContentDetails', {content: item})}
                style={styles.contentContainer}>
                <CustomImage style={styles.imageContainer} uri={item?.imageUrl} />

                <View style={styles.detailsContainer}>
                    <View
                        style={{
                            flex: 1,
                            // backgroundColor: '#faf',
                        }}>
                        <Text
                            // style={{textWrap: 'wrap'}} // style={{opacity}}
                            type={'bold'}
                            numberOfLines={1}
                            // color={!isFocused ? '#000' : '#fff'}
                        >
                            {item?.name}
                        </Text>
                        <Text
                            style={{marginTop: 4, marginRight: 8, lineHeight: 14}}
                            type={'smallMedium'}
                            numberOfLines={2}
                            // color={!isFocused ? '#000' : '#fff'}
                        >
                            {item?.description}
                        </Text>
                    </View>
                    {item?.sideItem && (
                        <View style={[styles.priceContainer]}>
                            {item?.sideItem?.text && (
                                <Text
                                    center
                                    // style={{marginTop: 4}}
                                    type={'small10SemiBold'}
                                    // color={!isFocused ? '#000' : '#fff'}
                                >
                                    {item?.sideItem?.text}
                                </Text>
                            )}
                            {(item?.sideItem.icon || item?.sideItem.value) && (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 4,
                                    }}>
                                    {item?.sideItem?.icon && (
                                        <LoyaltyIcons
                                            name={item?.sideItem.icon}
                                            style={{marginRight: 4}}
                                        />
                                    )}
                                    {item?.sideItem?.value && (
                                        <Text
                                            // style={{opacity}}
                                            type={'small10SemiBold'}
                                            // color={!isFocused ? '#000' : '#fff'}
                                            center>
                                            {item?.sideItem.value}
                                        </Text>
                                    )}
                                </View>
                            )}
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </Animatable.View>
    );
};

export default Offer;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingVertical: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contentContainer: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // marginBottom: 16,
        // backgroundColor: '#ff0',
        height: (width - 32) / (16 / 9) + 84,
        // maxHeight: (width - 32) / (16 / 9) + 100,
        // maxHeight: (width - 32) / (16 / 9) + 100,
    },
    detailsContainer: {
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'center',
        // backgroundColor: '#ff0',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    priceContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    imageContainer: {
        width: width - 32,
        height: (width - 32) / (16 / 9),
        borderRadius: 8,
    },
});
