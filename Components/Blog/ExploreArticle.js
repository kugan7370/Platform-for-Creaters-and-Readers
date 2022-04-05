import { useNavigation, useRoute } from '@react-navigation/native'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { auth, db } from '../../Firebase'
import { GetBlogs, SetBlogData } from '../../Redux/Reducers/BlogSlicer'
import BlogPosts from './BlogPosts'





export default function ExploreArticle({ searchData }) {

    // const route = useRoute();
    const dispatch = useDispatch();
    // const blogs = useSelector(GetBlogs)
    const navigation = useNavigation();
    const [ArticleBlogs, setArticleBlogs] = useState()
    // const [searchText, setsearchText] = useState('')

    // useEffect(() => {
    //     try {
    //         const { searchData } = route.params;
    //         setsearchText(searchData)
    //     } catch (error) {

    //     }

    // }, [route])


    useEffect(() => {
        let isMounted = true
        try {
            const ref = collection(db, 'blogs')
            const q = query(ref, orderBy('createAt', 'desc'))
            const snapdata = onSnapshot(q, (snapshot) => {
                let ArticleBlogs = [];
                if (isMounted) {
                    snapshot.docs.map((doc) => {
                        ArticleBlogs.push({ ...doc.data(), id: doc.id })
                    })
                    setArticleBlogs(ArticleBlogs)
                    // dispatch(SetBlogData({
                    //     BlogDatas: blogdata,
                    // }))
                }

            })
        } catch (error) {
            let ArticleBlogs = [];
            setArticleBlogs(ArticleBlogs)
            // dispatch(SetBlogData({
            //     BlogDatas: blogdata,
            // }))
        }
        return () => { isMounted = false }
    }, [])




    return (

        <ScrollView nestedScrollEnabled={true} style={{ backgroundColor: 'white' }}>
            {ArticleBlogs && ArticleBlogs.filter((item) => item.username.toLowerCase().includes(searchData) || item.usermail.toLowerCase().includes(searchData) || item.title.toLowerCase().includes(searchData)).map((blog) => (
                (blog.uid !== auth.currentUser.uid && blog.type == 'Article') ? <BlogPosts blog={blog} key={blog.id} /> : null
            ))

            }
        </ScrollView>

    )
}
