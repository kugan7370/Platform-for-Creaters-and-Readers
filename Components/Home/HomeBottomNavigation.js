import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BlogScreen from '../../Screens/BlogScreen';
import HomeScreen from '../../Screens/HomeScreen';
import ChatScreen from '../../Screens/ChatScreen';
import ProfileScreen from '../../Screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { SetSignInUsers, SetSignOut, SignInUser, } from '../../Redux/Reducers/UserSlicer';
import { useDispatch, useSelector } from 'react-redux';
import AddBlogScreen from '../../Screens/AddBlogScreen';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase';
import { color } from '../../Color';
// import HomeDrawer from './HomeDrawer';
// import { setBlogDataOut } from '../../Redux/Reducers/BlogSlicer';
import * as NavigationBar from 'expo-navigation-bar';
import BookMarks from '../Profile/BookMarks';



const Tab = createBottomTabNavigator();


const HomeBottomNavigation = () => {

    const dispatch = useDispatch();
    const user = useSelector(SignInUser);
    const [navcolor, setnavcolor] = useState('white')
    NavigationBar.setBackgroundColorAsync(navcolor);
    useEffect(() => (setnavcolor(color.primaryColor)), [])


    const userSignOut = async () => {
        dispatch(SetSignOut())
        // dispatch(setBlogDataOut())
        await signOut(auth)
    }


    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { height: 60, backgroundColor: color.primaryColor },

        }} >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "md-home" : "md-home-outline"} size={24} color='white' />
                )
            }} />
            <Tab.Screen name="Blog" component={BlogScreen} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "md-search" : "md-search-outline"} size={24} color='white' />
                )
            }} />
            <Tab.Screen name="AddBlog" component={AddBlogScreen} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "md-add-circle" : "md-add-circle-outline"} size={40} color="white" />
                )
            }} />
            <Tab.Screen name="BookMarks" component={BookMarks} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "md-bookmarks" : "md-bookmarks-outline"} size={24} color="white" />
                )
            }} />
            {user && <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Image style={{ width: 26, height: 26, borderRadius: 13, borderWidth: focused ? 2 : 0, borderColor: focused ? 'green' : "white" }} source={{ uri: user.pro_pic }} />
                )
            }} />}
        </Tab.Navigator>
    );
};

export default HomeBottomNavigation;
