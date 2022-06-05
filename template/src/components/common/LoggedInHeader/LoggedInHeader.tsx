import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Text from 'components/common/Text';
import {useNavigation} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Menu from 'components/common/icons/Menu';

let LoggedInHeader = (props) => {
    let navigation = useNavigation();
    let {title = '', renderRightItem = () => null, goBack = false, style, onPress} = props;
    let statusBarHeight = getStatusBarHeight();

    return (
        <View
            style={{
                paddingTop: statusBarHeight,
                paddingHorizontal: 16,
                // backgroundColor: '#ff0',
                // flexDirection: 'row',
                // alignItems: 'center',
                ...style,
            }}>
            <View
                style={{
                    // backgroundColor: '#faf',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 56,
                        // backgroundColor: '#faf',
                    }}
                    onPress={() => {
                        if (onPress) {
                            onPress();
                            return;
                        }

                        if (goBack) navigation.pop();
                        else if (props.menu) {
                            navigation.openDrawer();
                        } else navigation.navigate('CouponStack');
                    }}>
                    {props.menu ? (
                        <View style={{marginRight: 16}}>
                            <Menu fill={'#000'} />
                        </View>
                    ) : (
                        <IonicIcon
                            name={'chevron-back'}
                            size={26}
                            style={{left: -6, marginRight: 16}}
                            color={'#000'}
                        />
                    )}

                    <Text type={'header2'}>{title}</Text>
                </TouchableOpacity>
                <View>{renderRightItem()}</View>
            </View>
        </View>
    );
};

export default LoggedInHeader;
