import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {useTheme, RadioButton as RadioGroup} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import Header from 'components/common/LoggedInHeader';

import Text from 'components/common/Text';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import CheckBox from 'components/common/CheckBox';
import Background from 'components/common/Background';
import DatePicker from 'components/common/DatePicker';
import RadioButton from 'components/common/RadioButton';
import Dropdown from 'components/common/Dropdown';
import DropDownHolder from 'services/DropDownHolder';
import {isEmpty} from './validationHelper';

const DeliveryDataInput = (props: any) => {
    const {
        t,
        navigation,
        cities,
        name,
        address,
        setAddress,
        errors,
        setName,
        selectedCity,
        setSelectedCity,
        selectedCountry,
        setSelectedCountry,
        setErrors,
        saveDeliveryData,
        countries,
        phoneNumber,
        setPhoneNumber,
        zipCode,
        setZipCode,
        isMainAddress,
        toggleIsMainAddress,
        additionalInfo,
        setAdditionalInfo,
    } = props;
    const {colors} = useTheme();

    const onBlur = (input, key) => {
        if (!input) return;

        if (isEmpty(input))
            setErrors({...errors, [key]: {message: t('errors.required'), resolved: false}});
        else setErrors({...errors, [key]: {...errors?.[key], resolved: true}});
    };

    const isDropdownSelected = () => {
        if (!selectedCity && !selectedCountry) {
            DropDownHolder.dropDown.alertWithType('error', '', t('errors.fillInData'));
            return false;
        }
        if (!selectedCity) {
            DropDownHolder.dropDown.alertWithType('error', '', t('errors.unselectedCity'));
            return false;
        }

        if (!selectedCountry) {
            DropDownHolder.dropDown.alertWithType('error', '', t('errors.unselectedCountry'));
            return false;
        }
        return true;
    };

    const onPress = () => {
        if (
            isDropdownSelected() &&
            !isEmpty(name) &&
            !isEmpty(address) &&
            !isEmpty(phoneNumber) &&
            !isEmpty(zipCode)
        ) {
            saveDeliveryData();
            navigation.pop();
        } else {
            DropDownHolder.dropDown.alertWithType('error', '', t('errors.fillInData'));
        }
    };

    return (
        <View style={{flex: 1}}>
            <KeyboardAwareScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 50,
                    paddingTop: Platform.OS === 'ios' ? 70 : 50,
                }}>
                <Input
                    style={{marginTop: 24}}
                    mode="flat"
                    label={t('deliveryData.name')}
                    placeholder={t('deliveryData.name')}
                    keyboardType="default"
                    error={errors?.name?.resolved ? null : errors?.name?.message}
                    onBlur={() => onBlur(name, 'name')}
                    onChangeText={setName}
                    value={name}
                />

                <Input
                    style={{marginTop: 24}}
                    mode="flat"
                    label={t('deliveryData.address')}
                    placeholder={t('deliveryData.address')}
                    keyboardType="default"
                    error={errors?.address?.resolved ? null : errors?.address?.message}
                    onBlur={() => onBlur(address, 'address')}
                    onChangeText={setAddress}
                    value={address}
                />
                <Input
                    style={{marginTop: 24}}
                    mode="flat"
                    label={t('deliveryData.phoneNumber')}
                    placeholder={t('deliveryData.phoneNumber')}
                    keyboardType="numeric"
                    error={errors?.phoneNumber?.resolved ? null : errors?.phoneNumber?.message}
                    onBlur={() => onBlur(phoneNumber, 'phoneNumber')}
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}
                />

                <Dropdown
                    label={selectedCountry ? selectedCountry?.name : t('deliveryData.country')}
                    labelStyle={{
                        left: 0,
                    }}
                    items={countries}
                    style={{
                        backgroundColor: '#fff',
                        borderBottomWidth: 0.4,
                        marginTop: 30,
                        paddingRight: 0,
                    }}
                    onSelect={(item, index) => {
                        setSelectedCountry(item);
                        setSelectedCity(null);
                    }}
                />

                <Dropdown
                    label={selectedCity ? selectedCity?.name : t('deliveryData.city')}
                    labelStyle={{
                        left: 0,
                    }}
                    items={cities}
                    style={{
                        backgroundColor: '#fff',
                        borderBottomWidth: 0.4,
                        marginTop: 30,
                        paddingRight: 0,
                    }}
                    onSelect={(item, index) => setSelectedCity(item)}
                />

                <Input
                    style={{marginTop: 24}}
                    mode="flat"
                    label={t('deliveryData.zipCode')}
                    placeholder={t('deliveryData.zipCode')}
                    keyboardType="numeric"
                    error={errors?.zipCode?.resolved ? null : errors?.zipCode?.message}
                    onBlur={() => onBlur(zipCode, 'zipCode')}
                    onChangeText={setZipCode}
                    value={zipCode}
                />

                <Input
                    style={{marginTop: 24}}
                    mode="flat"
                    label={t('deliveryData.additionalInfo')}
                    placeholder={t('deliveryData.additionalInfo')}
                    keyboardType="default"
                    onChangeText={setAdditionalInfo}
                    value={additionalInfo}
                />

                <CheckBox
                    label={t('deliveryData.saveAddress')}
                    style={{
                        marginTop: 20,
                    }}
                    checked={isMainAddress}
                    onPress={toggleIsMainAddress}
                />

                <Button
                    onPress={onPress}
                    label={t('deliveryData.save')}
                    mode="contained"
                    style={{
                        marginTop: 40,
                    }}
                />
            </KeyboardAwareScrollView>

            <Header
                title={t('checkout.deliveryData')}
                onPress={() => navigation.pop()}
                style={{
                    position: 'absolute',
                    paddingHorizontal: 16,
                    top: -4,
                    backgroundColor: 'white',
                    width: '100%',
                }}
                color={'#fff'}
            />
        </View>
    );
};

export default DeliveryDataInput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        // paddingTop: 50,
        // marginTop: 50,
    },
});
