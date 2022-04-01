import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { color } from '../../Color';
import FocusAwareStatusBar from '../Common/FocusAwareStatusBar';



export default function AddBlogHeader() {
    const navigation = useNavigation();


    return (


        <SafeAreaView style={{ height: 80, backgroundColor: color.primaryColor }}>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor={color.primaryColor} />
            <View style={style.headContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', borderColor: '#ebebeb', borderWidth: 1, borderRadius: 10 }}>
                        {/* <Ionicons name="ios-arrow-back" size={20} color="black" /> */}
                        <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
                    </View>

                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 1, color: color.secondaryColor }}>Add Post</Text>
                <Text></Text>
            </View>
        </SafeAreaView >

    )
}

const style = StyleSheet.create({
    // container: {
    //     marginVertical: 10,
    //     backgroundColor: color.primaryColor
    // },
    headContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 20,


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