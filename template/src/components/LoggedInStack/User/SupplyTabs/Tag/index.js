import React from 'react';
import {TouchableOpacity} from 'react-native';
import Text from 'components/common/Text';
import {useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import actions from 'store/actions';

export default ({item, categoryIndex, subCategoryItem}) => {
    const {name, isPressed} = item ?? {};
    const {colors} = useTheme();
    const dispatch = useDispatch();
    return (
        <TouchableOpacity
            onPress={() => {
                dispatch(actions.setIsTagPressed({tagItem: item, categoryIndex}));
            }}
            style={{
                height: 32,
                borderRadius: 16,
                marginRight: 16,
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: isPressed ? colors.primary : 'white',
                // borderWidth: 1,
                // borderColor: isPressed ? colors.primary : '#dce1e8',
                justifyContent: 'center',
                alignItems: 'center',
                // elevation: 3,
            }}>
            <Text style={{fontSize:14,}} color={isPressed ? 'white' : '#484848'}>{name}</Text>
        </TouchableOpacity>
    );
};
