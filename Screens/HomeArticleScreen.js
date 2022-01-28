import { useNavigation } from '@react-navigation/native'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BlogHeader from '../Components/Blog/BlogHeader'
import BlogPosts from '../Components/Blog/BlogPosts'
import BlogSearch from '../Components/Blog/BlogSearch'
import { db } from '../Firebase'
import { SignInUser } from '../Redux/Reducers/UserSlicer'



export default function HomeArticleScreen() {
    const users = useSelector(SignInUser);
    const [blogs, setblogs] = useState([]);


    const getBlogs = () => {
        if (users) {
            const q = query((collection(db, 'blogs')), orderBy("createAt", 'asc'))
            const snapdata = onSnapshot(q, (snapshot) => {
                let blogdata = [];
                snapshot.docs.map((doc) => {
                    blogdata.push({ ...doc.data(), id: doc.id })
                })

                setblogs(blogdata);



            })
        }

    }

    useEffect(() => {
        getBlogs();
    }, [users])



    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            {/* <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'g', letterSpacing: 1 }}>Following</Text>
            </View> */}
            <ScrollView>
                {blogs && blogs.map((blog) => (
                    <BlogPosts blog={blog} key={blog.id} />
                ))

                }
            </ScrollView>

        </View>
    )
}
