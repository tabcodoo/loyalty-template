import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Field from '../Field';
import {
  useTheme,
  Button,
  Text,
  TextInput,
  Checkbox,
  Menu,
} from 'react-native-paper';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
class DropdownComponent extends Field {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {currentlySelectedLabel, menuVisibile} = this.state;
    const {item} = this.props;
    const {fieldValue, inverseParent} = item;
    // const {checked} = this.state;

    return (
      <View style={{marginTop: 16}}>
        {/* <Text style={{marginBottom: 8}}>{fieldValue}</Text> */}

        {/* <TextInput mode="outlined" value="" disabled/> */}
        {/* <TextInput
            // label={t('forms.weight')}
            placeholder={t('forms.weight')}
            style={{height: 50}}
            mode="outlined"
            // keyboardType="email-address"
            error={errors.weight?.message}
            onBlur={onBlur}
            onChangeText={(weight) => {
              onChange(weight);
              // dispatch(setRegisterForm({weight}));
            }}
            value={value}
            keyboardType={'numeric'}
          /> */}
      </View>
    );
  }
}

class TextInputFactory {
  get type() {
    return 'textinput';
  }

  create({item}) {
    return <DropdownComponent item={item} />;
  }
}

export default TextInputFactory;
