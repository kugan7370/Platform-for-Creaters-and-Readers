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
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import BlogPosts from '../Blog/BlogPosts';
import { useNavigation } from '@react-navigation/native';
// import { GetSignUserBlogs } from '../../Redux/Reducers/SignInUserBlogSlicer';


const ProfileDetails = () => {
    const dispatch = useDispatch();
    const user = useSelector(SignInUser);
    const navigation = useNavigation();


    const [UserFollow, setUserFollow] = useState();
    const [userPost, setuserPost] = useState();


    const userSignOut = async () => {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            isOnline: false,
        });
        // dispatch(setBlogDataOut())
        signOut(auth).then(() => {
            dispatch(SetSignOut())
        })
    }


    // Get follow Details
    useEffect(() => {
        let isMounted = true
        try {
            const ref = collection(db, 'Follow')
            const q = query(ref, where('uid', '==', auth.currentUser.uid))
            const snap = onSnapshot(q, (snapshot) => {
                if (isMounted) {
                    snapshot.docs.map((doc) => {

                        setUserFollow({ ...doc.data(), id: doc.id })

                    })
                }


            })
        } catch (error) {
            let UserFollow = [];
            setUserFollow(UserFollow);
        }


        return () => { isMounted = false }
    }, [])


    useEffect(() => {
        let isMounted = true
        try {
            const ref = collection(db, 'blogs')
            const q = query(ref, where('uid', '==', auth.currentUser.uid))
            const snap = onSnapshot(q, (snapshot) => {
                let SignUserBlog = []
                if (isMounted) {
                    snapshot.docs.map((doc) => {
                        SignUserBlog.push({ ...doc.data(), id: doc.id })
                    })
                    setuserPost(SignUserBlog)
                }
            })

        } catch (error) {
            let SignUserBlog = []
            setuserPost(SignUserBlog)
        }
        return () => { isMounted = false }
    }, [])







    return (

        <View style={{ backgroundColor: 'white', height: '100%' }}>

            {/* {profile} */}
            {user && <>

                <View View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50, marginHorizontal: 20, marginBottom: 30 }}>

                    <View style={{ height: 100, width: 100 }}>
                        <Image style={{ height: '100%', width: '100%', borderRadius: 50 }} source={{ uri: user.pro_pic }} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 50 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.username}</Text>
                        <Text style={{ color: 'gray' }}>{user.email}</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'flex-start', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, backgroundColor: "green" }}>
                            <Ionicons name="md-chatbubbles-outline" size={20} color="white" />
                            <Text style={{ marginLeft: 10, color: 'white' }}>Message</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* {postMessage,following, follower} */}
                <Divider width={0.5} color="gray" />
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30, marginBottom: 30 }}>
                    <View style={{ alignItems: 'center' }}>
                        {userPost && <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{userPost.length}</Text>}
                        <Text>Posts</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        {UserFollow && <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{UserFollow.followers.length}</Text>}
                        <Text>Followers</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        {UserFollow && <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{UserFollow.following.length}</Text>}
                        <Text>Following</Text>
                    </View>
                </View>
                <Divider width={0.5} color="gray" />


                {/* {profile lists} */}

                <View style={{ marginTop: 50, }}>
                    <TouchableOpacity style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome name="edit" size={24} color="black" />
                            <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: '800', letterSpacing: 1 }}>Edit Profile</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="gray" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('MyPosts')} style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Feather name="book-open" size={24} color="black" />
                            <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: '800', letterSpacing: 1 }}>My Posts</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="gray" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('BookMarks')} style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Feather name="bookmark" size={24} color="black" />
                            <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: '800', letterSpacing: 1 }}>Book Marks</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="gray" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('LikedPosts')} style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign name="like2" size={24} color="black" />
                            <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: '800', letterSpacing: 1 }}>Liked Posts</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="gray" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={userSignOut} style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name="logout" size={24} color="black" />
                            <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: '800', letterSpacing: 1 }}>Logout</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="gray" />

                    </TouchableOpacity>



                </View>
            </>}
        </View>


    );
};

export default ProfileDetails;
