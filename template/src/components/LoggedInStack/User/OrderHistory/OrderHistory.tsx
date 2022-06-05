import React, {useCallback} from 'react';
import {
    View,
    RefreshControl,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';
import Info2 from 'components/common/icons/Info2';
import Button from 'components/common/Button';
import moment from 'moment';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import color from 'color';

const OrderCreated = 'created';
const OrderProcessed = 'processed';
const OrderConfirmed = 'confirmed';
const OrderCanceled = 'canceled';
const OrderInDelivery = 'delivering';
const OrderVoided = 'void';

const OrderHistory = (props: any) => {
    const {
        t,
        navigation,
        orderHistory,
        getOrderHistory,
        orders,
        openPaymentDetailsSheet,
        openAreYouSureComponent,
        hasRoomServiceEnabled,
    } = props;
    const {colors} = useTheme();

    const {loading, finished, history} = orders ?? {};

    const getStatusText = (orderStatus) => {
        switch (orderStatus) {
            case OrderCreated:
            case OrderConfirmed:
                return t('orderHistory.created');
            case OrderProcessed:
                return hasRoomServiceEnabled
                    ? t('orderHistory.processedRoomService')
                    : t('orderHistory.processed');
            case OrderCanceled:
                return t('orderHistory.canceled');
            case OrderInDelivery:
                return t('orderHistory.delivering');
            case OrderVoided:
                return t('orderHistory.voided');
        }
    };

    const getStatusColor = (orderStatus) => {
        switch (orderStatus) {
            case OrderInDelivery:
            case OrderCreated:
            case OrderConfirmed:
                return '#e39a22';
            case OrderProcessed:
                return '#aeee7b';
            case OrderCanceled:
            case OrderVoided:
                return colors.error;
        }
    };

    let renderItem = ({item, index}) => {
        const {webShopOrderStatus, statusCode} = item ?? {};
        let backgroundColor = color(
            getStatusColor(webShopOrderStatus ? webShopOrderStatus : statusCode),
        )
            .alpha(0.2)
            .rgb()
            .string();
        return (
            <View style={{paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0'}}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Text type={'small14SemiBold'} style={{maxWidth: '70%'}}>
                        {hasRoomServiceEnabled
                            ? t('orderHistory.idRoomService')
                            : t('orderHistory.id')}
                        {item.id}
                    </Text>
                    <Text type={'small14SemiBold'}>
                        {parseFloat(item.totalAmount).toFixed(2)} {item.currency}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'center',
                        marginTop: 24,
                    }}>
                    <View
                        style={{
                            backgroundColor: '#f0f0f0',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 4,
                            borderRadius: 6,
                        }}>
                        <EvilIcons name="clock" />
                    </View>
                    <Text type="small" style={{marginLeft: 4}}>
                        {moment(item.dateCreated).format('DD.MM.YYYY. HH:mm')}
                    </Text>

                    <View
                        style={{
                            marginLeft: 16,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 4,
                            paddingRight: 8,
                            borderRadius: 6,
                            backgroundColor,
                        }}>
                        <Info2
                            size={10}
                            fill={getStatusColor(
                                webShopOrderStatus ? webShopOrderStatus : statusCode,
                            )}
                        />
                        <Text
                            type="small"
                            style={{marginLeft: 4}}
                            color={getStatusColor(
                                webShopOrderStatus ? webShopOrderStatus : statusCode,
                            )}>
                            {getStatusText(webShopOrderStatus ? webShopOrderStatus : statusCode)}
                        </Text>
                    </View>

                    {hasRoomServiceEnabled ? null : (
                        <>
                            <View
                                style={{
                                    marginLeft: 16,
                                    backgroundColor: '#f0f0f0',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 4,
                                    borderRadius: 6,
                                }}>
                                <EvilIcons name="trophy" />
                            </View>
                            <Text type="small" style={{marginLeft: 4}}>
                                {item.pointBalance.toFixed(2)}
                            </Text>
                        </>
                    )}
                </View>
                {webShopOrderStatus === OrderCreated || item.paymentDetails ? (
                    <View
                        style={{
                            marginTop: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}>
                        {webShopOrderStatus === OrderCreated ? (
                            <TouchableOpacity onPress={() => openAreYouSureComponent(item.orderId)}>
                                <Text
                                    color={colors.error}
                                    style={{
                                        fontSize: 12,
                                    }}>
                                    {t('orderHistory.cancelOrder')}
                                </Text>
                            </TouchableOpacity>
                        ) : null}
                        {item.paymentDetails ? (
                            <TouchableOpacity
                                onPress={() => openPaymentDetailsSheet(item.paymentDetails)}
                                style={{
                                    marginLeft: 20,
                                }}>
                                <Text
                                    color={colors.primary}
                                    style={{
                                        fontSize: 12,
                                    }}>
                                    {t('orderHistory.paymentDetails')}
                                </Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                ) : null}
            </View>
        );
    };

    const ListEmptyComponent = useCallback(
        () =>
            !loading && finished && !orderHistory.length ? (
                <View
                    style={{
                        height: Dimensions.get('screen').height * 0.8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 16,
                        // backgroundColor: '#ff0',
                    }}>
                    {/* <Text type={'smallSemiBold'} style={{}} center>
                        {t('orderHistory.noOrders')}
                    </Text> */}
                    <Text type={'small14'} center>
                        {t('orderHistory.noOrdersSubtitle')}
                    </Text>
                    <Button
                        onPress={() => navigation.navigate('Supply')}
                        mode="contained"
                        label={t('orderHistory.noOrdersBtn')}
                        style={{marginTop: 48}}
                    />
                </View>
            ) : null,
        [loading, finished, history.length],
    );

    return (
        <View style={styles.container}>
            <Header
                title={
                    hasRoomServiceEnabled
                        ? t('orderHistory.titleRoomService')
                        : t('orderHistory.title')
                }
            />
            <FlatList
                data={history.sort((a, b) => moment(b.dateCreated) - moment(a.dateCreated))}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    // height: '100%',
                    // backgroundColor: '#faf',
                }}
                renderItem={renderItem}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={getOrderHistory} />}
                ListEmptyComponent={ListEmptyComponent}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default OrderHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
