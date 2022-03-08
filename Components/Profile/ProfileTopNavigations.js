import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Mypost from './MyPosts'
import LikedPosts from './LikedPosts'
import BookMarks from './BookMarks'


const Tab = createMaterialTopTabNavigator();

export default function ProfileTopNavigations({ userId, usermail, navigation }) {


    const { height } = Dimensions.get('screen')

    return (

        <View style={{ height: height * 0.915 }}>
            {(userId && usermail) &&
                <Tab.Navigator screenOptions={{
                    tabBarStyle: { borderTopRadius: 20, elevation: 0 },
                    tabBarLabelStyle: { textTransform: 'capitalize', color: 'gray', letterSpacing: 1, fontSize: 14 },
                    tabBarIndicatorStyle: { backgroundColor: 'black', }


                }} >

                    <Tab.Screen name="Posts" component={Mypost} initialParams={{ userId: userId }} />
                    <Tab.Screen name="Liked Posts" component={LikedPosts} initialParams={{ usermail: usermail }} />
                    <Tab.Screen name="BookMarks" component={BookMarks} initialParams={{ usermail: usermail }} />
                </Tab.Navigator>
            }
        </View>

    );
}

const styles = StyleSheet.create({});