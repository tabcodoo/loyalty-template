import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import ContentDetails from 'components/LoggedInStack/User/ContentTabs/ContentDetails';

const ContentDetailsContainer = (props: any) => {
    // let x = useSelector((state) => state.x);
    // let [x, setx] = useState(null);
    // const dispatch = useDispatch();
    let {
        navigation,
        route: {
            params: {content},
        },
    } = props;
    let {t} = useContext(LocalizationContext);
    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );
    return <ContentDetails {...props} {...{t, content}} />;
};

export default ContentDetailsContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
