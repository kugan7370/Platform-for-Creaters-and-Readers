import { View, Text, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../Firebase';
import { useNavigation, useRoute } from '@react-navigation/native';


const DownloadScreen = () => {

    const [files, setFile] = useState()

    const route = useRoute();
    const navigation = useNavigation();
    const [SelectedFile, setSelectedFile] = useState()

    useEffect(() => {
        let { FileData } = route.params;
        setSelectedFile(FileData);
    }, [])





    return (
        <>

            {SelectedFile ? <WebView style={{ flex: 1 }} source={{ uri: SelectedFile.file }}
            /> : null}

        </>







    );
};

export default DownloadScreen;
