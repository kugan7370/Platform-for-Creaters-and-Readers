import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
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
const BackImage = 'data:image/jpeg;base64,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'

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

        <ImageBackground source={{ uri: BackImage }} style={{ flex: 1 }}>

            {/* {profile} */}
            {user && <>

                <View View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50, marginHorizontal: 20, marginBottom: 30 }}>

                    <View style={{ height: 100, width: 100 }}>
                        <Image style={{ height: '100%', width: '100%', borderRadius: 50 }} source={{ uri: user.pro_pic }} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 50 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.username}</Text>
                        <Text style={{ color: 'gray' }}>{user.email}</Text>
                        {/* <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'flex-start', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, backgroundColor: "green" }}>
                            <Ionicons name="md-chatbubbles-outline" size={20} color="white" />
                            <Text style={{ marginLeft: 10, color: 'white' }}>Message</Text>
                        </TouchableOpacity> */}
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
                        {UserFollow ? <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{UserFollow.followers.length}</Text> : <Text style={{ fontSize: 18, fontWeight: 'bold' }}>0</Text>}
                        <Text>Followers</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        {UserFollow ? <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{UserFollow.following.length}</Text> : <Text style={{ fontSize: 18, fontWeight: 'bold' }}>0</Text>}
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
                            <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: '800', letterSpacing: 1 }}> Posts</Text>
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
        </ImageBackground>


    );
};

export default ProfileDetails;
