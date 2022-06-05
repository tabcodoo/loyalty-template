import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, PermissionsAndroid, Alert, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from 'translation/context';
import DropDownHolder from 'services/DropDownHolder';
import Toast from 'react-native-simple-toast';

import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob';

import Documents from 'components/LoggedInStack/User/Documents';
// Toast.showWithGravity('Dokument je preuzet', Toast.SHORT, Toast.BOTTOM)
const DocumentsContainer = (props: any) => {
    let user = useSelector((state) => state.user);
    // let [x, setx] = useState(null);
    // const dispatch = useDispatch();
    let {t} = useContext(LocalizationContext);
    // DropDownHolder.dropDown.alertWithType(
    //   'success',
    //   '',
    //   t('editActivity.successfullyUpdated'),
    // );

    let actualDownload = async (name = '', downloadUrl = '') => {
        const {dirs} = RNFetchBlob.fs;
        const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
        let extension = downloadUrl.split('.').pop();
        let fileName = name
            ? name.replace(' ', '_') + '.' + extension
            : downloadUrl.split('/').pop();
        const configfb = {
            fileCache: false,
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: fileName,
            path: `${dirToSave}/${fileName}`,
        };

        const configOptions = Platform.select({
            ios: {
                fileCache: configfb.fileCache,
                title: configfb.title,
                path: configfb.path,
                appendExt: extension,
            },
            android: {
                addAndroidDownloads: configfb,
            },
        });
        // console.tron.log('The file saved to 23233', configfb, dirs);

        RNFetchBlob.config(configOptions)
            .fetch('GET', `${downloadUrl}`)
            .then((res) => {
                FileViewer.open(res.path());

                // if (Platform.OS === 'ios') {
                //     // RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
                //     // RNFetchBlob.ios.previewDocument(res.data);
                // }
                // // setisdownloaded(false);
                // if (Platform.OS == 'android') {
                //     // showSnackbar('File downloaded');
                //     Toast.showWithGravity('Dokument je preuzet', Toast.SHORT, Toast.BOTTOM);
                // }
                // console.tron.log('The file saved to ', res);
            })
            .catch((e) => {
                // setisdownloaded(true);
                // showSnackbar(e.message);
                // console.log('The file saved to ERROR', e.message);
            });
    };

    let downloadDocument = async (name: string, url: string) => {
        try {
            if (Platform.OS == 'ios') {
                actualDownload(name, url);
            } else {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    actualDownload(name, url);
                } else {
                    Toast.showWithGravity(
                        t('documents.permissionsNeeded'),
                        Toast.SHORT,
                        Toast.BOTTOM,
                    );
                    //   Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
                }
            }
        } catch (err) {
            console.log('err', err);
        }
    };

    return <Documents {...props} {...{t, user, downloadDocument}} />;
};

export default DocumentsContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
