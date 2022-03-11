import { View, Text, Image } from 'react-native'
import Moment from 'moment';
import React from 'react'
import { auth } from '../../Firebase'

const ChatGetMessages = ({ chats, BlogUser }) => {

    return (
        <View  >
            {chats && chats.from === auth.currentUser.uid ? (
                <View style={{ alignItems: 'flex-end', marginHorizontal: 20 }}>

                    <View style={{ marginBottom: 20, backgroundColor: '#67398f', borderBottomLeftRadius: 10, borderTopLeftRadius: 5, borderBottomRightRadius: 5 }}>
                        <Text style={{ color: 'white', paddingVertical: 10, paddingHorizontal: 15 }}>{chats.text}</Text>
                        {/* {chats.createAt && <Text style={{ color: 'white', fontSize: 8, letterSpacing: 1, marginTop: 5 }}>{Moment(chats.createAt.toDate()).fromNow()}</Text>} */}
                    </View>
                </View>) : (

                <View style={{ alignItems: 'flex-start', marginHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ height: 30, width: 30, borderRadius: 15, marginRight: 10 }} source={{ uri: BlogUser?.pro_pic }} />
                        <View style={{ marginBottom: 20, backgroundColor: '#cc4e6d', borderBottomLeftRadius: 10, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
                            <Text style={{ color: 'white', paddingVertical: 10, paddingHorizontal: 15 }}>{chats.text}</Text>
                            {/* {chats.createAt && <Text style={{ color: 'white', fontSize: 8, letterSpacing: 1, marginTop: 5 }}>{Moment(chats.createAt.toDate()).fromNow()}</Text>} */}
                        </View>
                    </View>

                </View>)}
        </View>

    )
}

export default ChatGetMessages