import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../Firebase';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { GetFollowingBlogs, SetFollowingBlog } from '../../Redux/Reducers/BlogSlicer';
import { SignInUser } from '../../Redux/Reducers/UserSlicer';
import BlogPosts from '../Blog/BlogPosts';
import ActivityIndicators from '../Common/ActivityIndicator';
import { Feather } from '@expo/vector-icons';


const HomeArticleScreen = () => {

    const [indicator, setindicator] = useState(true);
    const dispatch = useDispatch();
    const userdetails = useSelector(SignInUser);
    // const blogs = useSelector(GetFollowingBlogs);
    const [userFollow, setuserFollow] = useState();
    const [FollowingBlogs, setFollowingBlogs] = useState();
    // get following details


    useEffect(() => {
        let isMounted = true
        try {
            const followref = collection(db, 'Follow');
            const q = query(followref, where('uid', '==', auth.currentUser.uid))
            const onsnapsfollow = onSnapshot(q, (snaps) => {
                if (isMounted) {
                    snaps.docs.map((doc) => {
                        // console.log(doc.data());

                        setuserFollow({ ...doc.data(), id: doc.id });

                    })
                }


            })

        } catch (error) {
            let follow = [];
            setuserFollow(follow);
        }


        return () => { isMounted = false }
    }, [])

    // get following Blogs



    useEffect(() => {
        let isMounted = true
        try {
            setindicator(true);
            const ref = collection(db, 'blogs')

            const q = query(ref, where("usermail", 'in', userFollow.following), orderBy('createAt', 'desc'))
            const snapdata = onSnapshot(q, (snapshot) => {

                let FollowingBlog = [];
                if (isMounted) {
                    snapshot.docs.map((doc) => {

                        FollowingBlog.push({ ...doc.data(), id: doc.id })
                    })

                    setFollowingBlogs(FollowingBlog)
                    setindicator(false);
                }

            })

        } catch (error) {

            let FollowingBlog = [];
            setFollowingBlogs(FollowingBlog)
            setindicator(false);
        }


        return () => { isMounted = false }
    }, [userFollow])





    const navigation = useNavigation();
    return (
        <ScrollView nestedScrollEnabled={true} >
            {FollowingBlogs && FollowingBlogs.map((FollowingBlog) => (
                <BlogPosts blog={FollowingBlog} key={FollowingBlog.id} />
            ))



                // <FlatList
                //     data={FollowingBlogs}
                //     keyExtractor={(item) => item.id}
                //     renderItem={({ item }) => (

                //         <BlogPosts blog={item} />
                //     )}

                // />

            }
        </ScrollView>

    )
};

export default HomeArticleScreen;
