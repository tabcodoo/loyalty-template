import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView, Linking, Platform} from 'react-native';
import {useTheme} from 'react-native-paper';
import Text from 'components/common/Text';
import Button from 'components/common/Button';

import Logo from '@constants/assets/Logo';
import constants from '@constants';
import Header from 'components/common/Header';

const InitialHome = (props: any) => {
    const {t, loading, onGoogleButtonPress, navigation, onAppleButtonPress, guestLogin} = props;
    const {colors} = useTheme();

    return (
        <View style={{height: '100%'}}>
            <ScrollView
                // style={styles.container}
                contentContainerStyle={styles.container}
                // showsVerticalScrollIndicator={false}
                // extraScrollHeight={120}
                // enableOnAndroid={true}
                // scrollEnabled={true}
                // enableAutomaticScroll={true}
                // keyboardShouldPersistTaps={'handled'}
            >
                {/* <View style={{position: 'absolute'}}> */}
                <Header />
                {/* </View> */}
                <View
                    style={{
                        // paddingTop: 48,
                        // paddingBottom: 24,
                        flex: 1,
                        // backgroundColor: '#faf',
                        // marginVertical: 58,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Logo fill={colors.primary} />
                </View>
                {/*<Text type="header1" center style={{}}>*/}
                {/*    {t('initialHome.title')}*/}
                {/*</Text>*/}
                <View
                    style={
                        {
                            // marginBottom: 200,
                            // flex: 2,
                            // justifyContent: 'center',
                            // backgroundColor: '#ff0',
                        }
                    }>
                    {Platform.OS === 'ios' && (
                        <Button
                            style={{marginBottom: 16}}
                            mode="contained"
                            label={t('initialHome.appleLogin')}
                            icon={'apple'}
                            primaryColor={'#000'}
                            // label={t('addActivity.tabBarButton')}
                            onPress={onAppleButtonPress}
                            // onPress={login}
                            // loading={loading}
                        />
                    )}
                    <Button
                        style={{}}
                        label={t('initialHome.googleLogin')}
                        icon={'google'}
                        onPress={onGoogleButtonPress}
                        loading={loading}
                        mode="contained"
                        primaryColor={constants.googleLoginColor}
                    />
                    <Button
                        style={{marginTop: 16}}
                        mode="contained"
                        label={t('initialHome.smsLogin')}
                        icon={'phone'}
                        primaryColor={constants.smsLoginColor}
                        // label={t('addActivity.tabBarButton')}
                        onPress={() => navigation.navigate('PhoneAuth')}
                        // loading={loading}
                    />

                    <Button
                        style={{marginTop: 16}}
                        mode="contained"
                        label={t('initialHome.emailLogin')}
                        icon={'envelope-o'}
                        // label={t('addActivity.tabBarButton')}
                        onPress={() => navigation.navigate('Login')}
                        // onPress={login}
                        // loading={loading}
                    />
                    {/* <Text
                    center
                    type={'small'}
                    style={[
                        {
                            marginTop: 16,
                        },
                    ]}
                    color={'#9c9c9c'}>
                    {t('initialHome.or')}
                </Text> */}
                    <Button
                        style={{marginTop: 16}}
                        // mode="contained"
                        icon={'envelope-o'}
                        label={t('initialHome.emailRegister')}
                        // label={t('addActivity.tabBarButton')}
                        onPress={() => navigation.navigate('Register')}
                        // onPress={login}
                        // loading={loading}
                    />

                    <TouchableOpacity
                        style={{marginTop: 16}}
                        onPress={() => {
                            Linking.openURL(
                                constants?.termsAndConditions
                                    ? constants?.termsAndConditions
                                    : 'https://www.google.com',
                            );
                        }}>
                        <Text type="small14" color={'#575962'} style={{lineHeight: 16}}>
                            {t('register.termsAndConditionsP1')}
                        </Text>
                        <Text type="small14" color={colors.primary}>
                            {t('register.termsAndConditionsP2')}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginBottom: 38}}></View>
                {/*{isDev && (*/}
                {/*    <View style={{position: 'absolute', bottom: 0, right: 0}}>*/}
                {/*        <Text type={'small10LightText'}>dev</Text>*/}
                {/*    </View>*/}
                {/*)}*/}
            </ScrollView>
        </View>
    );
};

export default InitialHome;

const styles = StyleSheet.create({
    container: {
        margin: 24,
        marginTop: 0,
        // backgroundColor: '#ff0',
        minHeight: '100%',
        // justifyContent: 'space-between',
        // flex: 1,
    },
});
