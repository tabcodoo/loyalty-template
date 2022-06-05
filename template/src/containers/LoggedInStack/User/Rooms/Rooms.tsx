import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import api from 'services/api';
import Rooms from 'components/LoggedInStack/User/Rooms';
import actions from 'store/actions';


const RoomsContainer = (props: any) => {
    const {navigation} = props ?? {};
    const dispatch = useDispatch();
    const {t} = useContext(LocalizationContext);

    const supply = useSelector((state) => state.supply);
    const currentOrder = useSelector((state) => state.orders.currentOrder);
    const user = useSelector((state) => state.user);
    const {language, selectedRoom, userRole} = user ?? {};
    const cart = useSelector((state) => state.cart);
    const {uniqueItemCount} = cart ?? {};
    const objects = useSelector((state) => state.supply.objects);

    const selectObject = (object) => {
        dispatch(actions.setSelectedObject(object));
        navigation.push('Supply');
    };

    const isWaiter = userRole.toLowerCase() === 'waiter';
    const isSalesman = userRole.toLowerCase() === 'salesman';

    const [searchTerm, setSearchTerm] = useState('')
    const [filteredObjects, setFilteredObjects] = useState(objects)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(actions.getObjects());
    }, []);

    useEffect(()=>{
        if(!objects.length) return;

        setFilteredObjects(objects)
        setIsLoading(false)
    },[objects])

    useEffect(()=>{
        if(!objects.length) return;
        const filter = objects.filter((item)=>item?.objectNumber.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
        setFilteredObjects(filter)
    },[searchTerm])

    return (
        <Rooms
            {...props}
            {...{
                t,
                navigation,
                user,
                uniqueItemCount,
                currentOrder,
                selectedRoom,
                objects,
                selectObject,
                isWaiter,
                isSalesman,
                searchTerm,
                setSearchTerm,
                filteredObjects,
                isLoading,
            }}
        />
    );
};

export default RoomsContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
