import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../Firebase';
import { signOut } from 'firebase/auth';
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { SetSignOut, SignInUser } from '../../Redux/Reducers/UserSlicer';

const profile = 'https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/08/Profile-Photo-Wallpaper.jpg';

export default function BlogHeader() {
    const navigation = useNavigation();
    const dispatch = useDispatch();


    const user = useSelector(SignInUser);

    const userSignOut = () => {
        dispatch(SetSignOut())
        // dispatch(setBlogDataOut())
        signOut(auth)
    }



    return (
        <View style={style.container}>
            <SafeAreaView style={{ backgroundColor: '#f7f7f7', height: 100 }}>
                <View style={style.headContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Content')}>
                        <Ionicons name="menu" size={30} color="black" />
                    </TouchableOpacity>

                    <Text style={style.headText}>Explore</Text>
                    <TouchableOpacity style={style.imageContainer}>
                        {user && <Image style={style.image} source={{ uri: user.pro_pic }} />}
                    </TouchableOpacity>

                </View>
            </SafeAreaView >
        </View >
    )
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