import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Home from 'components/LoggedInStack/Home';

const HomeContainer = (props: any) => {
  // let x = useSelector((state) => state.x);
  // let [x, setx] = useState(null);
  // const dispatch = useDispatch();

  return <Home {...props} />;
};

export default HomeContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
