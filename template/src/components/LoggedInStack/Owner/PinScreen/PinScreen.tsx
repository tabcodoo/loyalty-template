import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {useTheme} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Text from 'components/common/Text';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Logout from 'components/common/icons/Logout';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import Input from 'components/common/Input';
import Button from 'components/common/Button';

const PinScreen = (props: any) => {
    const {t, loading, logout, login} = props;
    const {colors} = useTheme();

    const schema = yup.object().shape({
        pinCode: yup.string().required(t('errors.required')),
    });

    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={{height: 56, justifyContent: 'flex-end'}}>
                <Text type={'header1'}>{t('pinScreen.title')}</Text>
            </View>
            <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                    <Input
                        style={{marginTop: 24}}
                        mode="flat"
                        label={t('form.pin')}
                        placeholder={t('form.pin')}
                        secure
                        keyboardType={
                            Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'
                        }
                        error={errors.password?.message}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="pinCode"
                // defaultValue={'P@ssw0rd1!'}
            />

            <Button
                style={{marginTop: 36, marginBottom: 16}}
                mode="contained"
                label={t('btns.login')}
                // label={t('addActivity.tabBarButton')}
                onPress={handleSubmit(login)}
                loading={loading}
            />
        </KeyboardAwareScrollView>
    );
};

export default PinScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,

        flex: 1,
        backgroundColor: '#fff',
        paddingTop: getStatusBarHeight(),
        justifyContent: 'center',
    },
});
