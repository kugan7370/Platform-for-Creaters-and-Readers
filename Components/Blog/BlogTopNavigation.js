import { StyleSheet, View, Dimensions } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ExploreArticle from './ExploreArticle';
import ExploreBooks from './ExploreBooks';
import { color } from '../../Color';



const Tab = createMaterialTopTabNavigator();

export default function BlogTopNavigation({ searchquery }) {


    const { height } = Dimensions.get('screen')

    return (

        <View style={{ height: height * 0.76 }}>

            <Tab.Navigator screenOptions={{
                tabBarStyle: { borderTopRadius: 20, elevation: 0, backgroundColor: color.primaryColor },
                tabBarLabelStyle: { textTransform: 'capitalize', color: 'white', letterSpacing: 1, fontSize: 14 },
                tabBarIndicatorStyle: { backgroundColor: 'gray', }


            }} >

                <Tab.Screen name="Article" children={() => <ExploreArticle searchData={searchquery} />} />
                <Tab.Screen name="Books" component={ExploreBooks} />

            </Tab.Navigator>

        </View>

    );
}

