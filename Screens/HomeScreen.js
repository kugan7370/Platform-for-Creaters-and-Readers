import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

import HomeHeader from '../Components/Home/HomeHeader'
import HomeTopNavigation from '../Components/Home/HomeTopNavigation'
import { NavigationContainer } from '@react-navigation/native';
import HomeBody from '../Components/Home/HomeBody';


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
        backgroundColor: 'white',

    }
})