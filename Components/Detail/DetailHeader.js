import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
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
        <SafeAreaView>
            <StatusBar backgroundColor={'black'} />
            <View style={style.container}>

                <View style={style.headContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: color.secondaryColor, borderRadius: 10 }}>
                            <Ionicons name="ios-arrow-back" size={20} color={color.primaryColor} />
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity onPress={handleBookMark} >
                        <View style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: color.secondaryColor, borderRadius: 10 }}>
                            {isBookMark ? <Ionicons name="bookmarks" size={15} color={color.primaryColor} /> : <Ionicons name="bookmarks-outline" size={15} color={color.primaryColor} />}
                        </View>



                    </TouchableOpacity>

                </View>

            </View >
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        // marginHorizontal: 15,
        // backgroundColor: 'white'
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