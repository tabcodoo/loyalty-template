import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import StarRating from 'react-native-star-rating';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';

import Text from 'components/common/Text';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import Dropdown from 'components/common/Dropdown';

const Review = (props: any) => {
    const {t, stars, setStars, postReview, types, type, setType, loading} = props;
    const {colors} = useTheme();

    const schema = yup.object().shape({
        text: yup.string().required(t('errors.required')),
    });

    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <Dropdown
                style={{marginBottom: 24}}
                label={type ? type : t('review.dropdown')}
                items={types}
                onSelect={(item, index) => {
                    setType(item.value);
                }}
            />
            <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                    <Input
                        mode="flat"
                        label={t('review.message')}
                        placeholder={t('review.message')}
                        keyboardType="email-address"
                        error={errors.text?.message}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        multiline
                    />
                )}
                name="text"
            />

            <Text style={{marginTop: 24}}>{t('review.review')}</Text>
            <View style={{flexDirection: 'row', marginTop: 8}}>
                <StarRating
                    disabled={false}
                    rating={stars}
                    selectedStar={(rating) => setStars(rating)}
                    fullStarColor={colors.secondary}
                    starStyle={{paddingRight: 6}}
                    starSize={30}
                />
            </View>
            <Button
                label={t('btns.send')}
                mode="contained"
                style={{marginTop: 24}}
                onPress={handleSubmit(postReview)}
                loading={loading}
            />
        </KeyboardAwareScrollView>
    );
};

export default Review;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
});
