import { View, Text, ScrollView, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
const image = 'https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/08/Profile-Photo-Wallpaper.jpg'
export default function ChatUsers() {
    return (
        <View >
            <SafeAreaView style={{ marginHorizontal: 20, }}>
                <ChatHeader />
            </SafeAreaView>

            <View style={{ backgroundColor: '#ffff', height: "80%", borderTopLeftRadius: 20, borderTopRightRadius: 20, marginHorizontal: 10 }}>

                {/* active user */}
                <View style={{ marginVertical: 20, paddingHorizontal: 20, borderRadius: 100 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        <ActiveUser />
                        <ActiveUser />
                        <ActiveUser />
                        <ActiveUser />
                        <ActiveUser />
                        <ActiveUser />
                    </ScrollView>
                </View>
                {/* {UserMessage} */}
                <View >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <UserMessage />
                        <UserMessage />
                        <UserMessage />
                        <UserMessage />
                        <UserMessage />
                        <UserMessage />
                        <UserMessage />
                        <UserMessage />
                        <UserMessage />
                        <UserMessage />
                        <UserMessage />
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}


const ChatHeader = () => (
    <View >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Messages</Text>

        <View>
            <View style={style.searchContainer}>
                <Ionicons name="search" size={24} color="black" />
                <TextInput style={style.textInput} placeholder='Search Users'></TextInput>
            </View>
        </View>

    </View>
)



const ActiveUser = () => (
    <View>
        <TouchableOpacity style={{ height: 50, width: 50, borderRadius: 25, marginRight: 22 }}>
            <Image style={{ height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 25 }} source={{ uri: image }} />
        </TouchableOpacity>
        <Text style={{ color: 'gray' }}>kugan</Text>
    </View>
)



const UserMessage = () => (
    <View>
        <Divider width={0.5} color="gray" />
        <TouchableOpacity style={{ marginTop: 15, marginHorizontal: 20, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <View style={{ height: 50, width: 50, borderRadius: 25, marginRight: 20 }}>
                        <Image style={{ height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 25 }} source={{ uri: image }} />
                    </View>

                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Kugan</Text>
                        <Text style={{ color: 'gray', fontSize: 13, letterSpacing: 1 }}>hi! h r u</Text>
                    </View>
                </View>

                <View>
                    <Text style={{ color: 'gray', }}>12.34 PM</Text>
                </View>
            </View>
            <View style={{ marginTop: 10 }}>

            </View>

        </TouchableOpacity>
    </View>
)



const style = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        // borderWidth: 1,
        height: 50,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#fcfcfc',
        paddingHorizontal: 10,
        borderColor: 'gray',
        marginBottom: 20,
        marginTop: 30
    },
    textInput: {

        padding: 5,
        flex: 1
    }
})