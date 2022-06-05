import React, {useState, useEffect, useContext, useRef, useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity, BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';

import GlobalBottomSheet from 'components/LoggedInStack/User/GlobalBottomSheet';
import * as Animatable from 'react-native-animatable';
import actions from 'store/actions';
import BottomSheet from '@gorhom/bottom-sheet-old';

const GlobalBottomSheetContainer = (props: any) => {
    // let x = useSelector((state) => state.x);
    let [backHandler, setBackHandler] = useState(null);
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    let globalBottomSheet = useSelector((state) => state.globalBottomSheet);

    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );

    //BottomSheet
    const sheetRef = useRef<BottomSheet>(null);
    // console.tron.log('GlobalBottomSheetContainer', globalBottomSheet);
    const sheetSnapPoints = useMemo(() => globalBottomSheet.snapPoints, [globalBottomSheet]);
    let openUserIdSheet = () => {
        // setOpened(true);
        if (!!sheetRef.current) sheetRef.current.expand();
    };
    let closeUserIdSheet = () => {
        // setOpened(false);
        if (!!sheetRef.current) sheetRef.current.close();
        // activateScanner();
    };

    let backBtnHandler = (opened = false) => {
        closeUserIdSheet();
        // closeModalState();
        return opened;
    };

    useEffect(() => {
        let backHandlerLocal = null;
        if (globalBottomSheet.opened) {
            if (backHandler) backHandler.remove();
            backHandlerLocal = BackHandler.addEventListener('hardwareBackPress', () =>
                backBtnHandler(globalBottomSheet.opened),
            );
            setBackHandler(backHandlerLocal);
            openUserIdSheet();
        } else {
            if (backHandler) backHandler.remove();
            backHandlerLocal = BackHandler.addEventListener('hardwareBackPress', () =>
                backBtnHandler(globalBottomSheet.opened),
            );
            setBackHandler(backHandlerLocal);
            closeUserIdSheet();
        }

        return () => backHandler && backHandler.remove();
    }, [globalBottomSheet]);

    // useEffect(() => {
    //     let backHandler = null;
    //     if (bottomModal.opened) {
    //         // console.tron.log('BottomModal true', bottomModal);
    //         if (backHandler) backHandler.remove();
    //         backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
    //             backBtnHandler(bottomModal.opened),
    //         );
    //         openModal();
    //     } else {
    //         if (backHandler) backHandler.remove();
    //         backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
    //             backBtnHandler(bottomModal.opened),
    //         );
    //         setTimeout(() => {
    //             closeModal();
    //         }, 100);
    //     }
    //     return () => backHandler && backHandler.remove();
    // }, [bottomModal]);

    return (
        <>
            {globalBottomSheet.opened && (
                <Animatable.View animation={'fadeIn'} duration={500} style={styles.backDrop}>
                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={() => dispatch(actions.resetGlobalBottomSheet())}
                    />
                </Animatable.View>
            )}

            <BottomSheet
                ref={sheetRef}
                snapPoints={sheetSnapPoints}
                onChange={(index) => {
                    if (!index) {
                        dispatch(actions.resetGlobalBottomSheet());
                    }
                }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                    }}>
                    {globalBottomSheet?.body && globalBottomSheet?.body()}
                </View>
            </BottomSheet>
        </>
    );
};

export default GlobalBottomSheetContainer;

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
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});
