import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import Text from 'components/common/Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import OrderHistory from 'components/LoggedInStack/User/OrderHistory';
import actions from 'store/actions';
import api from 'services/api';
import Button from 'components/common/Button';
import {useFocusEffect} from '@react-navigation/native';


const OrderHistoryContainer = (props: any) => {
    const user = useSelector((state) => state?.user);
    const {language, hasRoomServiceEnabled} = user ?? {}
    let orders = useSelector((state) => state.orders);
    let [orderSet, setOrderSet] = useState(false);
    let [orderHistory, setOrderHistory] = useState([]);
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);

    const copyToClipboard = (value) => {
        Clipboard.setString(value);
        Toast.show(t('paymentMethod.copied'), Toast.SHORT);
    };

    const cancelOrder = async (orderId) => {
        try {
            const {data} = await api.get(`cart/cancel-order/${orderId}`, language);
            getOrderHistory();
        } catch (e) {
            console.log('CANCEL ORDER ERROR', JSON.stringify(e));
        }
    };

    const PaymentDetail = ({headline, value}) => (
        <View
            style={{
                marginVertical: 10,
            }}>
            <Text color="#484848" type={'bold'}>
                {headline}
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 5,
                }}>
                <Text color="#484848" type={'small8Text'}>
                    {value}
                </Text>
                <TouchableOpacity onPress={() => copyToClipboard(value)}>
                    <AntDesign color="#484848" name="copy1" size={15} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const PaymentDetailsComponent = ({paymentDetails}) => {
        console.log('PAYMENT DETAILS', paymentDetails);
        return (
            <View
                style={{
                    padding: 20,
                }}>
                <PaymentDetail
                    headline={t('orderCompleted.bank')}
                    value={paymentDetails?.paymentInformation.split(',')[0]}
                />
                <PaymentDetail
                    headline={t('orderCompleted.transactionNumber')}
                    value={paymentDetails?.paymentInformation.split(', ')[1]}
                />
                <PaymentDetail
                    headline={t('orderCompleted.transactionDescription')}
                    value={paymentDetails?.paymentSubject}
                />
            </View>
        );
    };

    const openPaymentDetailsSheet = (paymentDetails) => {
        dispatch(
            actions.setGlobalBottomSheet(
                true,
                () => <PaymentDetailsComponent paymentDetails={paymentDetails} />,
                Platform.OS === 'ios' ? [0, '40%'] : [0, '40%'],
            ),
        );
    };

    const AreYouSureComponent = ({orderId}) => (
        <View
            style={{
                paddingHorizontal: 16,
                justifyContent: 'space-around',
                flex: 1,
            }}>
            <Text center style={{lineHeight: 24}}>
                {t('orderHistory.areYouSure')}
            </Text>

            <View>
                <Button
                    mode={'contained'}
                    label={t('cart.yes')}
                    style={{marginBottom: 8}}
                    onPress={async () => {
                        cancelOrder(orderId);
                        dispatch(actions.resetGlobalBottomSheet());
                    }}
                />
                <Button
                    mode={'outlined'}
                    label={t('cart.no')}
                    onPress={() => {
                        dispatch(actions.resetGlobalBottomSheet());
                    }}
                />
            </View>
        </View>
    );

    const openAreYouSureComponent = (orderId) => {
        dispatch(
            actions.setGlobalBottomSheet(
                true,
                () => <AreYouSureComponent orderId={orderId} />,
                Platform.OS === 'ios' ? [0, '50%'] : [0, '40%'],
            ),
        );
    };

    useEffect(() => {
        // console.tron.log('orders', orders);
        let currentOrder = [];
        if (orders.currentOrder) currentOrder.push(orders.currentOrder);
        setOrderHistory([...currentOrder, ...orders.history]);
        setOrderSet(true);
    }, [orders]);

    let getOrderHistory = () => {
        dispatch(actions.getOrderHistory());
    };

    const listenerTrigger = useCallback(() => {
        const unsubscribe = () => {
            getOrderHistory()
        };

        return unsubscribe();
    }, []);

    useFocusEffect(listenerTrigger);

    return (
        orderSet && (
            <OrderHistory
                {...props}
                {...{
                    t,
                    orderHistory,
                    getOrderHistory,
                    orders,
                    openPaymentDetailsSheet,
                    openAreYouSureComponent,
                    hasRoomServiceEnabled,
                }}
            />
        )
    );
};

export default OrderHistoryContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
