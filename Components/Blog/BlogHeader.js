import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../Firebase';
import { signOut } from 'firebase/auth';
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { SetSignOut, SignInUser } from '../../Redux/Reducers/UserSlicer';
import { color } from '../../Color';

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


        <View style={{ backgroundColor: color.primaryColor, height: 80, paddingVertical: 20 }}>
            <View style={style.headContainer}>
                <TouchableOpacity style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', borderColor: '#ebebeb', borderWidth: 1, borderRadius: 10 }} onPress={() => navigation.goBack()}>

                    <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />

                </TouchableOpacity>

                <Text style={style.headText}>Explore</Text>
                {/* <TouchableOpacity style={style.imageContainer}>
                    {user && <Image style={style.image} source={{ uri: user.pro_pic }} />}
                </TouchableOpacity> */}
                <Text></Text>

            </View>
        </View >

    )
}

const style = StyleSheet.create({

    headContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15

    },
    headText: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white'
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