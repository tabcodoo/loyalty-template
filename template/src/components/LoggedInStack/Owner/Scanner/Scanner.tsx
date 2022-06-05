import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import * as React from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import {useTheme} from 'react-native-paper';
import Header from 'components/common/LoggedInHeader';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Button from 'components/common/Button';
import Text from 'components/common/Text';
import moment from 'moment';
import Stopwatch from 'components/common/icons/Stopwatch';
import Success from 'components/common/icons/Success';
import Error from 'components/common/icons/Error';
import QRCode from 'react-native-qrcode-svg';
import BottomSheet from '@gorhom/bottom-sheet';
import {useEffect, useMemo, useRef} from 'react';
import Input from 'components/common/Input';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import base64 from 'react-native-base64';

const Scanner = (props: any) => {
    const {
        t,
        setCouponName,
        onScan,
        setEnterManually,
        opened,
        openBottomMenu,
        closeBottomMenu,
        setRefQRScanner,
        activateScanner,
    } = props;
    const {colors} = useTheme();

    let [cameraVisible, setCameraVisible] = React.useState(false);

    useEffect(() => {
        setTimeout(() => {
            setCameraVisible(true);
        }, 250);
    }, []);

    useKeepAwake();
    return (
        <View style={styles.container}>
            <View style={{zIndex: 100}}>
                <Header menu title={t('scanner.title')} />
            </View>
            <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
                {cameraVisible && (
                    <QRCodeScanner
                        ref={(node) => {
                            setRefQRScanner(node);
                        }}
                        cameraStyle={{height: '100%'}}
                        onRead={(res) => onScan(res.data)}
                        // flashMode={RNCamera.Constants.FlashMode.torch}
                    />
                )}

                <View style={[styles.fill, styles.absoluteTop]}></View>
                <View
                    style={[
                        styles.borderTop,
                        styles.borderRight,
                        styles.absoluteRight,
                        styles.rightOffset,
                        styles.square,
                    ]}></View>

                <View style={[styles.fill, styles.absoluteLeft]}></View>
                <View
                    style={[
                        styles.borderTop,
                        styles.borderLeft,
                        styles.absoluteLeft,
                        styles.leftOffset,
                        styles.square,
                    ]}></View>
                <View style={[styles.fill, styles.absoluteRight]}></View>

                <View style={[styles.fill, styles.absoluteBottom]}></View>
                <View
                    style={[
                        styles.borderBottom,
                        styles.borderLeft,
                        styles.absoluteBottom,
                        styles.leftOffset,
                        styles.bottomOffset,
                        styles.square,
                    ]}></View>
                <View
                    style={[
                        styles.borderBottom,
                        styles.borderRight,
                        {
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            height: height / 5,
                        },
                        styles.bottomOffset,
                        styles.rightOffset,
                        styles.square,
                    ]}></View>
                <View
                    style={{
                        height: 52,
                        backgroundColor: colors.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    {/*<Text style={{marginBottom: 1}} type={'button'} color={'#fff'}>*/}
                    {/*    {t('scanner.enterCode')}*/}
                    {/*</Text>*/}
                    {/*{!opened && (*/}
                    <Button
                        style={{position: 'absolute'}}
                        mode={'contained'}
                        label={t('scanner.enterCode')}
                        onPress={() => {
                            openBottomMenu();
                            setEnterManually(true);
                        }}
                        // loading={loading}
                    />
                    {/*)}*/}
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default Scanner;

let {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    fill: {
        backgroundColor: 'rgba(0,0,0,0.35)',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    leftOffset: {
        left: width / 7,
    },
    rightOffset: {
        right: width / 7,
    },
    topOffset: {
        top: height / 5,
    },
    bottomOffset: {
        bottom: height / 5,
    },
    absoluteLeft: {
        position: 'absolute',
        top: height / 5,
        left: 0,
        bottom: height / 5,
        width: width / 7,
    },
    absoluteRight: {
        position: 'absolute',
        top: height / 5,
        right: 0,
        bottom: height / 5,
        width: width / 7,
    },
    absoluteTop: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: height / 5,
    },
    absoluteBottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: height / 5,
    },
    square: {
        width: 20,
        height: 20,
        borderColor: '#fff',
        borderWidth: 0,
    },
    borderTop: {
        borderTopWidth: 1,
    },
    borderRight: {
        borderRightWidth: 1,
    },
    borderLeft: {
        borderLeftWidth: 1,
    },
    borderBottom: {
        borderBottomWidth: 1,
    },
});
