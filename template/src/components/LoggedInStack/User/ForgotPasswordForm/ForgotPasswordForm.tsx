import * as React from 'react';
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

const Login = (props: any) => {
  const {t, login, loading, setFormType, forgotPassword} = props;
  let {colors} = useTheme();

  const schema = yup.object().shape({
    email: yup.string().required(t('errors.required')).email(t('errors.email')),
  });

  const {control, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
  });

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

      <Button
        style={{marginTop: 36, marginBottom: 16}}
        mode="contained"
        label={t('forgotPassword.btn')}
        // label={t('addActivity.tabBarButton')}
        onPress={handleSubmit(forgotPassword)}
        loading={loading}
      />

      <View style={{flexDirection: 'row', paddingTop: 16}}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => setFormType('register')}>
          <Text type="small" color={colors.lightGray}>
            {t('profile.guestLogin')}
          </Text>
          <Text type="small" color={colors.secondary}>
            {t('btns.login')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}
          onPress={() => setFormType('login')}>
          <Text type="small" color={colors.lightGray}>
            {t('login.noAccount')}
          </Text>
          <Text type="small" color={colors.secondary}>
            {t('btns.register')}
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
