import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { SetSignOut, SignInUser } from '../../Redux/Reducers/UserSlicer';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../Firebase';
// import { GetUserFollows } from '../../Redux/Reducers/UserFollowSlicer';
import { GetBlogs } from '../../Redux/Reducers/BlogSlicer';
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import BlogPosts from '../Blog/BlogPosts';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProfileTopNavigations from './ProfileTopNavigations';
// import { GetSignUserBlogs } from '../../Redux/Reducers/SignInUserBlogSlicer';


const Userprofile = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const [BlogUser, setBlogUser] = useState();
    const [UserFollow, setUserFollow] = useState();
    const [userPost, setuserPost] = useState();
    const [userDetails, setuserDetails] = useState()
    const [authUserFollow, setAuthUserFollow] = useState()



    useEffect(() => {
        let { BlogUserDetail } = route.params;

        setBlogUser(BlogUserDetail);

    }, [])







    // userPost
    useEffect(() => {
        let isMounted = true
        try {
            const ref = collection(db, 'blogs')
            const q = query(ref, where('uid', '==', BlogUser))
            const snap = onSnapshot(q, (snapshot) => {
                let userPost = []
                if (isMounted) {
                    snapshot.docs.map((doc) => {
                        userPost.push({ ...doc.data(), id: doc.id })
                    })
                    setuserPost(userPost)
                }
            })

        } catch (error) {
            let userPost = []
            setuserPost(userPost)
        }
        return () => { isMounted = false }
    }, [BlogUser])


    // userDetails
    useEffect(() => {
        let isMounted = true

        try {
            const ref = collection(db, 'users')
            const q = query(ref, where('uid', '==', BlogUser))
            const snap = onSnapshot(q, (snapshot) => {
                if (isMounted) {
                    snapshot.docs.map((doc) => {

                        setuserDetails(doc.data())
                        // console.log(doc.data());

                    })
                }


            })
        } catch (error) {
            let userDetails = [];
            setuserDetails(userDetails)
        }

        return () => { isMounted = false }
    }, [BlogUser])


    // Get follow Details
    useEffect(() => {
        let isMounted = true
        try {
            const ref = collection(db, 'Follow')
            const q = query(ref, where('uid', '==', BlogUser))
            const snap = onSnapshot(q, (snapshot) => {
                if (isMounted) {
                    snapshot.docs.map((doc) => {

                        setUserFollow(doc.data())

                    })
                }


            })
        } catch (error) {
            let UserFollow = [];
            setUserFollow(UserFollow);
        }


        return () => { isMounted = false }
    }, [BlogUser])



    //get Following Auth user
    useEffect(() => {
        let isMounted = true
        try {
            const followref = collection(db, 'Follow');
            const q = query(followref, where('uid', '==', auth.currentUser.uid))
            const onsnapsfollow = onSnapshot(q, (snaps) => {
                if (isMounted) {
                    snaps.docs.map((doc) => {
                        setAuthUserFollow(doc.data());
                    })
                }


            })

        } catch (error) {
            let authUserFollow = [];
            setAuthUserFollow(authUserFollow);
        }
        return () => { isMounted = false }
    }, [db])


    // for following 
    const handleFollow = async (blogusermail, bloguserId) => {

        // check is it exits or not
        const currentFollowingStatus = !authUserFollow.following.includes(
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

        <ScrollView style={{ backgroundColor: 'white', height: '100%' }}>

            {/* {profile} */}


            {userDetails && <View View style={{ flexDirection: 'row', marginTop: 80, marginHorizontal: 20 }}>

                <View style={{ height: 120, width: 120 }}>
                    <Image style={{ height: '100%', width: '100%', borderRadius: 40 }} source={{ uri: userDetails.pro_pic }} />


                </View>

                <View style={{ flex: 1, marginLeft: 10 }}>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userDetails.username}</Text>
                        <Text style={{ color: 'gray' }}>{userDetails.email}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 30, marginLeft: 10 }}>
                        <View style={{ alignItems: 'center' }}>
                            {userPost && <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{userPost.length}</Text>}
                            <Text>Posts</Text>
                        </View>
                        <TouchableOpacity onPress={() => UserFollow.followers.length ? navigation.navigate('Followers', { UserFollowersEmail: UserFollow.followers }) : null} style={{ alignItems: 'center' }}>
                            {UserFollow.followers ? <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{UserFollow.followers.length}</Text> : <Text style={{ fontSize: 18, fontWeight: 'bold' }}>0</Text>}
                            <Text>Followers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => UserFollow.following.length ? navigation.navigate('Following', { UserFollowingEmail: UserFollow.following }) : null} style={{ alignItems: 'center' }}>
                            {UserFollow.followers ? <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{UserFollow.following.length}</Text> : <Text style={{ fontSize: 18, fontWeight: 'bold' }}>0</Text>}
                            <Text>Following</Text>
                        </TouchableOpacity>
                    </View>


                </View>


            </View>}

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                {userDetails && userDetails.uid == auth.currentUser.uid ? null : <TouchableOpacity onPress={() => navigation.navigate('ChatMessages', { BlogUserDetail: userDetails })} style={{ flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 40, borderRadius: 10, backgroundColor: "#0e0047" }}>
                    <Ionicons name="md-chatbubbles-outline" size={20} color="white" />
                    <Text style={{ marginLeft: 10, color: 'white' }}>Message</Text>
                </TouchableOpacity>}

                {(userDetails && authUserFollow) && <TouchableOpacity onPress={() => handleFollow(userDetails.email, userDetails.uid)} style={{ borderColor: '#0e0047', borderWidth: 1, paddingHorizontal: 50, paddingVertical: 5, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                    {authUserFollow.following.includes(
                        userDetails.email) ? <Text style={{ color: '#0e0047', }}>Following</Text> : <Text style={{ color: '#0e0047', }}>Follow</Text>}
                </TouchableOpacity>}
            </View>





            {/* {postMessage,following, follower} */}




            {/* {profile lists} */}
            {userDetails &&
                <View style={{ marginTop: 50 }}>
                    <ProfileTopNavigations userId={userDetails.uid} usermail={userDetails.email} />
                </View>
                // <View style={{ marginTop: 50, }}>

                //     <TouchableOpacity onPress={() => navigation.navigate('MyPosts', { userId: userDetails.uid })} style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
                //         <View style={{ flexDirection: 'row' }}>
                //             <Feather name="book-open" size={24} color="black" />
                //             <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: '800', letterSpacing: 1 }}> Posts</Text>
                //         </View>
                //         <MaterialIcons name="keyboard-arrow-right" size={30} color="gray" />
                //     </TouchableOpacity>

                //     <TouchableOpacity onPress={() => navigation.navigate('BookMarks', { usermail: userDetails.email })} style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
                //         <View style={{ flexDirection: 'row' }}>
                //             <Feather name="bookmark" size={24} color="black" />
                //             <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: '800', letterSpacing: 1 }}>Book Marks</Text>
                //         </View>
                //         <MaterialIcons name="keyboard-arrow-right" size={30} color="gray" />
                //     </TouchableOpacity>

                //     <TouchableOpacity onPress={() => navigation.navigate('LikedPosts', { usermail: userDetails.email })} style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
                //         <View style={{ flexDirection: 'row' }}>
                //             <AntDesign name="like2" size={24} color="black" />
                //             <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: '800', letterSpacing: 1 }}>Liked Posts</Text>
                //         </View>
                //         <MaterialIcons name="keyboard-arrow-right" size={30} color="gray" />
                //     </TouchableOpacity>





            }

        </ScrollView>


    );
};

export default Userprofile;
