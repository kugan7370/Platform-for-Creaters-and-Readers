import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { SignInStack, SignOutStack } from './Navigation';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { SetSignInUsers } from '../Redux/Reducers/UserSlicer';
import ActivityIndicators from '../Components/Common/ActivityIndicator';



export default function AuthNavigation() {
    const dispatch = useDispatch();

    const [indicator, setindicator] = useState(true);

    const [currentUsers, setCurrentUsers] = useState(false);

    const useHandler = async () => {

        onAuthStateChanged(auth, user => {
            setindicator(false)
            if (user) {
                // console.log(user.emailVerified);
                setCurrentUsers(true)
                // user.emailVerified ? setCurrentUsers(true) : setCurrentUsers(false)
            }
            else {

                setCurrentUsers(false);
            }
        })
    }

    useEffect(() => {
        // console.log("useeffect");
        useHandler();
    }, [])





    return (
        <>
            {indicator ? <ActivityIndicators color="blue" /> : currentUsers ? <SignInStack /> : <SignOutStack />}
        </>
    );
}


