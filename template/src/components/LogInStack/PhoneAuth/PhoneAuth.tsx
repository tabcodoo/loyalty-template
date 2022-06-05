import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {parsePhoneNumberFromString} from 'libphonenumber-js';

import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import Header from 'components/common/Header';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import Text from 'components/common/Text';

const PhoneAuth = (props: any) => {
    const {
        t,
        loading,
        invalidCode,
        confirmCode,
        signInAuth,
        signOutAuth,
        phoneSent,
        navigation,
    } = props;
    const {colors} = useTheme();

    const schema = yup.object().shape({
        phoneNumber: yup
            .string()
            .required(t('errors.required'))
            .test(
                'isValid',
                t('errors.phoneNumber'),
                async (value) => await parsePhoneNumberFromString(value)?.isValid(),
            ),
    });

    const {control, handleSubmit, errors, getValues} = useForm({
        resolver: yupResolver(schema),
    });

    const schema2 = yup.object().shape({
        phoneNumber: yup
            .string()
            .required(t('errors.required'))
            .test(
                'isValid',
                t('errors.phoneNumber'),
                async (value) => await parsePhoneNumberFromString(value)?.isValid(),
            ),
        code: yup.string().required(t('errors.required')),
    });

    const {control: control2, handleSubmit: handleSubmit2, errors: errors2} = useForm({
        resolver: yupResolver(schema2),
    });

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            // extraScrollHeight={120}
            // enableOnAndroid={true}
            // scrollEnabled={true}
            // enableAutomaticScroll={true}
            keyboardShouldPersistTaps={'handled'}>
            <Header title={t('phoneAuth.title')} />

            {!phoneSent ? (
                <View>
                    <Controller
                        control={control}
                        render={({onChange, onBlur, value}) => (
                            <Input
                                mode="flat"
                                label={t('form.phoneNumber')}
                                // placeholder={t('form.email')}
                                keyboardType="phone-pad"
                                error={errors.phoneNumber?.message}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="phoneNumber"
                        defaultValue={'+387'}
                    />

                    <Controller
                        control={control}
                        render={({onChange, onBlur, value}) => (
                            <Input
                                style={{marginTop: 24}}
                                mode="flat"
                                label={t('form.code')}
                                // placeholder={t('form.password')}
                                // secure
                                // keyboardType="email-address"
                                keyboardType="phone-pad"
                                error={
                                    invalidCode ? t('phoneAuth.errorCode') : errors2.code?.message
                                }
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                disabled
                            />
                        )}
                        name="code"
                        defaultValue={t('phoneAuth.enterCode')}
                    />

                    <Button
                        style={{marginTop: 36, marginBottom: 16}}
                        mode="contained"
                        label={t('phoneAuth.sendSms')}
                        // label={t('addActivity.tabBarButton')}
                        onPress={handleSubmit(signInAuth)}
                        // onPress={login}
                        loading={loading}
                    />
                </View>
            ) : (
                <View>
                    <Controller
                        control={control2}
                        render={({onChange, onBlur, value}) => (
                            <Input
                                mode="flat"
                                label={t('form.phoneNumber')}
                                // placeholder={t('form.email')}
                                keyboardType="phone-pad"
                                error={errors.phoneNumber?.message}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                disabled
                            />
                        )}
                        name="phoneNumber"
                        defaultValue={getValues('phoneNumber')}
                    />
                    {/*<Text>{getValues('phoneNumber')}</Text>*/}

                    <Controller
                        control={control2}
                        render={({onChange, onBlur, value}) => (
                            <Input
                                style={{marginTop: 24}}
                                mode="flat"
                                label={t('form.code')}
                                // placeholder={t('form.password')}
                                // secure
                                // keyboardType="email-address"
                                keyboardType="phone-pad"
                                error={
                                    invalidCode ? t('phoneAuth.errorCode') : errors2.code?.message
                                }
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="code"
                        // defaultValue={'P@ssw0rd1!'}
                    />

                    <Button
                        style={{marginTop: 36, marginBottom: 16}}
                        mode="contained"
                        label={t('phoneAuth.sendCode')}
                        // label={t('addActivity.tabBarButton')}
                        onPress={handleSubmit2(confirmCode)}
                        // onPress={login}
                        loading={loading}
                    />
                </View>
            )}
            <TouchableOpacity
                style={{paddingTop: 24, marginBottom: 48}}
                onPress={() => navigation.navigate('InitialHome')}>
                <Text type="small14" color={'#575962'}>
                    {t('phoneAuth.noSms')}
                </Text>
                <Text type="small14" color={colors.primary}>
                    {t('phoneAuth.noSmsP2')}
                </Text>
            </TouchableOpacity>
            {/*<Button*/}
            {/*    style={{marginTop: 36, marginBottom: 16}}*/}
            {/*    mode="contained"*/}
            {/*    label={'AAAA'}*/}
            {/*    // label={t('addActivity.tabBarButton')}*/}
            {/*    onPress={signOutAuth}*/}
            {/*    // onPress={login}*/}
            {/*    // loading={loading}*/}
            {/*/>*/}
        </ScrollView>
    );
};

export default PhoneAuth;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
});
