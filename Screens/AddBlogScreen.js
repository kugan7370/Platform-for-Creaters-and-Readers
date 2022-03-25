import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddBlogHeader from '../Components/AddBlog/AddBlogHeader'
import AddDetails from '../Components/AddBlog/AddDetails'
import FocusAwareStatusBar from '../Components/Common/FocusAwareStatusBar'

export default function AddBlogScreen() {
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>

            <FocusAwareStatusBar barStyle="dark-content" backgroundColor='white' />
            <AddBlogHeader />
            <AddDetails />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
