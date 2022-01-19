import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AddBlogHeader from '../Components/AddBlog/AddBlogHeader'
import AddDetails from '../Components/AddBlog/AddDetails'

export default function AddBlogScreen() {
    return (
        <View>
            <AddBlogHeader />
            <AddDetails />
        </View>
    )
}

const styles = StyleSheet.create({})
