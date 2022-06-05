import React from 'react';
import {View} from 'react-native';
import Text from '../Text';
import constants from '@constants';

export default ({quantity = 2, name = 'Mac and cheese', price = 14}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
            }}>
            <Text
                style={{
                    fontSize: 16,
                    lineHeight: 18,
                    marginRight: 5,
                }}
                type="bold">
                {quantity}x
            </Text>
            <Text
                style={{
                    marginRight: 5,
                }}>
                {name}
            </Text>
            <Text>{`(${price.toFixed(2).replace('.', ',')} ${constants.currency})`}</Text>
        </View>
    );
};
