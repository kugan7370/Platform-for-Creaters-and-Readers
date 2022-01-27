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




const Stack = createNativeStackNavigator();

export function SignInStack() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='HomeTab' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HomeTab" component={HomeBottomNavigation} />
                <Stack.Screen name="Blog" component={BlogScreen} />
                <Stack.Screen name="Detail" component={DetailScreen} />
                <Stack.Screen name="AddBlog" component={AddBlogScreen} />
                <Stack.Screen name="Download" component={DownloadScreen} />
                <Stack.Screen name="PdfView" component={PdfViewScreen} />
            </Stack.Navigator>

        </NavigationContainer>
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
