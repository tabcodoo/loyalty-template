import * as React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';

import moment from 'moment';

const Notification = (props: any) => {
    const {t, notification, fromNotification} = props;
    const {colors} = useTheme();
    return (
        <View style={styles.container}>
            <Header goBack={!fromNotification} />
            <ScrollView style={{paddingHorizontal: 16}}>
                <Text type="header1">{notification.subject}</Text>
                <Text type="smallMedium" style={{opacity: 0.4, marginTop: 16, marginBottom: 24}}>
                    {moment(notification.notificationDate).format('DD/MM/YYYY')}
                </Text>
                <Text>{notification.message}</Text>
            </ScrollView>
        </View>
    );
};

export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
