import React, {useState, useEffect, useContext, useRef, useMemo} from 'react';
import {View, StyleSheet, Platform, Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import Button from 'components/common/Button';
import Text from 'components/common/Text';
import Scanner from 'components/LoggedInStack/Owner/Scanner';
import actions from 'store/actions';
import api from 'services/api';
import constants from '@constants';
import moment from 'moment';
// import RNBeep from 'react-native-sounds-beep';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet-old';
import Input from 'components/common/Input';
import Success from 'components/common/icons/Success';
import Error from 'components/common/icons/Error';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ScannerContainer = (props: any) => {
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    let language = useSelector((state) => state?.user?.language);
    let [scanned, setScanned] = useState(false);
    let [opened, setOpened] = React.useState(false);
    let [couponOpened, setCouponOpened] = React.useState(false);
    let [userOpened, setUserOpened] = React.useState(false);
    let [transactionLoading, setTransactionLoading] = React.useState(false);

    // CAMERA
    let [refQRScanner, setRefQRScanner] = React.useState(null);
    let activateScanner = () => {
        if (refQRScanner) refQRScanner.reactivate();
        setScanned(false);
    };

    // Bottom sheet KUPON
    let [success, setSuccess] = useState(false);
    let [enterManually, setEnterManually] = useState(false);
    let [loading, setLoading] = useState(false);
    let [couponName, setCouponName] = useState('');
    const couponSheetRef = useRef<BottomSheet>(null);
    const couponSnapPoints = useMemo(() => (Platform.OS === 'ios' ? [0, '60%'] : [0, '50%']), []);

    let openBottomMenu = () => {
        setOpened(true);
        setCouponOpened(true);
        couponSheetRef.current.expand();
    };
    let closeBottomMenu = () => {
        setOpened(false);
        setCouponOpened(false);
        couponSheetRef.current.close();
    };

    let couponScan = async (qrString, callback = () => {}) => {
        let reqObj = {};
        reqObj.userId = qrString.split(' ')[0];
        reqObj.couponId = qrString.split(' ')[1];
        setLoading(true);
        api.post('loyalty/scan-coupon', {
            dateActivated: moment(),
            applicationId: constants.applicationId,
            ...reqObj,
        })
            .then(({data: {payload: coupon}}) => {
                setCouponName(coupon?.couponName);
                setEnterManually(false);
                setSuccess(true);
                setLoading(false);
                openBottomMenu();
                setTimeout(() => {
                    setCouponName('');
                    activateScanner();
                    closeBottomMenu();
                }, 5000);
                // RNBeep.beep();
            })
            .catch((err) => {
                // RNBeep.beep(false);
                setEnterManually(false);
                // setCouponName(reqObj?.couponName);
                setLoading(false);
                setSuccess(false);
                openBottomMenu();
                setTimeout(() => {
                    setCouponName('');
                    activateScanner();
                    closeBottomMenu();
                }, 5000);
            });
    };

    const schema = yup.object().shape({
        code: yup.string().required(t('errors.required')),
    });

    const {control, handleSubmit, errors, setValue} = useForm({
        resolver: yupResolver(schema),
    });

    // General scanning
    let onScan = async (qrString) => {
        let type = qrString.split(' ')[0];
        switch (type) {
            case 'user':
                closeBottomMenu();
                setUserId(qrString.split(' ')[1]);
                api.get(`cart/confirm-qr-code?id=${qrString.split(' ')[1]}`, language);
                setCartId(null);
                setOrderId(null);
                openUserSheet();
                return;
            case 'cart':
                api.get(`cart/confirm-qr-code?id=${qrString.split(' ')[1]}`, language);
                // console.tron.log('user', type, qrString);

                closeBottomMenu();
                setUserId(qrString.split(' ')[2]);
                setCartId(qrString.split(' ')[1]);
                setOrderId(qrString.split(' ')[4]);
                setPrice(parseFloat(qrString.split(' ')[3]));
                openCartSheet();
                return;
            default:
                if (!loading && qrString.split(' ').length >= 2) await couponScan(qrString);
                else activateScanner();
        }
    };

    // Bottom sheet USER
    let [userId, setUserId] = useState(null);
    const userSheetRef = useRef<BottomSheet>(null);
    const userSnapPoints = useMemo(() => (Platform.OS === 'ios' ? [0, '65%'] : [0, '55%']), []);

    let openUserSheet = () => {
        setOpened(true);
        setUserOpened(true);
        userSheetRef.current.snapTo(1);
    };
    let closeUserSheet = () => {
        setOpened(false);
        setUserOpened(false);
        userSheetRef.current.close();
        activateScanner();
    };

    const userSchema = yup.object().shape({
        price: yup
            .string()
            .required(t('errors.required'))
            .test('is-decimal', t('errors.decimalNumber'), (value) => value.match(/^(\d+\.)?\d+$/)),
        invoiceNumber: yup.string(),
    });

    const {
        control: userControl,
        handleSubmit: userSubmit,
        errors: userErrors,
        setValue: setUserValue,
        getValues: getUserSheetValues,
        reset: resetUserValues,
    } = useForm({
        resolver: yupResolver(userSchema),
    });

    let [price, setPrice] = useState(null);
    let confirmUserPrice = ({price, invoiceNumber}) => {
        // setPrice(parseFloat(price));
        if (!transactionLoading) userTransactionConfirmation(parseFloat(price), invoiceNumber);
        // Keyboard.dismiss();
        // closeUserSheet();
        // openCartSheet();
    };

    let userTransactionConfirmation = async (transactionValue, invoiceNumber) => {
        // let reqObj = {};
        // reqObj.userId = qrString.split(' ')[0];
        // reqObj.couponId = qrString.split(' ')[1];
        // setLoading(true);
        setTransactionLoading(true);
        api.post('cart/create-transaction', {
            userId,
            transactionValue,
            invoiceNumber,
            // dateActivated: moment(),
            // applicationId: constants.applicationId,
            // ...reqObj,
        })
            .then((response) => {
                // console.tron.log(response);
                DropDownHolder.dropDown.alertWithType(
                    'success',
                    '',
                    t('scanner.transactionSuccess'),
                );
                setTransactionLoading(false);
                closeUserSheet();
                // RNBeep.beep();
                setTimeout(() => {
                    // Keyboard.dismiss();

                    closeCartSheet();
                    activateScanner();
                }, 1000);
                setTimeout(() => {
                    setPrice(null);
                    setUserId(null);
                    setCartId(null);
                    resetUserValues();
                }, 1500);
            })
            .catch((err) => {
                setTransactionLoading(false);
                // RNBeep.beep(false);
            });
    };

    // Bottom sheet CART
    let [cartId, setCartId] = useState(null);
    let [orderId, setOrderId] = useState(null);
    const cartSheetRef = useRef<BottomSheet>(null);
    const cartSnapPoints = useMemo(() => [0, '60%'], []);

    let openCartSheet = () => {
        // setOpened(true);
        cartSheetRef.current.snapTo(1);
    };
    let closeCartSheet = () => {
        // setOpened(false);
        cartSheetRef.current.close();
        activateScanner();
    };

    let cartTransactionConfirmation = async () => {
        // let reqObj = {};
        // reqObj.userId = qrString.split(' ')[0];
        // reqObj.couponId = qrString.split(' ')[1];
        // setLoading(true);
        setTransactionLoading(true);
        api.get('cart/complete-order/' + cartId, language)
            .then((response) => {
                // console.tron.log(response);
                DropDownHolder.dropDown.alertWithType(
                    'success',
                    '',
                    t('scanner.transactionSuccess'),
                );
                setTransactionLoading(false);
                // RNBeep.beep();
                setTimeout(() => {
                    closeCartSheet();
                    activateScanner();
                }, 1000);
                setTimeout(() => {
                    setPrice(null);
                    setUserId(null);
                    setCartId(null);
                    resetUserValues();
                }, 1500);
            })
            .catch((err) => {
                setTransactionLoading(false);
                // RNBeep.beep(false);
            });
    };

    return (
        <View style={{flex: 1}}>
            <Scanner
                {...props}
                {...{
                    t,
                    transactionLoading,
                    scanned,
                    couponName,
                    setCouponName,
                    success,
                    setScanned,
                    onScan,
                    loading,
                    enterManually,
                    setEnterManually,
                    opened,
                    setOpened,
                    openBottomMenu,
                    closeBottomMenu,
                    couponSheetRef,
                    refQRScanner,
                    setRefQRScanner,
                    activateScanner,
                }}
            />
            <BottomSheet
                ref={couponSheetRef}
                snapPoints={couponSnapPoints}
                backdropComponent={BottomSheetBackdrop}
                index={-1}
                onChange={(index) => {
                    // console.tron.log('onChange', index);
                    if (!index) {
                        setEnterManually(false);
                        setCouponName('');
                        closeBottomMenu();
                        activateScanner();
                    }
                }}>
                {enterManually ? (
                    <View
                        style={{
                            backgroundColor: '#fff',
                            flex: 1,
                            justifyContent: 'space-between',
                            padding: 16,
                            // alignItems: 'center',
                        }}>
                        <View
                            style={[
                                {flex: 1},
                                Platform.OS !== 'ios' && {justifyContent: 'center'},
                            ]}>
                            {couponOpened && (
                                <Controller
                                    control={control}
                                    render={({onChange, onBlur, value}) => (
                                        <Input
                                            focusOnLoad
                                            mode="flat"
                                            label={t('scanner.codeLabel')}
                                            placeholder={t('scanner.codePlaceholder')}
                                            keyboardType={
                                                Platform.OS === 'ios'
                                                    ? 'numbers-and-punctuation'
                                                    : 'numeric'
                                            }
                                            error={errors.code?.message}
                                            onBlur={onBlur}
                                            onChangeText={(text) => {
                                                onChange(text.replace(' ', '-'));
                                            }}
                                            value={value}
                                        />
                                    )}
                                    name="code"
                                    // defaultValue={'demo3@economico.ba'}
                                />
                            )}
                        </View>
                        <View style={{width: '100%'}}>
                            <Button
                                mode={'contained'}
                                label={t('scanner.checkCoupon')}
                                onPress={handleSubmit((data) => {
                                    onScan(data.code.replace('-', ' '), () => {
                                        setValue('code', '');

                                        setTimeout(() => {
                                            activateScanner();
                                            setCouponName('');
                                            closeBottomMenu();
                                        }, 5000);
                                    });
                                })}
                                loading={loading}
                            />
                        </View>
                    </View>
                ) : (
                    <View
                        style={{
                            backgroundColor: '#fff',
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <View>
                            <Text type={'header2'} style={{marginTop: 16}} center>
                                {couponName}
                            </Text>
                            <Text style={{marginTop: 8}} center>
                                {success ? t('scanner.success') : t('scanner.error')}
                            </Text>
                            <Text style={{marginTop: 8}} center>
                                {t('scanner.scanned')}
                            </Text>
                        </View>
                        {success ? <Success /> : <Error />}

                        <View style={{padding: 16, width: '100%'}}>
                            <Button
                                mode={'contained'}
                                label={t('scanner.activateScanner')}
                                onPress={() => {
                                    closeBottomMenu();
                                    setCouponName('');
                                    activateScanner();
                                }}
                                // loading={loading}
                            />
                        </View>
                    </View>
                )}
            </BottomSheet>
            <BottomSheet
                ref={userSheetRef}
                snapPoints={userSnapPoints}
                backdropComponent={BottomSheetBackdrop}
                index={-1}
                onChange={(index) => {
                    // console.tron.log('userSheetRef', index);
                    if (!index) {
                        closeUserSheet();
                        resetUserValues();
                        activateScanner();
                    }
                }}>
                <KeyboardAwareScrollView
                    style={{
                        backgroundColor: '#fff',
                        paddingHorizontal: 16,
                    }}
                    contentContainerStyle={{
                        height: '100%',
                        // justifyContent: 'space-between',
                        // backgroundColor: 'red',
                    }}>
                    <Text type={'header1'} center>
                        {t('scanner.userSheetTitle')}
                    </Text>

                    <Text type={'bold'} style={{marginTop: 8}}>
                        {t('scanner.userId')}
                    </Text>
                    <Text type={'small12'}>{userId}</Text>

                    <View style={[{flex: 1, justifyContent: 'center'}]}>
                        {userOpened && (
                            <>
                                <Controller
                                    control={userControl}
                                    render={({onChange, onBlur, value}) => (
                                        <Input
                                            focusOnLoad
                                            mode="flat"
                                            label={t('scanner.priceInput')}
                                            // placeholder={t('scanner.priceInput')}
                                            keyboardType={
                                                Platform.OS === 'ios'
                                                    ? 'numbers-and-punctuation'
                                                    : 'numeric'
                                            }
                                            error={userErrors?.price?.message}
                                            onBlur={onBlur}
                                            onChangeText={(text) => {
                                                // console.tron.log(
                                                //     'onChangeText',
                                                //     text,
                                                //     parseFloat(text.replace(',', '.1')),
                                                //     'text,text,text,text'.replace(',', '.'),
                                                // );
                                                onChange(text.replace(',', '.'));
                                            }}
                                            value={value}
                                        />
                                    )}
                                    name="price"
                                    // defaultValue={'demo3@economico.ba'}
                                />
                                <Controller
                                    control={userControl}
                                    render={({onChange, onBlur, value}) => (
                                        <Input
                                            // focusOnLoad
                                            mode="flat"
                                            label={t('scanner.invoiceNumber')}
                                            // placeholder={t('scanner.priceInput')}
                                            keyboardType={
                                                Platform.OS === 'ios'
                                                    ? 'numbers-and-punctuation'
                                                    : 'numeric'
                                            }
                                            error={userErrors?.invoiceNumber?.message}
                                            onBlur={onBlur}
                                            onChangeText={(text) => {
                                                // console.tron.log(
                                                //     'onChangeText',
                                                //     text,
                                                //     parseFloat(text.replace(',', '.1')),
                                                //     'text,text,text,text'.replace(',', '.'),
                                                // );
                                                onChange(text.replace(',', '.'));
                                            }}
                                            value={value}
                                        />
                                    )}
                                    name="invoiceNumber"
                                    // defaultValue={'demo3@economico.ba'}
                                />
                            </>
                        )}
                    </View>
                    <View style={{marginBottom: 12}}>
                        <Button
                            mode={'contained'}
                            label={t('scanner.priceEnter')}
                            onPress={userSubmit(confirmUserPrice)}
                            // loading={loading}
                            style={{marginBottom: 16}}
                            loading={transactionLoading}
                        />
                        <Button
                            // mode={'contained'}
                            label={t('scanner.cancel')}
                            onPress={() => {
                                closeUserSheet();
                                setUserId(null);
                                setPrice(null);
                                resetUserValues();
                                activateScanner();
                            }}
                            // loading={loading}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </BottomSheet>
            <BottomSheet
                ref={cartSheetRef}
                snapPoints={cartSnapPoints}
                index={-1}
                backdropComponent={BottomSheetBackdrop}
                onChange={(index) => {
                    // console.tron.log('cartSheetRef', index);
                    if (!index) {
                        closeCartSheet();
                        activateScanner();
                    }
                }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        backgroundColor: '#fff',
                        paddingHorizontal: 16,
                    }}>
                    <View>
                        <Text type={'header1'} center>
                            {t('scanner.chartSheetTitle')}
                        </Text>

                        <View style={{flexDirection: 'row', marginTop: 32}}>
                            <View style={{flex: 1}}>
                                <Text type={'bold'}>{t('scanner.userId')}</Text>
                                <Text type={'small12'}>{userId}</Text>
                            </View>
                            {/* {cartId && (
                                <View style={{flex: 1, marginLeft: 16}}>
                                    <Text type={'bold'}>{t('scanner.qrTitle')}</Text>
                                    <Text type={'small12'}>{cartId}</Text>
                                </View>
                            )} */}
                            {orderId && (
                                <View style={{flex: 1, marginLeft: 16}}>
                                    <Text type={'bold'}>{t('scanner.qrTitle')}</Text>
                                    <Text type={'small12'}>{orderId}</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    <Text type={'header1'} center>
                        {price ? price.toFixed(2) : 0} {constants.currency}
                    </Text>

                    <View style={{marginBottom: 12}}>
                        <Button
                            mode={'contained'}
                            label={t('scanner.priceAccept')}
                            onPress={() => {
                                if (cartId) {
                                    if (!transactionLoading) cartTransactionConfirmation();
                                } else {
                                    // userTransactionConfirmation();
                                }
                            }}
                            loading={transactionLoading}
                            style={{marginBottom: 16}}
                        />
                        <Button
                            // mode={'contained'}

                            label={t('scanner.cancel')}
                            onPress={() => {
                                if (cartId) {
                                    closeCartSheet();
                                    setPrice(null);
                                    setUserId(null);
                                    setCartId(null);
                                    resetUserValues();
                                    activateScanner();
                                } else {
                                    closeCartSheet();
                                    openUserSheet();
                                    // setPrice(null);
                                    // setUserId(null);
                                    // setCartId(null);
                                    // resetUserValues();
                                    // activateScanner();
                                }
                            }}
                        />
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
};

export default ScannerContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
