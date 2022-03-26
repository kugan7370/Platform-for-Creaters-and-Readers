import { View, Text, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Headers from '../Components/Common/Headers'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../Firebase'
import Moment from 'moment';
import { color } from '../Color'
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { SignInUser } from '../Redux/Reducers/UserSlicer'
import * as NavigationBar from 'expo-navigation-bar';
NavigationBar.getBackgroundColorAsync();
const CommentScreen = () => {

    const route = useRoute();
    let BlogId = route.params.SelectedBlogId;
    const user = useSelector(SignInUser);
    const [getComments, setgetComments] = useState()
    const [addComment, setaddComment] = useState('')

    useEffect(() => {
        let isMounted = true
        try {
            const ref = collection(db, 'blogs', BlogId, "Comments")
            const q = query(ref, orderBy("createAt", 'desc'))
            const snapdata = onSnapshot(q, (snapshot) => {
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


    const AddComments = async () => {
        await addDoc(collection(db, 'blogs', BlogId, 'Comments'), {
            username: user.username,
            userPro_Pic: user.pro_pic,
            comment: addComment,
            createAt: serverTimestamp(),
        })
        setaddComment('');
    }




    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={color.primaryColor} barStyle='light-content' />

            <Headers headerName="Comments" />

            <ScrollView style={{ marginBottom: 80 }}>
                {getComments && getComments.map((getComment) => (
                    <View style={{ paddingHorizontal: 20, backgroundColor: '#f4fcf9', marginBottom: 2, paddingVertical: 20, borderRadius: 10 }} key={getComment.id}>
                        <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
                            <Image source={{ uri: getComment.data().userPro_Pic }} style={{ height: 50, width: 50, borderRadius: 15 }} />
                            <View style={{ marginLeft: 10 }}>
                                <Text>{getComment.data().username}</Text>
                                {getComment.data().createAt && <Text style={[{ color: 'gray', fontSize: 12, marginLeft: 0 }]}>{Moment(getComment.data().createAt.toDate()).fromNow()}</Text>}
                            </View>

                        </View>
                        <Text>{getComment.data().comment}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={style.tabContainer} >
                <View style={{
                    flexDirection: 'row', backgroundColor: color.secondaryColor, paddingHorizontal: 20, paddingVertical: 20, borderRadius: 10
                }}>
                    <TextInput style={{ flex: 1 }} multiline={true} placeholder='Add your comments...' value={addComment} onChangeText={(text) => setaddComment(text)} />
                    <TouchableOpacity onPress={AddComments} style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primaryColor }} >
                        <Ionicons name="send" size={20} color={color.secondaryColor} />
                    </TouchableOpacity>


                </View>
            </View>

        </SafeAreaView>
    )
}

export default CommentScreen


const style = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row', justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        backgroundColor: 'white',
        height: 80,
        alignItems: 'center',
        zIndex: 999,

    },
})