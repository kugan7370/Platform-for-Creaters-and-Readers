import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import PDFReader from 'rn-pdf-reader-js'





export default function PdfViewScreen() {

    const route = useRoute();
    const navigation = useNavigation();
    const [SelectedFile, setSelectedFile] = useState()

    useEffect(() => {
        let { FileData } = route.params;
        setSelectedFile(FileData);
    }, [])

    return (

        <>
            {
                SelectedFile &&
                <PDFReader style={{ flex: 1 }}
                    source={{
                        uri: SelectedFile.file
                    }}
                />
            }
        </>

    );

}

