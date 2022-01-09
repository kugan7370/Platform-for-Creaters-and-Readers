import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

import BlogHeader from '../Components/Blog/BlogHeader'
import BlogPosts from '../Components/Blog/BlogPosts'
import BlogSearch from '../Components/Blog/BlogSearch'


export default function BlogScreen() {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <BlogHeader />
            <BlogSearch />
            <ScrollView>
                <BlogPosts />
                <BlogPosts />
                <BlogPosts />
                <BlogPosts />
                <BlogPosts />
                <BlogPosts />
            </ScrollView>

        </View>
    )
}
