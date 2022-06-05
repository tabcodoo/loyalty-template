import React, {useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image, ScrollView} from 'react-native';
import Header from 'components/common/LoggedInHeader';
import ShoppingBag from 'components/common/icons/ShoppingBag';
import {useTheme, Badge} from 'react-native-paper';
import {categoriesData} from '../../../../constants/bracomCategories';

const CategorySelection = (props: any) => {
    const {t, user, navigation, uniqueItemCount, currentOrder} = props ?? {};
    const {colors} = useTheme();

    const CategoryItem = ({item}) => (
        <TouchableOpacity
            onPress={() => navigateToSupply(item)}
            activeOpacity={0.95}
            style={{
                width: '48%',
                marginBottom: '4%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                backgroundColor: 'white',
                elevation: 10,
                height: 150,
                borderRadius: 5,
            }}>
            <Image
                style={{width: '100%', height: 100}}
                source={item?.imagePath}
                resizeMode={'contain'}
            />
            <Text type="smallMedium" style={{fontWeight: 'bold', textAlign: 'center'}}>
                {item?.name}
            </Text>
        </TouchableOpacity>
    );

    const navigateToSupply = useCallback(
        (item) => {
            navigation.navigate('Supply', {item});
        },
        [navigation],
    );

    return (
        <View style={{flex: 1}}>
            <Header
                // style={{position: 'absolute', width: '100%', backgroundColor: 'white'}}
                // menu
                isBack
                title={t('supply.title')}
                renderRightItem={
                    user?.cartEnabled
                        ? () => (
                              <TouchableOpacity
                                  style={{flexDirection: 'row', alignItems: 'center'}}
                                  onPress={() => navigation.navigate('Cart')}>
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
                                          {t('coupons.myCart')}
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
                                              <Text
                                                  type={'small8'}
                                                  color={'#fff'}
                                                  style={{fontSize: 8}}>
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
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    // paddingTop: 100,
                    paddingBottom: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                {categoriesData.map((item) => (
                    <CategoryItem item={item} />
                ))}
            </ScrollView>
        </View>
    );
};

export default CategorySelection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemContainer: {},
});
