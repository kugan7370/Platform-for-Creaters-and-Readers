import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth, db } from '../../Firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import ChatGetMessages from './ChatGetMessages';

const ChatMessages = () => {
    const [text, setText] = useState("");
    const [chats, setchats] = useState()
    const route = useRoute();
    const navigation = useNavigation();
    const [BlogUser, setBlogUser] = useState();

    useEffect(() => {

        try {

            let { BlogUserDetail } = route.params;
            setBlogUser(BlogUserDetail);
            const user1 = auth.currentUser.uid
            const user2 = BlogUserDetail.uid
            const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;


            const messref = collection(db, 'messages', id, 'chat');
            const q = query(messref, orderBy('createAt', 'asc'))

            onSnapshot(q, (snapshot) => {
                let chats = [];
                snapshot.docs.map((doc) => {
                    chats.push(doc.data())
                })
                setchats(chats)
            })

        } catch (error) {
            let chats = [];
            setchats(chats);
        }

    }, [])


    // useEffect(() => {


    // }, [db])









    const handleSubmit = async (userID) => {
        const user1 = auth.currentUser.uid
        const user2 = userID
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

        await addDoc(collection(db, 'messages', id, 'chat'), {
            text,
            from: user1,
            to: user2,
            createAt: serverTimestamp(),
        })
        setText('');
    };




    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ backgroundColor: '#f7f7f7', height: 80 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {BlogUser && <Image style={{ height: 30, width: 30, borderRadius: 15 }} source={{ uri: BlogUser.UserPic }} />}
                        {BlogUser && <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: 'bold' }}>{BlogUser.username}</Text>}
                    </View>

                    <Text></Text>
                </View>

            </SafeAreaView>
            {/* {messages} */}

            <ScrollView style={{ marginBottom: 70 }}>
                {chats && chats.map((chat, index) => (
                    <ChatGetMessages key={index} chats={chat} />
                ))}
            </ScrollView>




            {/* {bottom} */}
            <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, backgroundColor: '#f7f7f7' }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 20, paddingVertical: 20 }}>
                    <TextInput style={{ flex: 1 }} multiline={true} placeholder='Message' value={text} onChangeText={(text) => setText(text)} />
                    {BlogUser && <TouchableOpacity onPress={() => handleSubmit(BlogUser.uid)}>
                        <Ionicons name="send" size={24} color="black" />
                    </TouchableOpacity>}


                </View>

            </View>
        </View>
    )
}

export default ChatMessages