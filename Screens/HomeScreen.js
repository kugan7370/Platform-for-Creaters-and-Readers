import React from 'react'
import { View, Text, StyleSheet } from 'react-native'



export default function HomeScreen() {
    return (
        <View style={style.container}>
            <Text>Home</Text>
        </View>
    )
}

const style = StyleSheet.create({

    container: {
        flex: 1,
    }
})