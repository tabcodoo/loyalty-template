import * as React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme, Checkbox} from 'react-native-paper';
import Text from '../Text';
/**
  To use this component you will need to combine it with the
  RadioButton.Group from React native paper
*/

const CustomCheckBox = ({checked = false, label = '', style = {}, disabled = false, onPress}) => {
    const {colors, customFonts} = useTheme();
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            activeOpacity={disabled ? 1 : 0.6}
            onPress={() => !disabled && onPress && onPress()}>
            <Checkbox.Android
                color={colors.primary}
                uncheckedColor={colors.secondary}
                status={checked ? 'checked' : 'unchecked'}
                onPress={onPress}
                disabled={disabled}
            />
            <Text type="smallLight" style={{color: '#646464'}}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
