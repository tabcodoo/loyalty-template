import React, {forwardRef, useState} from 'react';
import {View, Platform} from 'react-native';
import {useTheme, Switch} from 'react-native-paper';

let Toggle = forwardRef(({value = false, title = '', onPress = () => {}, color}, ref) => {
    // let [state, setState] = useState(value);
    let {colors} = useTheme();
    return (
        <View
            style={{
                borderColor: color ? 'transparent' : colors.primary,
                alignItems: 'center',
                borderRadius: 28,
                // borderWidth: Platform.OS === 'ios' ? 0 : 2,
                padding: 0.5,
                width: 48,
            }}>
            <Switch
                value={value}
                onValueChange={() => {
                    // setState(!state);
                    onPress();
                }}
                color={color ? color : colors.primary}
                // thumbColor={!state ? '#fff' : color ? color : colors.primary}
                // thumbColor={color ? color : colors.primary}
                // trackColor={{
                //     false: '#f1efef',
                //     true: Platform.OS === 'ios' ? '#f1efef' : color ? color : colors.primary,
                // }}
            />
        </View>
    );
});

export default Toggle;
