import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';

import Background from 'components/common/Background';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from 'components/common/Header';

const ForgotPassword = (props: any) => {
    const {t, sendRequest, loading} = props;

    const schema = yup.object().shape({
        usernameOrEmail: yup.string().required(t('errors.required')).email(t('errors.email')),
    });

    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });

    return (
        // <Background>
        <KeyboardAwareScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Header title={t('forgotPassword.title')} />

            <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                    <Input
                        mode="flat"
                        label={t('form.email')}
                        // placeholder={t('form.email')}
                        keyboardType="email-address"
                        error={errors.usernameOrEmail?.message}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="usernameOrEmail"
            />

            <Button
                style={{marginTop: 24}}
                mode="contained"
                label={t('forgotPassword.btn')}
                onPress={handleSubmit(sendRequest)}
                loading={loading}
            />
        </KeyboardAwareScrollView>
        // </Background>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
});
