import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import PDFReader from 'rn-pdf-reader-js'





export default function PdfViewScreen() {

    return (

        <PDFReader style={{ flex: 1 }}
            source={{
                uri: 'http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf'
            }}
        />

    );

}

