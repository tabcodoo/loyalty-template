import * as React from 'react';
import {TouchableOpacity, View, StyleSheet, ScrollView, Linking, Platform} from 'react-native';
import {useTheme, Divider} from 'react-native-paper';

import Text from 'components/common/Text';
import Header from 'components/common/LoggedInHeader';
import DownloadFile from 'components/common/icons/DownloadFile';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';
import FileViewer from 'react-native-file-viewer';

const Documents = (props: any) => {
    const {t, user, downloadDocument} = props;
    const {colors} = useTheme();

    let DocumentItem = ({name = '', downloadUrl = ''}) => (
        <TouchableOpacity onPress={() => downloadDocument(name, downloadUrl)}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 16,
                }}>
                <Text>{name}</Text>
                <DownloadFile size="16" />
            </View>
            <Divider />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header title={t('documents.title')} />
            <ScrollView style={{paddingHorizontal: 16}}>
                {user?.mobileAppSettings?.downloadLinks.map((item, index) => (
                    <DocumentItem key={index.toString() + item.name} {...item} />
                ))}

                {/* <DocumentItem label="aa" />
                <DocumentItem label="aa" /> */}
            </ScrollView>
        </View>
    );
};

export default Documents;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
