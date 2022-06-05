import * as React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';

import Header from 'components/common/LoggedInHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';

import Input from 'components/common/Input';
import Button from 'components/common/Button';
import Text from 'components/common/Text';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

let {width} = Dimensions.get('window');
const Profile = (props: any) => {
    const {t, user, changePassword, openUserIdSheet, navigation} = props;
    const {colors} = useTheme();

    const schema = yup.object().shape({
        // name: yup.string().required(t('errors.required')),
        // email: yup.string().required(t('errors.required')).email(t('errors.email')),
        // password: yup.string().required(t('errors.required')),
        oldPassword: yup
            .string()
            .required(t('errors.required'))
            .min(8, t('errors.minEightChars'))
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                t('errors.password'),
            ),
        newPassword: yup
            .string()
            .required(t('errors.required'))
            .min(8, t('errors.minEightChars'))
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                t('errors.password'),
            ),
        newPasswordConfirm: yup
            .string()
            .required(t('errors.required'))
            .oneOf([yup.ref('newPassword'), null], t('errors.passwordMatch')),
    });

    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });

    let ProfileItem = ({
        onPress = () => {},
        title = '',
        subtitle = '',
        rightItem = () => null,
        activeOpacity = 0.7,
    }) => {
        return (
            <TouchableOpacity
                activeOpacity={activeOpacity}
                onPress={onPress}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(0,0,0,0.12)',
                }}>
                <View>
                    <Text type={'medium'} style={{marginBottom: 8}}>
                        {title}
                    </Text>
                    <Text type={'small'}>{subtitle}</Text>
                </View>
                <View>{rightItem()}</View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{flex: 1}}>
            <Header title={t('profile.title')} goBack />
            <KeyboardAwareScrollView style={styles.container}>
                {/*<Text type={'small'}>*/}
                {/*    {user?.authProvider.toLowerCase() === 'economicosms'*/}
                {/*        ? t('form.phoneNumber')*/}
                {/*        : t('profile.email')}*/}
                {/*</Text>*/}
                {/*<Text type={'bold'}>{user.email}</Text>*/}

                {user?.personalQrEnabled && (
                    <ProfileItem
                        onPress={() => navigation.navigate('ProfileQRcode')}
                        title={t('profile.userQrCode')}
                        subtitle={user.uid}
                        rightItem={() => <FontAwesome name={'qrcode'} size={24} />}
                    />
                )}
                <ProfileItem
                    // onPress={openUserIdSheet}
                    activeOpacity={1}
                    title={
                        user?.authProvider && user?.authProvider?.toLowerCase() === 'economicosms'
                            ? t('form.phoneNumber')
                            : t('profile.email')
                    }
                    subtitle={user.email}
                    // rightItem={() => <FontAwesome name={'qrcode'} size={24} />}
                />
                {/*<ProfileItem*/}
                {/*    onPress={openUserIdSheet}*/}
                {/*    title={t('profile.pointsTitle')}*/}
                {/*    subtitle={user.email}*/}
                {/*    rightItem={() => (*/}
                {/*        <TouchableOpacity>*/}
                {/*            <Text color={colors.primary} type={'small'}>*/}
                {/*                {t('profile.pointsRightItem')}*/}
                {/*            </Text>*/}
                {/*        </TouchableOpacity>*/}
                {/*    )}*/}
                {/*/>*/}

                {user?.authProvider && user?.authProvider.toLowerCase() === 'economico' && (
                    <View>
                        <Text type={'header2'} style={{marginTop: 32}}>
                            {t('profile.changePassword')}
                        </Text>

                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <Input
                                    style={{marginTop: 24}}
                                    mode="flat"
                                    label={t('profile.previousPassword')}
                                    placeholder={t('profile.previousPassword')}
                                    secure
                                    // keyboardType="email-address"
                                    error={errors.oldPassword?.message}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="oldPassword"
                        />

                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <Input
                                    style={{marginTop: 24}}
                                    mode="flat"
                                    label={t('profile.newPassword')}
                                    placeholder={t('profile.newPassword')}
                                    secure
                                    // keyboardType="email-address"
                                    error={errors.newPassword?.message}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="newPassword"
                        />

                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <Input
                                    style={{marginTop: 24}}
                                    mode="flat"
                                    label={t('profile.newPasswordConfirmation')}
                                    placeholder={t('profile.newPasswordConfirmation')}
                                    secure
                                    // keyboardType="email-address"
                                    error={errors.newPasswordConfirm?.message}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="newPasswordConfirm"
                        />

                        <Button
                            style={{marginTop: 36, marginBottom: 16}}
                            mode="contained"
                            label={t('profile.savePassword')}
                            // label={t('addActivity.tabBarButton')}
                            onPress={handleSubmit(changePassword)}
                            loading={user?.loading}
                        />
                    </View>
                )}
            </KeyboardAwareScrollView>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 24,
    },
});
