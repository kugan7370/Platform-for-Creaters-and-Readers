import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { SignInStack, SignOutStack } from './Navigation';



export default function AuthNavigation() {

    const [currentUser, setCurrentUser] = useState(false);

    const useHandler = () => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setCurrentUser(true);
            }
            else {
                setCurrentUser(false);
            }
        })
    }


    useEffect(() => {
        useHandler();
    })




    return (
        <>
            {currentUser ? <SignInStack /> : <SignOutStack />}
        </>
    );
}


