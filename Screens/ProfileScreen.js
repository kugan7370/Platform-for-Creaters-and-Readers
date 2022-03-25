import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProfileDetails from '../Components/Profile/ProfileDetails';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../Components/Common/FocusAwareStatusBar';

export default function ProfileScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor='white' />
            <ProfileDetails />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
