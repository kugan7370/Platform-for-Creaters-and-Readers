import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { SignInUser } from '../../Redux/Reducers/UserSlicer';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';







export default function HomeHeader() {
    const user = useSelector(SignInUser);
    const navigation = useNavigation();
    return (


        <SafeAreaView style={{ backgroundColor: '#f7f7f7', height: 100 }}>
            <View style={style.headContainer}>
                <TouchableOpacity style={style.imageContainer} >
                    {user && <Image style={style.image} source={{ uri: user.pro_pic }} />}
                </TouchableOpacity>

                <Text style={style.headText}>Home</Text>
                <TouchableOpacity style={style.imageContainer}>
                    <Ionicons name="md-notifications-circle-outline" size={30} color="black" />
                </TouchableOpacity>

            </View>
            {/* <View >

                    {user && <Text style={{ fontSize: 15, fontWeight: 'bold', marginHorizontal: 20 }}>{user.username}</Text>}
                </View> */}

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
        fontWeight: '700'
    },
    imageContainer: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        backgroundColor: "white",
        padding: 5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,



    },

    image: {
        height: '100%',
        width: '100%',
        borderRadius: 30,
        resizeMode: 'cover'
    }
})