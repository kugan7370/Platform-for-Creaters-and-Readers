import { View, Text, Image, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Headers from '../Common/Headers'
import { useRoute } from '@react-navigation/native'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from '../../Firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import { color } from '../../Color'

const Followers = () => {
    const route = useRoute();
    const [FollowerEmails, setFollowerEmails] = useState()

    const [userDetails, setuserDetails] = useState()


    useEffect(() => {
        let { UserFollowersEmail } = route.params;

        setFollowerEmails(UserFollowersEmail)

    }, [])

    // userDetails
    useEffect(() => {
        let isMounted = true

        try {
            const ref = collection(db, 'users')
            const q = query(ref, where('email', 'in', FollowerEmails))
            const snap = onSnapshot(q, (snapshot) => {
                let userDetails = [];
                if (isMounted) {
                    snapshot.docs.map((doc) => {

                        userDetails.push(doc.data())


                        // console.log(doc.data());

                    })

                    setuserDetails(userDetails);
                }


            })
        } catch (error) {
            let userDetails = [];

            setuserDetails(userDetails)
        }

        return () => { isMounted = false }
    }, [FollowerEmails])


    return (
        <SafeAreaView>
            <StatusBar backgroundColor={color.primaryColor} barStyle='dark-content' />
            <Headers headerName={'Followers'} />

            {userDetails && userDetails.map((userDetail) => (
                <View key={userDetail.uid} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1, alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 40, height: 40, borderRadius: 10 }} source={{ uri: userDetail.pro_pic }} />
                        <Text style={{ marginLeft: 10 }}>{userDetail.username}</Text>
                    </View>

                    {/* <View style={{ borderWidth: 1, borderRadius: 5 }}>
                        <Text style={{ paddingVertical: 3, paddingHorizontal: 10 }} >Following</Text>
                    </View> */}
                </View>
            ))}


        </SafeAreaView>
    )
}

export default Followers