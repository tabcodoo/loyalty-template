import * as React from 'react';
// import {View, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {Platform} from 'react-native';

const TextComp = ({
    type = 'regular',
    children,
    style = {},
    center = false,
    onPress = null,
    color = '',
    numberOfLines = null,
}) => {
    const {colors, customFonts} = useTheme();
    return (
        <Text
            style={[
                customFonts[`${type}Text`],
                style,
                Platform.OS === 'ios' && {paddingVertical: 4},
                center && {textAlign: 'center'},
                !!color ? {color: color} : {color: colors.text},
                // {height: 'auto'},
                // {letterSpacing: 0},
            ]}
            {...(numberOfLines ? {numberOfLines} : {})}
            onPress={onPress}>
            {children}
        </Text>
    );
};

export default TextComp;
