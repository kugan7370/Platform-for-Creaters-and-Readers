import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../Color';

const Headers = ({ headerName }) => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: color.primaryColor, height: 80, paddingVertical: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Ionicons name="arrow-back-outline" size={24} color={color.secondaryColor} />
                </TouchableOpacity>

                <Text style={{ fontSize: 18, fontWeight: 'bold', color: color.secondaryColor }}>{headerName}</Text>
                <Text></Text>

            </View>
        </SafeAreaView >
    )
}

export default Headers

