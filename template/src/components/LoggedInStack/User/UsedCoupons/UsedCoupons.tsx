import * as React from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';
import {useTheme} from 'react-native-paper';
import constants from '@constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {useEffect} from 'react';

const UsedCoupons = (props: any) => {
    const {t, usedCoupons, totalSavings, fetchUsedCoupons, loading} = props;
    const {colors} = useTheme();

    return (
        <View style={{flex: 1}}>
            <Header title={t('usedCoupons.title')} />
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={() => fetchUsedCoupons(true)} />
                }
                onEndReached={({distanceFromEnd}) => fetchUsedCoupons()}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={() =>
                    loading ? (
                        <Text style={{marginVertical: 24}} center>
                            {t('coupons.loading')}
                        </Text>
                    ) : (
                        <Text style={{marginVertical: 24}} center>
                            {t('usedCoupons.noCoupons')}
                        </Text>
                    )
                }
                data={usedCoupons}
                renderItem={({item: coupon, index}) => (
                    <View style={styles.itemContainer} key={index.toString()}>
                        <View
                            style={[
                                {
                                    flex: 2,
                                    // backgroundColor: '#ff0',
                                },
                                styles.itemSubContainer,
                            ]}>
                            <Text
                                type={'small14SemiBold'}
                                style={{marginVertical: 16}}
                                color={colors.primary}>
                                {coupon?.couponName}
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    // backgroundColor: '#faf',
                                    alignItems: 'center',
                                }}>
                                <Text type={'bold'} style={{marginRight: 24}}>
                                    {parseFloat(coupon?.newPrice).toFixed(2)} {constants.currency}
                                </Text>
                                <Text
                                    type={'small'}
                                    style={{
                                        textDecorationLine: 'line-through',
                                        textDecorationStyle: 'solid',
                                    }}
                                    color={'#757575'}>
                                    {parseFloat(coupon?.oldPrice).toFixed(2)} {constants.currency}
                                </Text>
                            </View>
                        </View>
                        <View style={[{flex: 1, alignItems: 'flex-end'}, styles.itemSubContainer]}>
                            <Text
                                type={'small14SemiBold'}
                                style={{marginVertical: 16}}
                                color={colors.error}>
                                -{parseFloat(coupon?.savings).toFixed(2)} {constants.currency}
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    // flexWrap: 'wrap',
                                    // backgroundColor: '#faf',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    color={'#ccc'}
                                    type={'small10SemiBold'}
                                    style={{marginRight: 8}}>
                                    {moment(coupon?.dateActivated).format('DD/MM/YYYY HH:mm')}
                                </Text>
                                <MaterialCommunityIcons name={'clock-outline'} color={'#ccc'} />
                            </View>
                        </View>
                    </View>
                )}
            />
            <View
                style={{
                    flexDirection: 'row',
                    // flexWrap: 'wrap',
                    // backgroundColor: '#faf',
                    alignItems: 'center',
                    paddingVertical: 24,
                    marginHorizontal: 16,
                    borderTopWidth: 0.7,
                    borderTopColor: '#ccc',
                    justifyContent: 'space-between',
                }}>
                <Text type={'header2'}>{t('usedCoupons.totalSaved')}</Text>
                <Text color={'#ccc'} type={'header2'} color={colors.error}>
                    -{totalSavings} {constants.currency}
                </Text>
            </View>
        </View>
    );
};

export default UsedCoupons;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemContainer: {
        marginHorizontal: 16,
        paddingBottom: 8,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
    },
    itemSubContainer: {},
});
