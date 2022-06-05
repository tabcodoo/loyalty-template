import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import Header from 'components/common/LoggedInHeader';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Text from 'components/common/Text';
import Button from 'components/common/Button';

const RoomComplete = (props: any) => {
    const {t, navigation} = props;
    const {colors} = useTheme();

    return (
        <>
            <View style={styles.container}>
                <View
                    style={{
                        alignItems: 'center',
                        paddingTop: 50,
                        paddingHorizontal: 20,
                    }}>
                    <Fontisto name="clock" size={120} color={colors.primary} />
                    <Text
                        style={{
                            marginTop: 30,
                            fontSize: 20,
                        }}
                        type="bold">
                        {t('room.orderSent')}
                    </Text>
                    <Text
                        color="rgba(72, 72, 72, 0.8)"
                        style={{
                            marginTop: 30,
                            fontSize: 18,
                            textAlign: 'center',
                        }}>
                        {t('room.orderDetails')}
                    </Text>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        paddingHorizontal: 16,
                        width: '100%',
                    }}>
                    <Button
                        onPress={() => navigation.navigate('Rooms')}
                        style={{
                            paddingHorizontal: 16,
                            marginTop: 20,
                        }}
                        mode="contained"
                        label={t('room.okay')}
                    />
                </View>
            </View>
            <Header
                title={t('room.order')}
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
        </>
    );
};

export default RoomComplete;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 80,
    },
});
