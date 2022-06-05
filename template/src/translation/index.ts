import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

import en from './en';
import ba from './ba';

const locales = RNLocalize.getLocales();

// if (Array.isArray(locales)) {
//     i18n.locale = locales[0].languageTag;
// }

// i18n.fallbacks = true;
i18n.translations = {ba, en};

export default i18n;
