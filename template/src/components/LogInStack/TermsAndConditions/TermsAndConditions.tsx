import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import Text from 'components/common/Text';
import {useTheme} from 'react-native-paper';
import Header from 'components/common/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const TermsAndConditions = (props: any) => {
    const {t} = props;
    let {colors} = useTheme();
    return (
        <ScrollView style={styles.container}>
            <Header title={t('termsAndConditions.title')} />

            <Text style={{lineHeight: 18}} color={colors.gray3}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
            </Text>
            <Text type="header2" style={{marginVertical: 16}}>
                Zašto smo najbolji ?
            </Text>
            <Text style={{lineHeight: 18}} color={colors.gray3}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
            </Text>
        </ScrollView>
    );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
});
