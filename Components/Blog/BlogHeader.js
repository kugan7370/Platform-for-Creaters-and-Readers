import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function BlogHeader() {

    const navigation = useNavigation();
    return (
        <View style={style.container}>
            <SafeAreaView style={{ backgroundColor: '#f7f7f7', height: 80 }}>
                <View style={style.headContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Ionicons name="menu" size={30} color="black" />
                    </TouchableOpacity>

                    <Text style={style.headText}>Blogs</Text>
                    <View style={style.imageContainer}>
                        <Image style={style.image} source={{ uri: 'https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/08/Profile-Photo-Wallpaper.jpg' }} />
                    </View>

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