import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';
import Button from 'components/common/Button';

import QRCode from 'react-native-qrcode-svg';

let {width} = Dimensions.get('window');
const ProfileQRcode = (props: any) => {
    const {t, user, openGlobalSheet} = props;
    const {colors} = useTheme();

    return (
        <View style={styles.container}>
            <Header title={t('profileQRcode.title')} goBack />
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{marginBottom: 16}}>{t('profileQRcode.scan')}</Text>
                <QRCode value={`user ${user.uid}`} size={width / 1.7} />

                {/*<Button label={'AAA'} onPress={openGlobalSheet} />*/}
            </View>
        </View>
    );
};

export default ProfileQRcode;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
