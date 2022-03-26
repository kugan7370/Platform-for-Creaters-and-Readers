import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../Color';
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase';

export default function DetailHeader({ SelectedBlog }) {
    const navigation = useNavigation();
    const [ThisPost, setThisPost] = useState();

    const handleBookMark = async () => {
        const bookMarkStatus = !ThisPost.book_mark_by.includes(auth.currentUser.email);

        await updateDoc(doc(db, 'blogs', SelectedBlog.id), {
            book_mark_by: bookMarkStatus ? arrayUnion(
                auth.currentUser.email
            ) : arrayRemove(
                auth.currentUser.email
            )

        })


    }

    // for Bookmarks post live update
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


    return (
        <View>
            {/* <StatusBar backgroundColor={'white'} barStyle='dark-content' /> */}
            <View style={style.container}>

                <View style={style.headContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', borderColor: '#ebebeb', borderWidth: 1, borderRadius: 15 }}>
                            {/* <Ionicons name="ios-arrow-back" size={20} color="black" /> */}
                            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
                        </View>

                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 1 }}>Details</Text>



                    <TouchableOpacity onPress={handleBookMark} style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', borderColor: '#ebebeb', borderWidth: 1, borderRadius: 15 }}>
                        {ThisPost && <Ionicons name={ThisPost.book_mark_by.includes(auth.currentUser.email) ? "bookmarks" : "bookmarks-outline"} size={15} color="black" />}
                    </TouchableOpacity>



                </View>

            </View >
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        // marginHorizontal: 15,
        backgroundColor: 'white',
        paddingVertical: 10,
        marginBottom: 10


    },
    headContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,


    },
    headText: {
        fontSize: 18,
        fontWeight: '700'
    },
    imageContainer: {
        height: 30,
        width: 30,
        overflow: 'hidden'

    },

    image: {
        height: '100%',
        width: '100%',
        borderRadius: 30,
        resizeMode: 'cover'

    }
})