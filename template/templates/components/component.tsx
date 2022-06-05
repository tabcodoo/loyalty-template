import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const <%= name %> = (props: any) => {
  const {t} = props;
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
    </View>
  );
};

export default <%= name %>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
