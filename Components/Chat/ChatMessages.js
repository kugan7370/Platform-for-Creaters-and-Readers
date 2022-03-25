import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, FlatList, KeyboardAvoidingView, Platform, Keyboard, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth, db } from '../../Firebase';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import ChatGetMessages from './ChatGetMessages';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { color } from '../../Color';

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
            const q = query(messref, orderBy('createAt', 'desc'))

            onSnapshot(q, (snapshot) => {
                let chats = [];
                snapshot.docs.map((doc) => {
                    chats.push({ ...doc.data(), id: doc.id })
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
        <SafeAreaView style={{ flex: 1 }}>
            {/* <StatusBar backgroundColor={color.primaryColor} /> */}
            <View style={{ backgroundColor: color.primaryColor, /*height: 80,*/ }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center', paddingVertical: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color={color.secondaryColor} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {BlogUser && <Image style={{ height: 40, width: 40, borderRadius: 15 }} source={{ uri: BlogUser.UserPic || BlogUser.pro_pic }} />}
                        {BlogUser && <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold', color: color.secondaryColor }}>{BlogUser.username}</Text>}
                    </View>

                    <Text></Text>
                </View>

            </View>



            {/* {messages} */}

            {/* <ScrollView style={{ marginBottom: 70 }}>
                {chats && chats.map((chat, index) => (
                    <ChatGetMessages key={index} chats={chat} />
                ))}
            </ScrollView> */}


            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={10}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    {<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        {(chats && BlogUser) &&
                            <FlatList
                                inverted={-1}
                                data={chats}
                                keyExtractor={(chats) => chats.id}
                                renderItem={({ item }) => <ChatGetMessages BlogUser={BlogUser} key={item.id} chats={item} />}

                            />
                        }
                    </TouchableWithoutFeedback>}
                </View>

                {/* {bottom} */}
                <View  >
                    <View style={{
                        flexDirection: 'row', backgroundColor: color.secondaryColor, paddingHorizontal: 20, paddingVertical: 20, borderRadius: 10
                    }}>
                        <TextInput style={{ flex: 1 }} multiline={true} placeholder='Type a message...' value={text} onChangeText={(text) => setText(text)} />
                        {BlogUser && <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primaryColor }} onPress={() => handleSubmit(BlogUser.uid)}>
                            <Ionicons name="send" size={20} color={color.secondaryColor} />
                        </TouchableOpacity>}


                    </View>

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatMessages