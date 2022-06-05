import React, {useCallback} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    Dimensions,
    ActivityIndicator,
    Image,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Header from '../../../common/LoggedInHeader';
import Text from 'components/common/Text';
import color from 'color';
import constants from '@constants';
import EmptyContent from 'components/common/EmptyContent/EmptyContent';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

const Orders = (props: any) => {
    const {
        t,
        navigation,
        isWaiter,
        isSalesman,
        orders,
        onRefresh,
        loading,
        isOwner,
        finished,
        isKitchen,
        isReception,
        isBarmen,
    } = props;
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

    const OrderItem = ({item, index}) => {
        const mainColor = getMainColor(item?.webShopOrderStatus);
        const backgroundColor = color(mainColor).alpha(0.1).rgb().string();
        return (
            <>
                <Animatable.View
                    animation={item?.webShopOrderStatus === 'created' ? 'pulse' : undefined}
                    easing="ease-in"
                    iterationCount="infinite">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('OrderPreview', {id: item.id})}
                        style={{
                            padding: 16,
                            backgroundColor: backgroundColor,
                            borderWidth: 1,
                            borderColor: mainColor,
                            borderRadius: 2,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}>
                            <Text type="bold">{`${t('room.order')} #${item.id}`}</Text>
                            <Text type="bold" color={mainColor}>
                                {getStatusString(item?.webShopOrderStatus)?.toUpperCase()}
                            </Text>
                        </View>
                        <Text style={{marginBottom: 10}} type="bold">
                            {item?.objectType === 'Room'
                                ? `${t('room.room')} ${item?.room?.objectNumber}`
                                : item?.objectType === 'Table'
                                ? `${t('room.table')} ${item?.table?.objectNumber}`
                                : `${t('room.table')} ${item?.store?.objectNumber}`}
                        </Text>
                        <Text type="bold" color={mainColor}>
                            {item?.totalAmount.toFixed(2)} {constants.currency}
                        </Text>
                    </TouchableOpacity>
                </Animatable.View>
            </>
        );
    };

    const keyExtractor = useCallback((item, index) => index.toString(), []);

    const renderItem = useCallback(({item, index}) => <OrderItem item={item} index={index} />, []);

    const getRelevantData = () => {
        if (isWaiter) {
            return orders.sort((a, b) => moment(b.changeCheck) - moment(a.changeCheck));
        }

        if (isBarmen) {
            return orders
                .filter((item) => item?.deliveryPath.toLowerCase() === 'bartender')
                .sort((a, b) => moment(b.changeCheck) - moment(a.changeCheck));
        }

        if (isKitchen) {
            return orders
                .filter((item) => item?.deliveryPath.toLowerCase() === 'kitchen')
                .sort((a, b) => moment(b.changeCheck) - moment(a.changeCheck));
        }
        if (isReception) {
            return orders
                .filter((item) => item?.deliveryPath.toLowerCase() === 'reception')
                .sort((a, b) => moment(b.changeCheck) - moment(a.changeCheck));
        }

        if (isSalesman) {
            return orders
                .filter((item) => item.store)
                .sort((a, b) => moment(b.changeCheck) - moment(a.changeCheck));
        }
    };

    const ListEmptyComponent = useCallback(
        () =>
            !loading && finished && !getRelevantData().length ? (
                <View
                    style={{
                        height: Dimensions.get('screen').height * 0.7,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        style={{
                            height: 100,
                            width: 100,
                            marginBottom: 20,
                        }}
                        resizeMode="contain"
                        source={require('assets/images/no_orders.png')}
                    />
                    <Text color="#484848" type="bold">
                        {t('waiter.emptyOrders')}
                    </Text>
                </View>
            ) : null,
        [loading, finished, getRelevantData],
    );

    return (
        <View style={styles.container}>
            <Header
                menu={true}
                title={
                    isWaiter
                        ? t('waiter.title')
                        : isSalesman
                        ? t('salesman.title')
                        : t('room.orders')
                }
            />

            <FlatList
                data={getRelevantData()}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingVertical: 20,
                }}
                ItemSeparatorComponent={() => (
                    <View
                        style={{
                            height: 20,
                        }}
                    />
                )}
                ListEmptyComponent={ListEmptyComponent}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
            />
        </View>
    );
};

export default Orders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
