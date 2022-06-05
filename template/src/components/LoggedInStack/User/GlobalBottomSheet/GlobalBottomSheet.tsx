import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const GlobalBottomSheet = (props: any) => {
  const {t} = props;
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
    </View>
  );
};

export default GlobalBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
