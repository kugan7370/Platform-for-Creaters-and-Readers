import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import BlogPosts from '../Blog/BlogPosts';
import Headers from '../Common/Headers';


const LikedPosts = () => {
    const [likedBlogs, setlikedBlogs] = useState();


    useEffect(() => {
        let isMounted = true
        try {

            const ref = collection(db, 'blogs')

            const q = query(ref, where("likes_by_users", 'array-contains', auth.currentUser.email))
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
    }, [])



    return (
        <View>
            <Headers headerName={'Liked Posts'} />
            <View style={{ marginBottom: 150 }}>
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
            </View>
        </View>
    )
}

export default LikedPosts