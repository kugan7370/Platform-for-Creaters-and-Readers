import { StyleSheet, Text, View, } from 'react-native';
import React, { useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import HomeArticleScreen from './HomeArticleScreen';
import HomeBookScreen from './HomeBookScreen';




const Tab = createMaterialTopTabNavigator();

export default function HomeTopNavigation() {

    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: { borderTopRadius: 20, }
        }} >
            <Tab.Screen name="Articles" component={HomeArticleScreen} />
            <Tab.Screen name="Books" component={HomeBookScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({});
