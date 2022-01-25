import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { Ionicons, SimpleLineIcons, } from '@expo/vector-icons';

import { collection, collectionGroup, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../Firebase';


export default function DetailContent() {
    const [isFollow, setisFollow] = useState(false)

    const handleFollow = () => {
        if (!isFollow) {
            setisFollow(true)
        }
        else {
            setisFollow(false)
        }
    }


    return (
        <View style={style.container} >

            {/* {title Image} */}
            <View style={style.imageContainer}>
                <Image style={style.image} source={{ uri: 'https://techbooky.com/wp-content/uploads/2018/04/technology-and-us-scaled.jpg' }} />
            </View>


            {/* {title} */}
            <View style={style.textContainer} >
                <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold', letterSpacing: 1.5, textTransform: 'capitalize' }}>What are the techonogies for front-end development</Text>
            </View>


            {/* {profile} and following */}
            <View style={style.headerContainer} >
                <View style={style.headerFlex} >
                    <View style={style.proImageContainer}>
                        <Image style={style.proImage} source={{ uri: 'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80' }}></Image>
                    </View>
                    <View>
                        <Text style={style.profileName}>Kugan_Priyan</Text>
                        <Text style={style.date}>32 min ago</Text>
                    </View>
                </View>

                <View>

                    <TouchableOpacity style={style.followButton} onPress={handleFollow}>
                        {isFollow ? <SimpleLineIcons name="user-following" size={18} color="#580abf" /> : <SimpleLineIcons name="user-follow" size={18} color="#580abf" />}

                        {isFollow ? <Text style={{ color: '#580abf', marginLeft: 10, fontWeight: 'bold' }}>Following</Text> : <Text style={{ color: '#580abf', marginLeft: 10, fontWeight: 'bold' }}>Follow</Text>}

                    </TouchableOpacity>

                </View>
            </View>

            {/* {Description} */}

            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Description</Text>
            </View>

            <View>
                <ScrollView style={{ height: 230, }}>
                    <Text style={{ textAlign: 'justify', paddingVertical: 10, lineHeight: 25 }}>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident.
                    </Text>
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