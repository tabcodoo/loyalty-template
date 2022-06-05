import {Dimensions, Platform} from 'react-native';
import {DefaultTheme, configureFonts} from 'react-native-paper';
import constants from '@constants';
import {RFValue} from 'react-native-responsive-fontsize';
let {height, width} = Dimensions.get('window');

let returnPlatformSpecificBold = () =>
    Platform.OS === 'android'
        ? {
              fontFamily: 'Roboto-Bold',
          }
        : {fontWeight: '700'};

let returnPlatformSpecificLight = () =>
    Platform.OS === 'android'
        ? {
              fontFamily: 'Roboto-Light',
          }
        : {fontWeight: '300'};

let returnPlatformSpecificSemiBold = () =>
    Platform.OS === 'android'
        ? {
              fontFamily: 'Roboto-SemiBold',
          }
        : {fontWeight: '600'};

let returnPlatformSpecificMedium = () =>
    Platform.OS === 'android'
        ? {
              fontFamily: 'Roboto-Medium',
          }
        : {fontWeight: '500'};

const baseText = {
    fontFamily: Platform.OS === 'android' ? 'Roboto-Regular' : 'SFUIDisplay-Regular', //SFUIDisplay-Regular is PostScriptName (IOS)
    fontSize: RFValue(16, height),
};

const baseTextBolded = {
    ...baseText,
    ...returnPlatformSpecificBold(),
};

const baseTextSemiBold = {
    ...baseText,
    ...returnPlatformSpecificSemiBold(),
};

const baseTextLight = {
    ...baseText,
    ...returnPlatformSpecificLight(),
};

const baseTextMedium = {
    ...baseText,
    ...returnPlatformSpecificMedium(),
};

const fontConfig = {
    default: {
        regular: {
            ...baseText,
            fontWeight: '400',
        },
        medium: {
            ...baseText,
            fontWeight: '500',
        },
        light: {
            ...baseText,
            fontWeight: '300',
        },
        bold: {
            ...baseTextBolded,
        },
        // CUSTOM FONTS newest update
        regularText: {...baseText, lineHeight: 17},
        lightText: {...baseTextLight},
        boldText: {...baseTextBolded},
        mediumText: {...baseTextMedium},
        header1Text: {
            ...baseTextSemiBold,
            fontSize: RFValue(34, height),
        },
        header24Text: {
            ...baseTextSemiBold,
            fontSize: RFValue(24, height),
        },
        header2Text: {
            ...baseTextSemiBold,
            fontSize: RFValue(20, height),
        },
        header2RegularText: {
            ...baseText,
            fontSize: RFValue(20, height),
        },
        header3Text: {
            ...baseTextSemiBold,
            fontSize: RFValue(17, height),
        },
        buttonText: {
            ...baseTextMedium,
            fontSize: RFValue(16, height),
        },
        smallText: {
            ...baseText,
            fontSize: RFValue(12, height),
        },
        smallMediumText: {
            ...baseTextMedium,
            fontSize: RFValue(12, height),
        },
        smallBoldText: {
            ...baseTextBolded,
            fontSize: RFValue(12, height),
        },
        smallLightText: {
            ...baseTextLight,
            fontSize: RFValue(12, height),
        },
        smallSemiBoldText: {
            ...baseTextSemiBold,
            fontSize: RFValue(12, height),
        },
        small14Text: {
            ...baseText,
            fontSize: RFValue(14, height),
        },
        small14SemiBoldText: {
            ...baseTextSemiBold,
            fontSize: RFValue(14, height),
        },
        small14BoldText: {
            ...baseTextBolded,
            fontSize: RFValue(14, height),
        },
        small14MediumText: {
            ...baseTextMedium,
            fontSize: RFValue(14, height),
        },
        small14LightText: {
            ...baseTextLight,
            fontSize: RFValue(14, height),
        },
        small10Text: {
            // ...baseText,
            ...baseTextSemiBold,
            fontSize: RFValue(10, height),
        },
        small10SemiBoldText: {
            ...baseTextSemiBold,
            fontSize: RFValue(10, height),
        },
        small10LightText: {
            ...baseTextLight,
            fontSize: RFValue(10, height),
        },
        small8Text: {
            ...baseText,
            fontSize: RFValue(8, height),
        },
        small8SemiBoldText: {
            ...baseTextSemiBold,
            fontSize: RFValue(8, height),
        },
        small8LightText: {
            ...baseTextLight,
            fontSize: RFValue(8, height),
        },
    },
};

const baseTheme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        background: '#fff',
        primary: constants.primaryColor,
        header: constants.headerColor,
        drawer: '#fff',
        // surface: '#63b77d',
        // onSurface: '#000',
        // onBackground: '#000',
        // disabled: '#000',
        text: '#0a3039',
        error: '#ff0000',
        success: '#34bfa3',
        red: '#d0021b',
        btnTextColor: '#fff',
        lightGray: '#9c9c9c',
        gray: '#F1EFEF',
        gray2: '#D7D7D7',
        gray3: '#575962',
        orange: '#ff6e00',
    },
    customFonts: fontConfig.default,
    fonts: configureFonts(fontConfig),
};

export const lightTheme = {
    ...baseTheme,
    colors: {
        ...baseTheme.colors,
        background: '#fff',
    },
};

export const darkTheme = {
    ...lightTheme,
};
