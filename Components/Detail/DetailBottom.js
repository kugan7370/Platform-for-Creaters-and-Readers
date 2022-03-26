import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Touchable, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native'
import { Ionicons, AntDesign, FontAwesome, Fontisto, Feather } from '@expo/vector-icons';
import { arrayRemove, arrayUnion, collection, collectionGroup, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
// import * as MediaLibrary from 'expo-media-library';
// import * as FileSystem from 'expo-file-system';
// import * as Permissions from 'expo-permissions';
// import { WebView } from 'react-native-webview';
// import PDFReader from 'rn-pdf-reader-js';
// import Constants from 'expo-constants';
// import Pdf from 'react-native-pdf';
// import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../Color';





export default function DetailBottom({ SelectedBlog }) {
    const navigation = useNavigation();
    const [ThisPost, setThisPost] = useState();
    const [getComments, setgetComments] = useState()

    const Handlelike = async () => {
        const likestatus = !ThisPost.likes_by_users.includes(auth.currentUser.email);
        const ref = doc(db, 'blogs', SelectedBlog.id)
        await updateDoc(ref, {
            likes_by_users: likestatus ? arrayUnion(auth.currentUser.email) : arrayRemove(auth.currentUser.email)
        })
    }

    // for likes for live update
    useEffect(() => {
        let isMounted = true
        try {
            const ref = doc(db, 'blogs', SelectedBlog.id)

            const snapdata = onSnapshot(ref, (doc) => {
                if (isMounted) {
                    setThisPost(doc.data())
                }
            })
        } catch (error) {

            let ThisPost = [];
            setThisPost(ThisPost)

        }

        return () => { isMounted = false }
    }, [db])

    // get comments
    useEffect(() => {
        let isMounted = true
        try {
            const ref = collection(db, 'blogs', SelectedBlog.id, "Comments")

            const snapdata = onSnapshot(ref, (snapshot) => {
                if (isMounted) {
                    setgetComments(snapshot.docs)
                }
            })
        } catch (error) {

            let getComments = [];
            setgetComments(getComments)

        }

        return () => { isMounted = false }
    }, [db])


    return (
        <View style={style.container}>

            <TouchableOpacity onPress={() => navigation.navigate('PdfView', { FileData: SelectedBlog })} style={style.bottunContainer}>
                <Ionicons name="book-outline" size={20} color="white" />
                <Text style={{ color: 'white', marginTop: 10 }}>Read</Text>
            </TouchableOpacity>
            <View style={style.bottunContainer}>

                <TouchableOpacity style={style.bottunContainer} onPress={() => navigation.navigate('Download', { FileData: SelectedBlog })}>
                    {/* <Ionicons name="md-download-outline" size={28} color="white" /> */}
                    <Feather name="download" size={24} color="white" />
                    <Text style={{ color: 'white', marginTop: 10 }}>Download</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={Handlelike} style={style.bottunContainer} >
                <View style={{ flexDirection: 'row' }} >
                    {ThisPost && <AntDesign name={ThisPost.likes_by_users.includes(auth.currentUser.email) ? "heart" : "hearto"} size={20} color="white" />}
                    {ThisPost && <Text style={{ marginLeft: 5, color: 'white' }}>{ThisPost.likes_by_users.length}</Text>}
                </View>
                <Text style={{ color: 'white', marginTop: 10 }}>Likes</Text>



            </TouchableOpacity>

            <TouchableOpacity style={style.bottunContainer} onPress={() => navigation.navigate('Comment', { SelectedBlogId: SelectedBlog.id })}>
                <View style={{ flexDirection: 'row' }}>
                    <Fontisto name="comment" size={20} color="white" />
                    {getComments && <Text style={{ marginLeft: 10, color: 'white' }}>{getComments.length}</Text>}
                </View>
                <Text style={{ color: 'white', marginTop: 10 }}>Comments</Text>
            </TouchableOpacity>
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
        backgroundColor: color.primaryColor,
        height: 80,
        alignItems: 'center',
        zIndex: 999,

    },
    bottunContainer: {

        alignItems: 'center',
        justifyContent: 'center'

    }
})