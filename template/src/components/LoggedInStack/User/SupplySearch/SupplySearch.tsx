import React, {useCallback} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    RefreshControl,
    Platform,
} from 'react-native';
import {useTheme, Badge} from 'react-native-paper';
import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';
import ShoppingBag from 'components/common/icons/ShoppingBag';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SupplyItem from '../SupplyTabs/SupplyItem';
import SupplyItemBig from '../SupplyTabs/SupplyItemBig';
import EmptyContent from 'components/common/EmptyContent';
import WaiterItem from '../SupplyTabs/Supply/WaiterItem';
import constants from '@constants';

const SupplySearch = (props: any) => {
    const {
        t,
        navigation,
        currentOrder,
        user,
        uniqueItemCount,
        searchTerm,
        setSearchTerm,
        onRefresh,
        allSupplies,
        onEndReached,
        loading,
        isWaiter,
        isSalesman,
        hasRoomServiceEnabled,
    } = props;
    const {colors} = useTheme();

    const keyExtractor = useCallback((item, index) => item.id.toString(), []);

    const renderItem = useCallback(
        ({item, index}) =>
            item?.type && item?.type.toLowerCase() === 'big' ? (
                <SupplyItemBig title={item.name} item={item} />
            ) : isWaiter || isSalesman ? (
                <WaiterItem item={item} t={t} />
            ) : (
                <SupplyItem title={item.name} item={item} />
            ),
        [],
    );

    return (
        <View style={styles.container}>
            <Header
                menu={false}
                goBack={
                    isWaiter ||
                    isSalesman ||
                    constants.applicationId === '8265e2ee-d9a3-48d8-a209-99779c8509b3'
                        ? true
                        : false
                }
                title={t('supplySearch.title')}
                renderRightItem={
                    user?.cartEnabled
                        ? () => (
                              <TouchableOpacity
                                  style={{flexDirection: 'row', alignItems: 'center'}}
                                  onPress={() =>
                                      navigation.navigate(
                                          hasRoomServiceEnabled || isWaiter || isSalesman
                                              ? 'RoomCheckout'
                                              : 'Cart',
                                      )
                                  }>
                                  {currentOrder ? (
                                      <Text
                                          type={'smallMedium'}
                                          color={'#000'}
                                          style={{marginRight: 4}}>
                                          {t('coupons.myOrder')}
                                      </Text>
                                  ) : (
                                      <Text
                                          type={'smallMedium'}
                                          color={'#000'}
                                          style={{marginRight: 4}}>
                                          {hasRoomServiceEnabled || isWaiter || isSalesman
                                              ? t('room.order')
                                              : t('coupons.myCart')}
                                      </Text>
                                  )}

                                  <View>
                                      <ShoppingBag />
                                      {(uniqueItemCount !== 0 || currentOrder) && (
                                          <Badge
                                              size={12}
                                              color={'#000'}
                                              style={{
                                                  backgroundColor: '#000',
                                                  position: 'absolute',
                                              }}>
                                              <Text type={'small8'} color={'#fff'}>
                                                  {currentOrder
                                                      ? currentOrder.shoppingCartItems.length
                                                      : uniqueItemCount}
                                              </Text>
                                          </Badge>
                                      )}
                                  </View>
                              </TouchableOpacity>
                          )
                        : () => null
                }
            />

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#f1f1f1',
                    height: 35,
                    marginHorizontal: 16,
                    borderRadius: 2,
                    paddingHorizontal: 10,
                }}>
                <AntDesign name="search1" size={15} color="gray" />
                <TextInput
                    style={{
                        // backgroundColor: 'red',
                        alignItems: 'center',
                        textAlignVertical: 'center',
                        fontSize: 12,
                        paddingBottom: Platform.OS === 'ios' ? 0 : 10,
                        width: '88%',
                        marginLeft: 10,
                        textDecorationLine: 'none',
                        color: 'gray',
                    }}
                    autoFocus
                    placeholder={t('supplySearch.searchPlaceholder')}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                {searchTerm.length > 0 && (
                    <TouchableOpacity
                        style={{
                            marginLeft: 0,
                        }}
                        onPress={() => setSearchTerm('')}>
                        <AntDesign name="close" size={15} color="gray" />
                    </TouchableOpacity>
                )}
            </View>
            <View
                style={{
                    marginTop: 20,
                    height: 1,
                    backgroundColor: '#eeeeee',
                    // marginHorizontal: 16,
                }}
            />

            <FlatList
                data={allSupplies}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                contentContainerStyle={{
                    padding: 16,
                }}
                initialNumToRender={20}
                windowSize={10}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
                ListEmptyComponent={() =>
                    !loading ? (
                        <EmptyContent
                            text={t(!loading ? 'supplySearch.noResults' : 'supply.noItems')}
                        />
                    ) : null
                }
                onEndReached={onEndReached}
            />
        </View>
    );
};

export default SupplySearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
