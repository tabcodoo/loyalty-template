import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Field from '../Field';
import Factory from '../../SurveyFactory/Factory';

import CustomCheckBox from 'components/common/CheckBox';
import Text from 'components/common/Text';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'react-native-paper';

let SingleItem = ({answer, addAnswer, removeAnswer, userAnswerId}) => {
    let checked = userAnswerId === answer.id;
    const {colors} = useTheme();
    // console.tron.log(answer, checked, userAnswerId, answer.id);

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
                // setChecked(!checked);
            }}>
            <View
                style={[
                    {
                        borderWidth: 1.7,
                        borderColor: colors.gray2,
                        // backgroundColor: colors.gray2,
                        // padding: 2,
                        borderRadius: 40,
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    checked && {
                        borderColor: colors.primary,
                        // backgroundColor: colors.primary,
                    },
                ]}>
                <View
                    style={[
                        checked && {
                            // borderColor: colors.primary,
                            backgroundColor: colors.primary,
                            borderRadius: 40,
                            width: 7,
                            height: 7,
                        },
                    ]}
                />
                {/* <FontAwesome name="check" color={checked ? '#fff' : colors.gray2} /> */}
            </View>
            <Text type="small14" style={{marginLeft: 16}}>
                {answer?.text}
            </Text>
        </TouchableOpacity>
    );
};

let SingleItems = ({item, handleAnswer}) => {
    let [userAnswers, setUserAnswers] = React.useState([]);
    let [userAnswerId, setUserAnswerId] = React.useState(-1);

    // console.tron.log(
    //     'SingleItems',
    //     // this.userAnswers,
    //     item?.item?.surveyAnswers,
    //     item,
    //     handleAnswer,
    // );
    // let checked = userAnswerId === answer.id;
    // const {colors} = useTheme();
    // console.tron.log(answer, checked, userAnswerId, answer.id);

    let addAnswer = (surveyAnswerId) => {
        let arr = [{surveyAnswerId}];
        setUserAnswers(arr);
        setUserAnswerId(surveyAnswerId);
        handleAnswer(arr);
        // console.tron.log('this.userAnswers', this.userAnswers);
    };

    let removeAnswer = (id) => {
        let index = userAnswers.findIndex((a) => a.surveyAnswerId === id);
        let copy = userAnswers.slice();

        if (index !== -1) {
            copy.splice(index, 1);
            setUserAnswers(copy);
        }
        setUserAnswerId(-1);
        handleAnswer(copy);

        // console.tron.log('this.userAnswers remove', this.userAnswers);
    };

    return item?.item?.surveyAnswers.map((item) => {
        // console.tron.log('item', item);
        return (
            <SingleItem
                answer={item}
                addAnswer={addAnswer}
                removeAnswer={removeAnswer}
                userAnswerId={userAnswerId}
            />
        );
    });
};

class CheckboxFactory {
    // userAnswers = [];
    // userAnswerId = -1;
    get type() {
        return 'single';
    }

    create({item, handleAnswer}) {
        // let addAnswer = (surveyAnswerId) => {
        //     this.userAnswers = [{surveyAnswerId}];
        //     this.userAnswerId = surveyAnswerId;
        //     handleAnswer(this.userAnswers);
        //     // console.tron.log('this.userAnswers', this.userAnswers);
        // };
        // let removeAnswer = (id) => {
        //     let index = this.userAnswers.findIndex((a) => a.surveyAnswerId === id);

        //     if (index !== -1) {
        //         this.userAnswers.splice(index, 1);
        //     }
        //     this.userAnswerId = -1;
        //     handleAnswer(this.userAnswers);

        //     // console.tron.log('this.userAnswers remove', this.userAnswers);
        // };

        return <SingleItems {...{item, handleAnswer}} />;
        // item?.item?.surveyAnswers.map((item) => {
        //     // console.tron.log('item', item);
        //     return (
        //         <SingleItem
        //             answer={item}
        //             addAnswer={addAnswer}
        //             removeAnswer={removeAnswer}
        //             userAnswerId={this.userAnswerId}
        //         />
        //     );
        // });
    }
}

export default CheckboxFactory;
