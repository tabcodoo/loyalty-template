import React from 'react';
import {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import Text from 'components/common/Text';
import constants from '@constants';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Content = (props: any) => {
    const [opened, setOpened] = useState(false);
    const {t, title = '', item = {}} = props;
    const {colors} = useTheme();
    const navigation = useNavigation();
    // console.tron.log('Content', item);
    return (
        <TouchableOpacity
            // activeOpacity={1}
            onPress={() => navigation.navigate('ContentDetails', {content: item})}
            style={styles.contentContainer}>
            <View style={styles.detailsContainer}>
                <FastImage
                    style={[styles.imageContainer, {marginRight: 8}]}
                    source={{uri: item?.imageUrl}}
                />
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
            </View>
        </TouchableOpacity>
    );
};

export default Content;

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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
        // backgroundColor: '#faf',
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
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
