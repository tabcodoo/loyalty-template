import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Text from 'components/common/Text';

import {useTheme} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

export default ({t}) => {
    const {colors} = useTheme();

    return (
        <View>
            <Text center type={'header1'}>
                {t('instructions.pointsStep.title')}
            </Text>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerHeadline} type="bold">
                        {t('instructions.pointsStep.whatArePoints')}
                    </Text>
                    <Text color="gray" style={styles.headerDetailsText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum
                        dui a eros ullamcorper, in viverra orci tempor. Phasellus faucibus gravida
                        mi, eu auctor ipsum mattis in.
                    </Text>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerHeadline} type="bold">
                        {t('instructions.pointsStep.howToUse')}
                    </Text>
                    <Text color="gray" style={styles.headerDetailsText}>
                        {t('instructions.pointsStep.howToUseDetails')}
                    </Text>
                </View>
                <View
                    style={{
                        marginTop: 30,
                    }}>
                    <View
                        style={{
                            height: 140,
                            borderRadius: 30,
                            backgroundColor: 'white',
                            elevation: 8,
                            padding: 20,
                            justifyContent: 'space-between',
                            shadowOpacity: 0.3,
                            shadowOffset: {
                                height: 2,
                            },
                            shadowRadius: 5,
                        }}>
                        <Text
                            style={{
                                fontSize: 22,
                            }}
                            type={'header1'}>
                            HEAD kaciga MAJA white XS-S
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <Text color="gray">SKU: BRI21874</Text>
                            <Text
                                type="bold"
                                style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 3,
                                    backgroundColor: '#eeeeee',
                                    borderRadius: 14,
                                }}>
                                50 {t('instructions.pointsStep.points')}
                            </Text>
                        </View>
                        <View
                            style={{
                                position: 'absolute',
                                height: 70,
                                width: 70,
                                bottom: -45,
                                right: 50,
                            }}>
                            <View
                                style={{
                                    height: 8,
                                    width: 8,
                                    borderRadius: 5,
                                    backgroundColor: colors.primary,
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                }}
                            />
                            <View
                                style={{
                                    width: 2,
                                    height: 50,
                                    backgroundColor: colors.primary,
                                    position: 'absolute',
                                    right: 15,
                                    top: 2,
                                    transform: [{rotate: '30deg'}],
                                }}
                            />
                            <View
                                style={{
                                    height: 8,
                                    width: 8,
                                    borderRadius: 5,
                                    backgroundColor: colors.primary,
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 18,
                                }}
                            />
                            <View
                                style={{
                                    position: 'absolute',
                                    height: 2,
                                    width: 40,
                                    bottom: 21,
                                    left: 2,
                                    backgroundColor: colors.primary,
                                }}
                            />
                        </View>
                    </View>
                    <Text
                        style={{
                            marginLeft: 10,
                            marginTop: 10,
                            width: '60%',
                            fontSize: 13,
                        }}
                        color="gray">
                        {t('instructions.pointsStep.pointsQuantity')}
                    </Text>
                </View>
                <View
                    style={{
                        marginTop: 30,
                    }}>
                    <Text style={styles.headerHeadline} type="bold">
                        {t('instructions.pointsStep.howToPoints')}
                    </Text>

                    <View style={styles.step1Container}>
                        <View style={styles.stepNumberContainer}>
                            <Text type="header2">1</Text>
                        </View>
                        <View style={{width: width * 0.7}}>
                            <Text style={styles.stepHeadlineText} type="bold" color="gray">
                                {t('instructions.pointsStep.selectSupply')}
                            </Text>
                            <Text color="gray">
                                {t('instructions.pointsStep.selectSupplyDetails')}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.step1Container}>
                        <View style={styles.stepNumberContainer}>
                            <Text type="header2">2</Text>
                        </View>
                        <View style={{width: width * 0.7}}>
                            <Text style={styles.stepHeadlineText} type="bold" color="gray">
                                {t('instructions.pointsStep.doBuying')}
                            </Text>
                            <Text color="gray">{t('instructions.pointsStep.buyingDetails')}</Text>
                        </View>
                    </View>
                    <View style={styles.step1Container}>
                        <View style={styles.stepNumberContainer}>
                            <Text type="header2">3</Text>
                        </View>
                        <View style={{width: width * 0.7}}>
                            <Text style={styles.stepHeadlineText} type="bold" color="gray">
                                {t('instructions.pointsStep.collectPoints')}
                            </Text>
                            <Text color="gray">
                                {t('instructions.pointsStep.collectPointsDetails')}
                            </Text>
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
    step1Container: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
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
});
