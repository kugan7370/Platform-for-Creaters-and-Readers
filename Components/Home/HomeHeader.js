import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { SignInUser } from '../../Redux/Reducers/UserSlicer';
import { useSelector } from 'react-redux';






export default function HomeHeader() {
    const user = useSelector(SignInUser);

    return (

        <View style={style.container}>
            <SafeAreaView style={{ backgroundColor: '#f7f7f7', height: 80 }}>
                <View style={style.headContainer}>
                    <TouchableOpacity>
                        <Ionicons name="menu" size={30} color="black" />
                    </TouchableOpacity>

                    <Text style={style.headText}>Home</Text>
                    <TouchableOpacity style={style.imageContainer}>
                        <Ionicons name="md-notifications-circle-outline" size={30} color="black" />
                    </TouchableOpacity>

                </View>
            </SafeAreaView >
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