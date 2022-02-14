import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Dimensions, TextInput, Button } from 'react-native'
import { Ionicons, SimpleLineIcons, FontAwesome, AntDesign } from '@expo/vector-icons';

import { addDoc, arrayRemove, arrayUnion, collection, collectionGroup, doc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import { SignInUser } from '../../Redux/Reducers/UserSlicer';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import { useDispatch } from 'react-redux';
import BlogPosts from '../Blog/BlogPosts';

export default function DetailContent({ SelectedBlog }) {
    const dispatch = useDispatch();
    const user = useSelector(SignInUser);
    const [userFollow, setuserFollow] = useState();
    const [userblogs, setuserblogs] = useState();
    const [Comments, setComments] = useState('')
    const [ThisPost, setThisPost] = useState();
    const [getComments, setgetComments] = useState()
    // get user Following details


    useEffect(() => {
        let isMounted = true
        try {
            const followref = collection(db, 'Follow');
            const q = query(followref, where('uid', '==', auth.currentUser.uid))
            const onsnapsfollow = onSnapshot(q, (snaps) => {
                if (isMounted) {
                    snaps.docs.map((doc) => {
                        setuserFollow(doc.data());
                    })
                }


            })

        } catch (error) {
            let follow = [];
            setuserFollow(follow);
        }
        return () => { isMounted = false }
    }, [db])

    // {get user blogs}

    // useEffect(() => {
    //     let isMounted = true
    //     try {
    //         const ref = collection(db, 'blogs')

    //         const q = query(ref, where("usermail", '==', SelectedBlog.usermail))
    //         const snapdata = onSnapshot(q, (snapshot) => {

    //             let userblogs = [];
    //             if (isMounted) {
    //                 snapshot.docs.map((doc) => {

    //                     userblogs.push({ ...doc.data(), id: doc.id })
    //                 })

    //                 setuserblogs(userblogs)

    //             }
    //         })
    //     } catch (error) {

    //         let userblogs = [];
    //         setuserblogs(userblogs)

    //     }

    //     return () => { isMounted = false }
    // }, [])

    // { for like}

    useEffect(() => {
        let isMounted = true
        try {
            const ref = doc(db, 'blogs', SelectedBlog.id)

            const snapdata = onSnapshot(ref, (doc) => {
                if (isMounted) {
                    setThisPost(doc.data())
                }
            })
        } catch (error) {

            let ThisPost = [];
            setThisPost(ThisPost)

        }

        return () => { isMounted = false }
    }, [db])

    useEffect(() => {
        let isMounted = true
        try {
            const ref = collection(db, 'blogs', SelectedBlog.id, "Comments")

            const snapdata = onSnapshot(ref, (snapshot) => {
                if (isMounted) {
                    setgetComments(snapshot.docs)
                }
            })
        } catch (error) {

            let getComments = [];
            setgetComments(getComments)

        }

        return () => { isMounted = false }
    }, [db])





    const handleFollow = async (blogusermail, bloguserId) => {

        // check is it exits or not
        const currentFollowingStatus = !userFollow.following.includes(
            blogusermail)

        // Following
        const ref = doc(db, 'Follow', auth.currentUser.uid)
        await updateDoc(ref, {
            following: currentFollowingStatus ? arrayUnion(blogusermail) : arrayRemove(blogusermail)
        })

        // Followers

        const ref2 = doc(db, 'Follow', bloguserId)
        await updateDoc(ref2, {
            followers: currentFollowingStatus ? arrayUnion(auth.currentUser.email) : arrayRemove(auth.currentUser.email)
        })




    }

    const AddComments = async () => {
        await addDoc(collection(db, 'blogs', SelectedBlog.id, 'Comments'), {
            username: user.username,
            userPro_Pic: user.pro_pic,
            comment: Comments,
            createAt: serverTimestamp(),
        })
        setComments('');
    }


    const Handlelike = async () => {
        const likestatus = !ThisPost.likes_by_users.includes(auth.currentUser.email);
        const ref = doc(db, 'blogs', SelectedBlog.id)
        await updateDoc(ref, {
            likes_by_users: likestatus ? arrayUnion(auth.currentUser.email) : arrayRemove(auth.currentUser.email)
        })
    }


    return (
        <ScrollView style={style.container} >

            {/* {title Image} */}
            <View style={style.imageContainer}>
                <Image style={style.image} source={{ uri: SelectedBlog.titleImage }} />
            </View>


            {/* {title} */}
            <View style={style.textContainer} >
                <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold', letterSpacing: 1.5, textTransform: 'capitalize' }}>{SelectedBlog.title}</Text>
            </View>


            {/* {profile} and following */}
            <View style={style.headerContainer} >
                <View style={style.headerFlex} >
                    <View style={style.proImageContainer}>
                        <Image style={style.proImage} source={{ uri: SelectedBlog.UserPic }}></Image>
                    </View>
                    <View>
                        <Text style={style.profileName}>{SelectedBlog.username}</Text>
                        <Text style={style.date}>{Moment(SelectedBlog.createAt.toDate()).fromNow()}</Text>
                    </View>
                </View>

                <View>
                    {user && user.uid == SelectedBlog.uid ? null : (<TouchableOpacity style={style.followButton} onPress={() => handleFollow(SelectedBlog.usermail, SelectedBlog.uid)}>


                        {userFollow && userFollow.following.includes(
                            SelectedBlog.usermail) ? <SimpleLineIcons name="user-following" size={18} color="#580abf" /> : <SimpleLineIcons name="user-follow" size={18} color="#580abf" />}

                        {userFollow && userFollow.following.includes(
                            SelectedBlog.usermail) ? <Text style={{ color: '#580abf', marginLeft: 10, fontWeight: 'bold' }}>Following</Text> : <Text style={{ color: '#580abf', marginLeft: 10, fontWeight: 'bold' }}>Follow</Text>}
                    </TouchableOpacity>)}


                </View>
            </View>

            {/* {Description} */}

            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Description</Text>
            </View>

            <ScrollView style={{ marginHorizontal: 20 }}>
                <View>
                    <Text style={{ textAlign: 'justify', paddingVertical: 10, lineHeight: 25 }}>{SelectedBlog.description}</Text>
                </View>

            </ScrollView>

            {/* {impressions} */}
            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Impressions</Text>
            </View>
            <View style={style.headerContainer}>
                {/* likes */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={Handlelike}>
                        {ThisPost && ThisPost.likes_by_users.includes(auth.currentUser.email) ? <AntDesign name="like1" size={24} color="black" /> : <AntDesign name="like2" size={24} color="black" />}
                    </TouchableOpacity>
                    {ThisPost && <><Text style={{ marginLeft: 10 }}>{ThisPost.likes_by_users.length}</Text>
                        <Text style={{ marginLeft: 10 }}>{ThisPost.likes_by_users.length > 1 ? "Likes" : 'Like'}</Text></>}
                </View>

                {/* comment */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome name="comments-o" size={24} color="black" />
                    {getComments && <>
                        <Text style={{ marginLeft: 10 }}>{getComments.length}</Text>
                        <Text style={{ marginLeft: 10 }}>{getComments.length > 1 ? "Comments" : "Comment"}</Text>
                    </>}
                </View>
            </View>

            {/* Add comments */}
            <View style={{ marginTop: 20, marginBottom: 150 }}>
                <View style={{ height: 150, borderWidth: 1, marginHorizontal: 20, padding: 20, borderRadius: 10 }} >
                    <TextInput value={Comments} onChangeText={(text) => setComments(text)} placeholder='Enter your Comments' multiline={true} />
                </View>

                <TouchableOpacity onPress={AddComments} style={{ alignSelf: 'flex-end', marginHorizontal: 20, marginTop: 10 }}>
                    <View style={{ backgroundColor: 'green', padding: 10, borderRadius: 10 }}>
                        <Text style={{ color: 'white' }}>Add Comments</Text>
                    </View>
                </TouchableOpacity>

            </View>



            {/* {user posts} */}
            {/* <View style={{ marginTop: 20, marginBottom: 50 }}>
                <View style={{ marginTop: 20, marginHorizontal: 20, marginBottom: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{SelectedBlog.username}'s Posts</Text>
                </View>

                {userblogs && userblogs.map((blog) => (
                    <BlogPosts blog={blog} key={blog.id} />
                ))}

            </View> */}




        </ScrollView >
    )
}


const style = StyleSheet.create({
    container: {
        marginTop: 20,
    },

    imageContainer: {
        width: '100%',
        height: 220,
        overflow: 'hidden',
        paddingHorizontal: 20

    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 50
    },
    textContainer: {
        marginTop: 20,
        paddingHorizontal: 20
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 0.6,
        borderRadius: 20,
        borderColor: '#fcfcfc',
        marginHorizontal: 20

    },
    headerFlex: {
        flexDirection: 'row',

    },
    profileName: {
        marginLeft: 10
    },
    date: {
        color: 'gray',
        fontSize: 12,
        marginLeft: 10
    },
    proImageContainer: {
        height: 30,
        width: 30,
    },
    proImage: {
        height: '100%',
        width: '100%',
        borderRadius: 30
    },
    followButton: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#fafafa', paddingVertical: 10, paddingHorizontal: 15,
        borderRadius: 20,
        elevation: 1,
        borderColor: '#580abf',
        borderWidth: 1
    },

})