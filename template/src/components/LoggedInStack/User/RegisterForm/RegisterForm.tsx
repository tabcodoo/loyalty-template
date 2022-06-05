import React, {useEffect} from 'react';
import {TouchableOpacity, View, StyleSheet, Image} from 'react-native';

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
import DropDownHolder from 'services/DropDownHolder';

const Login = (props: any) => {
  const {t, login, loading, setFormType} = props;
  let {colors} = useTheme();

  const schema = yup.object().shape({
    fullName: yup.string().required(t('errors.required')),
    email: yup.string().required(t('errors.required')).email(t('errors.email')),
    password: yup
      .string()
      .required(t('errors.required'))
      .min(8, t('errors.minEightChars'))
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        t('errors.password'),
      ),
    repeatPassword: yup
      .string()
      .required(t('errors.required'))
      .oneOf([yup.ref('password'), null], t('errors.passwordMatch')),
    phoneNumber: yup.string(),
    termsAndConditions: yup
      .bool()
      .required(t('errors.termsAndConditions'))
      .oneOf([true], t('errors.termsAndConditions')),
  });

  const {control, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (errors.termsAndConditions)
      DropDownHolder.dropDown.alertWithType(
        'error',
        '',
        errors.termsAndConditions.message,
      );
  }, [errors]);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <Input
            mode="flat"
            // label={t('form.email')}
            placeholder={t('form.fullName')}
            // keyboardType="email-address"
            error={errors.fullName?.message}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="fullName"
      />

      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <Input
            style={{marginTop: 24}}
            mode="flat"
            // label={t('form.email')}
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
            // label={t('form.password')}
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
            // label={t('form.password')}
            placeholder={t('form.repeatPassword')}
            secure
            // keyboardType="email-address"
            error={errors.repeatPassword?.message}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="repeatPassword"
      />

      <Text style={{marginTop: 36}}>{t('register.extraDataLabel')}</Text>

      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <Input
            style={{marginTop: 24}}
            mode="flat"
            // label={t('form.password')}
            placeholder={t('form.phoneNumber')}
            // keyboardType="email-address"
            error={errors.phoneNumber?.message}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="phoneNumber"
      />

      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <View
            style={{
              marginTop: 24,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckBox
              // label="AAA"
              checked={value}
              onPress={() => onChange(!value)}
            />
            <Text type="small14">{t('register.termsAndConditionsP1')}</Text>
            <Text
              type="small14"
              color={colors.secondary}
              onPress={() => navigation.navigate('TermsAndConditions')}>
              {t('register.termsAndConditionsP2')}
            </Text>
          </View>
        )}
        name="termsAndConditions"
      />

      <Button
        style={{marginTop: 36, marginBottom: 16}}
        mode="contained"
        label={t('btns.register')}
        // label={t('addActivity.tabBarButton')}
        onPress={handleSubmit(login)}
        loading={loading}
      />

      <View style={{flexDirection: 'row', paddingTop: 16, marginBottom: 56}}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => setFormType('login')}>
          <Text type="small" color={colors.lightGray}>
            {t('profile.guestLogin')}
          </Text>
          <Text type="small" color={colors.secondary}>
            {t('btns.login')}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});
