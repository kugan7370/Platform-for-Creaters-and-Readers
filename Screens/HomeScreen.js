import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'

import HomeHeader from '../Components/Home/HomeHeader'
import HomeTopNavigation from '../Components/Home/HomeTopNavigation'
import { NavigationContainer } from '@react-navigation/native';
import HomeBody from '../Components/Home/HomeBody';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { SetSignInUsers } from '../Redux/Reducers/UserSlicer';
// import { SetFollow } from '../Redux/Reducers/UserFollowSlicer';
// import { SetSignInUserBlog } from '../Redux/Reducers/SignInUserBlogSlicer';



export default function HomeScreen() {

    const dispatch = useDispatch();
    // const user = useSelector(SignInUser);
    useEffect(() => {
        let isMounted = true
        const ref = collection(db, 'users')
        const q = query(ref, where('uid', '==', auth.currentUser.uid))
        const snap = onSnapshot(q, (snapshot) => {
            if (isMounted) {
                snapshot.docs.map((doc) => {

                    dispatch(SetSignInUsers({
                        SignInUserDetail: doc.data()
                    }))

                })
            }


        })
        return () => { isMounted = false }
    }, [])



    return (
        <ScrollView style={style.container}>
            <HomeHeader />
            <HomeTopNavigation />

        </ScrollView>
    )
}

const style = StyleSheet.create({

    container: {
        // flex: 1,
        backgroundColor: 'white',

    }
})