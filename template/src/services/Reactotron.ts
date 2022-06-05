import Reactotron, {trackGlobalErrors} from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-community/async-storage';

let reactotron = null;
// if (__DEV__) {
reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({
        // host: '192.168.0.18', // office
        host: '192.168.100.110', // Macbook M1
        // host: '192.168.0.29', // Macbook M1 office
        // host: '192.168.43.85', // Macbook M1 xiaomi
        // host: '192.168.100.8', // home
        name: 'React Native Demo',
    })
    .use(reactotronRedux()) // except actions you would not like to see
    .useReactNative(trackGlobalErrors({})) // add all built-in react native plugins
    .connect(); // let's connect!
reactotron.clear();
console.tron = Reactotron;
// }

export default reactotron;
