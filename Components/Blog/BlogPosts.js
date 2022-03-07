import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';
import { auth, db } from '../../Firebase';
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';



export default function BlogPosts({ blog }) {
    const navigation = useNavigation();
    const [userFollow, setuserFollow] = useState();

    const handleBookMark = async (blog_id) => {
        const bookMarkStatus = !blog.book_mark_by.includes(auth.currentUser.email);

        await updateDoc(doc(db, 'blogs', blog_id), {
            book_mark_by: bookMarkStatus ? arrayUnion(
                auth.currentUser.email
            ) : arrayRemove(
                auth.currentUser.email
            )

        })


    }
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



    return (

        <View style={style.container}>
            {blog && <>
                <PostHeader userFollow={userFollow} handleFollow={handleFollow} navigation={navigation} blog={blog} handleBookMark={handleBookMark} />
                <TouchableOpacity onPress={() => navigation.navigate('Detail', { blogDetail: blog })}>
                    <PostContent blog={blog} navigation={navigation} />
                </TouchableOpacity>
                {/* <PostFooter handleBookMark={handleBookMark} isBookmark={isBookmark} isLiked={isLiked} handleLike={handleLike} /> */}
            </>}
        </View>
    )
}

export const PostHeader = ({ navigation, handleBookMark, isBookmark, blog, handleFollow, userFollow }) => (
    <View style={style.headerContainer} >
        <View style={style.headerFlex} >
            <TouchableOpacity onPress={() => navigation.navigate('Userprofile', { BlogUserDetail: blog.uid })} style={style.proImageContainer}>
                <Image style={style.proImage} source={{ uri: blog.UserPic }}></Image>
            </TouchableOpacity>
            <View>

                <Text style={style.profileName}>{blog.username}</Text>

                <View style={{ flexDirection: 'row' }}>

                    <Ionicons style={{ marginLeft: 10 }} name="time" size={15} color="gray" />
                    <Text style={style.date}>{Moment(blog.createAt.toDate()).fromNow()}</Text>
                </View>

            </View>
        </View>
        <View style={{ flexDirection: 'row', }}>
            {blog && blog.uid == auth.currentUser.uid ? null : <TouchableOpacity onPress={() => handleFollow(blog.usermail, blog.uid)} style={{ marginRight: 20, borderWidth: .5, alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 5 }}>
                {userFollow && userFollow.following.includes(
                    blog.usermail) ? <Text style={{ letterSpacing: 1, fontSize: 10, fontWeight: 'bold' }}>Following</Text> : <Text style={{ letterSpacing: 1, fontSize: 10, fontWeight: 'bold' }}>Follow</Text>}
            </TouchableOpacity>}
            <TouchableOpacity onPress={() => handleBookMark(blog.id)}>
                {blog && blog.book_mark_by.includes(auth.currentUser.email) ? <Ionicons name="bookmark" size={20} color="black" /> : <Ionicons name="bookmark-outline" size={20} color="black" />}
            </TouchableOpacity>
        </View>
    </View>
);


export const PostContent = ({ navigation, blog }) => (

    <View style={style.flexDivider} >
        <View style={style.imageContainer}>
            <Image style={style.titleImage} source={{ uri: blog.titleImage }}></Image>
        </View>

        <View style={style.PostTitleContainer} >

            <Text style={style.postTitle}>{blog.title}</Text>
            <View style={{ marginTop: 20, backgroundColor: '#f7f7f9', alignSelf: 'flex-start', borderRadius: 5, paddingVertical: 3, paddingHorizontal: 10 }}>
                <Text style={style.categoryText}>{blog.category}</Text>
            </View>
        </View>



    </View>
);



// export const PostFooter = ({ handleLike, isLiked, handleBookMark, isBookmark }) => (
//     <View style={style.postFooterContainer}>
//         <TouchableOpacity >
//             <FontAwesome5 name="comment" size={20} color="black" />
//         </TouchableOpacity>



//         {/* {like} */}
//         <View style={style.likeContainer}>
//             <TouchableOpacity onPress={handleLike}  >
//                 {isLiked ? <Ionicons name="heart" size={20} color="red" /> : <Ionicons name="heart-outline" size={20} color="black" />}
//             </TouchableOpacity>
//             <Text>{isLiked ? 13 : 12}</Text>
//         </View>
//         {/* {bookmark} */}

//         <TouchableOpacity style={style.bookmarkIcon} onPress={handleBookMark}>
//             {isBookmark ? <Ionicons name="bookmark" size={20} color="black" /> : <Ionicons name="bookmark-outline" size={20} color="black" />}
//         </TouchableOpacity>








//     </View >
// );








const style = StyleSheet.create({
    container: {
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#fafafa',

        // paddingHorizontal: 10,
        paddingTop: 20,
        // marginHorizontal: 20
    },
    // ----------PostHeader--------------------
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
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
        marginLeft: 3
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
        height: 100,
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
        marginHorizontal: 15,
        marginBottom: 20
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
        justifyContent: 'space-between',
        backgroundColor: '#fcfcfc',
        elevation: 0.5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5
    },
    categoryText: {
        color: 'gray', fontSize: 12,
        letterSpacing: 1
    },
    footerFlex: {
        marginLeft: 30, flexDirection: 'row', justifyContent: 'space-evenly', flex: 1
    },
    likeContainer: {
        flexDirection: 'row',
    },
    bookmarkIcon: {

    }

})