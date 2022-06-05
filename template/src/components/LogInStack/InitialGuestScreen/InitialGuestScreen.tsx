import * as React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';
import Text from 'components/common/Text';
import Button from 'components/common/Button';

import Logo from '@constants/assets/Logo';

const InitialGuestScreen = (props: any) => {
    const {t, guestLogin, navigation} = props;
    const {colors} = useTheme();

    return (
        <ScrollView
            // style={styles.container}
            contentContainerStyle={styles.container}
            // showsVerticalScrollIndicator={false}
            // extraScrollHeight={120}
            // enableOnAndroid={true}
            // scrollEnabled={true}
            // enableAutomaticScroll={true}
            // keyboardShouldPersistTaps={'handled'}
        >
            <View
                style={{
                    // paddingTop: 48,
                    // paddingBottom: 24,
                    flex: 1,
                    // backgroundColor: '#faf',
                    // marginVertical: 58,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Logo fill={colors.primary} />
            </View>
            {/*<Text type="header1" center style={{}}>*/}
            {/*    {t('initialHome.title')}*/}
            {/*</Text>*/}
            <View
                style={
                    {
                        // marginBottom: 200,
                        // flex: 2,
                        // justifyContent: 'center',
                        // backgroundColor: '#ff0',
                    }
                }>
                <Button
                    style={{marginTop: 40}}
                    mode="contained"
                    label={t('btns.login')}
                    // icon={'envelope-o'}
                    // label={t('addActivity.tabBarButton')}
                    onPress={() => navigation.navigate('InitialHome')}
                    // onPress={login}
                    // loading={loading}
                />
                {/* <Text
                    center
                    type={'small'}
                    style={[
                        {
                            marginTop: 16,
                        },
                    ]}
                    color={'#9c9c9c'}>
                    {t('initialHome.or')}
                </Text> */}
                <Button
                    style={{marginTop: 16}}
                    // mode="contained"
                    // icon={'envelope-o'}
                    label={t('initialHome.guestLogin')}
                    // label={t('addActivity.tabBarButton')}
                    onPress={guestLogin}
                    // onPress={login}
                    // loading={loading}
                />
            </View>
            <View style={{marginTop: 16, backgroundColor: '#faf', opacity: 0}}>
                <Text type="small14" color={'#575962'} style={{lineHeight: 16}}>
                    {t('register.termsAndConditionsP1')}
                </Text>
                <Text type="small14" color={colors.primary}>
                    {t('register.termsAndConditionsP2')}
                </Text>
            </View>
            <View style={{marginBottom: 38}}></View>
            {/*{isDev && (*/}
            {/*    <View style={{position: 'absolute', bottom: 0, right: 0}}>*/}
            {/*        <Text type={'small10LightText'}>dev</Text>*/}
            {/*    </View>*/}
            {/*)}*/}
        </ScrollView>
    );
};

export default InitialGuestScreen;

const styles = StyleSheet.create({
    container: {
        margin: 24,
        // backgroundColor: '#ff0',
        minHeight: '98%',
        // justifyContent: 'space-between',
        // flex: 1,
    },
});
