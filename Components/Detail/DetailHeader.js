import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../Color';

export default function DetailHeader() {
    const navigation = useNavigation();

    const [isBookMark, setisBookMark] = useState(false)
    const handleBookMark = () => {
        if (!isBookMark) {
            setisBookMark(true)
        }
        else {
            setisBookMark(false)
        }
    }
    return (
        <View>
            {/* <StatusBar backgroundColor={'white'} barStyle='dark-content' /> */}
            <View style={style.container}>

                <View style={style.headContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', borderColor: '#ebebeb', borderWidth: 1, borderRadius: 15 }}>
                            {/* <Ionicons name="ios-arrow-back" size={20} color="black" /> */}
                            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
                        </View>

                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 1 }}>Details</Text>


                    <TouchableOpacity onPress={handleBookMark} >
                        <View style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', borderColor: '#ebebeb', borderWidth: 1, borderRadius: 15 }}>
                            {isBookMark ? <Ionicons name="bookmarks" size={15} color="black" /> : <Ionicons name="bookmarks-outline" size={15} color="black" />}
                        </View>



                    </TouchableOpacity>

                </View>

            </View >
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        // marginHorizontal: 15,
        backgroundColor: 'white',
        paddingVertical: 10,
        marginBottom: 10


    },
    headContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,


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