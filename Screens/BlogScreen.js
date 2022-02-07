import { useNavigation } from '@react-navigation/native'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import BlogHeader from '../Components/Blog/BlogHeader'
import BlogPosts from '../Components/Blog/BlogPosts'
import BlogSearch from '../Components/Blog/BlogSearch'
import { auth, db } from '../Firebase'
import { GetBlogs, SetBlogData } from '../Redux/Reducers/BlogSlicer'


export default function BlogScreen() {
    const dispatch = useDispatch();
    const blogs = useSelector(GetBlogs)



    const getBlogs = () => {
        try {
            const q = query((collection(db, 'blogs')), orderBy("createAt", "desc"))
            const snapdata = onSnapshot(q, (snapshot) => {
                let blogdata = [];
                snapshot.docs.map((doc) => {
                    blogdata.push({ ...doc.data(), id: doc.id })
                })

                dispatch(SetBlogData({
                    BlogDatas: blogdata,
                }))

            })
        } catch (error) {
            let blogdata = [];
            dispatch(SetBlogData({
                BlogDatas: blogdata,
            }))
        }


    }

    useEffect(() => {
        getBlogs();
    }, [db])



    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <BlogHeader />
            <BlogSearch />
            <ScrollView>
                {blogs && blogs.map((blog) => (
                    <BlogPosts blog={blog} key={blog.id} />
                ))

                }
            </ScrollView>

        </View>
    )
}
