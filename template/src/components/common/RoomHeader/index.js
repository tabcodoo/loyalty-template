import React, {useContext} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from '../Text';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import LocalizationContext from 'translation/context';

export default () => {
    const {colors} = useTheme();
    const navigation = useNavigation();
    const {t} = useContext(LocalizationContext);
    const selectedRoom = useSelector((state) =>
        state.supply.objects.find((item) => item.isPressed),
    );
    const isWaiter = useSelector((state) => state.user.userRole.toLowerCase() === 'waiter');
    const isSalesman = useSelector((state) => state.user.userRole.toLowerCase() === 'salesman');

    const getObjectString = () => {
        switch (selectedRoom?.generalObjectTypeId) {
            case 1:
                return `${t('room.room')} ${selectedRoom.objectNumber}`;
            case 2:
                return `${t('room.table')} ${selectedRoom.objectNumber}`;
            case 3:
                return `${t('room.client')} ${selectedRoom.objectNumber}`;
        }
    };

    return (
        <View
            style={{
                paddingHorizontal: 16,
            }}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Rooms')}
                style={{
                    height: 56,
                    width: '100%',
                    backgroundColor: colors.primary,
                    borderRadius: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text type="bold" color="white">
                    {selectedRoom
                        ? getObjectString()
                        : isWaiter
                        ? t('waiter.notSelected')
                        : isSalesman
                        ? t('salesman.notSelected')
                        : t('room.notSelected')}
                </Text>
                {/* <Ionicons
                    name="chevron-back"
                    size={25}
                    color="white"
                    style={{
                        position: 'absolute',
                        left: 10,
                    }}
                /> */}
            </TouchableOpacity>
            <View
                style={{
                    height: 1,
                    backgroundColor: '#E0E0E0',
                    marginVertical: 20,
                }}
            />
        </View>
    );
};
