import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Headers = ({ headerName }) => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: '#f7f7f7', height: 80 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>

                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{headerName}</Text>
                <Text></Text>

            </View>
        </SafeAreaView >
    )
}

export default Headers

