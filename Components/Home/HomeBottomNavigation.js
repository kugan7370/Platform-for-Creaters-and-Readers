import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
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
// import { setBlogDataOut } from '../../Redux/Reducers/BlogSlicer';



const Tab = createBottomTabNavigator();


const HomeBottomNavigation = () => {
    const dispatch = useDispatch();
    const user = useSelector(SignInUser);

    const userSignOut = async () => {
        dispatch(SetSignOut())
        // dispatch(setBlogDataOut())
        await signOut(auth)
    }


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
                    <TouchableOpacity onPress={userSignOut}>
                        <Image style={{ width: 24, height: 24, borderRadius: 12, borderWidth: focused ? 1 : 0, borderColor: focused ? 'black' : "white" }} source={{ uri: user.pro_pic }} />
                    </TouchableOpacity>
                )
            }} />}
        </Tab.Navigator>
    );
};

export default HomeBottomNavigation;
