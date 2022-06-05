import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Text from 'components/common/Text';
import {useTheme} from 'react-native-paper';
import CongratsSvg from './assets/CongratsSvg';

const {width, height} = Dimensions.get('screen');

export default ({t}) => {
    const {colors} = useTheme();

    return (
        <View>
            <Text center type={'header1'}>
                {t('instructions.finishStep.title')}
            </Text>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}>
                <CongratsSvg height={200} fill={colors.primary} />
                <View style={styles.headerContainer}>
                    <Text center style={styles.headerHeadline} type="bold">
                        {t('instructions.finishStep.startShopping')}
                    </Text>
                    <Text center color="gray" style={styles.headerDetailsText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum
                        dui a eros ullamcorper, in viverra orci tempor. Phasellus faucibus gravida
                        mi, eu auctor ipsum mattis in.
                    </Text>
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
        paddingBottom: 100,
        paddingTop: 80,
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
});
