import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import constants from '@constants';
import DeliveryMethod from 'components/LoggedInStack/User/DeliveryMethod';
import api from 'services/api';
import actions from 'store/actions';

const DeliveryMethodContainer = (props: any) => {
    const {navigation} = props;
    const language = useSelector((state) => state?.user?.language);
    const method = useSelector((state) => state.cart.deliveryMethod);
    let {t} = useContext(LocalizationContext);

    const dispatch = useDispatch();

    const [deliveryMethod, setDeliveryMethod] = useState([]);

    const changeDeliveryMethod = (method) => {
        const newData = deliveryMethod.map((item) =>
            item.id === method.id ? {...item, isSelected: true} : {...item, isSelected: false},
        );
        setDeliveryMethod(newData);
        dispatch(actions.setDeliveryMethod(method));
    };

    const prepareData = (data) => {
        return data.map((item) => {
            return method?.id === item.id
                ? {...item, isSelected: true}
                : {...item, isSelected: false};
        });
    };

    useEffect(() => {
        (async () => {
            try {
                const {data} = await api.get(
                    `loyalty/public/${constants.applicationId}/delivery-types`,
                    language,
                );
                console.log(data);
                setDeliveryMethod(prepareData(data.payload));
            } catch (e) {
                console.log('GET DELIVERY ERR', e);
            }
        })();
    }, []);

    return <DeliveryMethod {...props} {...{t, navigation, changeDeliveryMethod, deliveryMethod}} />;
};

export default DeliveryMethodContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
