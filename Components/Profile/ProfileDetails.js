import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { SetSignOut, SignInUser } from '../../Redux/Reducers/UserSlicer';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase';


const ProfileDetails = () => {
    const dispatch = useDispatch();
    const user = useSelector(SignInUser);

    const userSignOut = () => {
        dispatch(SetSignOut())
        // dispatch(setBlogDataOut())
        signOut(auth)
    }

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
                        <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'flex-start', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, backgroundColor: "green" }}>
                            <Ionicons name="md-chatbubbles-outline" size={20} color="white" />
                            <Text style={{ marginLeft: 10, color: 'white' }}>Message</Text>
                        </View>
                    </View>
                </View>

                {/* {postMessage,following, follower} */}
                <Divider width={0.5} color="gray" />
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30, marginBottom: 30 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>13</Text>
                        <Text>Posts</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>15</Text>
                        <Text>Followers</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>18</Text>
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

                    <TouchableOpacity style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Feather name="book-open" size={24} color="black" />
                            <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: '800', letterSpacing: 1 }}>My Posts</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="gray" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Feather name="bookmark" size={24} color="black" />
                            <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: '800', letterSpacing: 1 }}>Book Marks</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="gray" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
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
