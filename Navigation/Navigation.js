import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../Screens/SignUpScreen';
import SignInScreen from '../Screens/SignInScreen';
import HomeScreen from '../Screens/HomeScreen';
import BlogScreen from '../Screens/BlogScreen';
import DetailScreen from '../Screens/DetailScreen';
import AddBlogScreen from '../Screens/AddBlogScreen';
import DownloadScreen from '../Screens/DownloadScreen';
import PdfViewScreen from '../Screens/PdfViewScreen';
import HomeBottomNavigation from '../Components/Home/HomeBottomNavigation';
import MyPosts from '../Components/Profile/MyPosts';
import BookMarks from '../Components/Profile/BookMarks';
import ChatMessages from '../Components/Chat/ChatMessages';
import LikedPosts from '../Components/Profile/LikedPosts';
import ProfileScreen from '../Screens/ProfileScreen';
import Userprofile from '../Components/Profile/Userprofile';
import CreateContent from '../Screens/CreateContent';
import Following from '../Components/Follow/Following';
import Followers from '../Components/Follow/Followers';
import EditProfile from '../Components/Profile/EditProfile';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CommentScreen from '../Screens/CommentScreen';
import ChatScreen from '../Screens/ChatScreen';






const Stack = createNativeStackNavigator();

export function SignInStack() {
    return (
        <SafeAreaProvider>
            <NavigationContainer >
                <Stack.Navigator initialRouteName='HomeTab' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="HomeTab" component={HomeBottomNavigation} />
                    <Stack.Screen name="Blog" component={BlogScreen} />
                    <Stack.Screen name="Detail" component={DetailScreen} />
                    <Stack.Screen name="AddBlog" component={AddBlogScreen} />
                    <Stack.Screen name="Download" component={DownloadScreen} />
                    <Stack.Screen name="PdfView" component={PdfViewScreen} />
                    <Stack.Screen name="MyPosts" component={MyPosts} />
                    <Stack.Screen name="LikedPosts" component={LikedPosts} />
                    <Stack.Screen name="BookMarks" component={BookMarks} />
                    <Stack.Screen name="ChatMessages" component={ChatMessages} />
                    <Stack.Screen name="Userprofile" component={Userprofile} />
                    <Stack.Screen name="EditProfile" component={EditProfile} />
                    <Stack.Screen name="Content" component={CreateContent} />
                    <Stack.Screen name="Following" component={Following} />
                    <Stack.Screen name="Followers" component={Followers} />
                    <Stack.Screen name="Comment" component={CommentScreen} />
                    <Stack.Screen name="Chat" component={ChatScreen} />
                </Stack.Navigator>

            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export function SignOutStack() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='SignIn' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
