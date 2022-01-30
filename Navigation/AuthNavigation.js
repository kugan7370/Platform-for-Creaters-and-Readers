import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { SignInStack, SignOutStack } from './Navigation';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { SetSignInUsers } from '../Redux/Reducers/UserSlicer';



export default function AuthNavigation() {
    const dispatch = useDispatch();

    const [currentUser, setCurrentUser] = useState(false);

    const useHandler = async () => {

        onAuthStateChanged(auth, loggeers => {
            if (loggeers) {


                const ref = collection(db, 'users')
                const q = query(ref, where('uid', '==', auth.currentUser.uid))
                const snap = onSnapshot(q, (snapshot) => {
                    snapshot.docs.map((doc) => {
                        dispatch(SetSignInUsers({
                            SignInUserDetail: doc.data(),
                        }))

                    })

                })
                setCurrentUser(true);

            }
            else {
                setCurrentUser(false);
            }
        })
    }

    useEffect(() => {
        useHandler();
    }, [])





    return (
        <>
            {currentUser ? <SignInStack /> : <SignOutStack />}
        </>
    );
}


