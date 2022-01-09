import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import DetailBottom from '../Components/Detail/DetailBottom'
import DetailContent from '../Components/Detail/DetailContent'
import DetailHeader from '../Components/Detail/DetailHeader'

export default function DetailScreen() {
    return (
        <View style={{ flex: 1 }}>
            <DetailHeader />
            <ScrollView style={{ paddingBottom: 50 }}>
                <DetailContent />
            </ScrollView>
            <DetailBottom />
        </View>
    )
}
