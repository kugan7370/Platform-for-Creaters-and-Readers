import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
export default function BlogSearch() {
    return (
        <View>
            <View style={style.searchContainer}>
                <Ionicons name="search" size={24} color="black" />
                <TextInput style={style.textInput} placeholder='Search Blogs'></TextInput>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        // borderWidth: 1,
        height: 50,
        alignItems: 'center',
        marginHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#fcfcfc',
        paddingHorizontal: 10,
        borderColor: 'gray',
        marginBottom: 20
    },
    textInput: {

        padding: 5,
        flex: 1
    }
})