import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import BlogPosts from '../Blog/BlogPosts';
import Headers from '../Common/Headers';
import { useRoute } from '@react-navigation/native';


const LikedPosts = () => {
    const route = useRoute();
    const [likedBlogs, setlikedBlogs] = useState();
    const [UserEmail, setUserEmail] = useState();

    useEffect(() => {
        try {
            const { usermail } = route.params;
            setUserEmail(usermail);
        } catch (error) {
            setUserEmail(auth.currentUser.email);
        }

    }, [])


    useEffect(() => {
        let isMounted = true
        try {

            const ref = collection(db, 'blogs')

            const q = query(ref, where("likes_by_users", 'array-contains', UserEmail))
            const snapdata = onSnapshot(q, (snapshot) => {

                let likedBlogs = [];
                if (isMounted) {
                    snapshot.docs.map((doc) => {

                        likedBlogs.push({ ...doc.data(), id: doc.id })
                    })

                    setlikedBlogs(likedBlogs)

                }

            })

        } catch (error) {

            let likedBlogs = [];
            setlikedBlogs(likedBlogs)

        }


        return () => { isMounted = false }
    }, [UserEmail])



    return (
        <ScrollView nestedScrollEnabled={true}>
            {UserEmail && UserEmail == auth.currentUser.email ? <Headers headerName={'Liked Posts'} /> : null}
            <ScrollView>
                {likedBlogs && likedBlogs.map((blog) => (
                    <BlogPosts blog={blog} key={blog.id} />
                ))
                    // :
                    // <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    //     <Text>nothing following</Text>
                    // </View>

                }
            </ScrollView>
        </ScrollView>
    )
}

export default LikedPosts