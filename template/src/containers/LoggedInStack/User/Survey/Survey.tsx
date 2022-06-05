import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import Survey from 'components/LoggedInStack/User/Survey';
import SplashScreen from 'react-native-splash-screen';
import api from 'services/api';
import actions from 'store/actions';
import {CommonActions} from '@react-navigation/native';

const SurveyContainer = (props: any) => {
    let user = useSelector((state) => state.user);
    const {language} = user ?? {};
    let [initialScreen, setInitialScreen] = useState(!user?.surveyProgress?.myProgress);
    let [surveyFinished, setSurveyFinished] = useState(
        user?.surveyProgress?.myProgress === user?.surveyProgress?.totalQuestions,
    );
    // console.tron.log(
    //     'SurveyContainer',
    //     user?.surveyProgress?.myProgress === user?.surveyProgress?.totalQuestions,
    //     user?.surveyProgress?.myProgress,
    //     user?.surveyProgress?.totalQuestions,
    //     initialScreen,
    //     surveyFinished,
    // );
    let [userAnswers, setUserAnswers] = useState([]);
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );

    useEffect(() => {
        SplashScreen.hide();
        dispatch(
            actions.setUser({
                ...user,
                mobileAppSettings: {
                    ...user.mobileAppSettings,
                    showSurveyOnStartup: false,
                },
            }),
        );
    }, []);

    let goToNextQuestion = () => {
        let {
            surveyProgress,
            surveyProgress: {surveyId, nextQuestion},
        } = user;
        if (surveyFinished) props.navigation.navigate('CouponStack');
        else if (initialScreen) setInitialScreen(false);
        else {
            // console.tron.log('surveyProgress,nextQuestion', surveyProgress, nextQuestion);
            api.post('loyalty/answer-survey-question', {
                surveyId,
                surveyQuestionId: nextQuestion.id,
                userAnswers,
            })
                .then((response) => {
                    // console.tron.log(
                    //     'loyalty/answer-survey-question response',
                    //     response,
                    //     response.data.payload,
                    // );
                    dispatch(actions.setUser({...user, surveyProgress: response.data.payload}));
                    if (response?.data?.payload?.isCompleted) {
                        dispatch(actions.resetCoupons());
                        dispatch(actions.getCoupons());
                        dispatch(actions.getCart());
                        props.navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [{name: 'Survey'}],
                            }),
                        );
                    }
                    // else setSurveyFinished(response?.data?.payload?.isCompleted);

                    setUserAnswers([]);
                })
                .catch((err) => {
                    // console.tron.log('loyalty/answer-survey-question err', err);
                });
        }
    };

    let goToPreviousQuestion = () => {
        let {
            surveyProgress,
            surveyProgress: {myProgress, nextQuestion},
        } = user;

        // console.tron.log('surveyProgress,goToPreviousQuestion', nextQuestion, surveyProgress);
        if (!myProgress) {
            setInitialScreen(true);
        }
        api.get(
            `loyalty/previous-survey-question/${surveyProgress?.surveyId}/${nextQuestion?.id}`,
            language,
        )
            .then((response) => {
                // console.tron.log(
                //     '/api/v1/loyalty/previous-survey-question',
                //     response,
                //     response.data.payload,
                // );
                dispatch(actions.setUser({...user, surveyProgress: response.data.payload}));
            })
            .catch((err) => {
                // console.tron.log('loyalty/move-survey-question-down err', err);
            });
    };

    let resetSurvey = () => {
        let {surveyProgress} = user;

        // console.tron.log('surveyProgress,goToPreviousQuestion', surveyProgress);
        // if (!myProgress) {
        //     setInitialScreen(true);
        // }
        api.get(`loyalty/reset-survey?id=${surveyProgress?.surveyId}`, language)
            .then((response) => {
                // console.tron.log('loyalty/reset-survey res', response, response.data.payload);
                dispatch(actions.setUser({...user, surveyProgress: response.data.payload}));
                // setInitialScreen(true);
                setSurveyFinished(false);
            })
            .catch((err) => {
                // console.tron.log('loyalty/move-survey-question-down err', err);
            });
    };

    return (
        <Survey
            {...props}
            {...{
                t,
                user,
                initialScreen,
                userAnswers,
                setUserAnswers,
                goToNextQuestion,
                goToPreviousQuestion,
                surveyFinished,
                resetSurvey,
            }}
        />
    );
};

export default SurveyContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
