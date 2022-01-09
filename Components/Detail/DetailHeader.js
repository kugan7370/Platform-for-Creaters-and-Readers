import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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
            <View style={style.container}>
                <SafeAreaView style={{ backgroundColor: '#f7f7f7', height: 80 }}>
                    <View style={style.headContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Blog')}>
                            <Ionicons name="ios-arrow-back" size={30} color="black" />
                        </TouchableOpacity>


                        <TouchableOpacity onPress={handleBookMark} >
                            {isBookMark ? <Ionicons name="bookmarks" size={30} color="black" /> : <Ionicons name="bookmarks-outline" size={30} color="black" />}
                        </TouchableOpacity>

                    </View>
                </SafeAreaView >
            </View >
        </View>
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
        paddingHorizontal: 20

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