import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../Firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Divider } from 'react-native-elements';
const image = 'https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/08/Profile-Photo-Wallpaper.jpg'
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native';


export default function ({ usersID }) {
    const navigation = useNavigation();
    const [chatUsers, setchatUsers] = useState()
    const { uid } = usersID;

    useEffect(() => {
        try {
            const user1 = auth.currentUser.uid
            const user2 = uid
            let id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

            const messref = collection(db, 'messages', id, 'chat');
            const q = query(messref, orderBy('createAt', 'desc'))

            onSnapshot(q, (snapshot) => {
                if (snapshot) {
                    setchatUsers(snapshot.docs[0]?.data())
                    // console.log(snapshot.docs[0]?.data());
                }
            })



        } catch (error) {
            let chatUsers = [];
            setchatUsers(chatUsers);
        }

    }, [usersID])

    return (
        <View>
            {/* <Divider width={0.5} color="gray" /> */}
            <TouchableOpacity onPress={() => navigation.navigate('ChatMessages', { BlogUserDetail: usersID })} style={{ marginTop: 15, marginHorizontal: 20, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        {usersID && <View style={{ height: 50, width: 50, borderRadius: 25, marginRight: 20 }}>
                            <Image style={{ height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 25 }} source={{ uri: usersID.pro_pic }} />
                            <View style={{ backgroundColor: usersID.isOnline ? 'green' : 'red', height: 8, width: 8, borderRadius: 5, position: 'absolute', top: 5, right: 0 }} />
                        </View>}

                        <View>
                            {usersID && <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{usersID.username}</Text>}
                            {chatUsers ? <Text style={{ color: 'gray', fontSize: 13, letterSpacing: 1 }}>{chatUsers?.text}</Text> : <Text style={{ color: 'gray', fontSize: 13, letterSpacing: 1 }}>Say hi!</Text>}
                        </View>
                    </View>

                    <View>
                        {chatUsers?.createAt && <Text style={{ color: 'gray', fontSize: 12 }}>{Moment(chatUsers?.createAt?.toDate()).fromNow()}</Text>}
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>

                </View>

            </TouchableOpacity>
        </View>
    )
}
