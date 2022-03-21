import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ChatUsers from '../Components/Chat/ChatUsers';
import { color } from '../Color';

export default function ChatScreen() {
    return (
        <View style={{ backgroundColor: color.primaryColor }}>
            <ChatUsers />
        </View>
    );
}

const styles = StyleSheet.create({});
