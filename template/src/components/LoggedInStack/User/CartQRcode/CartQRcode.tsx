import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';
import Button from 'components/common/Button';

import QRCode from 'react-native-qrcode-svg';

let {width} = Dimensions.get('window');

const CartQRcode = (props: any) => {
    const {t, currentOrder, qrCode, user} = props;
    const {colors} = useTheme();

    return (
        <View style={styles.container}>
            <Header title={t('cartQRcode.title')} goBack />

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{marginBottom: 16}}>{t('profileQRcode.scan')}</Text>
                {qrCode.length > 0 && <QRCode value={qrCode} size={width / 1.7} />}

                {/*<Button label={'AAA'} onPress={openGlobalSheet} />*/}
            </View>
        </View>
    );
};

export default CartQRcode;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
