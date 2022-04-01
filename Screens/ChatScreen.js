import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ChatUsers from '../Components/Chat/ChatUsers';
import { color } from '../Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
export default function ChatScreen() {
    NavigationBar.setBackgroundColorAsync(color.primaryColor);
    return (
        <SafeAreaView style={{ backgroundColor: color.primaryColor }}>
            <StatusBar backgroundColor={color.primaryColor} />
            <ChatUsers />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
