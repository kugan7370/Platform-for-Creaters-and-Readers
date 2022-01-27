import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import HomeHeader from '../Components/Home/HomeHeader'
import HomeTopNavigation from '../Components/Home/HomeTopNavigation'
import { NavigationContainer } from '@react-navigation/native';


export default function HomeScreen() {
    return (
        <View style={style.container}>
            <HomeHeader />
            <HomeTopNavigation />

        </View>
    )
}

const style = StyleSheet.create({

    container: {
        flex: 1,
    }
})