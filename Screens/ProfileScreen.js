import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProfileDetails from '../Components/Profile/ProfileDetails';

export default function ProfileScreen() {
    return (
        <View style={{ flex: 1 }} >
            <ProfileDetails />
        </View>
    );
}

const styles = StyleSheet.create({});
