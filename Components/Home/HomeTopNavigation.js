import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeArticleScreen from '../../Screens/HomeArticleScreen';
import HomeBooksScreen from '../../Screens/HomeBooksScreen';


const Tab = createMaterialTopTabNavigator();

export default function HomeTopNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Articles" component={HomeArticleScreen} />
            <Tab.Screen name="Books" component={HomeBooksScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({});
