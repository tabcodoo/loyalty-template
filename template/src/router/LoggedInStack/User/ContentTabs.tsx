import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector, useDispatch} from 'react-redux';
import Animated from 'react-native-reanimated';
import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';
import MyTabBar from './MyTabBar';
import EmptyContent from 'components/common/EmptyContent';

import LocalizationContext from 'translation/context';
import Content from 'containers/LoggedInStack/User/ContentTabs/Content';
import {useTheme} from 'react-native-paper';

const Tab = createMaterialTopTabNavigator();

let ContentTabs = () => {
    let {colors, customFonts} = useTheme();
    let {t} = useContext(LocalizationContext);

    let displayCustomLinks = useSelector((state) => state.user.displayCustomLinks);
    let supplyActivated = useSelector((state) => state.supplyTabs.isEnabled);
    // let contentActivated = useSelector((state) => state.settings.content);
    let contentCategories = useSelector((state) => state.contentTabs);
    let contentActivated = useSelector((state) => state.contentTabs.isEnabled);
    // let supplyActivated = useSelector((state) => state.settings.supply);
    // let contentActivated = useSelector((state) => state.settings.content);
    // let bottomMenuActivated = supplyActivated && contentActivated;
    // let bottomMenuActivated = (contentActivated || supplyActivated) && displayCustomLinks;
    // let bottomMenuActivated =
    //     (contentActivated && displayCustomLinks) || (supplyActivated && displayCustomLinks);

    // BottomMenu je aktivan kada:
    //     su ukljucene minimalno 2 dodatne funkcionalnosti
    //
    let arr = [contentActivated, supplyActivated, displayCustomLinks];
    let bottomMenuActivated = arr.filter((feature) => feature).length > 1;

    return (
        <View style={{flex: 1}}>
            <Header menu={bottomMenuActivated} title={t('content.title')} />

            {contentCategories?.tabs.length === 0 ? (
                <EmptyContent text={t('content.noItems')} />
            ) : (
                <Tab.Navigator
                    lazy={true}
                    // tabBar={(props) => <MyTabBar {...props} />}
                    swipeEnabled={true}
                    tabBarOptions={{
                        scrollEnabled: true,
                        activeTintColor: colors.text,
                        inactiveTintColor: colors.text,
                        style: {
                            // borderBottomWidth: 0.5,
                            // borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            borderBottomColor: '#f0f0f0',
                            shadowOpacity: 0,
                            shadowOffset: {
                                height: 0,
                            },
                            shadowRadius: 0,
                            elevation: 0,
                        },
                        labelStyle: {
                            textTransform: 'none',
                            ...customFonts.small14BoldText,
                            fontSize:14,
                        },
                        tabStyle: {
                            // backgroundColor: '#faf',
                            // borderBottomWidth: 1,
                            // height: 30,
                            width: 'auto',
                        },
                        indicatorStyle: {
                            backgroundColor: colors.text,
                            height: 3,
                            // marginHorizontal: 16,
                        },
                    }}>
                    {contentCategories?.tabs.map((category, categoryIndex) => (
                        <Tab.Screen
                            key={() => categoryIndex.toString() + category.name}
                            name={'Content-' + categoryIndex}
                            component={Content}
                            options={{title: category.name}}
                            initialParams={{category, categoryIndex}}
                        />
                    ))}
                </Tab.Navigator>
            )}
        </View>
    );
};

export default ContentTabs;
