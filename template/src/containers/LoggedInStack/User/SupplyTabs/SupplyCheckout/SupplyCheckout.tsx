import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import actions from 'store/actions';
import api from 'services/api';
import SupplyCheckout from 'components/LoggedInStack/User/SupplyTabs/SupplyCheckout';
import constants from '@constants';
import {useTheme} from 'react-native-paper';
import Text from 'components/common/Text';

const SupplyCheckoutContainer = (props: any) => {
    let {
        navigation,
        route: {
            params: {supply: supplyItem},
        },
    } = props;
    const {colors} = useTheme();
    const user = useSelector((state) => state.user);
    const {shoppingCartItems} = useSelector((state) => state.cart);
    const {badge} = useSelector((state) => state.cart);
    const {language, mobileShopEnabled} = user ?? {};
    const [supply, setSupply] = useState(supplyItem);
    const [coupon, setCoupon] = useState(null);
    const {isVariation} = supplyItem ?? {};
    console.log('SUPPLY COUPON', coupon);
    // const {variations} = supply ?? {};
    const [variations, setVariations] = useState(null);
    const [isThisCouponUsed, setIsThisCouponUsed] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [attributeTypes, setAttributeTypes] = useState(null);
    const [attributesData, setAttributesData] = useState(null);
    const [selectedAttributesString, setSelectedAtributtesString] = useState([]);
    const [selectedAttributesName, setSelectedAttributesName] = useState([]);
    console.log('SELECTED ATTRIBUTES', selectedAttributesString);
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    const [selectedVariation, setSelectedVariation] = useState(null);

    const useCoupon = () => {
        setIsThisCouponUsed(true);
    };

    const removeUsedCoupon = () => {
        // dispatch(actions.removeUsedCoupon(coupon));
        setIsThisCouponUsed(false);
    };

    const prepAttributesData = (data, types) => {
        if (!data || !types) return;
        if (attributesData) {
            const newData = data.map((item, index) => {
                if (attributesData[index].id === item.id) {
                    return attributesData[index].isPressed
                        ? attributesData[index]
                        : {...item, isPressed: false};
                }
                return {...item, isPressed: false};
            });
            setAttributesData(newData);
            return;
        }
        let newData = data.map((item) => ({...item, isPressed: false}));
        types.forEach((type) => {
            for (let i = 0; i < newData.length; i++) {
                if (type?.id === newData[i]?.attributeId) {
                    newData[i] = {...newData[i], isPressed: true};
                    break;
                }
            }
        });
        const selectedAttributesIds = newData
            .filter((item) => item.isPressed)
            .map((item) => item['attributeVariationId']);
        const selectedAttributesNames = newData
            .filter((item) => item.isPressed)
            .map((item) => item['name']);
        setSelectedAtributtesString(selectedAttributesIds);
        setSelectedAttributesName(selectedAttributesNames);
        setAttributesData(newData);
    };

    const getAttributesData = (attributeId) => {
        return attributesData
            .filter((item) => item.attributeId === attributeId)
            .filter(
                (item, index, self) =>
                    index ===
                    self.findIndex((t) => t.attributeVariationId === item.attributeVariationId),
            );
    };

    const selectAttribute = (attribute) => {
        const temp = attributesData.map((item) => {
            if (item.id === attribute.id) {
                return {...item, isPressed: true};
            } else if (attribute.attributeId === item.attributeId) {
                return {...item, isPressed: false};
            } else return item;
        });
        setAttributesData(temp);
        const selectedAttributesIds = temp
            .filter((item) => item.isPressed)
            .map((item) => item['attributeVariationId']);
        const selectedAttributesNames = temp
            .filter((item) => item.isPressed)
            .map((item) => item['name']);

        setSelectedAtributtesString(selectedAttributesIds);
        setSelectedAttributesName(selectedAttributesNames);
    };

    const getSelectedAttribute = (attributeId) => {
        return attributesData.find((item) => item.attributeId === attributeId && item.isPressed);
    };

    const useStockInApp = user?.useStockOnApp;

    const changeQuantity = (direction) => {
        if (direction === 'up') {
            if (useStockInApp) {
                supply?.stock > quantity && setQuantity(quantity + 1);
            } else {
                setQuantity(quantity + 1);
            }
        } else {
            if (quantity > 1) {
                setQuantity(quantity - 1);
            }
        }
    };

    const getCouponPrice = () => {
        switch (coupon?.discountTypeId) {
            case 1: {
                // fixed discount
                const oldPrice = supply?.discountedPrice ? supply?.discountedPrice : supply?.price;
                const dicount = coupon?.oldPrice - coupon?.newPrice;
                const newPrice = oldPrice - dicount;
                return {oldPrice, newPrice};
            }
            case 2: {
                // percentage discount
                const oldPrice = supply?.discountedPrice ? supply?.discountedPrice : supply?.price;
                const newPrice = oldPrice - oldPrice * (coupon.discount / 100);
                return {oldPrice, newPrice};
            }
            default: {
                // when there is no discount type, caused crashes before, logic might not be the best
                const oldPrice = supply?.discountedPrice ? supply?.discountedPrice : supply?.price;
                const newPrice = oldPrice;
                return {oldPrice, newPrice};
            }
        }
    };

    const isValid = () => {
        const isInCart = shoppingCartItems.find(
            (cartItem) => cartItem?.articleId === supply?.articleId && cartItem?.id === supply?.id,
        );
        if (isInCart) return false;

        if (isVariation) {
            if (
                selectedAttributesString &&
                attributeTypes &&
                selectedAttributesString.length === attributeTypes.length
            ) {
                if (useStockInApp) {
                    return supply?.stock;
                } else return true;
            } else {
                return false;
            }
        } else {
            if (useStockInApp) {
                return supply?.stock;
            } else return true;
        }
    };

    const getTotalAmount = () => {
        if (isThisCouponUsed) {
            const {newPrice, oldPrice} = getCouponPrice();
            if (quantity > 1) {
                return coupon.couponDiscountOnQuantity
                    ? newPrice * quantity
                    : newPrice + oldPrice * (quantity - 1);
            }
            return newPrice;
        }

        return supply?.discountedPrice
            ? supply?.discountedPrice * quantity
            : supply?.price * quantity;
    };

    const addItemToCart = () => {
        dispatch(
            actions.addItemToCart({
                item: supplyItem,
                isCouponChecked: isThisCouponUsed,
                quantity,
                attributeValues: selectedAttributesName.join('-'),
                variationId: selectedVariation?.id,
                successCallback: () => {
                    DropDownHolder.dropDown.alertWithType(
                        'success',
                        '',
                        t('supplyDetails.addedToCart'),
                    );
                },
            }),
        );
        if (isThisCouponUsed) dispatch(actions.addUsedCoupon(coupon));
    };

    const applyDiscountToVariation = (supply) => {
        return badge
            ? {
                  ...supply,
                  discountedPrice: supply?.price - supply?.price * (badge?.discountValue / 100),
              }
            : supply;
    };

    let closeInputSheet = () => dispatch(actions.resetGlobalBottomSheet());

    const handleItemInCart = () => {
        if (!shoppingCartItems.length && mobileShopEnabled) {
            openShoppingLocationSheet();
        } else addItemToCart();
    };

    const ShoppingLocationSelectorComponent = () => {
        return (
            <View
                style={{
                    padding: 16,
                }}>
                <Text
                    type="bold"
                    color="#000"
                    style={{
                        alignSelf: 'center',
                        fontSize: 17,
                    }}>
                    {t('supply.where_are_you_shopping')}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        dispatch(actions.setShoppingType('onsite'));
                        addItemToCart();
                        closeInputSheet();
                    }}
                    style={{
                        backgroundColor: colors.primary,
                        borderRadius: 2,
                        height: 52,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 60,
                    }}>
                    <Text type="header2Text" color="#fff">
                        {t('supply.in_store')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        dispatch(actions.setShoppingType('online'));
                        addItemToCart();
                        closeInputSheet();
                    }}
                    style={{
                        borderRadius: 2,
                        borderWidth: 1,
                        borderColor: colors.primary,
                        height: 52,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 16,
                    }}>
                    <Text type="header2Text" color={colors.primary}>
                        {t('supply.online')}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    const openShoppingLocationSheet = () => {
        dispatch(
            actions.setGlobalBottomSheet(
                true,
                () => <ShoppingLocationSelectorComponent />,
                Platform.OS === 'ios' ? [0, '40%'] : [0, '40%'],
            ),
        );
    };

    useEffect(() => {
        (async () => {
            try {
                const {data} = await api.get(`loyalty/supply/${supply.id}`, language);
                setVariations(data.payload[0].variations);
                setCoupon(data.payload[0].coupon);
            } catch (e) {
                console.log('GET COUNTRY ERR', e);
            }
        })();
    }, []);

    useEffect(() => {
        setAttributeTypes(supplyItem.hasAttributes);
        prepAttributesData(supplyItem.attributeVariations, supplyItem.hasAttributes);
    }, []);

    //GET VARIATIONS FROM FILTERING

    const compareVariation = (attributeVartiation) => {
        let isFound = false;
        selectedAttributesString.forEach((item) => {
            if (item === attributeVartiation.attributeVariationId) isFound = true;
        });
        return isFound;
    };

    useEffect(() => {
        if (
            !variations ||
            !variations.length ||
            (attributeTypes &&
                selectedAttributesString &&
                selectedAttributesString.length < attributeTypes.length)
        )
            return;

        const selectedVariation = variations.find((variation) => {
            const foundMatches = variation.attributeVariations.filter((item) => {
                if (compareVariation(item)) return item;
            });
            if (foundMatches.length === attributeTypes.length) return variation;
        });

        setSelectedVariation(applyDiscountToVariation(selectedVariation));
        setSupply(applyDiscountToVariation(selectedVariation));
    }, [selectedAttributesString, variations]);

    return (
        <SupplyCheckout
            {...props}
            {...{
                t,
                supply,
                quantity,
                changeQuantity,
                getTotalAmount,
                navigation,
                getAttributesData,
                attributeTypes,
                selectAttribute,
                selectedAttributesString,
                addItemToCart,
                getSelectedAttribute,
                coupon,
                getCouponPrice,
                isThisCouponUsed,
                useCoupon,
                removeUsedCoupon,
                user,
                isValid,
                useStockInApp,
                selectedVariation,
                openShoppingLocationSheet,
                handleItemInCart,
            }}
        />
    );
};

export default SupplyCheckoutContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
