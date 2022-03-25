import { useNavigation } from '@react-navigation/native'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import BlogHeader from '../Components/Blog/BlogHeader'
import BlogPosts from '../Components/Blog/BlogPosts'
import BlogSearch from '../Components/Blog/BlogSearch'
import { auth, db } from '../Firebase'
import { GetBlogs, SetBlogData } from '../Redux/Reducers/BlogSlicer'
import BlogTopNavigation from '../Components/Blog/BlogTopNavigation'
import { color } from '../Color'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function BlogScreen() {
    const dispatch = useDispatch();
    const blogs = useSelector(GetBlogs)
    // const [query, setquery] = useState('')
    const [searchquery, setsearchquery] = useState('')



    // useEffect(() => {
    //     let isMounted = true
    //     try {
    //         const ref = collection(db, 'blogs')
    //         const q = query(ref, orderBy('createAt', 'desc'))
    //         const snapdata = onSnapshot(q, (snapshot) => {
    //             let blogdata = [];
    //             if (isMounted) {
    //                 snapshot.docs.map((doc) => {
    //                     blogdata.push({ ...doc.data(), id: doc.id })
    //                 })

    //                 dispatch(SetBlogData({
    //                     BlogDatas: blogdata,
    //                 }))
    //             }

    //         })
    //     } catch (error) {
    //         let blogdata = [];
    //         dispatch(SetBlogData({
    //             BlogDatas: blogdata,
    //         }))
    //     }
    //     return () => { isMounted = false }
    // }, [db])



    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={color.primaryColor} />
            <ScrollView>
                <BlogHeader />




                {/* <BlogSearch /> */}
                {/* {search bar} */}
                <View style={{ backgroundColor: color.primaryColor }}>
                    <View style={{
                        flexDirection: 'row',
                        height: 50, alignItems: 'center', marginHorizontal: 20, borderRadius: 10, paddingHorizontal: 10, backgroundColor: '#fcfcfc', borderColor: 'gray',
                    }}>
                        <Ionicons name="search" size={24} color="black" />
                        <TextInput onChangeText={(text) => setsearchquery(text)} style={{ padding: 5, flex: 1, marginLeft: 20 }} placeholder='Search'></TextInput>
                    </View>
                </View>



                <BlogTopNavigation searchquery={searchquery} />

            </ScrollView>
            {/* <ScrollView>
                {blogs && blogs.filter((item) => item.username.toLowerCase().includes(searchquery) || item.usermail.toLowerCase().includes(searchquery) || item.title.toLowerCase().includes(searchquery)).map((blog) => (
                    blog.uid !== auth.currentUser.uid ? <BlogPosts blog={blog} key={blog.id} /> : null
                ))

                }
            </ScrollView> */}

        </SafeAreaView>
    )
}
