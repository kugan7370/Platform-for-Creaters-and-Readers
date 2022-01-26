import { useNavigation } from '@react-navigation/native'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import BlogHeader from '../Components/Blog/BlogHeader'
import BlogPosts from '../Components/Blog/BlogPosts'
import BlogSearch from '../Components/Blog/BlogSearch'
import { db } from '../Firebase'
import { Blogs, SetBlogData } from '../Redux/Reducers/BlogSlicer'


export default function BlogScreen() {
    const dispatch = useDispatch();
    const blogs = useSelector(Blogs)

    const getBlogs = () => {
        const q = query((collection(db, 'blogs')), orderBy("createAt", "desc"))
        onSnapshot(q, (snapshot) => {
            let blogs = [];
            snapshot.docs.map((doc) => {
                blogs.push(doc.data())
            })

            dispatch(SetBlogData({
                BlogDatas: blogs,
            }))

        })

    }

    useEffect(() => {
        getBlogs();
    }, [])



    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <BlogHeader />
            <BlogSearch />
            <ScrollView>
                {blogs && blogs.map((blog, index) => (
                    <BlogPosts blog={blog} key={index} />
                ))

                }
            </ScrollView>

        </View>
    )
}
