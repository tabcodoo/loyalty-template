import * as React from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {useTheme} from 'react-native-paper';

import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';
import Button from 'components/common/Button';

const Reservations = (props: any) => {
    const {t, customLinkUrl, bottomMenuActivated} = props;
    const {colors} = useTheme();

    let checkForPrefix = () => {
        if (!customLinkUrl.includes('http://') && !customLinkUrl.includes('https://')) {
            Linking.canOpenURL('http://' + customLinkUrl).then((res) => {
                if (res) Linking.openURL('http://' + customLinkUrl);
                else {
                    Linking.canOpenURL('https://' + customLinkUrl).then((res) => {
                        if (res) Linking.openURL('https://' + customLinkUrl);
                        else Linking.openURL('https://' + customLinkUrl);
                    });
                }
            });
        }
    };

    return (
        <View style={styles.container}>
            <Header menu={bottomMenuActivated} title={t('reservations.tabBarLabel')} />
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    padding: 16,
                }}>
                <View>
                    <Text type="header3">{t('reservations.title')}</Text>
                    <Text type="small14" style={{marginTop: 16, lineHeight: 16}}>
                        {t('reservations.subtitle')}
                    </Text>
                </View>
                <Button
                    label={t('reservations.button')}
                    mode={'contained'}
                    style={{marginBottom: 20}}
                    onPress={() => {
                        Linking.canOpenURL(customLinkUrl)
                            .then((res) => {
                                if (res) Linking.openURL(customLinkUrl);
                                else checkForPrefix();
                            })
                            .catch((err) => checkForPrefix());
                    }}
                />
            </View>
        </View>
    );
};

export default Reservations;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
