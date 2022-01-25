import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../Screens/SignUpScreen';
import SignInScreen from '../Screens/SignInScreen';
import HomeScreen from '../Screens/HomeScreen';
import BlogScreen from '../Screens/BlogScreen';
import DetailScreen from '../Screens/DetailScreen';
import AddBlogScreen from '../Screens/AddBlogScreen';
import PdfScreen from '../Screens/PdfScreen';


const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='Blog' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Blog" component={BlogScreen} />
                <Stack.Screen name="Detail" component={DetailScreen} />
                <Stack.Screen name="AddBlog" component={AddBlogScreen} />
                <Stack.Screen name="Pdfview" component={PdfScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
