import * as React from 'react';
import {View, StyleSheet} from 'react-native';

const Success = (props: any) => {
  const {t} = props;
  return (
    <View style={styles.container}>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
