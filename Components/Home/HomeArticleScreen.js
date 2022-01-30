import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../Firebase';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { GetFollowingBlogs, SetFollowingBlog } from '../../Redux/Reducers/BlogSlicer';
import { SignInUser } from '../../Redux/Reducers/UserSlicer';
import BlogPosts from '../Blog/BlogPosts';



const HomeArticleScreen = () => {
    const users = useSelector(SignInUser);
    const blogs = useSelector(GetFollowingBlogs);
    const dispatch = useDispatch();

    const getBlogs = () => {


        try {
            const q = query((collection(db, 'blogs')), where("usermail", 'in', users.following))
            const snapdata = onSnapshot(q, (snapshot) => {
                let FollowingBlog = [];
                snapshot.docs.map((doc) => {
                    // console.log(doc.data());
                    FollowingBlog.push(doc.data())
                })

                dispatch(SetFollowingBlog({
                    FollowingBlog,
                }))

            })
        } catch (error) {

            let FollowingBlog = [];
            dispatch(SetFollowingBlog({
                FollowingBlog,
            }))

        }








    }

    useEffect(() => {
        getBlogs();
        console.log('redux user', users);
    }, [users])





    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            {/* <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'g', letterSpacing: 1 }}>Following</Text>
            </View> */}
            <ScrollView>
                {blogs && blogs.map((blog, index) => (
                    <BlogPosts blog={blog} key={index} />
                ))

                }
            </ScrollView>

        </View>
    )
};

export default HomeArticleScreen;
