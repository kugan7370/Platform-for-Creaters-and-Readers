import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import BlogPosts from '../Blog/BlogPosts';

export default function BookMarks() {
    const [userBookMark, setuserBookMark] = useState();


    useEffect(() => {
        try {
            const ref = collection(db, 'blogs')

            const q = query(ref, where('book_mark_by', 'array-contains', auth.currentUser.email))
            const snapdata = onSnapshot(q, (snapshot) => {

                let FollowingBlog = [];
                snapshot.docs.map((doc) => {
                    console.log(doc.data());
                    FollowingBlog.push({ ...doc.data(), id: doc.id })
                })
                setuserBookMark(FollowingBlog)


            })
        } catch (error) {
            let FollowingBlog = [];
            setuserBookMark(FollowingBlog)

        }
    }, [])



    return (
        <View style={{ marginTop: 50, marginBottom: 50 }}>
            <ScrollView>
                {userBookMark && userBookMark.map((blog) => (
                    <BlogPosts blog={blog} key={blog.id} />
                ))
                    // :
                    // <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    //     <Text>nothing following</Text>
                    // </View>

                }
            </ScrollView>
        </View>
    );
}
