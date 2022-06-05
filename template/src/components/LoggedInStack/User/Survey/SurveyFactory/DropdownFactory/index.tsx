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
import Toast from 'react-native-simple-toast';
import Factory from '../../SurveyFactory/Factory';

import CustomText from 'components/common/Text';

class DropdownComponent extends Field {
  constructor(props) {
    super(props);
    this.state = {
      currentlySelectedLabel: null,
    };
    this.factory = new Factory();
  }

  render() {
    const {currentlySelectedLabel, menuVisibile} = this.state;
    const {item, handleAnswer} = this.props;
    const {fieldValue, inverseParent, value} = item;
    // const {checked} = this.state;
    return (
      <View style={{marginTop: 0}}>
        {/* <Text style={{marginBottom: 8}}>{fieldValue}</Text> */}

        {inverseParent.map((dropdownItem, index) => {
          let subQuestion = dropdownItem.inverseParent.find(
            (possibleSubQuestions) =>
              possibleSubQuestions.inverseParent.length > 0,
          );
          let possibleToast = dropdownItem.inverseParent.find(
            (possibleToast) => possibleToast.fieldType === 'Notification',
          );
          let selected = dropdownItem.value;
          // dropdownItem.fieldValue === thi  s.state.currentlySelectedLabel;
          let components =
            subQuestion && this.factory?.create ? (
              <View>
                <Text
                  style={{
                    marginTop: 32,
                    fontFamily: 'Lato-Regular',
                    fontSize: 18,
                    letterSpacing: 0,
                  }}>
                  {subQuestion.fieldValue}
                </Text>

                {this.factory.create(
                  {
                    ...subQuestion,
                    fieldType: 'dropdownQuestion',
                  },
                  this.props.handleAnswer,
                )}
              </View>
            ) : null;
          return (
            <View>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  paddingVertical: 16,
                  paddingHorizontal: 16,

                  borderRadius: 6,
                  backgroundColor: !selected ? '#f0f0f0' : '#63b77d',
                }}
                onPress={() => {
                  if (selected) {
                    this.setState({
                      currentlySelectedLabel: null,
                      // menuVisibile: false,
                    });
                    this.props.handleAnswer(dropdownItem, false);
                  } else {
                    this.setState({
                      currentlySelectedLabel: dropdownItem.fieldValue,
                      // menuVisibile: false,
                    });
                    this.props.handleAnswer(dropdownItem, true);
                  }

                  // if (possibleToast) {
                  //   Toast.show(possibleToast.fieldValue);
                  // }
                }}
                // title={dropdownItem.fieldValue}
                key={index.toString()}>
                <Text
                  style={{
                    fontSize: 16,
                    flexWrap: 'wrap',
                    fontFamily: 'Lato-Regular',
                  }}>
                  {dropdownItem.fieldValue}
                </Text>
                {possibleToast && selected && (
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 14,
                      flexWrap: 'wrap',
                      fontFamily: 'Lato-Regular',
                      color: !selected ? '#63b77d' : '#fff',
                    }}>
                    {possibleToast.fieldValue}
                  </Text>
                )}
              </TouchableOpacity>
              <View style={{paddingHorizontal: 16}}>
                {selected && components}
              </View>
            </View>
          );
        })}

        {/* <Menu
          visible={menuVisibile}
          onDismiss={() => this.setState({menuVisibile: false})}
          style={{width: '91%'}}
          contentStyle={{
            marginTop: 72,
            backgroundColor: '#f0f0f0',
            borderRadius: 6,
          }}
          anchor={
            <TouchableOpacity
              style={{
                // borderWidth: 0.6,
                // borderColor: '#ddd',
                borderRadius: 6,
                backgroundColor: '#f0f0f0',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 16,
                paddingHorizontal: 16,
              }}
              onPress={() => this.setState({menuVisibile: true})}>
              <Text>
                {currentlySelectedLabel
                  ? currentlySelectedLabel
                  : inverseParent[0]?.fieldValue}
              </Text>
              <SimpleLineIcon name="arrow-down" color={'#000'} />
            </TouchableOpacity>
          }>
          {inverseParent.map((dropdownItem, index) => (
            <Menu.Item
              onPress={() => {
                this.setState({
                  currentlySelectedLabel: dropdownItem.fieldValue,
                  menuVisibile: false,
                });
                let possibleToast = dropdownItem.inverseParent.find(
                  (possibleToast) => possibleToast.fieldType === 'Notification',
                );
                if (possibleToast) {
                  Toast.show(possibleToast.fieldValue);
                }
              }}
              title={dropdownItem.fieldValue}
              key={index.toString()}
            />
          ))}
        </Menu> */}
        {/* <Text>{fieldValue}</Text> */}

        {/* <TextInput /> */}
        {/* <TextInput
          label={fieldValue}
          mode="outlined"
          disabled
          keyboardType="email-address"
          onChangeText={(email) => {
            // tj(email);
            //   dispatch(setRegisterForm({email}));
          }}
          value={value}
        /> */}
      </View>
    );
  }
}

class TextInputFactory {
  get type() {
    return 'dropdownquestion';
  }

  create({item, handleAnswer}) {
    return <DropdownComponent item={item} handleAnswer={handleAnswer} />;
  }
}

export default TextInputFactory;
