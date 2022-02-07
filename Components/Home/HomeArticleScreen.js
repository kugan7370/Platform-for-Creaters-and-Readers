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
    const dispatch = useDispatch();
    const userdetails = useSelector(SignInUser);
    // const blogs = useSelector(GetFollowingBlogs);
    const [userFollow, setuserFollow] = useState();
    const [FollowingBlogs, setFollowingBlogs] = useState();
    // get following details

    const getfollowData = () => {
        try {
            const followref = collection(db, 'Follow');
            const q = query(followref, where('uid', '==', auth.currentUser.uid))
            const onsnapsfollow = onSnapshot(q, (snaps) => {

                snaps.docs.map((doc) => {
                    // console.log(doc.data());
                    setuserFollow(doc.data());

                })


            })

        } catch (error) {
            let follow = [];
            setuserFollow(follow);
        }
    }

    useEffect(() => {
        getfollowData();
    }, [])

    // get following Blogs

    const getBlogs = () => {
        try {
            const ref = collection(db, 'blogs')

            const q = query(ref, where("usermail", 'in', userFollow.following))
            const snapdata = onSnapshot(q, (snapshot) => {

                let FollowingBlog = [];
                snapshot.docs.map((doc) => {
                    // console.log(doc.data());
                    FollowingBlog.push({ ...doc.data(), id: doc.id })
                })

                setFollowingBlogs(FollowingBlog)
                setindicator(false);

            })
        } catch (error) {

            let FollowingBlog = [];
            setFollowingBlogs(FollowingBlog)

        }

    }

    useEffect(() => {
        getBlogs();

        // console.log('redux user', users);
    }, [userFollow])





    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            {/* <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'g', letterSpacing: 1 }}>Following</Text>
            </View> */}

            {indicator ? <ActivityIndicators color='green' /> :
                (
                    <ScrollView>
                        {FollowingBlogs && FollowingBlogs.map((blog) => (
                            <BlogPosts blog={blog} key={blog.id} />
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
