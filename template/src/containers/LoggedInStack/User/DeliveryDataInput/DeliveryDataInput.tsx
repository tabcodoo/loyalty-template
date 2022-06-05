import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import actions from 'store/actions';
import api from 'services/api';
import DeliveryDataInput from 'components/LoggedInStack/User/DeliveryDataInput';

const DeliveryDataInputContainer = (props: any) => {
    const {navigation} = props;
    const language = useSelector((state) => state?.user?.language);
    const deliveryData = useSelector((state) => state?.user?.deliveryData);
    const [name, setName] = useState(deliveryData?.name);
    const [address, setAddress] = useState(deliveryData?.address);
    const [phoneNumber, setPhoneNumber] = useState(deliveryData?.phoneNumber);
    const [zipCode, setZipCode] = useState(deliveryData?.zipCode);
    const [additionalInfo, setAdditionalInfo] = useState(deliveryData?.additionalInfo);
    const [errors, setErrors] = useState(null);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(deliveryData?.city);
    const [selectedCountry, setSelectedCountry] = useState(deliveryData?.country);
    const [isMainAddress, setIsMainAddress] = useState(deliveryData?.isMainAddress);

    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);

    const toggleIsMainAddress = () => {
        setIsMainAddress(!isMainAddress);
    };

    const saveDeliveryData = () => {
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

    useEffect(() => {
        (async () => {
            try {
                const {data} = await api.get('app/address-data/get-countries', language);
                const newData = data.payload.map((item) => {
                    return {id: item.id, name: item.encodedName};
                });
                setCountries(newData);
            } catch (e) {
                console.log('GET COUNTRY ERR', e);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                if (!selectedCountry) return;
                const {data} = await api.get(
                    `app/address-data/get-cities/${selectedCountry?.id}`,
                    language,
                );
                const newData = data.payload.map((item) => {
                    return {id: item.id, name: item.encodedName};
                });
                setCities(newData);
            } catch (e) {
                console.log('GET CITY ERR', e);
            }
        })();
    }, [selectedCountry]);

    return (
        <DeliveryDataInput
            {...props}
            {...{
                t,
                navigation,
                cities,
                name,
                address,
                setAddress,
                errors,
                setName,
                selectedCity,
                setSelectedCity,
                selectedCountry,
                setSelectedCountry,
                setErrors,
                saveDeliveryData,
                countries,
                phoneNumber,
                setPhoneNumber,
                zipCode,
                setZipCode,
                isMainAddress,
                toggleIsMainAddress,
                additionalInfo,
                setAdditionalInfo,
            }}
        />
    );
};

export default DeliveryDataInputContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
