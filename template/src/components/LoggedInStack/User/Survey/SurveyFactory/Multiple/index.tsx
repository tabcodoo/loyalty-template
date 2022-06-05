import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Field from '../Field';
import Factory from '../../SurveyFactory/Factory';

import CustomCheckBox from 'components/common/CheckBox';
import Text from 'components/common/Text';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'react-native-paper';

let MultipleItem = ({answer, addAnswer, removeAnswer}) => {
    let [checked, setChecked] = React.useState(false);
    const {colors} = useTheme();
    // console.tron.log(answer);
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                backgroundColor: '#f4f5f8',
                padding: 16,
                marginBottom: 16,
            }}
            onPress={() => {
                if (!checked) {
                    addAnswer(answer.id);
                } else {
                    removeAnswer(answer.id);
                }
                setChecked(!checked);
            }}>
            <View
                style={[
                    {
                        borderWidth: 1,
                        borderColor: colors.gray2,
                        backgroundColor: colors.gray2,
                        padding: 2,
                    },
                    checked && {borderColor: colors.primary, backgroundColor: colors.primary},
                ]}>
                <FontAwesome name="check" color={checked ? '#fff' : colors.gray2} />
            </View>
            <Text type="small14" style={{marginLeft: 16}}>
                {answer?.text}
            </Text>
        </TouchableOpacity>
    );
};

let MultipleItems = ({item, handleAnswer}) => {
    let [userAnswers, setUserAnswers] = React.useState([]);

    let addAnswer = (surveyAnswerId) => {
        let copy = userAnswers.slice();
        copy.push({surveyAnswerId});
        handleAnswer(copy);
        setUserAnswers(copy);
        // console.tron.log('this.userAnswers', copy);
    };

    let removeAnswer = (id) => {
        let copy = userAnswers.slice();

        let index = copy.findIndex((a) => a.surveyAnswerId === id);

        if (index !== -1) {
            copy.splice(index, 1);
        }
        handleAnswer(copy);
        setUserAnswers(copy);

        // console.tron.log('copy remove', copy);
    };

    return item?.item?.surveyAnswers.map((item) => {
        // console.tron.log('item', item);
        return <MultipleItem answer={item} addAnswer={addAnswer} removeAnswer={removeAnswer} />;
    });
};

class CheckboxFactory {
    get type() {
        return 'multiple';
    }

    create({item, handleAnswer}) {
        // console.tron.log(
        //     'MultipleFactory',
        //     // this.userAnswers,
        //     item?.item?.surveyAnswers,
        //     item,
        //     handleAnswer,
        // );

        return <MultipleItems {...{item, handleAnswer}} />;
    }
}

export default CheckboxFactory;
