import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import api from 'services/api';
import Review from 'components/LoggedInStack/User/Review';

const ReviewContainer = (props: any) => {
  let [stars, setStars] = useState(5);
  let [type, setType] = useState(null);
  let [types, setTypes] = useState([]);
  let [loading, setLoading] = useState(false);

  let {t} = useContext(LocalizationContext);

  useEffect(() => {
    api
      .get('review_types')
      .then(({data: {data}}) => {
        data.map((review_type) => {
          review_type.value = review_type.name;
          review_type.key = review_type.name;
        });
        // setType(data[0].value);
        setTypes(data);
      })
      .catch((err) => {});
  }, []);

  let postReview = (data) => {
    if (!type) {
      DropDownHolder.dropDown.alertWithType(
        'error',
        t('errors.title'),
        t('review.typeError'),
      );
      return;
    }
    setLoading(true);
    api
      .post('add_review', {...data, stars, type})
      .then(({data: res}) => {
        setLoading(false);
        if (res.message === 'success') {
          setType(null);
          DropDownHolder.dropDown.alertWithType(
            'success',
            t('success.title'),
            t('review.success'),
          );
        } else {
          DropDownHolder.dropDown.alertWithType('error', t('errors.title'));
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <Review
      {...props}
      {...{t, stars, setStars, postReview, types, type, setType, loading}}
    />
  );
};

export default ReviewContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
