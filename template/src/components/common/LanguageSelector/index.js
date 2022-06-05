import React, {useCallback, useState, useEffect} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Text from '../Text';
import {useSelector, useDispatch} from 'react-redux';
import actions from 'store/actions';

const languages = [
    {
        name: 'Bosnian',
        iconPath: require('../../../assets/images/bosnian_flag.png'),
        isPressed: false,
        value: 'ba',
    },
    {
        name: 'English',
        iconPath: require('../../../assets/images/english_flag.png'),
        isPressed: false,
        value: 'en',
    },
    // {
    //     name: 'German',
    //     iconPath: require('../../../assets/images/german_flag.png'),
    //     isPressed: false,
    //     value: 'de',
    // },
];

export default ({t}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.user);

    const {language: userLocale, userRole} = user ?? {};

    const prepareData = (data) => {
        return data.map((item) =>
            userLocale.includes(item.value)
                ? {...item, isPressed: true}
                : {...item, isPressed: false},
        );
    };

    const [languagesData, setLanguagesData] = useState(prepareData(languages));

    const renderButton = useCallback(
        ({item}) => (
            <>
                <TouchableOpacity
                    onPress={() => {
                        if (userRole.toLowerCase() === 'guest') {
                            dispatch(actions.changeLanguage(item.value));
                            dispatch(actions.getAllSupplies());
                            dispatch(actions.getContentCategories());
                            dispatch(actions.getCategories());
                            dispatch(actions.getCoupons());
                            dispatch(actions.getCart());
                        } else dispatch(actions.updateLanguageSettings(item.value));
                    }}
                    style={{
                        marginRight: 10,
                    }}>
                    <Image style={{width: 20, height: 20}} source={item.iconPath} />
                    {item.isPressed ? (
                        <View
                            style={{
                                height: 2,
                                position: 'absolute',
                                width: '100%',
                                backgroundColor: 'black',
                                bottom: -10,
                            }}
                        />
                    ) : null}
                </TouchableOpacity>
            </>
        ),
        [],
    );

    useEffect(() => {
        setLanguagesData(prepareData(languages));
    }, [userLocale]);

    return (
        <View
            style={{
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
            <Text>{t('settings.appLang')}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                {languagesData.map((item) => renderButton({item}))}
            </View>
        </View>
    );
};
