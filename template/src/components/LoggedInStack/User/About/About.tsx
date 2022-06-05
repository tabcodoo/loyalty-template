import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import Text from 'components/common/Text';
import {useTheme} from 'react-native-paper';
import Header from 'components/common/LoggedInHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import constants from '@constants';
const About = (props: any) => {
    const {t, user} = props;
    let {colors} = useTheme();
    let renderText = ({type, text}) => {
        return (
            <Text
                type={type}
                style={[
                    {
                        marginVertical: 16,
                    },
                    type === 'regular' && {lineHeight: 18},
                ]}>
                {text}
            </Text>
        );
    };

    return (
        <View>
            <Header title={t('about.title')} goBack />

            <ScrollView style={styles.container}>
                {user?.mobileAppSettings?.aboutUsInformation ? (
                    <Text>{user?.mobileAppSettings?.aboutUsInformation}</Text>
                ) : (
                    Object.keys(constants.aboutUs).map((key) => renderText(constants.aboutUs[key]))
                )}

                <View style={{marginBottom: 100}} />
            </ScrollView>
        </View>
    );
};

export default About;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
});
