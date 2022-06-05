import * as React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme, RadioButton} from 'react-native-paper';
import Text from '../Text';
/**
  To use this component you will need to combine it with the
  RadioButton.Group from React native paper
*/

const CustomRadioButton = ({
    value = '',
    label = '',
    style = {},
    disabled = false,
    onPress,
    checked,
}) => {
    const {colors, customFonts} = useTheme();
    return (
        <TouchableOpacity style={[styles.container, style]} activeOpacity={disabled ? 1 : 0.6}>
            <RadioButton.Android
                onPress={!disabled && onPress}
                color={colors.primary}
                status={checked ? 'checked' : 'unchecked'}
                uncheckedColor={colors.primary}
                disabled={disabled}
                // style={{width: 90}}
                labelStyle={{fontSize: 12}}
                value={value}
            />
            <Text type="small12Light" style={{color: '#646464'}}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
