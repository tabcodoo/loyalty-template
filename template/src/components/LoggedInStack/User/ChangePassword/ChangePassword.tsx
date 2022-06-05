import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const ChangePassword = (props: any) => {
  const {t} = props;
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
