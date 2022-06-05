import React, {useState, useRef, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View, Dimensions} from 'react-native';
import {useTheme, TextInput} from 'react-native-paper';
import Text from '../Text';

import Entypo from 'react-native-vector-icons/Entypo';
import {RFValue} from 'react-native-responsive-fontsize';
let {height, width} = Dimensions.get('window');
/**
  To use this component you will need to combine it with the
  RadioButton.Group from React native paper
*/

const CustomInput = ({
    label = '',
    value = '',
    placeholder = '',
    mode = 'outlined',
    keyboardType = 'default',
    returnKeyType = 'done',
    disabled = false,
    autoCapitalize = 'none',
    multiline = false,
    error = '',
    secure = false,
    style = {},
    focusOnLoad = false,
    onFocus = () => {},
    onBlur = () => {},
    onChangeText = () => {},
}) => {
    let textInputRef = useRef();

    const {colors, customFonts} = useTheme();
    let [secureTextEntry, setSecureEntry] = useState(secure);

    useEffect(() => {
        // console.tron.log(textInputRef);
        if (textInputRef && textInputRef.current && textInputRef?.current?.focus && focusOnLoad)
            setTimeout(() => textInputRef.current?.focus && textInputRef.current.focus(), 300);
        // console.tron.log(textInputRef);
    }, [textInputRef]);

    return (
        <View style={style}>
            <View>
                <TextInput
                    ref={textInputRef}
                    label={label}
                    // placeholder={placeholder}
                    mode={mode}
                    returnKeyType={returnKeyType}
                    autoCapitalize={autoCapitalize}
                    disabled={disabled}
                    keyboardType={keyboardType}
                    // uppercase={false}
                    multiline={multiline}
                    // theme={{colors: {primary: colors.secondary}}}
                    style={[
                        styles.container,
                        {backgroundColor: '#fff'},
                        value?.length > 0 ? styles.valueFont : styles.placeholderFont,
                        multiline && {height: 200},
                        {paddingHorizontal: -5},
                    ]}
                    textAlignVertical="top"
                    onFocus={onFocus}
                    selectionColor={colors.primary}
                    underlineColor={colors.secondary}
                    error={!!error}
                    onBlur={onBlur}
                    onChangeText={onChangeText}
                    value={value}
                    secureTextEntry={secureTextEntry}
                />
                {secure && (
                    <TouchableOpacity
                        onPress={() => setSecureEntry(!secureTextEntry)}
                        activeOpacity={0.8}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        {secureTextEntry ? (
                            <Entypo name="eye" color={'#575962'} size={16} />
                        ) : (
                            <Entypo name="eye-with-line" color={'#575962'} size={16} />
                        )}
                    </TouchableOpacity>
                )}
            </View>
            {!!error && (
                <Text type="small10SemiBold" color={colors.error} style={{marginTop: 4}}>
                    {error}
                </Text>
            )}
        </View>
    );
};

export default CustomInput;

const styles = StyleSheet.create({
    container: {
        // height: 50,
        // fontSize: 12,
    },
    placeholderFont: {
        fontSize: RFValue(12, height),
    },
    valueFont: {
        fontSize: RFValue(16, height),
    },
});
