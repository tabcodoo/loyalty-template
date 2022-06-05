import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import SplashScreen from 'react-native-splash-screen';
import Maintenance from 'components/Maintenance';
import actions from 'store/actions';

const MaintenanceContainer = (props: any) => {
    // let x = useSelector((state) => state.x);
    // let [x, setx] = useState(null);
    // const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return <Maintenance {...props} {...{t}} />;
};

export default MaintenanceContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
