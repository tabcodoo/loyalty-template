import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';

import Header from 'components/common/LoggedInHeader';
import Toggle from 'components/common/Toggle';
import Text from 'components/common/Text';
import Button from 'components/common/Button';
import CategoriesSelection from 'components/common/CategoriesSelection';
import LanguageSelector from 'components/common/LanguageSelector';
import {Switch} from 'react-native-paper';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {openSettings} from 'react-native-permissions';

const Settings = (props: any) => {
    const {
        t,
        notificationAllowed,
        toggleNotification,
        permissionsGranted,
        offerCategoriesSettings,
        user,
        changeLanguage,
    } = props;
    const {colors} = useTheme();

    return (
        <View style={{flex: 1}}>
            <Header title={t('settings.title')} goBack />

            <KeyboardAwareScrollView style={styles.container}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 16,
                        marginTop: 24,
                    }}>
                    <Text>{t('settings.notifications')}</Text>
                    <Switch
                        // value={notificationAllowed}
                        // onPress={!permissionsGranted ? openSettings : toggleNotification}
                        value={notificationAllowed}
                        onValueChange={!permissionsGranted ? openSettings : toggleNotification}
                        color={colors.primary}
                    />
                </View>

                {/* <LanguageSelector t={t} /> */}

                {/* <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 16,
                        marginTop: 24,
                    }}>
                    <View style={{flex: 1}}>
                        <Text>{t('settings.notifications')}</Text>
                    </View>
                    <View>
                        <Button
                            mode={'outlined'}
                            label={user.language == 'en' ? 'English' : 'Bosanski'}
                            onPress={changeLanguage}
                        />
                    </View>
                    
                </View> */}

                {user.groupCouponsByCategory && notificationAllowed && (
                    <>
                        <Text type="small14" color="#3c4c58">
                            {t('settings.categoriesEnabled')}
                        </Text>
                        <CategoriesSelection />
                    </>
                )}
            </KeyboardAwareScrollView>
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        // paddingTop: 24,
    },
});
