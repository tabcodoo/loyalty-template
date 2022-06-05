import React, {useState, useEffect, useRef} from 'react';
import {View, Image, Dimensions, StyleSheet, ActivityIndicator} from 'react-native';
import {useTheme, TextInput} from 'react-native-paper';
import {useHeaderHeight} from '@react-navigation/stack';
import Text from '../Text';

/**
  To use this component you will need to combine it with the
  RadioButton.Group from React native paper
*/

const EmptyContent = (props) => {
    const {text = '', loading = false} = props;
    const {colors, customFonts} = useTheme();

    let headerHeight = useHeaderHeight();
    return loading ? (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 16,
            }}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    ) : (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
                // backgrousndColor: '#faf',
            }}>
            <Text center>{props.text}</Text>
        </View>
    );
};

export default EmptyContent;

const styles = StyleSheet.create({});
