import { useNavigation } from '@react-navigation/native'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import BlogHeader from '../Components/Blog/BlogHeader'
import BlogPosts from '../Components/Blog/BlogPosts'
import BlogSearch from '../Components/Blog/BlogSearch'
import { db } from '../Firebase'
import { GetBlogs, SetBlogData } from '../Redux/Reducers/BlogSlicer'


export default function BlogScreen() {
    const dispatch = useDispatch();
    const blogs = useSelector(GetBlogs)

    const getBlogs = () => {
        const q = query((collection(db, 'blogs')), orderBy("createAt", "desc"))
        const snapdata = onSnapshot(q, (snapshot) => {
            let blogdata = [];
            snapshot.docs.map((doc) => {
                blogdata.push(doc.data())
            })

            dispatch(SetBlogData({
                BlogDatas: blogdata,
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
