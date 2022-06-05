import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import Success from 'components/LoggedInStack/User/Success';

const SuccessContainer = (props: any) => {
  // let x = useSelector((state) => state.x);
  // let [x, setx] = useState(null);
  // const dispatch = useDispatch();
  let {t} = useContext(LocalizationContext);
  // DropDownHolder.dropDown.alertWithType(
  //   'success',
  //   '',
  //   t('editActivity.successfullyUpdated'),
  // );
  return <Success {...props} {...{t}} />;
};

export default SuccessContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
