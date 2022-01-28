import { View, Text, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BlogScreen from '../../Screens/BlogScreen';
import HomeScreen from '../../Screens/HomeScreen';
import ChatScreen from '../../Screens/ChatScreen';
import ProfileScreen from '../../Screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { SignInUser } from '../../Redux/Reducers/UserSlicer';
import { useSelector } from 'react-redux';
import AddBlogScreen from '../../Screens/AddBlogScreen';



const Tab = createBottomTabNavigator();


const HomeBottomNavigation = () => {

    const user = useSelector(SignInUser);
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { height: 60 }
        }} >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "md-home" : "md-home-outline"} size={24} color="black" />
                )
            }} />
            <Tab.Screen name="Blog" component={BlogScreen} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "md-search" : "md-search-outline"} size={24} color="black" />
                )
            }} />
            <Tab.Screen name="AddBlog" component={AddBlogScreen} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "md-add-circle" : "md-add-circle-outline"} size={40} color="green" />
                )
            }} />
            <Tab.Screen name="Chat" component={ChatScreen} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "chatbubbles" : "chatbubbles-outline"} size={24} color="black" />
                )
            }} />
            {user && <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Image style={{ width: 24, height: 24, borderRadius: 12, borderWidth: focused ? 1 : 0, borderColor: focused ? 'black' : "white" }} source={{ uri: user.pro_pic }} />

                )
            }} />}
        </Tab.Navigator>
    );
};

export default HomeBottomNavigation;
