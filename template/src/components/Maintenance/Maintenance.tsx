import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useTheme} from 'react-native-paper';
import Text from 'components/common/Text';
import constants from '@constants';

const Maintenance = (props: any) => {
    const {t} = props;
    const {colors} = useTheme();

    return (
        <View style={styles.container}>
            <Image
                style={{
                    height: 300,
                    width: 300,
                }}
                resizeMode="contain"
                source={require('../../assets/images/maintenance.png')}
            />
            <Text type="header2">{t('maintenance.headline')}</Text>
            <Text
                style={{
                    textAlign: 'center',
                    marginTop: 20,
                }}
                color="gray">
                {constants.applicationId === 'b2eed16a-2188-4840-aedb-dfc7e1413b7a' //FEDI ID
                    ? t('maintenance.fediDetails')
                    : t('maintenance.details')}
            </Text>
        </View>
    );
};

export default Maintenance;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
});
