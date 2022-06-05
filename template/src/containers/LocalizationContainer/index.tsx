import React, {useState, useMemo, useEffect} from 'react';
import {useSelector} from 'react-redux';

import LocalizationContext from 'translation/context';
import i18n from 'i18n-js';
import Localization from 'translation';
import api from 'services/api';

const LocalizationContainer = (props) => {
    let user = useSelector((state) => state.user);
    let userLocale = useSelector((state) => state?.user?.language);
    // console.tron.log(
    //     'userLocale || Localization.locale',
    //     userLocale,
    //     Localization.locale,
    //     userLocale || Localization.locale,
    // );
    const [locale, setLocale] = useState(userLocale || Localization.locale);
    const localizationContext = useMemo(
        () => ({
            t: (scope, options) =>
                i18n.t(scope, {
                    locale,
                    defaultLocale: 'ba',
                    ...options,
                }),
            locale,
            setLocale,
        }),
        [locale],
    );

    useEffect(() => {
        setLocale(userLocale);
        api.setToken(user?.token, userLocale);
        i18n.locale = userLocale;
    }, [userLocale]);

    return (
        <LocalizationContext.Provider value={localizationContext}>
            {props.children}
        </LocalizationContext.Provider>
    );
};

export default LocalizationContainer;
