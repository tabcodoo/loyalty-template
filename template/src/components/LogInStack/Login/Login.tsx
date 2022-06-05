import * as React from 'react';
import {TouchableOpacity, View, StyleSheet, ScrollView} from 'react-native';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';

import Text from 'components/common/Text';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import Background from 'components/common/Background';
import CheckBox from 'components/common/CheckBox';
import RadioButton from 'components/common/RadioButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from 'react-native-paper';

import Logo from '@constants/assets/Logo';
import Header from 'components/common/Header';

const Login = (props: any) => {
    const {t, login, confirmCode, signOutAuth, loading} = props;
    let {colors} = useTheme();

    const schema = yup.object().shape({
        email: yup.string().required(t('errors.required')).email(t('errors.email')),
        // .email(t('errors.email'))
        password: yup.string().required(t('errors.required')),
    });

    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });

    return (
        // <Background>
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            // extraScrollHeight={120}
            // enableOnAndroid={true}
            // scrollEnabled={true}
            // enableAutomaticScroll={true}
            keyboardShouldPersistTaps={'handled'}>
            {/*<View*/}
            {/*    style={{*/}
            {/*        paddingTop: 48,*/}
            {/*        paddingBottom: 32,*/}
            {/*        justifyContent: 'center',*/}
            {/*        alignItems: 'center',*/}
            {/*    }}>*/}
            {/*    <Logo fill={colors.primary} />*/}
            {/*    */}
            {/*</View>*/}
            <Header title={t('login.title')} />

            {/*<Text type="header1" center style={{marginBottom: 8}}>*/}
            {/*    {t('login.title')}*/}
            {/*</Text>*/}
            {/*<Text center style={{marginBottom: 40}} color={colors.gray3}>*/}
            {/*    {t('login.subtitle')}*/}
            {/*</Text>*/}
            <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                    <Input
                        mode="flat"
                        label={t('form.email')}
                        placeholder={t('form.email')}
                        keyboardType="email-address"
                        error={errors.email?.message}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="email"
                // defaultValue={'demo3@economico.ba'}
            />

            <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                    <Input
                        style={{marginTop: 24}}
                        mode="flat"
                        label={t('form.password')}
                        placeholder={t('form.password')}
                        secure
                        // keyboardType="email-address"
                        error={errors.password?.message}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="password"
                // defaultValue={'P@ssw0rd1!'}
            />

            <Button
                style={{marginTop: 36, marginBottom: 16}}
                mode="contained"
                label={t('btns.login')}
                // label={t('addActivity.tabBarButton')}
                onPress={handleSubmit(login)}
                // onPress={login}
                loading={loading}
            />
            {/*<Button*/}
            {/*    // style={{width: '40%', marginTop: 20, marginBottom: 60}}*/}
            {/*    mode="text"*/}
            {/*    label={t('btns.loginGuest')}*/}
            {/*    onPress={confirmCode}*/}
            {/*    // loading={addingActivityloading}*/}
            {/*/>*/}
            {/*<Button*/}
            {/*    // style={{width: '40%', marginTop: 20, marginBottom: 60}}*/}
            {/*    mode="text"*/}
            {/*    label={'Logout '}*/}
            {/*    onPress={signOutAuth}*/}
            {/*    // loading={addingActivityloading}*/}
            {/*/>*/}

            <View style={{flexDirection: 'row', marginBottom: 72}}>
                <TouchableOpacity
                    style={{flex: 1, paddingTop: 16}}
                    onPress={() => props.navigation.navigate('Register')}>
                    <Text type="small14" color={colors.gray3}>
                        {t('login.noAccountP1')}
                    </Text>
                    <Text type="small14" color={colors.primary}>
                        {t('login.noAccountP2')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        paddingTop: 16,
                    }}
                    onPress={() => props.navigation.navigate('ForgotPassword')}>
                    <Text type="small14" color={colors.gray3} style={{textAlign: 'right'}}>
                        {t('login.forgotPassword')}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        // </Background>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingHorizontal: 16,
    },
});
