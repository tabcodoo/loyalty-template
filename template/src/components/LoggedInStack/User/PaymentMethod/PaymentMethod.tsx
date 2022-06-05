import React, {useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import {useTheme} from 'react-native-paper';
import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';
import RadioButton from 'components/common/RadioButton';

const PaymentMethod = (props: any) => {
    const {t, navigation, paymentMethod, changePaymentMethod} = props;
    const {colors} = useTheme();

    const renderItem = useCallback(
        ({item, index}) => (
            <TouchableOpacity
                onPress={() => changePaymentMethod(item)}
                style={{
                    marginBottom: 30,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <RadioButton
                            onPress={() => changePaymentMethod(item)}
                            checked={item.isSelected}
                        />
                        <Text style={{fontSize: 17, marginLeft: 10}} type={'bold'}>
                            {item?.name}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        marginLeft: 47,
                    }}>
                    {item?.description ? (
                        <Text type={'small8Text'} style={{fontSize: 13}}>
                            {item?.description}
                        </Text>
                    ) : null}
                </View>
            </TouchableOpacity>
        ),
        [changePaymentMethod],
    );

    const keyExtractor = useCallback((item) => item.id.toString(), []);

    const ListEmptyComponent = () => (
        <ActivityIndicator size="small" color={colors.primary} style={{alignSelf: 'center'}} />
    );

    return (
        <View style={styles.container}>
            <Text type={'small8Text'} style={{fontSize: 13, marginBottom: 30}}>
                {t('paymentMethod.pickPaymentMethod')}
            </Text>
            <FlatList
                data={paymentMethod}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListEmptyComponent={ListEmptyComponent}
            />
            <Header
                title={t('checkout.paymentMethod')}
                onPress={() => navigation.pop()}
                style={{position: 'absolute', paddingHorizontal: 16, top: -4}}
                color={'#fff'}
            />
        </View>
    );
};

export default PaymentMethod;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 100,
    },
});
