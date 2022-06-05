import React from 'react';
import {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import Text from 'components/common/Text';

import constants from '@constants';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
let {width} = Dimensions.get('window');
const Offer = (props: any) => {
    const [opened, setOpened] = useState(false);
    const {t, title = '', item = {}} = props;
    const {colors} = useTheme();
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('SupplyDetails', {supply: item})}
            style={styles.contentContainer}>
            <FastImage
                style={[styles.imageContainer, {marginRight: 8}]}
                source={{
                    uri: item?.imageUrl,
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.detailsContainer}>
                <View style={{maxWidth: '65%'}}>
                    <Text
                        // style={{textWrap: 'wrap'}} // style={{opacity}}
                        type={'bold'}
                        // color={!isFocused ? '#000' : '#fff'}
                    >
                        {item?.name}
                    </Text>
                    <Text
                        style={{marginTop: 4}}
                        type={'smallSemiBold'}
                        // color={!isFocused ? '#000' : '#fff'}
                    >
                        {item?.description}
                    </Text>
                </View>
                <View style={[styles.priceContainer]}>
                    <Text
                        // style={{opacity}}
                        type={'small14Bold'}
                        // color={!isFocused ? '#000' : '#fff'}
                    >
                        {item?.price}
                    </Text>
                    <Text
                        style={{marginTop: 4}}
                        type={'smallBold'}
                        // color={!isFocused ? '#000' : '#fff'}
                    >
                        {constants.currency}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Offer;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#ff0',
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
        justifyContent: 'space-between',
        marginTop: 16,
        // backgroundColor: '#faf',
    },
    detailsContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        // backgroundColor: '#faf',
        justifyContent: 'space-between',
        marginTop: 16,
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
