import React, {useCallback, useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform, ActivityIndicator, TextInput, Dimensions} from 'react-native';
import {useTheme, Badge} from 'react-native-paper';
import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';
import ShoppingBag from 'components/common/icons/ShoppingBag';
import AntDesign from 'react-native-vector-icons/AntDesign'
import color from 'color';
import {useNavigation} from '@react-navigation/native';
import api from 'services/api';
import actions from 'store/actions';
import {useDispatch, useSelector} from 'react-redux';

const Rooms = (props: any) => {
    const {
        t,
        objects,
        selectObject,
        user,
        navigation,
        currentOrder,
        uniqueItemCount,
        isWaiter,
        isSalesman,
        searchTerm,
        setSearchTerm,
        filteredObjects,
        isLoading,
    } = props;
    const {colors} = useTheme();

    const getBackgroundColor = (isPressed) =>
        color(colors.primary)
            .alpha(isPressed ? 1 : 0.3)
            .rgb()
            .string();

    const RoomItem = useCallback(
        ({item, index}) => (
            <TouchableOpacity
            onPress={() => {  
                setSearchTerm('')
                selectObject(item)
            }}
                style={{
                    height: isSalesman ? 'auto' : 55,
                    width: isSalesman ? 'auto' : Dimensions.get('window').width*0.206,
                    backgroundColor: getBackgroundColor(item.isPressed),
                    borderRadius: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: (index +1) % 4 > 0 ? 10 :0,
                    marginBottom: 10,
                    paddingVertical: isSalesman ? 20 : 0,
                    paddingHorizontal: isSalesman ? 30 : 0,
                }}>
                <Text color={item.isPressed ? 'white' : '#484848'} type="bold">
                    {`${isSalesman ? '' : '#'}${item.objectNumber}`}
                </Text>
            </TouchableOpacity>
        ),
        [],
    );

    const keyExtractor = useCallback((item, index) => item?.id.toString(), []);

    return (
        <View style={styles.container}>
            <Header
                menu={true}
                title={isWaiter || isSalesman ? t('room.order') : t('room.title')}
                renderRightItem={
                    user?.cartEnabled
                        ? () => (
                              <TouchableOpacity
                                  style={{flexDirection: 'row', alignItems: 'center'}}
                                  onPress={() => navigation.navigate('RoomCheckout')}>
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
                                          {t('room.order')}
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
                    // autoFocus
                    placeholder={isWaiter
                        ? t('room.searchTable')
                        : isSalesman
                        ? t('salesman.searchClient')
                        : t('room.searchRoom')}
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

            <Text
                style={{
                    marginLeft: 16,
                    marginTop: 10,
                    fontSize: 16,
                    marginVertical: 10,
                }}
                type="bold">
                {isWaiter
                    ? t('room.pickTable')
                    : isSalesman
                    ? t('salesman.pickClient')
                    : t('room.pickRoom')}
            </Text>

            {!filteredObjects.length ? isLoading ? (
                <ActivityIndicator
                    size="small"
                    color={colors.primary}
                    style={{
                        alignSelf: 'center',
                        margin: 20,
                    }}
                />
            ) : <Text style={{textAlign:'center', marginTop:20}} >{t('room.noResults')}</Text> : (
                <View
                    style={{
                        marginHorizontal: 16,
                        paddingBottom:10,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems:'center',
                    }}>
                    {filteredObjects.map((item, index) => (
                        <RoomItem item={item} index={index} />
                    ))}
                </View>
            )}
        </View>
    );
};

export default Rooms;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
