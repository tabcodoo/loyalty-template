import * as React from 'react';
import {ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import Header from 'components/common/LoggedInHeader';
import Button from 'components/common/Button';
import Text from 'components/common/Text';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import SurveyFactory from './SurveyFactory/Factory';
import * as Animatable from 'react-native-animatable';
import {CommonActions} from '@react-navigation/native';

const Survey = (props: any) => {
    let surveyFactory = new SurveyFactory();
    const {
        t,
        navigation,
        user,
        initialScreen,
        userAnswers,
        setUserAnswers,
        goToNextQuestion,
        goToPreviousQuestion,
        surveyFinished,
        resetSurvey,
    } = props;
    let {
        surveyProgress,
        // surveyProgress: {totalQuestions, surveyQuestionTypes, myProgress, nextQuestion},
    } = user;
    let typeItem = surveyProgress?.surveyQuestionTypes.find(
        (questionType) => questionType.id === surveyProgress?.nextQuestion?.surveyQuestionTypeId,
    );
    // console.tron.log('typeItem', typeItem);
    let [startAnimation, setStartAnimation] = React.useState(false);
    const {colors} = useTheme();

    // React.useEffect(() => {
    //     setInterval(() => {
    //         setStartAnimation(true);
    //         setStartAnimation(false);
    //     }, 1000);
    // }, []);

    React.useEffect(() => {
        // setInterval(() => {
        // console.tron.log('surveyFinished');
        if (surveyFinished) {
            setStartAnimation(true);
            setTimeout(() => {
                setStartAnimation(false);
            }, 1000);
        }

        // }, 1000);
    }, [surveyFinished]);
    // console.tron.log('surveyProgress', surveyProgress);
    return (
        <Animatable.View
            style={styles.container}
            // animation={startAnimation ? 'fadeInRight' : null}
            // duration={1000}
            // animation={opened ? 'fadeIn' : 'fadeOut'}
        >
            <View
                style={[
                    {
                        flex: 1,

                        padding: 16,
                    },
                    initialScreen || surveyFinished
                        ? {
                              backgroundColor: '#fff',
                              justifyContent: 'flex-end',
                          }
                        : {
                              justifyContent: 'center',
                              backgroundColor: colors.primary,
                          },
                ]}>
                {(initialScreen || surveyFinished) && (
                    <Text type={'header1'}>
                        {surveyFinished ? t('survey.finishedTitle') : t('survey.title')}
                    </Text>
                )}
                {!initialScreen && !surveyFinished && (
                    <>
                        <Text type={'header2Regular'} color={'#fff'}>
                            {`${surveyProgress?.myProgress + 1} od ${
                                surveyProgress?.totalQuestions
                            }`}
                        </Text>
                        <Text type={'header2'} color={'#fff'} style={{marginTop: 16}}>
                            {surveyProgress?.nextQuestion?.text}
                        </Text>
                    </>
                )}
            </View>
            <View
                style={{
                    flex: 2,
                    // backgroundColor: '#ff0',
                    // paddingTop: 32,
                }}>
                <ScrollView
                    style={{
                        // backgroundColor: '#ff0',
                        paddingTop: 16,
                        paddingHorizontal: 16,
                    }}>
                    {initialScreen && !surveyProgress?.isRewarded && (
                        <Text
                            style={{
                                lineHeight: 20,
                            }}>
                            {`${t('survey.subtitle')}`}
                        </Text>
                    )}
                    {surveyFinished &&
                        (!surveyProgress?.isRewarded ? (
                            <Text
                                style={{
                                    lineHeight: 20,
                                }}>
                                {`${t('survey.finishedSubtitle') + surveyProgress?.reward}`}
                            </Text>
                        ) : (
                            <Text
                                style={{
                                    lineHeight: 20,
                                }}>
                                {t('survey.surveyEdited')}
                            </Text>
                        ))}
                    {!initialScreen &&
                        !surveyFinished &&
                        surveyFactory.create(
                            {item: surveyProgress?.nextQuestion, type: typeItem?.name},
                            (arrayOfAnswers) => {
                                // console.tron.log('arrayOfAnswers', arrayOfAnswers);
                                setUserAnswers(arrayOfAnswers);
                            },
                        )}
                </ScrollView>
            </View>
            <View
                style={[
                    {
                        // backgroundColor: '#aaf',
                        padding: 16,
                    },
                    // !initialScreen && {
                    //     padding: 16,
                    //     // flexDirection: 'row-reverse',
                    //     // alignItems: 'center',
                    //     // justifyContent: 'space-around',
                    // },
                ]}>
                <View
                // style={[!initialScreen && {flex: 1}]}
                >
                    <Button
                        disabled={
                            initialScreen || surveyFinished ? false : userAnswers.length === 0
                        }
                        label={
                            initialScreen
                                ? t('survey.startBtn')
                                : surveyFinished
                                ? t('survey.reset')
                                : surveyProgress?.myProgress + 1 == surveyProgress?.totalQuestions
                                ? t('survey.finish')
                                : t('survey.nextQuestion')
                        }
                        mode="contained"
                        onPress={surveyFinished ? resetSurvey : goToNextQuestion}
                    />
                    {surveyFinished && (
                        // <View style={[!initialScreen && {flex: 1}]}>
                        <Button
                            label={
                                initialScreen
                                    ? t('survey.skipBtn')
                                    : surveyFinished
                                    ? t('survey.close')
                                    : t('survey.back')
                            }
                            style={{marginTop: 16}}
                            mode="text"
                            onPress={() => {
                                // if (initialScreen)
                                props.navigation.dispatch(
                                    CommonActions.reset({
                                        index: 1,
                                        routes: [{name: 'CouponStack'}],
                                    }),
                                );
                                // navigation.navigate('CouponStack');
                                // else if (surveyFinished) {
                                //     resetSurvey();
                                //     // resetuj
                                // } else {
                                //     goToPreviousQuestion();
                                // }
                            }}
                        />
                        // </View>
                    )}
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{name: 'CouponStack'}],
                        }),
                    );
                    // navigation.navigate('CouponStack');
                }}
                style={{
                    position: 'absolute',
                    right: 0,
                    top: getStatusBarHeight(),
                    padding: 16,
                }}>
                <Ionicons
                    name="close"
                    color={initialScreen || surveyFinished ? '#000' : '#fff'}
                    size={24}
                />
            </TouchableOpacity>
        </Animatable.View>
    );
};

export default Survey;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
