import { View, Text, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import BlogPosts from '../Blog/BlogPosts';
import Headers from '../Common/Headers';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../Color';
import FocusAwareStatusBar from '../Common/FocusAwareStatusBar';
const { height } = Dimensions.get('screen');


export default function BookMarks() {
    const route = useRoute();
    const [userBookMark, setuserBookMark] = useState();
    const [UserEmail, setUserEmail] = useState();

    useEffect(() => {
        try {
            const { usermail } = route.params;
            setUserEmail(usermail);
        } catch (error) {
            setUserEmail(auth.currentUser.email);
        }

    }, [])

    useEffect(() => {
        let isMounted = true
        try {
            const ref = collection(db, 'blogs')

            const q = query(ref, where('book_mark_by', 'array-contains', UserEmail))
            const snapdata = onSnapshot(q, (snapshot) => {

                let FollowingBlog = [];
                if (isMounted) {
                    snapshot.docs.map((doc) => {

                        FollowingBlog.push({ ...doc.data(), id: doc.id })
                    })
                    setuserBookMark(FollowingBlog)
                }

            })
        } catch (error) {
            let FollowingBlog = [];
            setuserBookMark(FollowingBlog)

        }
        return () => { isMounted = false }
    }, [UserEmail])



    return (
        <>
            {
                UserEmail && UserEmail == auth.currentUser.email ?
                    <SafeAreaView style={{ flex: 1 }}>
                        <FocusAwareStatusBar barStyle="light-content" backgroundColor={color.primaryColor} />
                        <Headers headerName={'Bookmarks'} />

                        <ScrollView style={{ height: height * 0.85 }}>
                            {userBookMark && userBookMark.map((blog) => (
                                <BlogPosts blog={blog} key={blog.id} />
                            ))
                                // :
                                // <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                //     <Text>nothing following</Text>
                                // </View>

                            }
                        </ScrollView>
                    </SafeAreaView>
                    :
                    <ScrollView nestedScrollEnabled={true}>
                        {userBookMark && userBookMark.map((blog, i) => (
                            <BlogPosts blog={blog} key={blog.id} />
                        ))
                            // :
                            // <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            //     <Text>nothing following</Text>
                            // </View>

                        }
                    </ScrollView>
            }
        </>
    );
}
