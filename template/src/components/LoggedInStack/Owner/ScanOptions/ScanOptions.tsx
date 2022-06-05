import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ScanOptions = (props: any) => {
    const {t, navigation} = props;
    const {colors} = useTheme();

    return (
        <View style={styles.container}>
            <Header menu title={t('scanOptions.title')} />
            <View style={{flex: 1, padding: 16, justifyContent: 'space-around'}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Scanner')}
                    style={{
                        height: '25%',
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor: colors.primary,
                        borderRadius: 6,
                    }}>
                    <MaterialCommunityIcons
                        name={'qrcode-scan'}
                        size={50}
                        style={{marginHorizontal: 16}}
                    />
                    <Text type={'header1'} color={'#000'}>
                        QR
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        height: '25%',
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor: colors.primary,
                        borderRadius: 6,
                    }}>
                    <MaterialCommunityIcons name={'nfc'} size={50} style={{marginHorizontal: 16}} />
                    <Text type={'header1'} color={'#000'}>
                        NFC
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ScanOptions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
