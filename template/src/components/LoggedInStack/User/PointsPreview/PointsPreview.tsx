import * as React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';
import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';
import constants from '@constants';
import {Divider} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';

const PointsPreview = (props: any) => {
    const {t, navigation, cart, myBadge, badges, getProgressBarHeight, isItemLocked} = props;
    const {colors} = useTheme();

    const BADGE_ITEM_COMPONENT_HEIGHT = 40;

    const BadgeItemComponent = ({item}) => (
        <View
            style={{
                height: BADGE_ITEM_COMPONENT_HEIGHT,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
                justifyContent: 'space-between',
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        height: 30,
                        width: 30,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 20,
                        backgroundColor:
                            item?.icon === 'bronze'
                                ? '#8f5f1b'
                                : item?.icon === 'silver'
                                ? '#959696'
                                : item?.icon === 'gold'
                                ? '#e4bb18'
                                : '#ebeae8',
                    }}>
                    <View
                        style={{
                            height: 20,
                            width: 20,
                            borderRadius: 15,
                            backgroundColor:
                                item?.icon === 'bronze'
                                    ? '#b08d57'
                                    : item?.icon === 'silver'
                                    ? '#bec0c2'
                                    : item?.icon === 'gold'
                                    ? '#f2da30'
                                    : '#faf9f6',
                        }}
                    />
                </View>
                <View>
                    <Text style={{fontSize: 16}} type="bold">
                        {item?.name}{' '}
                    </Text>
                    <Text
                        style={{
                            fontSize: 10,
                        }}>{`${t('badges.requiredAmount')} ${item?.requiredAmount} ${
                        constants.currency
                    }`}</Text>
                </View>
            </View>

            <Text
                style={{
                    backgroundColor: '#eeeeee',
                    borderRadius: 13,
                    padding: 5,
                    paddingHorizontal: 10,
                }}
                type={'small14SemiBold'}>{`-${item?.discountValue}%`}</Text>

            {isItemLocked(item) && (
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <Entypo
                        name="lock"
                        size={20}
                        style={{
                            marginLeft: 5,
                        }}
                    />
                </View>
            )}
        </View>
    );

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            width: 5,
                            height: 90,
                            backgroundColor: '#bec0c2',
                            marginRight: 10,
                        }}
                    />
                    <View>
                        <Text style={{fontSize: 16}}>{t('badges.amountSpent')}</Text>
                        <Text type="bold" style={{fontSize: 32, marginVertical: 5}}>
                            {`${cart?.totalMoneySpent.toFixed(2)} ${constants.currency}`}
                        </Text>
                        <Text
                            style={{
                                fontSize: 10,
                            }}>{`${t('badges.youAre')} ${myBadge?.name} ${t('badges.level')} (${t(
                            'badges.discount',
                        )} ${myBadge?.discountValue}%)`}</Text>
                    </View>
                </View>

                <Text style={{fontSize: 20, marginTop: 20}} type="bold">
                    {t('badges.whyBadges')}
                </Text>
                <Text color="gray" style={{marginTop: 20}}>
                    {t('badges.badgesExplanation')}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 30,
                    }}>
                    <View
                        style={{
                            width: 5,
                            height: badges ? badges.length * (BADGE_ITEM_COMPONENT_HEIGHT + 10) : 0,
                            backgroundColor: '#dce1e8',
                            borderRadius: 3,
                            marginRight: 10,
                        }}
                    />
                    <View
                        style={{
                            width: '95%',
                        }}>
                        {badges &&
                            badges.map((item, index) => (
                                <>
                                    <BadgeItemComponent item={item} />
                                    {index < badges.length - 1 && <Divider />}
                                </>
                            ))}
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            width: 5,
                            height: getProgressBarHeight(),
                            backgroundColor: '#18d218',
                            borderRadius: 3,
                        }}
                    />
                </View>
            </ScrollView>
            <Header
                title="Medalje"
                onPress={() => navigation.pop()}
                style={{
                    position: 'absolute',
                    paddingHorizontal: 16,
                    top: -4,
                    width: '100%',
                    backgroundColor: 'white',
                }}
                color={'#fff'}
            />
        </>
    );
};

export default PointsPreview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 100,
    },
});
