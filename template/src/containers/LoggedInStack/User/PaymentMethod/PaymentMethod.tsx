import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import actions from 'store/actions';
import api from 'services/api';
import PaymentMethod from 'components/LoggedInStack/User/PaymentMethod';
import constants from '@constants';

const PaymentMethodContainer = (props: any) => {
    const {navigation} = props;
    const language = useSelector((state) => state?.user?.language);
    const method = useSelector((state) => state.cart.paymentMethod);
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    const [paymentMethod, setPaymentMethod] = useState([]);

    const changePaymentMethod = (method) => {
        const newData = paymentMethod.map((item) =>
            item.id === method.id ? {...item, isSelected: true} : {...item, isSelected: false},
        );
        setPaymentMethod(newData);
        dispatch(actions.setPaymentMethod(method));
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
                    `loyalty/public/${constants.applicationId}/payment-types`,
                    language,
                );
                setPaymentMethod(prepareData(data.payload));
            } catch (e) {
                console.log('GET PAYMENTS ERR', e);
            }
        })();
    }, []);

    return <PaymentMethod {...props} {...{t, navigation, changePaymentMethod, paymentMethod}} />;
};

export default PaymentMethodContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
