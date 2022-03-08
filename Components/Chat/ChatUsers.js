import { View, Text, ScrollView, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import UserMessage from './UserMessage';
import { useSelector } from 'react-redux';
import { SignInUser } from '../../Redux/Reducers/UserSlicer';
import { useNavigation } from '@react-navigation/native';
const image = 'https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/08/Profile-Photo-Wallpaper.jpg'


export default function ChatUsers() {
    const navigation = useNavigation();
    const [userFollow, setuserFollow] = useState();
    const [FollowingUserDetails, setFollowingUserDetails] = useState();
    const [usersID, setusersID] = useState();
    const user = useSelector(SignInUser);
    //get following user emails
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

    // get following user details

    useEffect(() => {
        let isMounted = true
        try {

            const ref = collection(db, 'users')

            const q = query(ref, where("email", 'in', userFollow.following))
            const snapdata = onSnapshot(q, (snapshot) => {

                let FollowingUserDetails = [];
                if (isMounted) {
                    snapshot.docs.map((doc) => {

                        FollowingUserDetails.push({ ...doc.data(), id: doc.id })
                    })

                    setFollowingUserDetails(FollowingUserDetails)

                }

            })

        } catch (error) {

            let FollowingUserDetails = [];
            setFollowingUserDetails(FollowingUserDetails)

        }


        return () => { isMounted = false }
    }, [userFollow])

    useEffect(() => {
        let isMounted = true
        try {

            const ref = collection(db, 'users')
            const q = query(ref, where("uid", 'not-in', [auth.currentUser.uid]))
            const snapdata = onSnapshot(q, (snapshot) => {

                let usersID = [];
                if (isMounted) {
                    snapshot.docs.map((doc) => {

                        usersID.push(doc.data())
                    })

                    setusersID(usersID)
                    // console.log(usersID);
                }

            })

        } catch (error) {

            let usersID = [];
            setusersID(usersID)

        }


        return () => { isMounted = false }
    }, [])






    return (
        <View >
            <SafeAreaView style={{ marginHorizontal: 20, }}>
                <ChatHeader />
            </SafeAreaView>

            <View style={{ backgroundColor: '#ffff', height: "80%", borderTopLeftRadius: 20, borderTopRightRadius: 20, marginHorizontal: 10 }}>

                {/* active user */}
                <View style={{ marginVertical: 20, paddingHorizontal: 20, borderRadius: 100 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        {user && <ActiveUser navigation={navigation} usersDetail={user} key={user.id} />}
                        {FollowingUserDetails && FollowingUserDetails.map((usersDetail) => (usersDetail.isOnline ? <ActiveUser navigation={navigation} usersDetail={usersDetail} key={usersDetail.id} /> : null))}

                    </ScrollView>
                </View>
                {/* {UserMessage} */}
                <View >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* {usersID && usersID.map((usersID, i) => (<UserMessage key={i} usersID={usersID} />))} */}
                        {FollowingUserDetails && FollowingUserDetails.map((usersID, i) => (<UserMessage key={i} usersID={usersID} />))}

                    </ScrollView>
                </View>
            </View>
        </View>
    );
}


const ChatHeader = () => (
    <View >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Messages</Text>

        <View>
            <View style={style.searchContainer}>
                <Ionicons name="search" size={24} color="black" />
                <TextInput style={style.textInput} placeholder='Search Users'></TextInput>
            </View>
        </View>

    </View>
)



const ActiveUser = ({ usersDetail, navigation }) => (
    <View>
        {usersDetail && <TouchableOpacity onPress={() => usersDetail.uid !== auth.currentUser.uid ? navigation.navigate('ChatMessages', { BlogUserDetail: usersDetail }) : null} style={{ height: 50, width: 50, borderRadius: 25, marginRight: 22 }}>
            <Image style={{ height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 25 }} source={{ uri: usersDetail.pro_pic }} />
            <View style={{ backgroundColor: usersDetail.isOnline ? 'green' : 'red', height: 8, width: 8, borderRadius: 5, position: 'absolute', top: 5, right: 0 }}>

            </View>
        </TouchableOpacity>}
        <Text style={{ color: 'gray' }}>{usersDetail.uid == auth.currentUser.uid ? "me" : usersDetail.username}</Text>
    </View>
)






const style = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        // borderWidth: 1,
        height: 50,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#fcfcfc',
        paddingHorizontal: 10,
        borderColor: 'gray',
        marginBottom: 20,
        marginTop: 30
    },
    textInput: {

        padding: 5,
        flex: 1
    }
})