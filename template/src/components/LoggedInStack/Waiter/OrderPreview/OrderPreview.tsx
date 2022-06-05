import React, {useCallback} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import Header from '../../../common/LoggedInHeader';
import Text from 'components/common/Text';
import OrderListItem from 'components/common/OrderListItem';
import constants from '@constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderPreview = (props: any) => {
    const {
        t,
        data,
        isWaiter,
        isSalesman,
        isOwner,
        updateOrderStatus,
        openBottomSheet,
        isBarmen,
        isReception,
        isKitchen,
    } = props;
    const {orderItems} = data ?? {};
    const {colors} = useTheme();

    const getMainColor = (status) => {
        switch (status) {
            case 'created':
                return '#f18d35';
            case 'processed':
                return '#42cc39';
            case 'confirmed':
                return '#1198a6';
            case 'canceled':
            case 'void':
                return 'rgba(76, 85, 97, 0.8)';
        }
    };

    const getStatusString = (status) => {
        switch (status) {
            case 'created':
                return 'Na čekanju';
            case 'canceled':
            case 'void':
                return 'Odbijeno';
            case 'processed':
                return 'Završeno';
            case 'confirmed':
                return 'Prihvaćeno';
        }
    };

    const Divider = () => (
        <View
            style={{
                height: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.12)',
                width: '100%',
                marginVertical: 20,
            }}
        />
    );

    return (
        <>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{
                    paddingBottom: 200,
                    paddingTop: 60,
                }}>
                <View
                    style={{
                        paddingHorizontal: 16,
                        marginTop: 20,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                            }}
                            type="bold">
                            {data?.objectType === 'Room'
                                ? `${t('room.room')} ${data?.room?.objectNumber}`
                                : data?.objectType === 'Table'
                                ? `${t('room.table')} ${data?.table?.objectNumber}`
                                : `${t('room.table')} ${data?.store?.objectNumber}`}
                        </Text>
                        <Text type="bold" color={getMainColor(data?.webShopOrderStatus)}>
                            {getStatusString(data?.webShopOrderStatus)?.toUpperCase()}
                        </Text>
                    </View>
                    <Divider />
                    <Text
                        style={{
                            fontSize: 18,
                            marginBottom: 10,
                        }}
                        type="bold">
                        {`${t('room.order')} #${data.id}`}
                    </Text>
                    {orderItems &&
                        orderItems.map((item) => (
                            <OrderListItem
                                quantity={item.quantity}
                                price={item.price}
                                name={item.name}
                            />
                        ))}
                    {data?.orderMessage ? (
                        <>
                            <Divider />
                            <Text
                                type="bold"
                                style={{
                                    fontSize: 18,
                                }}>
                                {t('room.message')}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    marginTop: 5,
                                }}>
                                {data?.orderMessage}
                            </Text>
                        </>
                    ) : null}
                    <Divider />
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
                        {data?.totalAmount.toFixed(2)} {constants.currency}
                    </Text>
                    <Divider />
                </View>
            </ScrollView>
            <Header
                title={`${t('room.order')} #${data.id}`}
                goBack
                style={{
                    position: 'absolute',
                    paddingHorizontal: 16,
                    top: -4,
                    backgroundColor: 'white',
                    width: '100%',
                }}
            />

            {!isSalesman ? (
                <View
                    style={{
                        position: 'absolute',
                        right: 20,
                        bottom: 20,
                    }}>
                    {data?.webShopOrderStatus === 'created' && (
                        <TouchableOpacity
                            onPress={() => openBottomSheet(false)}
                            style={{
                                height: 70,
                                width: 70,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#F0F1F2',
                                marginBottom: 10,
                            }}>
                            <Ionicons
                                name="close-sharp"
                                size={50}
                                color="#6b737d"
                                style={{marginRight: -3}}
                            />
                        </TouchableOpacity>
                    )}
                    {(data?.webShopOrderStatus === 'created' ||
                        data?.webShopOrderStatus === 'confirmed') && (
                        <TouchableOpacity
                            onPress={() =>
                                openBottomSheet(
                                    data?.webShopOrderStatus === 'created' ? 'accept' : 'done',
                                )
                            }
                            style={{
                                height: 70,
                                width: 70,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor:
                                    data?.webShopOrderStatus === 'created'
                                        ? isWaiter
                                            ? '#42cc39'
                                            : colors.primary
                                        : '#42cc39',
                            }}>
                            <Ionicons name="checkmark-sharp" size={50} color={'white'} />
                        </TouchableOpacity>
                    )}
                </View>
            ) : null}
        </>
    );
};

export default OrderPreview;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});
