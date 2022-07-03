import React, {useState, useEffect, useContext, useRef, useMemo} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import actions from 'store/actions';
import DropDownHolder from 'services/DropDownHolder';

import Profile from 'components/LoggedInStack/User/Profile';
import LoginForm from 'components/LoggedInStack/User/LoginForm';
import ForgotPasswordForm from 'components/LoggedInStack/User/ForgotPasswordForm';
import RegisterForm from 'components/LoggedInStack/User/RegisterForm';

import Button from 'components/common/Button';
import api from 'services/api';
import BottomSheet, {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import QRCode from 'react-native-qrcode-svg';
import * as Animatable from 'react-native-animatable';
import {GoogleSignin} from '@react-native-community/google-signin';

let {width} = Dimensions.get('window');
const ProfileContainer = (props: any) => {
    let user = useSelector((state) => state.user);
    let isGuest = useSelector((state) => state.user?.role?.name === 'admin');
    let [opened, setOpened] = useState(false);
    const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    const userIdSheetRef = useRef<BottomSheet>(null);
    const userIdSnapPoints = useMemo(() => [0, '40%'], []);
    let openUserIdSheet = () => {
        dispatch(actions.setGlobalBottomSheet());
        // setOpened(true);
        // userIdSheetRef.current.snapTo(1);
    };
    let closeUserIdSheet = () => {
        dispatch(actions.resetGlobalBottomSheet());
        // setOpened(false);
        // userIdSheetRef.current.close();
        // activateScanner();
    };
    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );

    let changePassword = (data) => {
        dispatch(actions.changePassword(data, (key) => t(key)));
    };

    let deleteUser = async () => {
        try {
            GoogleSignin.signOut();
            await api.get('identity/delete-user-account');
            api.setToken('');
            dispatch(actions.reset());
        } catch (error) {}
    };

    return (
        <View style={{flex: 1}}>
            <Profile {...props} {...{t, user, openUserIdSheet, changePassword}} />
            <Button onPress={deleteUser} label={t('profile.delete')} mode="contained" />
            {opened && (
                <Animatable.View
                    animation={'fadeIn'}
                    duration={500}
                    style={{
                        position: 'absolute',
                        // bottom: height * 0.645,
                        bottom: 0,
                        top: 0,
                        // height: opened ? height : 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                    // transition={['top']}
                >
                    <TouchableOpacity style={{flex: 1}} onPress={closeUserIdSheet} />
                </Animatable.View>
            )}

            <BottomSheet
                ref={userIdSheetRef}
                snapPoints={userIdSnapPoints}
                onChange={(index) => {
                    if (!index) {
                        // setEnterManually(false);
                        // setCouponName('');
                        closeUserIdSheet();
                        // activateScanner();
                    }
                }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <QRCode value={`user ${user.uid}`} size={width / 2.5} />
                </View>
            </BottomSheet>
        </View>
    );
};

export default ProfileContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
