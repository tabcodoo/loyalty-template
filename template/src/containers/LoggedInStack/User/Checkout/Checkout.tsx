import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import api from 'services/api';
import Checkout from 'components/LoggedInStack/User/Checkout';
import actions from 'store/actions';
import Text from 'components/common/Text';
import Button from 'components/common/Button';
import BottomSheet from '@gorhom/bottom-sheet';
import * as Animatable from 'react-native-animatable';

const CheckoutContainer = (props: any) => {
    const {navigation} = props;
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    const currentOrder = useSelector((state) => state.orders.currentOrder);

    const bottomSheetRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const [isBottomSheetOpened, setIsBottomSheetOpened] = useState(false);

    const cart = useSelector((state) => state.cart);
    const {
        paymentMethod,
        deliveryMethod,
        totalAmount: cartTotalAmount,
        pointBalance,
        shoppingCartItems,
    } = cart ?? {};
    const language = useSelector((state) => state?.user?.language);
    const deliveryData = useSelector((state) => state?.user?.deliveryData);
    const {name, address, phoneNumber, city, country, zipCode, isMainAddress, additionalInfo} =
        deliveryData ?? {};

    console.log('DELIVERY DATA', deliveryData);
    console.log('SELECTED CITY', city);

    const [usedPoints, setUsedPoints] = useState(null);
    const [currentPoints, setCurrentPoints] = useState(pointBalance);

    const [totalAmount, setTotalAmount] = useState(cartTotalAmount);

    const [totalDiscount, setTotalDiscount] = useState(0);

    const usedCoupons = useSelector((state) => state.cart.usedCoupons);

    const [unlockedCoupons, setUnlockedCoupons] = useState([]);

    const prepUnlockedCoupons = (data) => {
        const newData = data.map((item) => {
            return {...item, isPressed: false};
        });
        setUnlockedCoupons(newData);
    };

    const setSelectedCoupon = (coupon) => {
        const newData = unlockedCoupons.map((item) =>
            item.id === coupon.id ? {...item, isPressed: !item?.isPressed} : item,
        );
        setUnlockedCoupons(newData);
    };

    const getSelectedCoupons = () => {
        return unlockedCoupons.filter((item) => item.isPressed);
    };

    const closeBottomSheet = () => {
        bottomSheetRef.current.close();
        setIsBottomSheetOpened(false);
    };

    const placeOrder = async () => {
        setIsLoading(true);

        try {
            const requestBody = {
                cartId: cart.cartId,
                deliveryTypeId: deliveryMethod.id,
                paymentTypeId: paymentMethod.id,
                shippingAddress: {
                    name,
                    phoneNumber,
                    address,
                    cityId: city.id,
                    countryId: country.id,
                    zipCode,
                    isMainAddress,
                    additionalInfo,
                },
            };
            console.log('REQUEST BODY', requestBody);

            const {data} = await api.post('cart/place-order', {
                cartId: cart.cartId,
                deliveryTypeId: deliveryMethod.id,
                paymentTypeId: paymentMethod.id,
                shippingAddress: {
                    name,
                    phoneNumber,
                    address,
                    cityId: city.id,
                    countryId: country.id,
                    zipCode,
                    isMainAddress,
                    additionalInfo,
                },
                coupons: usedCoupons,
                specialCoupons: getSelectedCoupons(),
            });
            if (data.success) {
                DropDownHolder.dropDown.alertWithType('success', '', t('checkout.orderSuccess'));
                setIsLoading(false);
                return data.payload;
            }
        } catch (e) {
            console.log('PLACE ORDER ERROR', e);
            setIsLoading(false);
            DropDownHolder.dropDown.alertWithType('error', '', 'Greška! Pokušajte ponovo.');
        }
    };

    const isInputValid = () => {
        if (!paymentMethod || !deliveryMethod || !deliveryData) return false;
        return true;
    };

    const AreYouSureComponent = useCallback(
        () => (
            <View
                style={{
                    paddingHorizontal: 16,
                    justifyContent: 'space-around',
                    // flex: 1,
                }}>
                <Text center style={{lineHeight: 24, marginVertical: 30}}>
                    {t('checkout.areYouSure')}
                </Text>

                <View
                    style={
                        {
                            // marginTop: 20,
                        }
                    }>
                    <Button
                        mode={'contained'}
                        label={t('cart.yes')}
                        style={{marginBottom: 8}}
                        loading={isLoading}
                        disabled={isLoading}
                        onPress={async () => {
                            const placedOrder = await placeOrder();
                            closeBottomSheet();
                            if (placedOrder)
                                navigation.navigate('OrderComplete', {order: placedOrder});
                        }}
                    />
                    <Button
                        mode={'outlined'}
                        label={t('cart.no')}
                        onPress={() => {
                            closeBottomSheet();
                        }}
                    />
                </View>
            </View>
        ),
        [isLoading, unlockedCoupons, deliveryData, deliveryMethod, paymentMethod, cart],
    );

    const onOrderPress = async () => {
        if (!isInputValid()) {
            DropDownHolder.dropDown.alertWithType('error', '', t('errors.fillInData'));
        } else {
            // dispatch(actions.setGlobalBottomSheet(true, AreYouSureComponent, [0, '40%']));
            bottomSheetRef.current.expand();
            setIsBottomSheetOpened(true);
        }
    };

    const getSelectedCountry = async (id) => {
        const {data} = await api.get('app/address-data/get-countries', language);
        const newData = data.payload.map((item) => {
            return {id: item.id, name: item.encodedName};
        });
        return newData.find((item) => item.id === id);
    };

    const getSelectedCity = async (id, countryId) => {
        const {data} = await api.get(`app/address-data/get-cities/${countryId}`, language);
        const newData = data.payload.map((item) => {
            return {id: item.id, name: item.encodedName};
        });
        return newData.find((item) => item.id === id);
    };

    const saveDeliveryData = async ({
        name,
        address,
        phoneNumber,
        zipCode,
        cityId,
        countryId,
        isMainAddress,
        additionalInfo,
    }) => {
        const selectedCountry = await getSelectedCountry(countryId);
        const selectedCity = await getSelectedCity(cityId, countryId);

        dispatch(
            actions.setDeliveryData({
                name,
                address,
                phoneNumber,
                zipCode,
                city: selectedCity,
                country: selectedCountry,
                isMainAddress,
                additionalInfo,
            }),
        );
    };

    const calculateCurrentPoints = () => {
        const usedPoints = unlockedCoupons
            .filter((item) => item?.isPressed)
            .map((item) => item.threshold['thresholdValue'])
            .reduce((a, b) => a + b, 0);
        setUsedPoints(usedPoints);
        setCurrentPoints(pointBalance - usedPoints);
    };

    const getCouponDiscount = (coupon) => {
        if (coupon.couponTypeId === 3) {
            return {discount: 0};
        }

        const supply = shoppingCartItems.find((item) => item?.articleId === coupon?.articleId);

        let oldPrice = null;
        if (supply) {
            oldPrice = supply?.discountedPrice ? supply?.discountedPrice : supply?.price;
        } else {
            oldPrice = cartTotalAmount;
        }

        switch (coupon?.discountTypeId) {
            case 1: {
                return coupon?.discount >= cartTotalAmount
                    ? {discount: cartTotalAmount}
                    : {discount: coupon?.discount};
            }
            case 2: {
                const discount = oldPrice * (coupon.discount / 100);
                return {discount};
            }
            case null:
                const discount = coupon?.oldPrice - coupon?.newPrice;
                return {discount};
            default:
                return {discount: 0};
        }
    };

    const calculateTotalAmount = () => {
        const selectedCoupons = unlockedCoupons.filter((item) => item?.isPressed);

        const totalDiscount = selectedCoupons
            .map((item) => {
                return getCouponDiscount(item)['discount'];
            })
            .reduce((a, b) => a + b, 0);

        setTotalDiscount(totalDiscount);
        return totalDiscount;
    };

    useEffect(() => {
        (async () => {
            const {data} = await api.get('cart/my-cart', language);
            const {shippingAddress, unlockedCoupons} = data.payload;
            prepUnlockedCoupons(unlockedCoupons);
            if (shippingAddress) {
                const {
                    name,
                    address,
                    phoneNumber,
                    zipCode,
                    cityId,
                    countryId,
                    isMainAddress,
                    additionalInfo,
                } = shippingAddress;
                saveDeliveryData({
                    name,
                    address,
                    phoneNumber,
                    zipCode,
                    cityId,
                    countryId,
                    isMainAddress,
                    additionalInfo,
                });
            } else {
                dispatch(actions.resetDeliveryData());
            }
        })();
    }, []);

    useEffect(() => {
        if (!unlockedCoupons) return;
        calculateCurrentPoints();
        calculateTotalAmount();
    }, [unlockedCoupons]);

    useEffect(() => {
        if (deliveryMethod) {
            const {freeDeliveryAbove} = deliveryMethod ?? {};
            if (freeDeliveryAbove) {
                if (cartTotalAmount >= freeDeliveryAbove) {
                    setTotalAmount(cartTotalAmount - totalDiscount);
                } else {
                    setTotalAmount(cartTotalAmount + deliveryMethod?.deliveryPrice - totalDiscount);
                }
            } else {
                setTotalAmount(cartTotalAmount + deliveryMethod?.deliveryPrice - totalDiscount);
            }
        } else {
            setTotalAmount(cartTotalAmount - totalDiscount);
        }
    }, [totalDiscount, deliveryMethod]);

    const BottomSheetComponent = useCallback(
        ({children}) => (
            <BottomSheet ref={bottomSheetRef} snapPoints={[0, '30%']}>
                {children}
            </BottomSheet>
        ),
        [],
    );

    return (
        <>
            <Checkout
                {...props}
                {...{
                    t,
                    currentOrder,
                    cart,
                    navigation,
                    deliveryData,
                    paymentMethod,
                    deliveryMethod,
                    onOrderPress,
                    unlockedCoupons,
                    setSelectedCoupon,
                    currentPoints,
                    totalAmount,
                    usedPoints,
                    totalDiscount,
                    cartTotalAmount,
                }}
            />
            {isBottomSheetOpened && (
                <Animatable.View animation={'fadeIn'} duration={500} style={styles.backDrop}>
                    <TouchableOpacity style={{flex: 1}} onPress={() => closeBottomSheet()} />
                </Animatable.View>
            )}
            <BottomSheetComponent>
                <AreYouSureComponent />
            </BottomSheetComponent>
        </>
    );
};

export default CheckoutContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backDrop: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        // flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});
