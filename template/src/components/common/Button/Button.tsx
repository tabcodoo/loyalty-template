import * as React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme, Button} from 'react-native-paper';
import Text from '../Text';
/**
 To use this component you will need to combine it with the
 RadioButton.Group from React native paper
 */

const CustomButton = ({
  checked = false,
  loading = false,
  label = '',
  icon = null,
  uppercase = false,
  mode = 'outlined',
  style = {},
  disabled = false,
  onPress = () => {},
  primaryColor = '',
}) => {
  const {colors, customFonts} = useTheme();

  return (
    <Button
      theme={primaryColor ? {colors: {primary: primaryColor}} : primaryColor}
      style={[
        styles.container,
        style,
        disabled && {backgroundColor: colors.primary, opacity: 0.6},
        {
          borderColor: disabled
            ? '#f0f0f0'
            : primaryColor
            ? primaryColor
            : colors.primary,
        },
        {borderWidth: mode === 'text' ? 0 : 1},
      ]}
      labelStyle={{
        color: disabled
          ? '#fff'
          : mode === 'outlined'
          ? colors.primary
          : mode === 'text'
          ? '#000'
          : '#fff',
      }}
      uppercase={uppercase}
      contentStyle={styles.contentStyle}
      loading={loading}
      icon={icon}
      mode={mode}
      disabled={disabled}
      onPress={onPress}>
      <Text
        type={'button'}
        style={{letterSpacing: 0, lineHeight: 18}}
        color={
          disabled
            ? '#fff'
            : mode === 'outlined'
            ? colors.primary
            : mode === 'text'
            ? '#000'
            : // colors.primary
              '#fff'
        }>
        {label}
      </Text>
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  contentStyle: {
    height: 50,
    textAlign: 'center',
    alignItems: 'center',
  },
});
