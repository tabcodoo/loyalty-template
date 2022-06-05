import React, {useEffect, useState, useMemo} from 'react';
import {StatusBar, LogBox} from 'react-native';
// if (__DEV__) import('services/Reactotron');

import Router from 'router';
import LocalizationContainer from 'containers/LocalizationContainer';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as StoreProvider} from 'react-redux';
import store, {persistor} from 'store';

import DropdownAlert from 'react-native-dropdownalert';
import DropDownHolder from 'services/DropDownHolder';
// import codePush from 'react-native-code-push';

// console.disableYellowBox = true;
LogBox.ignoreAllLogs(true);
const App = () => {
    // useEffect(() => {
    // }, []);

    return (
        <StoreProvider store={store}>
            <PersistGate persistor={persistor}>
                <LocalizationContainer>
                    <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
                    <Router />
                </LocalizationContainer>
            </PersistGate>
            <DropdownAlert
                ref={(ref) => DropDownHolder.setDropDown(ref)}
                messageNumOfLines={3}
                defaultContainer={{
                    padding: 8,
                    paddingTop: StatusBar.currentHeight,
                    flexDirection: 'row',
                }}
                updateStatusBar={false}
                imageStyle={{
                    width: 25,
                    height: 25,
                    alignSelf: 'center',
                }}
                successImageSrc={require('./src/assets/images/check.png')}
                errorImageSrc={require('./src/assets/images/close.png')}
                infoImageSrc={require('./src/assets/images/information.png')}
            />
        </StoreProvider>
    );
};
export default App;

// const codePushOptions = {
//   checkFrequency: codePush.CheckFrequency.ON_APP_START,
//   installMode: codePush.InstallMode.IMMEDIATE, // ON_NEXT_SUSPEND
// };

// export default codePush(codePushOptions)(App);
