import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
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

        <View style={{ flex: 1 }}>
            {SelectedBlog && <>
                <DetailHeader SelectedBlog={SelectedBlog} />
                <ScrollView style={{ paddingBottom: 50 }}>
                    <DetailContent SelectedBlog={SelectedBlog} />
                </ScrollView>
                <DetailBottom SelectedBlog={SelectedBlog} />
            </>
            }
        </View>
    )
}
