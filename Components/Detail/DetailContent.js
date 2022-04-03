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
import DetailHeader from './DetailHeader';
import { color } from '../../Color';


export default function DetailContent({ SelectedBlog }) {
    const dispatch = useDispatch();
    const user = useSelector(SignInUser);
    const [userFollow, setuserFollow] = useState();
    const [bloguser, setbloguser] = useState()



    //get follow details

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

    useEffect(() => {
        let isMounted = true
        const ref = collection(db, 'users')
        const q = query(ref, where('uid', '==', SelectedBlog.uid))
        const snap = onSnapshot(q, (snapshot) => {
            if (isMounted) {
                snapshot.docs.map((doc) => {


                    setbloguser(doc.data())


                })
            }


        })
        return () => { isMounted = false }
    }, [])




    return (
        <ScrollView style={style.container} >

            {/* {title Image} */}
            <View style={style.imageContainer}>


                <Image style={style.image} source={{ uri: SelectedBlog.titleImage }} />
                {/* <View style={{ position: 'absolute', top: 15, right: 0, left: 0 }}>
                    <DetailHeader />
                </View> */}
            </View>


            {/* {title} */}
            <View style={style.textContainer} >
                <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold', letterSpacing: 1.5, textTransform: 'capitalize' }}>{SelectedBlog.title}</Text>
            </View>


            {/* {profile} and following */}
            <View style={style.headerContainer} >
                <View style={style.headerFlex} >
                    <View style={style.proImageContainer}>
                        {bloguser && <Image style={style.proImage} source={{ uri: bloguser.pro_pic }}></Image>}
                    </View>
                    <View>
                        <Text style={style.profileName}>{SelectedBlog.username}</Text>
                        <Text style={style.date}>{Moment(SelectedBlog.createAt.toDate()).fromNow()}</Text>
                    </View>
                </View>

                <View>
                    {user && user.uid == SelectedBlog.uid ? null : (<TouchableOpacity style={style.followButton} onPress={() => handleFollow(SelectedBlog.usermail, SelectedBlog.uid)}>


                        {userFollow && userFollow.following.includes(
                            SelectedBlog.usermail) ? <SimpleLineIcons name="user-following" size={18} color={color.primaryColor} /> : <SimpleLineIcons name="user-follow" size={18} color={color.primaryColor} />}

                        {userFollow && userFollow.following.includes(
                            SelectedBlog.usermail) ? <Text style={{ color: color.primaryColor, marginLeft: 10, fontWeight: 'bold' }}>Following</Text> : <Text style={{ color: color.primaryColor, marginLeft: 10, fontWeight: 'bold' }}>Follow</Text>}
                    </TouchableOpacity>)}


                </View>
            </View>


            {/* {Description} */}

            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Description</Text>
            </View>

            <ScrollView style={{ marginHorizontal: 20, }}>
                <View>
                    <Text style={{ textAlign: 'justify', paddingVertical: 10, lineHeight: 25 }}>{SelectedBlog.description}</Text>
                </View>

            </ScrollView>

        </ScrollView >
    )
}


const style = StyleSheet.create({
    container: {
        // marginTop: 30,
    },

    imageContainer: {
        width: '100%',
        height: 250,
        // overflow: 'hidden',
        paddingHorizontal: 20

    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20
        borderRadius: 20
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
        borderRadius: 10,
        borderColor: '#fcfcfc',
        marginHorizontal: 20,
        backgroundColor: '#f4fcf9'

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
        flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15,
        borderRadius: 10,
        // elevation: 1,
        borderColor: '#ebebeb',

    },

})