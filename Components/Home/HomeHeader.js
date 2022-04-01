import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { SignInUser } from '../../Redux/Reducers/UserSlicer';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../Color';







export default function HomeHeader() {
    const user = useSelector(SignInUser);
    const navigation = useNavigation();
    return (


        <View style={{ backgroundColor: color.primaryColor, height: 80, paddingTop: 20 }}>
            {/* <StatusBar backgroundColor={color.primaryColor} /> */}
            <View style={style.headContainer}>

                {/* {user && <TouchableOpacity >
                    <Text style={{ marginLeft: 10, color: 'white', fontSize: 18, fontWeight: '800' }}> Hello! {user.username}</Text>
                </TouchableOpacity>} */}
                {/* <TouchableOpacity >
                    <Ionicons name="menu" size={30} color="white" />
                </TouchableOpacity> */}

                <TouchableOpacity style={style.imageContainer} >
                    {user && <Image style={style.image} source={{ uri: user.pro_pic }} />}
                </TouchableOpacity>

                <Text style={style.headText}>Home</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Chat')} >
                    <Ionicons name="chatbubbles-outline" size={24} color="white" />
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: 'red', position: 'absolute', right: 0, top: 2 }}>

                    </View>
                </TouchableOpacity>

            </View>
            {/* <View >

                    {user && <Text style={{ fontSize: 15, fontWeight: 'bold', marginHorizontal: 20 }}>{user.username}</Text>}
                </View> */}


        </View >

    );
}

const style = StyleSheet.create({
    container: {
        // marginHorizontal: 15,
    },
    headContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20

    },
    headText: {
        fontSize: 20,
        fontWeight: '700',
        color: color.secondaryColor,

    },
    imageContainer: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        height: '100%',
        width: '100%',
        borderRadius: 15,
        resizeMode: 'cover'
    }
})