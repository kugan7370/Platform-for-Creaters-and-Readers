import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DetailBottom from '../Components/Detail/DetailBottom'
import DetailContent from '../Components/Detail/DetailContent'
import DetailHeader from '../Components/Detail/DetailHeader'

export default function DetailScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const [SelectedBlog, setSelectedBlog] = useState();

    useEffect(() => {
        let { blogDetail } = route.params;
        setSelectedBlog(blogDetail)
    }, [])

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />
            {SelectedBlog && <>
                <DetailHeader SelectedBlog={SelectedBlog} />

                <DetailContent SelectedBlog={SelectedBlog} />

                <DetailBottom SelectedBlog={SelectedBlog} />
            </>
            }
        </SafeAreaView>
    )
}
