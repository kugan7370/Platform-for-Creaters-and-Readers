import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { collection, collectionGroup, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
// import * as MediaLibrary from 'expo-media-library';
// import * as FileSystem from 'expo-file-system';
// import * as Permissions from 'expo-permissions';
import { WebView } from 'react-native-webview';
import PDFReader from 'rn-pdf-reader-js';
import Constants from 'expo-constants';

export default function DetailBottom() {

    const [file, setFile] = useState('');

    const viewpdf = () => {
        return (
            <WebView
                style={{ flex: 1 }}
                source={{ uri: 'https://expo.dev' }}
            />
        )
    }



    // {get uri from firebase}
    const getpdfUri = async () => {
        const ref = collection(db, 'blogs')
        const q = query(ref, where('uid', '==', auth.currentUser.uid))
        onSnapshot(q, (snapshot) => {
            snapshot.docs.map((doc) => {

                setFile(doc.data().file);

            })

        })

    }

    useEffect(() => {
        getpdfUri();
    }, [])

    return (
        <View style={style.container}>
            <View style={style.bottunContainer}>
                <Ionicons name="book-outline" size={24} color="white" />
                <Text style={{ color: 'white', marginLeft: 15 }}>Read Now</Text>
            </View>
            <View style={style.bottunContainer}>
                <Ionicons name="md-download-outline" size={24} color="white" />
                <TouchableOpacity onPress={viewpdf}>
                    <Text style={{ color: 'white', marginLeft: 15 }}>Download Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row', justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        backgroundColor: '#fafafa',
        height: 80,
        alignItems: 'center',
        zIndex: 999
    },
    bottunContainer: {
        backgroundColor: '#0e0047', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 10,
        flexDirection: 'row', alignItems: 'center'
    }
})