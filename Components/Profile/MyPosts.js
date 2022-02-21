import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import BlogPosts from '../Blog/BlogPosts';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import BlogHeader from '../Blog/BlogHeader';
import Headers from '../Common/Headers';




const MyPosts = () => {
    const [userPost, setuserPost] = useState();



    useEffect(() => {
        try {
            const ref = collection(db, 'blogs')
            const q = query(ref, where('uid', '==', auth.currentUser.uid))
            const snap = onSnapshot(q, (snapshot) => {
                let SignUserBlog = []
                snapshot.docs.map((doc) => {
                    SignUserBlog.push({ ...doc.data(), id: doc.id })
                })
                setuserPost(SignUserBlog)
            })

        } catch (error) {
            let SignUserBlog = []
            setuserPost(SignUserBlog)
        }

    }, [])


    return (

        <View>
            <Headers headerName={'My Posts'} />
            <View style={{ marginBottom: 150 }}>
                <ScrollView>
                    {userPost && userPost.map((blog) => (
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
    );
};

export default MyPosts;