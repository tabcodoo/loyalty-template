import React from 'react';
import {View, TouchableOpacity, Platform} from 'react-native';
import Field from '../Field';
import Factory from '../Factory';

import CustomCheckBox from 'components/common/CheckBox';
import Text from 'components/common/Text';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'react-native-paper';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

let DateItem = ({item, handleAnswer}) => {
    const {colors, roundness} = useTheme();

    const [openPicker, setOpenPicker] = React.useState(null);

    const maximumDate = new Date();
    maximumDate.setFullYear(maximumDate.getFullYear() - 15);
    console.log('MAXIMUM DATE', maximumDate);

    const [selectedDate, setSelectedDate] = React.useState(moment(maximumDate));

    let selectDate = (dateValue) => {
        setSelectedDate(dateValue);
        // console.tron.log(item, dateValue);

        handleAnswer([{surveyAnswerId: item.id, dateValue}]);
    };

    return (
        <View>
            {/* <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    backgroundColor: '#f4f5f8',
                    padding: 16,
                    borderRadius: roundness,
                    // marginBottom: 16,
                }}
                onPress={() => {
                    setOpenPicker(true);
                    // if (!checked) {
                    //     addAnswer(answer.id);
                    // } else {
                    //     removeAnswer(answer.id);
                    // }
                    // setChecked(!checked);
                }}>
                <Text type={selectedDate ? 'small14' : 'small14'}>
                    {selectedDate ? selectedDate.format('DD/MM/YYYY') : 'Odaberi datum'}
                </Text>
            </TouchableOpacity> */}
            {/* {openPicker && ( */}
            <View
                style={{
                    // flex: 1,
                    alignSelf: 'center',
                    marginTop: 32,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 16,
                    }}>
                    <View
                        style={{
                            flex: 2,
                            alignItems: Platform.OS !== 'ios' ? 'flex-end' : 'flex-start',
                        }}>
                        <Text
                            type="small14Bold"
                            style={{
                                // marginHorizontal: 16,
                                marginHorizontal: Platform.OS !== 'ios' ? 16 : 24,
                            }}>
                            DAN
                        </Text>
                    </View>

                    <View
                        style={{
                            flex: 3,
                            // backgroundColor: '#faf',
                        }}>
                        <Text type="small14Bold">MJESEC</Text>
                    </View>

                    <View
                        style={{
                            flex: 2,
                            // alignItems: 'center',
                        }}>
                        <Text type="small14Bold">GODINA</Text>
                    </View>
                </View>
                <View>
                    {Platform.OS !== 'ios' && (
                        <View
                            style={{
                                backgroundColor: colors.primary,
                                position: 'absolute',
                                opacity: 0.12,
                                top: '40%',
                                height: 36,
                                left: 0,
                                right: 0,
                            }}
                        />
                    )}
                    <DatePicker
                        // dividerHeight={2}
                        // androidVariant="iosClone"
                        locale={'bs_BA'}
                        mode="date"
                        date={new Date(selectedDate)}
                        onDateChange={(date) => selectDate(moment(date))}
                        textColor={colors.text}
                        // style={{backgroundColor: '#faf'}}
                        maximumDate={maximumDate}
                    />
                </View>
            </View>
            {/* )} */}
        </View>
    );
};

class CheckboxFactory {
    // userAnswers = [];
    // userAnswerId = -1;
    get type() {
        return 'date';
    }

    create({item, handleAnswer}) {
        // console.tron.log('create', item, handleAnswer);
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

        return <DateItem {...{item, handleAnswer}} />;
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
