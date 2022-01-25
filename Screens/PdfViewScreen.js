import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import PDFReader from 'rn-pdf-reader-js'





export default function PdfViewScreen() {

    return (

        <PDFReader style={{ flex: 1 }}
            source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/mini-project-1-8951f.appspot.com/o/File%2Fblog%2F1642794928486?alt=media&token=827d554c-7477-407a-9e6b-4ba05b1fc76a'
            }}
        />

    );

}

