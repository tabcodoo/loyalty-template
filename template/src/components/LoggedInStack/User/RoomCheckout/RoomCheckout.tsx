import * as React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';
import RoomHeader from 'components/common/RoomHeader';
import SupplyItem from '../../User/SupplyTabs/SupplyItem';
import constants from '@constants';
import Input from 'components/common/Input';
import Button from 'components/common/Button';

const RoomCheckout = (props: any) => {
    const {
        t,
        navigation,
        itemsFromCart,
        totalAmount,
        message,
        setMessage,
        placeOrder,
        isLoading,
        isOrderDisabled,
        orderLocations,
        setIsLocationPressed,
        isWaiter,
    } = props;
    const {colors} = useTheme();

    const LocationButton = ({style, locationString, name, onPress, isPressed, item}) => (
        <TouchableOpacity
            onPress={() => onPress(item)}
            style={{
                borderWidth: 1,
                borderRadius: 3,
                borderColor: isPressed ? colors.primary : '#484848',
                backgroundColor: isPressed ? colors.primary : 'white',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
                ...style,
            }}>
            <Text type="bold" color={isPressed ? 'white' : '#484848'}>
                {name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{
                    paddingTop: 80,
                    paddingBottom: 20,
                    // paddingBottom: 80
                }}>
                <RoomHeader />
                <View
                    style={{
                        paddingHorizontal: 16,
                    }}>
                    <Text
                        type="bold"
                        style={{
                            fontSize: 18,
                        }}>
                        {t('room.order')}
                    </Text>
                    <FlatList
                        data={itemsFromCart}
                        renderItem={({item}) => {
                            return (
                                <SupplyItem
                                    title={item.name}
                                    item={item}
                                    cart
                                    // order={!!currentOrder}
                                />
                            );
                        }}
                        keyExtractor={(item) => item.id.toString()}
                        ListEmptyComponent={() => <Text type={'small12'}>{t('room.empty')}</Text>}
                        contentContainerStyle={{
                            // height: '100%',
                            // paddingHorizontal: 16,
                            paddingTop: 16,
                            // backgroundColor: '#faf',
                        }}
                    />
                    <View style={{}}>
                        <View
                            style={{
                                height: 1,
                                backgroundColor: '#E0E0E0',
                                marginVertical: 20,
                            }}
                        />
                        <Text
                            type="bold"
                            style={{
                                fontSize: 18,
                            }}>
                            {t('room.totalAmount')}
                        </Text>
                        <Text
                            type="bold"
                            color={colors.primary}
                            style={{
                                fontSize: 18,
                                marginTop: 5,
                            }}>
                            {`${totalAmount.toFixed(2)} ${constants.currency}`}
                        </Text>

                        {isWaiter && (
                            <>
                                <View
                                    style={{
                                        height: 1,
                                        backgroundColor: '#E0E0E0',
                                        marginVertical: 20,
                                    }}
                                />
                                <Text
                                    type="bold"
                                    style={{
                                        fontSize: 18,
                                        marginBottom: 10,
                                    }}>
                                    {t('room.location')}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingBottom: 10,
                                    }}>
                                    {orderLocations.map((item) => (
                                        <LocationButton
                                            name={item.name}
                                            locationString={item.locationString}
                                            style={{width: '49%'}}
                                            isPressed={item.isPressed}
                                            item={item}
                                            onPress={setIsLocationPressed}
                                        />
                                    ))}
                                </View>
                            </>
                        )}
                        <View
                            style={{
                                height: 1,
                                backgroundColor: '#E0E0E0',
                                marginVertical: 20,
                            }}
                        />
                        <Input
                            style={{marginTop: 0}}
                            mode="flat"
                            label={t('room.message')}
                            placeholder={t('room.inputHere')}
                            keyboardType="default"
                            onChangeText={setMessage}
                            value={message}
                        />
                    </View>
                    <Button
                        onPress={placeOrder}
                        style={{
                            paddingHorizontal: 16,
                            marginTop: 20,
                        }}
                        mode="contained"
                        label={t('room.confirm')}
                        loading={isLoading}
                        disabled={isOrderDisabled()}
                    />
                </View>
            </ScrollView>
            <Header
                title={t('room.order')}
                onPress={() => navigation.pop()}
                style={{
                    position: 'absolute',
                    paddingHorizontal: 16,
                    top: -4,
                    backgroundColor: 'white',
                    width: '100%',
                }}
                color={'#fff'}
            />
        </>
    );
};

export default RoomCheckout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
