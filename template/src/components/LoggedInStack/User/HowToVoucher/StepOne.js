import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView, Image} from 'react-native';
import Text from 'components/common/Text';
import Coupon from '../Coupon';
import {useTheme} from 'react-native-paper';
import SuccessSvg from '../OrderComplete/SuccessSvg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import constants from '@constants';

const {width, height} = Dimensions.get('screen');

export default ({coupons, t}) => {
    const {colors} = useTheme();

    const ExampleCoupon = ({name, oldPrice, newPrice, source}) => (
        <View style={{}}>
            <Image
                style={{
                    height: 150,
                    width: 150,
                    borderRadius: 8,
                }}
                source={source}
                resizeMode="cover"
            />
            <Text
                style={{
                    marginTop: 5,
                }}
                type="bold">
                {name}
            </Text>
            <View
                style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 40,
                    width: 80,
                    height: 45,
                    backgroundColor: 'white',
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    color="red"
                    style={{
                        textDecorationLine: 'line-through',
                        fontSize: 12,
                    }}>
                    {oldPrice}
                </Text>
                <Text style={{fontSize: 14}} type="bold">
                    {newPrice}
                </Text>
            </View>
        </View>
    );

    return (
        <View>
            <Text center type={'header1'}>
                {t('instructions.couponsStep.title')}
            </Text>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerHeadline} type="bold">
                        {t('instructions.couponsStep.whatAreCoupons')}
                    </Text>
                    <Text color="gray" style={styles.headerDetailsText}>
                        {t('instructions.couponsStep.couponsExplanation')}
                    </Text>
                </View>
                <View pointerEvents="none" style={styles.bodyContainer}>
                    <Text style={styles.headerHeadline} type="bold">
                        {t('instructions.couponsStep.couponExample')}
                    </Text>
                    <View style={styles.couponsContainer}>
                        {coupons.length === 2 ? (
                            coupons.map((item) => <Coupon t={t} coupon={item} />)
                        ) : (
                            <>
                                <ExampleCoupon
                                    name="Addidas Terrex"
                                    oldPrice="287,20 KM"
                                    newPrice="220,20 KM"
                                    source={require('./assets/terrex.png')}
                                />
                                <ExampleCoupon
                                    name="Black Jacket"
                                    oldPrice="357,20 KM"
                                    newPrice="250,20 KM"
                                    source={require('./assets/jacket.png')}
                                />
                            </>
                        )}
                    </View>
                </View>
                <View style={styles.stepsContainer}>
                    <Text style={styles.headerHeadline} type="bold">
                        {t('instructions.couponsStep.howToUse')}
                    </Text>
                    <View style={styles.step1Container}>
                        <View style={styles.stepNumberContainer}>
                            <Text type="header2">1</Text>
                        </View>
                        <View style={{width: width * 0.7}}>
                            <Text style={styles.stepHeadlineText} type="bold" color="gray">
                                {t('instructions.couponsStep.activate')}
                            </Text>
                            <Text color="gray">{t('instructions.couponsStep.buttonClick')}</Text>
                            <View style={styles.useCouponContainer}>
                                <View>
                                    <Text
                                        type="bold"
                                        color="gray"
                                        style={{
                                            textDecorationLine: 'line-through',
                                            fontSize: 13,
                                        }}>
                                        89,20 {constants.currency}
                                    </Text>
                                    <Text type="bold">79,20 {constants.currency}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.step1Container}>
                        <View style={styles.stepNumberContainer}>
                            <Text type="header2">2</Text>
                        </View>
                        <View style={{width: width * 0.7}}>
                            <Text style={styles.stepHeadlineText} type="bold" color="gray">
                                {t('instructions.couponsStep.scanQr')}
                            </Text>
                            <Text color="gray">{t('instructions.couponsStep.qrCodeDetails')}</Text>
                            <View style={styles.useCouponContainer}>
                                <MaterialCommunityIcons name="qrcode-scan" size={50} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.step1Container}>
                        <View style={styles.stepNumberContainer}>
                            <Text type="header2">3</Text>
                        </View>
                        <View style={{width: width * 0.7}}>
                            <Text style={styles.stepHeadlineText} type="bold" color="gray">
                                {t('instructions.couponsStep.discount')}
                            </Text>
                            <Text color="gray">{t('instructions.couponsStep.afterScan')}</Text>
                            <View
                                style={{
                                    height: 90,
                                    width: 70,
                                }}>
                                <SuccessSvg fill={colors.primary} />
                                <AntDesign
                                    name="checkcircle"
                                    color="#34a853"
                                    size={30}
                                    style={{
                                        position: 'absolute',
                                        bottom: 10,
                                        right: -2,
                                        backgroundColor: 'white',
                                        borderRadius: 30,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        paddingBottom: 120,
    },
    headerContainer: {
        marginTop: 50,
    },
    headerHeadline: {
        fontSize: 20,
    },
    headerDetailsText: {
        marginTop: 20,
    },
    bodyContainer: {
        marginTop: 30,
    },
    couponsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    stepsContainer: {
        marginTop: 30,
    },
    step1Container: {
        flexDirection: 'row',
        paddingTop: 20,
        width,
    },
    stepNumberContainer: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 30,
        marginRight: 20,
    },
    stepHeadlineText: {
        marginBottom: 10,
    },
    useCouponContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});
