import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from 'components/common/Text';
import CustomImage from 'components/common/Image';
import constants from '@constants';
import {useTheme} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import actions from 'store/actions';
import DropDownHolder from 'services/DropDownHolder';

export default ({item, t}) => {
    const {imageUrl, name} = item ?? {};
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const {colors} = useTheme();
    const [firstRender, setFirstRender] = useState(true);
    const itemsFromCart = useSelector((state) => state.cart.shoppingCartItems);
    const currentItem = itemsFromCart.find((cartItem) => cartItem.id === item.id);

    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const useStockInApp = user?.useStockOnApp;

    const isArticleAvailable = () => {
        if (!user?.useStockOnApp) return true;

        return item?.stock;
    };

    const changeQuantity = (newQuantity) => {
        if (newQuantity > quantity) {
            if (useStockInApp) {
                if (item?.stock > quantity) {
                    setQuantity(newQuantity);
                    addItemToCart(newQuantity);
                } else {
                    DropDownHolder.dropDown.alertWithType('error', '', t('supply.noStock'));
                    return;
                }
            } else {
                setQuantity(newQuantity);
                addItemToCart(newQuantity);
            }
        } else {
            if (newQuantity > 0) {
                setQuantity(newQuantity);
                editItemInCart(newQuantity);
            } else {
                if (addedToCart) removeItemFromCart();
                setQuantity(0);
            }
        }
    };

    const addItemToCart = (newQuantity) => {
        addedToCart
            ? dispatch(actions.editItemInCart(item, newQuantity))
            : dispatch(actions.addItemToCart({item, quantity: newQuantity}));
    };

    const removeItemFromCart = () => {
        dispatch(actions.removeItemFromCart(item));
    };

    const editItemInCart = (newQuantity) => {
        dispatch(actions.editItemInCart(item, newQuantity));
    };

    useEffect(() => {
        if (currentItem) {
            setQuantity(currentItem?.quantity);
            setAddedToCart(true);
        } else {
            setAddedToCart(false);
            setQuantity(0);
        }
    }, [currentItem, itemsFromCart]);

    return (
        <View
            style={{
                height: 60,
                width: '100%',
                flexDirection: 'row',
                marginBottom: 20,
            }}>
            {imageUrl && (
                <CustomImage
                    style={{
                        height: '100%',
                        width: 60,
                        marginRight: 10,
                        borderRadius: 8,
                    }}
                    uri={imageUrl}
                />
            )}
            <View
                style={{
                    justifyContent: 'space-between',
                }}>
                <Text
                    style={{
                        marginRight: 80,
                    }}
                    type="bold"
                    numberOfLines={1}>
                    {name}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                marginTop: 4,
                                textDecorationLine: item?.discountedPrice ? 'line-through' : 'none',
                                marginRight: 10,
                            }}
                            type={!item?.discountedPrice ? 'small14SemiBold' : 'smallMedium'}
                            color={!item?.discountedPrice ? colors.primary : 'gray'}>
                            {item?.price.toFixed(2).replace('.', ',')}
                            {constants.currency}
                        </Text>
                        {item?.discountedPrice ? (
                            <Text
                                style={{marginTop: 4}}
                                type={'small14SemiBold'}
                                color={colors.primary}>
                                {item?.discountedPrice.toFixed(2).replace('.', ',')}
                                {constants.currency}
                            </Text>
                        ) : null}
                    </View>
                </View>
            </View>
            <View
                style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    onPress={() => changeQuantity(quantity - 1)}
                    style={{
                        width: 35,
                        height: 35,
                        backgroundColor: '#eeeeee',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <AntDesign name="minus" size={20} />
                </TouchableOpacity>
                <Text
                    style={{
                        width: 40,
                        fontSize: 18,
                        textAlign: 'center',
                    }}
                    type="bold">
                    {quantity}
                </Text>
                <TouchableOpacity
                    onPress={() => changeQuantity(quantity + 1)}
                    style={{
                        width: 35,
                        height: 35,
                        backgroundColor: '#eeeeee',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <AntDesign name="plus" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
