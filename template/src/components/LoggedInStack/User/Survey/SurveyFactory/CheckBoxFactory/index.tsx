import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Field from '../Field';
import Factory from '../../SurveyFactory/Factory';

import CustomCheckBox from 'components/common/CheckBox';
import Text from 'components/common/Text';

class CheckboxComponent extends Field {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    this.factory = new Factory();
  }

  render() {
    const {item} = this.props;
    const {fieldValue, value} = item;
    const {checked} = this.state;
    let components =
      item.inverseParent.length > 0 && this.factory?.create ? (
        <View>
          {/* <Text type="surveyQuestion" style={{marginTop: 16}}>
            {item.fieldValue}
          </Text> */}

          {item.inverseParent.map((item) =>
            this.factory.create(item, this.props.handleAnswer),
          )}
        </View>
      ) : null;

    return (
      <View>
        <CustomCheckBox
          label={fieldValue}
          checked={value}
          onPress={() => {
            this.setState({checked: !value});
            this.props.handleAnswer(item, !value);
          }}
        />
        {/* <TouchableOpacity
          key={item.fieldValue.toString()}
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}
          onPress={() => {
            this.setState({checked: !checked});
          }}>
          <View>
            <CustomCheckBox
              label={fieldValue}
              checked={checked}
              onPress={() => {
                this.setState({checked: !checked});
              }}
            />
             <Checkbox.Android
              color="#63b77d"
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({checked: !checked});
              }}
            /> 
          </View>
          <View style={{flexDirection: 'row', marginRight: 32}}>
            <Text
              style={{
                flexWrap: 'wrap',
                fontFamily: 'Lato-Regular',
                fontSize: 14,
              }}>
              {fieldValue}
            </Text>
          </View>
        </TouchableOpacity> */}
        <View style={{paddingHorizontal: 16}}>{value && components}</View>
      </View>
    );
  }
}

class CheckboxFactory {
  get type() {
    return 'checkbox';
  }

  get secondaryType() {
    return 'multiselect';
  }

  create({item, handleAnswer}) {
    return <CheckboxComponent item={item} handleAnswer={handleAnswer} />;
  }
}

export default CheckboxFactory;
