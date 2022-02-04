import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { Ionicons, SimpleLineIcons, } from '@expo/vector-icons';

import { addDoc, arrayRemove, arrayUnion, collection, collectionGroup, doc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import { SignInUser } from '../../Redux/Reducers/UserSlicer';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import { useDispatch } from 'react-redux';

export default function DetailContent({ SelectedBlog }) {
    const dispatch = useDispatch();
    const user = useSelector(SignInUser);
    const [userFollow, setuserFollow] = useState();

    // get user Following details
    const getfollowData = () => {
        try {
            const followref = collection(db, 'Follow');
            const q = query(followref, where('uid', '==', auth.currentUser.uid))
            const onsnapsfollow = onSnapshot(q, (snaps) => {

                snaps.docs.map((doc) => {
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


    return (
        <View style={style.container} >

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

            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Description</Text>
            </View>

            <View>
                <ScrollView style={{ height: 230, }}>
                    <Text style={{ textAlign: 'justify', paddingVertical: 10, lineHeight: 25 }}>{SelectedBlog.description}</Text>
                </ScrollView>

            </View>

            {/* {impressions} */}







        </View >
    )
}


const style = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 20


    },

    imageContainer: {
        width: '100%',
        height: 220,
        overflow: 'hidden',


    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 50
    },
    textContainer: {
        marginTop: 20
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
        borderColor: '#fcfcfc'

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