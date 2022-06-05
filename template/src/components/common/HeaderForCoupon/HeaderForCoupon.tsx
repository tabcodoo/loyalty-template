import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Text from 'components/common/Text';
import {useNavigation} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useTheme} from 'react-native-paper';

let Header = (props) => {
    let navigation = useNavigation();
    let {title = '', onPress = null, style = {}, color = '#000'} = props;
    let statusBarHeight = getStatusBarHeight();
    const {colors} = useTheme();

    return (
        <View style={style}>
            <TouchableOpacity
                style={{
                    // backgroundColor: '#faf',
                    paddingTop: statusBarHeight + 16,
                    paddingBottom: 8,
                    left: -8,
                }}
                onPress={() => {
                    onPress ? onPress() : navigation.goBack();
                }}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 4,
                        padding: 2,
                        marginLeft: 1,
                        bottom: 1,
                    }}>
                    <Ionicons
                        name="chevron-back"
                        size={26}
                        color={colors.text}
                        style={{left: -1}}
                    />
                </View>
            </TouchableOpacity>
            {title.length > 0 && (
                <Text type="header1" style={{marginBottom: 24}} color={color}>
                    {title}
                </Text>
            )}
        </View>
    );
};

export default Header;
