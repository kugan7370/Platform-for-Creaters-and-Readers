import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProfileDetails from '../Components/Profile/ProfileDetails';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../Components/Common/FocusAwareStatusBar';
import { color } from '../Color';

export default function ProfileScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.primaryColor, borderBottomRightRadius: 50, borderBottomLeftRadius: 50 }} >
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor='white' />
            <ProfileDetails />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
