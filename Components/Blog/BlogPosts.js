import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons';




export default function BlogPosts() {

    const [isLiked, setisLiked] = useState(false)
    const [isBookmark, setisBookmark] = useState(false)
    const handleLike = () => {
        if (!isLiked) {
            setisLiked(true)
        }
        else {
            setisLiked(false)
        }
    }

    const handleBookMark = () => {
        if (!isBookmark) {
            setisBookmark(true)
        }
        else {
            setisBookmark(false)
        }
    }
    return (
        <View style={style.container}>
            <PostHeader />
            <PostContent />
            <PostFooter handleBookMark={handleBookMark} isBookmark={isBookmark} isLiked={isLiked} handleLike={handleLike} />
        </View>
    )
}

export const PostHeader = () => (
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
            <Feather name="more-vertical" size={20} color="black" />
        </View>
    </View>
);


export const PostContent = () => (
    <View style={style.flexDivider}>
        <View style={style.imageContainer}>
            <Image style={style.titleImage} source={{ uri: 'https://techbooky.com/wp-content/uploads/2018/04/technology-and-us-scaled.jpg' }}></Image>
        </View>

        <View style={style.PostTitleContainer} >

            <Text style={style.postTitle}>What are the techonogies for front-end development</Text>

        </View>

    </View>
);



export const PostFooter = ({ handleLike, isLiked, handleBookMark, isBookmark }) => (
    <View style={style.postFooterContainer}>
        {/* {category} */}
        <View style={{ width: 80 }}>
            <Text style={style.categoryText}>Technology</Text>
            <Text></Text>
        </View>

        {/* {like} */}
        <View style={style.footerFlex}>
            <View style={style.likeContainer}>
                <TouchableOpacity onPress={handleLike} >
                    {isLiked ? <Ionicons name="heart" size={24} color="red" /> : <Ionicons name="heart-outline" size={24} color="black" />}
                </TouchableOpacity>
                <Text>12</Text>
            </View>

            <View style={style.bookmarkIcon}>
                <TouchableOpacity onPress={handleBookMark}>
                    {isBookmark ? <Ionicons name="bookmark" size={20} color="black" /> : <Ionicons name="bookmark-outline" size={20} color="black" />}
                </TouchableOpacity>
            </View>
        </View>
    </View>
);








const style = StyleSheet.create({
    container: {
        marginBottom: 10,
        marginHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#fafafa',
        padding: 10,
        paddingTop: 20
    },
    // ----------PostHeader--------------------
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerFlex: {
        flexDirection: 'row', marginBottom: 20
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

    //  ------PostContent--------------------
    imageContainer: {
        height: 90,
        width: 100,

    },
    titleImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 10
    },
    flexDivider: {
        flexDirection: 'row',

    },

    PostTitleContainer: {

        flex: 1,
        marginLeft: 20
    },

    postTitle: {
        fontWeight: '700',
        fontSize: 15,
    },

    // ----------------post Footer------------
    postFooterContainer: {
        flexDirection: 'row', marginTop: 20,

    },
    categoryText: {
        color: 'gray', fontSize: 12
    },
    footerFlex: {
        marginLeft: 30, flexDirection: 'row', justifyContent: 'space-evenly', flex: 1
    },
    likeContainer: {
        flexDirection: 'row', marginRight: 40,
    },
    bookmarkIcon: {
        marginRight: 42
    }

})