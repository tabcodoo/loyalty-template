import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import TermsAndConditions from 'components/LogInStack/TermsAndConditions';

const TermsAndConditionsContainer = (props: any) => {
  // let x = useSelector((state) => state.x);
  // let [x, setx] = useState(null);
  // const dispatch = useDispatch();
  let {t} = useContext(LocalizationContext);
  // DropDownHolder.dropDown.alertWithType(
  //   'success',
  //   '',
  //   t('editActivity.successfullyUpdated'),
  // );
  return <TermsAndConditions {...props} {...{t}} />;
};

export default TermsAndConditionsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
