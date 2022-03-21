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


        <SafeAreaView style={{ backgroundColor: color.primaryColor, height: 80, paddingTop: 20 }}>
            <StatusBar backgroundColor={color.primaryColor} />
            <View style={style.headContainer}>
                <TouchableOpacity >
                    <Ionicons name="menu" size={30} color="white" />
                </TouchableOpacity>
                {/* <TouchableOpacity style={style.imageContainer} >
                    {user && <Image style={style.image} source={{ uri: user.pro_pic }} />}
                </TouchableOpacity> */}

                <Text style={style.headText}>Home</Text>
                <TouchableOpacity >
                    <Ionicons name="md-notifications-circle-outline" size={30} color="white" />
                </TouchableOpacity>

            </View>
            {/* <View >

                    {user && <Text style={{ fontSize: 15, fontWeight: 'bold', marginHorizontal: 20 }}>{user.username}</Text>}
                </View> */}

            {/* {user && <TouchableOpacity style={{ marginHorizontal: 20, backgroundColor: color.secondaryColor, paddingHorizontal: 20, paddingVertical: 10, marginTop: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>

                <Image style={{ height: 30, width: 30, resizeMode: 'cover', borderRadius: 15 }} source={{ uri: user.pro_pic }} />

                <Text style={{ marginLeft: 10 }}>{user.username}</Text>

            </TouchableOpacity>} */}

        </SafeAreaView >

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
        paddingHorizontal: 15

    },
    headText: {
        fontSize: 18,
        fontWeight: '700',
        color: color.secondaryColor
    },
    imageContainer: {
        height: 30,
        width: 30,
        overflow: 'hidden',
        // backgroundColor: "white",
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,



    },

    image: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        resizeMode: 'cover'
    }
})