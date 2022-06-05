import * as React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Divider, useTheme} from 'react-native-paper';
import Header from 'components/common/LoggedInHeader';

import NoNotifications from 'components/common/icons/NoNotifications';
import Trash from 'components/common/icons/Trash';
import Clock from 'components/common/icons/Clock';

import moment from 'moment';
import Text from 'components/common/Text';
import Button from 'components/common/Button';

const Notifications = (props: any) => {
  const {
    t,
    navigation,
    notifications,
    fetchNotifications,
    user,
    deleteStarted,
    setDeleteStarted,
    deleteNotification,
  } = props;
  const {colors} = useTheme();

  //
  let NotificationItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // console.tron.log(item);
          navigation.navigate('Notification', {notification: item});
          // if (item?.couponId) {
          //     navigation.navigate('Notification', {notification: item});
          // } else navigation.navigate('Notification', {notification: item});
        }}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 1}}>
            <View style={{paddingVertical: 8}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, marginRight: deleteStarted ? 16 : 0}}>
                  <Text type={item?.isRead ? 'medium' : 'bold'}>
                    {item.subject}
                  </Text>
                  <Text
                    type="smallMedium"
                    style={{marginTop: 8, lineHeight: 14}}
                    numberOfLines={3}>
                    {item.message}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 16,
                }}>
                <View
                  style={{
                    height: 18,
                    width: 18,
                    backgroundColor: '#f1f1f1',
                    borderRadius: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Clock />
                </View>
                <Text type="small" color="#0a3039" style={{marginLeft: 8}}>
                  {moment(item.notificationDate).format('DD/MM/YYYY HH:ss')}
                </Text>
              </View>
            </View>
          </View>
          {user.userRole.toLowerCase() !== 'guest' && deleteStarted && (
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#f1f1f1',
                  padding: 8,
                  borderRadius: 8,
                }}
                onPress={() => {
                  deleteNotification(item?.id, index);
                }}>
                <Trash />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Divider style={{marginBottom: 1}} />
        {!item?.isRead && !deleteStarted && (
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 8,
              backgroundColor: colors.primary,
              position: 'absolute',
              right: 9,
              top: 16,
            }}></View>
        )}
      </TouchableOpacity>
    );
  };

  let renderItem = ({item, index}) => <NotificationItem {...{item, index}} />;
  // console.tron.log(
  //     'notifications.data.length === 0 && notifications.loading',
  //     notifications.data.length === 0 && notifications.loading,
  //     notifications,
  // );
  return (
    <View style={styles.container}>
      <Header
        title={t('notifications.title')}
        renderRightItem={
          notifications.data.length > 0 &&
          user.userRole.toLowerCase() !== 'guest'
            ? () => (
                <TouchableOpacity
                  onPress={() => setDeleteStarted(!deleteStarted)}>
                  <Text type="small12" color={colors.primary}>
                    {deleteStarted
                      ? t('notifications.cancel')
                      : t('notifications.delete')}
                  </Text>
                </TouchableOpacity>
              )
            : () => null
        }
      />
      {notifications.data.length > 0 ||
      (notifications.data.length === 0 && notifications.loading) ? (
        <View style={{flex: 1}}>
          <FlatList
            // scrollEnabled={false}
            data={notifications.data}
            renderItem={renderItem}
            style={{paddingHorizontal: 16}}
            refreshControl={
              <RefreshControl
                refreshing={
                  notifications.data.length === 0 && notifications.loading
                }
                onRefresh={() => fetchNotifications(true)}
              />
            }
            keyExtractor={(item, index) => index.toString()}
            // getItemLayout={(data, index) => ({
            //     length: ITEM_HEIGHT,
            //     offset: ITEM_HEIGHT * index,
            //     index,
            // })}
            // initialNumToRender={50}
            // windowSize={24}
            // removeClippedSubviews={false}
            onEndReached={({distanceFromEnd}) => fetchNotifications()}
            // onEndReachedThreshold={0.5}
            // ListFooterComponent={() =>
            //     coupons.length > 0 && loading ? (
            //         <ActivityIndicator size={'small'} />
            //     ) : null
            // }
            // ListFooterComponentStyle={{
            //     height: 16,
            //     justifyContent: 'center',
            //     alignItems: 'center',
            // }}
            // ListEmptyComponent={() =>
            //     loading ? (
            //         <View style={{marginBottom: 48}}></View>
            //     ) : (
            //         <Text style={{marginVertical: 24}} center>
            //             {/*{t('coupons.noCoupons')}*/}
            //         </Text>
            //     )
            // }
          />
        </View>
      ) : (
        // <ScrollView style={{paddingHorizontal: 16}}>
        //     <NotificationItem />
        //     <NotificationItem />
        // </ScrollView>
        <>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 16,
            }}>
            <NoNotifications />
            <Text type="header3" style={{marginTop: 32}}>
              {t('notifications.noNotificationsTitle')}
            </Text>
            <Text
              type="smallMedium"
              center
              style={{lineHeight: 18, marginTop: 16}}>
              {t('notifications.noNotificationsSubtitle')}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              width: '90%',
              alignSelf: 'center',
            }}>
            <Button
              mode={'contained'}
              label={t('notifications.backToHome')}
              onPress={() => navigation.goBack()}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
