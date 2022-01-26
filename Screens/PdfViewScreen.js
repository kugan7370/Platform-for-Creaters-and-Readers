import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import PDFReader from 'rn-pdf-reader-js'





export default function PdfViewScreen() {

    return (

        <PDFReader style={{ flex: 1 }}
            source={{
                uri: 'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-with-images.pdf'
            }}
        />

    );

}

