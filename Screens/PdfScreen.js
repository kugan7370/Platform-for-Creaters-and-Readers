import { View, Text, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../Firebase';


const PdfScreen = () => {

    const [files, setFile] = useState()


    // {get uri from firebase}
    const getpdfUri = async () => {
        const ref = collection(db, 'blogs')
        const q = query(ref, where('uid', '==', auth.currentUser.uid))
        onSnapshot(q, (snapshot) => {
            snapshot.docs.map((doc) => {
                console.log(doc.data().file);
                setFile(doc.data().file);

            })

        })

    }

    useEffect(() => {
        getpdfUri();
    }, [])



    return (
        <>

            {files ? <WebView style={{ flex: 1 }} source={{ uri: files }}
            /> : null}

        </>







    );
};

export default PdfScreen;
