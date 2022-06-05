import React, {useContext} from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import Text from '../Text';
import LocalizationContext from '../../../translation/context';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import constants from '@constants';
import {useNavigation} from '@react-navigation/native';

export default () => {
    const navigation = useNavigation();
    const {t} = useContext(LocalizationContext);
    const {colors} = useTheme();
    const {totalAmount} = useSelector((state) => state.cart);
    return (
        <View
            style={{
                width: Dimensions.get('screen').width,
                backgroundColor: '#f1f1f1',
                position: 'absolute',
                bottom: 0,
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 16,
                }}>
                <View>
                    <Text type={'bold'}>{t('supplyCheckout.total')}</Text>
                    <Text color={colors.primary} type={'bold'}>
                        {`${totalAmount.toFixed(2)} ${constants.currency}`}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('RoomCheckout')}
                    style={{
                        backgroundColor: colors.primary,
                        borderRadius: 2,
                        height: 52,
                        width: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text type="header2Text" color="#fff">
                        {t('checkout.order')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
