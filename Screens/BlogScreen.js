import { useNavigation } from '@react-navigation/native'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import BlogHeader from '../Components/Blog/BlogHeader'
import BlogPosts from '../Components/Blog/BlogPosts'
import BlogSearch from '../Components/Blog/BlogSearch'
import { auth, db } from '../Firebase'
import { GetBlogs, SetBlogData } from '../Redux/Reducers/BlogSlicer'


export default function BlogScreen() {
    const dispatch = useDispatch();
    const blogs = useSelector(GetBlogs)
    // const [query, setquery] = useState('')
    const [searchquery, setsearchquery] = useState('')



    useEffect(() => {
        let isMounted = true
        try {
            const ref = collection(db, 'blogs')
            const q = query(ref, where("uid", "not-in", [auth.currentUser.uid]))
            const snapdata = onSnapshot(q, (snapshot) => {
                let blogdata = [];
                if (isMounted) {
                    snapshot.docs.map((doc) => {
                        blogdata.push({ ...doc.data(), id: doc.id })
                    })

                    dispatch(SetBlogData({
                        BlogDatas: blogdata,
                    }))
                }

            })
        } catch (error) {
            let blogdata = [];
            dispatch(SetBlogData({
                BlogDatas: blogdata,
            }))
        }
        return () => { isMounted = false }
    }, [db])



    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <BlogHeader />




            {/* <BlogSearch /> */}
            {/* {search bar} */}
            <View style={{
                flexDirection: 'row',
                height: 50, alignItems: 'center', marginHorizontal: 20, borderRadius: 10, backgroundColor: '#fcfcfc', paddingHorizontal: 10, borderColor: 'gray', marginBottom: 10
            }}>
                <Ionicons name="search" size={24} color="black" />
                <TextInput onChangeText={(text) => setsearchquery(text)} style={{ padding: 5, flex: 1, }} placeholder='Search'></TextInput>
            </View>






            <ScrollView>
                {blogs && blogs.filter((item) => item.username.toLowerCase().includes(searchquery) || item.usermail.toLowerCase().includes(searchquery) || item.title.toLowerCase().includes(searchquery)).map((blog) => (
                    <BlogPosts blog={blog} key={blog.id} />
                ))

                }
            </ScrollView>

        </View>
    )
}
