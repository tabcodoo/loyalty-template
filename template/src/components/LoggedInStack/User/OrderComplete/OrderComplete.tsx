import React, {useCallback} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';
import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';
import SuccessSvg from './SuccessSvg';
import constants from '@constants';
import CustomImage from 'components/common/Image';

const OrderComplete = (props: any) => {
    const {t, navigation, finishShopping, order, paymentMethod, deliveryMethod} = props;
    const {colors} = useTheme();

    const PaymentDetailsComponent = ({headline, value}) => (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '50%',
                paddingHorizontal: 20,
                marginBottom: 10,
            }}>
            <View
                style={{
                    width: 6,
                    height: 40,
                    backgroundColor: '#dce1e8',
                    marginRight: 5,
                }}
            />
            <View>
                <Text type="bold">{headline}</Text>
                <Text style={{fontSize: 10, marginTop: 5}}>{value}</Text>
            </View>
        </View>
    );

    const Footer = () => (
        <View
            style={{
                position: 'absolute',
                bottom: 0,
                padding: 20,
                width: '100%',
            }}>
            <TouchableOpacity
                onPress={finishShopping}
                style={{
                    backgroundColor: colors.primary,
                    borderRadius: 2,
                    height: 52,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}>
                <Text type="header2Text" color="#fff">
                    {t('orderCompleted.okay')}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <View
                    style={{
                        marginHorizontal: 80,
                        height: 200,
                    }}>
                    <SuccessSvg fill={colors.primary} />
                </View>
                <View
                    style={{
                        marginHorizontal: 20,
                    }}>
                    <Text type={'header3'} style={{textAlign: 'center', lineHeight: 22}}>
                        {t('orderCompleted.orderSuccessDetails')}
                    </Text>
                    <Text type={'header3'} style={{marginBottom: 30, textAlign: 'center'}}>
                        {t('orderCompleted.thankYou')}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}>
                    <PaymentDetailsComponent
                        headline={t('orderCompleted.orderId')}
                        value={order?.id}
                    />
                    <PaymentDetailsComponent
                        headline={t('orderCompleted.totalAmount')}
                        value={`${order?.totalAmount.toFixed(2)} ${constants.currency}`}
                    />
                    <PaymentDetailsComponent
                        headline={t('orderCompleted.deliveryMethod')}
                        value={deliveryMethod?.name}
                    />
                    <PaymentDetailsComponent
                        headline={t('orderCompleted.usedPoints')}
                        value={order?.pointsSpent}
                    />
                    <PaymentDetailsComponent
                        headline={t('orderCompleted.paymentMethod')}
                        value={paymentMethod?.name}
                    />
                    {order?.paymentDetails ? (
                        <>
                            <PaymentDetailsComponent
                                headline={t('orderCompleted.bank')}
                                value={order?.paymentDetails?.paymentInformation.split(',')[0]}
                            />
                            <PaymentDetailsComponent
                                headline={t('orderCompleted.transactionNumber')}
                                value={order?.paymentDetails?.paymentInformation.split(', ')[1]}
                            />
                            <PaymentDetailsComponent
                                headline={t('orderCompleted.transactionDescription')}
                                value={order?.paymentDetails?.paymentSubject}
                            />
                        </>
                    ) : null}
                </View>
            </ScrollView>
            <Header
                title={t('orderCompleted.order')}
                onPress={finishShopping}
                style={{position: 'absolute', paddingHorizontal: 16, top: -4}}
                color={'#fff'}
            />

            <Footer />
        </>
    );
};

export default OrderComplete;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        paddingTop: 120,
        paddingBottom: 100,
    },
});
