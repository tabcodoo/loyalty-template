import React, {useCallback, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import Text from 'components/common/Text';
import {useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import actions from 'store/actions';

export default ({item, categoryIndex, getSubCategoryItems}) => {
    const {isPressed, loading, lastIndex} = item ?? {};
    const {colors} = useTheme();
    const dispatch = useDispatch();

    const onPress = useCallback(() => {
        dispatch(actions.setIsSubCategoryPillPressed({item, categoryIndex}));
    }, [item, categoryIndex]);

    useEffect(() => {
        if (isPressed && lastIndex === 0)
            getSubCategoryItems({subCategoryItem: item, categoryIndex});
    }, [isPressed, lastIndex]);

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                height: 32,
                borderRadius: 16,
                marginRight: 16,
                backgroundColor: isPressed ? colors.primary : 'white',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text style={{fontSize:14}} color={isPressed ? 'white' : '#484848'}>{item?.name}</Text>
        </TouchableOpacity>
    );
};
