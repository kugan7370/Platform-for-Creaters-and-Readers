import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../Firebase';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { GetFollowingBlogs, SetFollowingBlog } from '../../Redux/Reducers/BlogSlicer';
import { SignInUser } from '../../Redux/Reducers/UserSlicer';
import BlogPosts from '../Blog/BlogPosts';
import ActivityIndicators from '../Common/ActivityIndicator';



const HomeArticleScreen = () => {
    const [indicator, setindicator] = useState(true);
    const users = useSelector(SignInUser);
    const blogs = useSelector(GetFollowingBlogs);
    const dispatch = useDispatch();

    const getBlogs = () => {


        try {
            const ref = collection(db, 'blogs')
            console.log('following users', users.following);
            const q = query(ref, where("usermail", 'in', users.following))
            const snapdata = onSnapshot(q, (snapshot) => {
                let FollowingBlog = [];
                snapshot.docs.map((doc) => {
                    // console.log(doc.data());
                    FollowingBlog.push(doc.data())
                })

                dispatch(SetFollowingBlog({
                    FollowingBlog,
                }))
                setindicator(false);

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

        // console.log('redux user', users);
    }, [users, db])





    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            {/* <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'g', letterSpacing: 1 }}>Following</Text>
            </View> */}

            {indicator ? <ActivityIndicators color='green' /> :
                (
                    <ScrollView>
                        {blogs && blogs.map((blog, index) => (
                            <BlogPosts blog={blog} key={index} />
                        ))
                            // :
                            // <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            //     <Text>nothing following</Text>
                            // </View>

                        }
                    </ScrollView>
                )
            }

        </View>
    )
};

export default HomeArticleScreen;
