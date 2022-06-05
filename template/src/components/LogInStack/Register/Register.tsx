import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';

import {useTheme, RadioButton as RadioGroup} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from 'components/common/Header';
import Text from 'components/common/Text';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import CheckBox from 'components/common/CheckBox';
import Background from 'components/common/Background';
import DatePicker from 'components/common/DatePicker';
import RadioButton from 'components/common/RadioButton';
import Dropdown from 'components/common/Dropdown';
import DropDownHolder from 'services/DropDownHolder';

const Register = (props: any) => {
    const {t, register, navigation, interests, setInterests, loading} = props;
    let {colors} = useTheme();

    const schema = yup.object().shape({
        // name: yup.string().required(t('errors.required')),
        email: yup.string().required(t('errors.required')).email(t('errors.email')),
        password: yup
            .string()
            .required(t('errors.required'))
            .min(8, t('errors.minEightChars'))
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                t('errors.password'),
            ),
        password_confirmation: yup
            .string()
            .required(t('errors.required'))
            .oneOf([yup.ref('password'), null], t('errors.passwordMatch')),
        // phone_number: yup.string(),
        // birth_date: yup.string(),
        // sex: yup.string(),
        // tosAgreement: yup
        //     .bool()
        //     .required(t('errors.termsAndConditions'))
        //     .oneOf([true], t('errors.termsAndConditions')),
    });

    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (errors.termsAndConditions)
            DropDownHolder.dropDown.alertWithType('error', '', errors.termsAndConditions.message);
    }, [errors]);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Header title={t('register.title')} />
            {/*<Controller*/}
            {/*    control={control}*/}
            {/*    render={({onChange, onBlur, value}) => (*/}
            {/*        <Input*/}
            {/*            mode="flat"*/}
            {/*            // label={t('form.email')}*/}
            {/*            label={t('form.fullName')}*/}
            {/*            placeholder={t('form.fullName')}*/}
            {/*            // keyboardType="email-address"*/}
            {/*            error={errors.name?.message}*/}
            {/*            onBlur={onBlur}*/}
            {/*            onChangeText={onChange}*/}
            {/*            value={value}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*    name="name"*/}
            {/*/>*/}

            <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                    <Input
                        style={{marginTop: 24}}
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
            />

            <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                    <Input
                        style={{marginTop: 24}}
                        mode="flat"
                        label={t('form.repeatPassword')}
                        placeholder={t('form.repeatPassword')}
                        secure
                        // keyboardType="email-address"
                        error={errors.password_confirmation?.message}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="password_confirmation"
            />

            {/*<Text style={{marginTop: 24}}>{t('register.extraDataLabel')}</Text>*/}

            {/*<Controller*/}
            {/*    control={control}*/}
            {/*    render={({onChange, onBlur, value}) => (*/}
            {/*        <Input*/}
            {/*            style={{marginTop: 24}}*/}
            {/*            mode="flat"*/}
            {/*            // label={t('form.password')}*/}
            {/*            placeholder={t('form.phoneNumber')}*/}
            {/*            // keyboardType="email-address"*/}
            {/*            error={errors.phone_number?.message}*/}
            {/*            onBlur={onBlur}*/}
            {/*            onChangeText={onChange}*/}
            {/*            value={value}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*    name="phone_number"*/}
            {/*/>*/}

            {/*<Controller*/}
            {/*    control={control}*/}
            {/*    render={({onChange, onBlur, value}) => (*/}
            {/*        <DatePicker style={{marginTop: 24}} onSelect={onChange} date={value} />*/}
            {/*    )}*/}
            {/*    name="birth_date"*/}
            {/*/>*/}

            {/*<Controller*/}
            {/*    control={control}*/}
            {/*    render={({onChange, onBlur, value}) => (*/}
            {/*        <>*/}
            {/*            <Text*/}
            {/*                style={{marginTop: 24, marginLeft: 8, marginBottom: 4}}*/}
            {/*                type="small"*/}
            {/*                color={colors.secondary}>*/}
            {/*                Spol*/}
            {/*            </Text>*/}
            {/*            <View style={{flexDirection: 'row'}}>*/}
            {/*                <RadioGroup.Group*/}
            {/*                    onValueChange={(radioValue) => onChange(radioValue)}*/}
            {/*                    value={value}>*/}
            {/*                    <RadioButton*/}
            {/*                        value="man"*/}
            {/*                        label={t('register.man')}*/}
            {/*                        onPress={(value) => onChange(value)}*/}
            {/*                    />*/}
            {/*                    <RadioButton*/}
            {/*                        value="woman"*/}
            {/*                        label={t('register.woman')}*/}
            {/*                        onPress={(value) => onChange(value)}*/}
            {/*                    />*/}
            {/*                    <RadioButton*/}
            {/*                        value="none"*/}
            {/*                        label={t('register.none')}*/}
            {/*                        onPress={(value) => onChange(value)}*/}
            {/*                    />*/}
            {/*                </RadioGroup.Group>*/}
            {/*            </View>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*    name="sex"*/}
            {/*/>*/}

            {/*<Dropdown*/}
            {/*    header={'Interesi (*Moguće odabrati više odgovora)'}*/}
            {/*    label={`Vaši interesi  (${interests.filter((item) => item.active).length}/${*/}
            {/*        interests.length*/}
            {/*    })`}*/}
            {/*    style={{marginTop: 22}}*/}
            {/*    multi*/}
            {/*    items={interests}*/}
            {/*    onSelect={(item, index) => {*/}
            {/*        let tempInterests = interests*/}
            {/*            .slice()*/}
            {/*            .map((item, id) => (index === id ? {...item, active: !item.active} : item));*/}
            {/*        setInterests(tempInterests);*/}
            {/*    }}*/}
            {/*/>*/}

            {/*<Controller*/}
            {/*    control={control}*/}
            {/*    render={({onChange, onBlur, value}) => (*/}
            {/*        <View*/}
            {/*            style={{*/}
            {/*                marginTop: 24,*/}
            {/*                flexDirection: 'row',*/}
            {/*                alignItems: 'center',*/}
            {/*            }}>*/}
            {/*            <CheckBox*/}
            {/*                // label="AAA"*/}
            {/*                checked={value}*/}
            {/*                onPress={() => onChange(!value)}*/}
            {/*            />*/}
            {/*            <View>*/}
            {/*                <Text type="smallLight">{t('register.termsAndConditionsP1')}</Text>*/}
            {/*                <Text*/}
            {/*                    type="smallLight"*/}
            {/*                    color={colors.primary}*/}
            {/*                    onPress={() => navigation.navigate('TermsAndConditions')}>*/}
            {/*                    {t('register.termsAndConditionsP2')}*/}
            {/*                </Text>*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*    )}*/}
            {/*    name="tosAgreement"*/}
            {/*/>*/}

            <Button
                style={{marginTop: 32}}
                mode="contained"
                label={t('btns.register')}
                // label={t('addActivity.tabBarButton')}
                onPress={handleSubmit(register)}
                loading={loading}
            />
            <TouchableOpacity
                style={{paddingTop: 32}}
                onPress={() => navigation.navigate('InitialHome')}>
                <Text type="small14" color={'#575962'}>
                    {t('register.noEmail')}
                </Text>
                <Text type="small14" color={colors.primary}>
                    {t('register.noEmailP2')}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        // backgroundColor: '#fff',
    },
});
