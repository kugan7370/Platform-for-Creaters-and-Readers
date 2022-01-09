import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
export default function DetailBottom() {
    return (
        <View style={style.container}>
            <View style={style.bottunContainer}>
                <Ionicons name="book-outline" size={24} color="white" />
                <Text style={{ color: 'white', marginLeft: 15 }}>Read Now</Text>
            </View>
            <View style={style.bottunContainer}>
                <Ionicons name="md-download-outline" size={24} color="white" />
                <Text style={{ color: 'white', marginLeft: 15 }}>Download Now</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row', justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        backgroundColor: '#fafafa',
        height: 80,
        alignItems: 'center',
        zIndex: 999
    },
    bottunContainer: {
        backgroundColor: '#0e0047', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 10,
        flexDirection: 'row', alignItems: 'center'
    }
})