import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import HomeArticleScreen from './HomeArticleScreen';
import HomeBookScreen from './HomeBookScreen';
import { color } from '../../Color';




const Tab = createMaterialTopTabNavigator();

export default function HomeTopNavigation() {

    const { height } = Dimensions.get('screen')

    return (
        <View style={{ height: height * 0.84 }}>
            <Tab.Navigator screenOptions={{
                tabBarStyle: { borderTopRadius: 20, elevation: 0, backgroundColor: color.primaryColor },
                tabBarLabelStyle: { textTransform: 'capitalize', color: 'white', letterSpacing: 1, fontSize: 14 },
                tabBarIndicatorStyle: { backgroundColor: 'gray', }


            }} >
                <Tab.Screen name="Articles" component={HomeArticleScreen} />
                <Tab.Screen name="Books" component={HomeBookScreen} />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({});
