import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Image, Alert, ActivityIndicator, StatusBar, ScrollView } from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik'
import * as yup from 'yup'
import * as EmailValidator from 'email-validator';
import { auth, db } from '../Firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithCredential } from 'firebase/auth';
import { collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import * as Google from 'expo-google-app-auth';
import confiqs from '../confiq';
import ActivityIndicators from '../Components/Common/ActivityIndicator';
import * as Facebook from 'expo-facebook';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../Color';
import { Feather, FontAwesome } from '@expo/vector-icons';
import * as NavigationBar from 'expo-navigation-bar';
// let navcolor = 'white'
import { EXPO_CLIEND_ID, ANDROID_CLIEND_ID } from "@env"

const LoginSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(8, 'min 8 characters').required('Password is required')
});

export default function SignInScreen() {

    const [navcolor, setnavcolor] = useState('white')
    const navigation = useNavigation();
    const [indicater, setindicater] = useState(false)
    const [isLoggedin, setLoggedinStatus] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isImageLoading, setImageLoadStatus] = useState(false);


    NavigationBar.setBackgroundColorAsync(navcolor);
    useEffect(() => (setnavcolor(color.secondaryColor)), [])

    const config = {

        expoClientId: process.env.EXPO_CLIEND_ID,
        androidClientId: process.env.ANDROID_CLIEND_ID,

        scopes: ['profile', 'email'],
        permissions: ["public_profile", "email", "gender", "location"],
    };
    const signInWithGoogle = async () => {
        setindicater(true)
        const { type, accessToken, user, idToken } = await Google.logInAsync(config);

        if (type === 'success') {
            const credential = GoogleAuthProvider.credential(idToken, accessToken);
            const res = await signInWithCredential(auth, credential);


            try {
                const ref = doc(db, "Follow", auth.currentUser.uid)

                const docsnap = await getDoc(ref);
                if (!docsnap.exists()) {
                    await setDoc(doc(db, 'users', auth.currentUser.uid), {
                        uid: auth.currentUser.uid,
                        username: user.name,
                        pro_pic: user.photoUrl,
                        email: user.email,
                        isOnline: true,

                    }).then(async () => {

                        await setDoc(doc(db, 'Follow', auth.currentUser.uid), {
                            uid: auth.currentUser.uid,
                            following: [],
                            followers: [],

                        })




                        setindicater(false)


                    })

                }
                //  for update

                updateDoc(doc(db, 'users', auth.currentUser.uid), {
                    isOnline: true,
                });

            }
            catch (error) {
                alert(error);
            }
            /* Log-Out */
            //   await Google.logOutAsync({ accessToken, ...config });
            /* `accessToken` is now invalid and cannot be used to get data from the Google API with HTTP requests */
        }
        return Promise.reject();
    }

    // const facebookLogIn = async () => {

    //     try {
    //         await Facebook.initializeAsync({
    //             appId: '470142788187367'      // enter app id here

    //         });
    //         const {
    //             type,
    //             token,
    //         } = await Facebook.logInWithReadPermissionsAsync({
    //             permissions: ['public_profile'],
    //         });
    //         if (type === 'success') {
    //             // We are using facebook graph api
    //             fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     setLoggedinStatus(true);
    //                     setUserData(data);
    //                 })
    //                 .catch(e => console.log(e))
    //         } else {
    //             // type === 'cancel'
    //         }
    //     } catch ({ message }) {
    //         Alert.alert(`Facebook Login Error: ${message}`);
    //     }
    // }










    const userSign = (email, password) => {
        try {

            signInWithEmailAndPassword(auth, email, password).then(() => {

                //  for update

                updateDoc(doc(db, 'users', auth.currentUser.uid), {
                    isOnline: true,
                });
            })
        } catch (error) {
            alert(error);
            // Alert.alert(message)
        }


    }



    return (
        <SafeAreaView style={style.container}>
            <StatusBar backgroundColor={'white'} barStyle='dark-content' />
            {indicater ? <ActivityIndicators color={'blue'} /> :
                <View style={{ marginHorizontal: 40 }}>
                    {/* {sign text} */}



                    <View style={style.textContainer}>
                        <Text style={style.text}>Welcome back!</Text>
                    </View>

                    <View style={{ height: 200, width: '100%', alignItems: 'center', }}>
                        <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../assets/undraw_Access_account_re_8spm.png')}></Image>
                    </View>




                    {/* forms*/}

                    <Formik initialValues={
                        {
                            email: '',
                            password: ''
                        }
                    }
                        onSubmit={values => {
                            userSign(values.email, values.password);
                        }}
                        validationSchema={LoginSchema}

                    >
                        {({ handleBlur, handleChange, handleSubmit, values, errors, isValid, setFieldTouched, touched, }) => (

                            <View style={{ marginTop: 20, }}>
                                <View style={[style.textBox, { borderColor: values.email.length < 1 || EmailValidator.validate(values.email) ? '#ccc' : 'red' }]}>
                                    <Feather name="mail" size={20} color="gray" />
                                    <TextInput style={style.textField} onBlur={() => setFieldTouched('email')} onChangeText={handleChange('email')} placeholder='Email'></TextInput>
                                </View>
                                {touched.email && errors.email &&
                                    <Text style={{ fontSize: 12, color: '#FF0D10', marginBottom: 10 }}>{errors.email}</Text>
                                }

                                <View style={[style.textBox, { borderColor: 1 > values.password.length || values.password.length >= 8 ? '#ccc' : 'red' }]}>
                                    <FontAwesome name="lock" size={20} color="gray" />
                                    <TextInput style={style.textField} value={values.password} onBlur={() => setFieldTouched('password')} onChangeText={handleChange('password')} placeholder='Password' autoComplete={false} secureTextEntry={true}></TextInput>
                                </View>
                                {touched.password && errors.password &&
                                    <Text style={{ fontSize: 12, color: '#FF0D10', marginBottom: 10 }}>{errors.password}</Text>
                                }

                                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ color: color.primaryColor }}>Forgot Password?</Text>
                                </TouchableOpacity>

                                <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={{ marginTop: 40, backgroundColor: color.primaryColor, padding: 15, alignItems: 'center', borderRadius: 5 }}>
                                    <Text style={{ color: 'white' }}>SIGN IN</Text>
                                </TouchableOpacity>

                                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                                    <Text style={{ color: 'gray' }}>Or</Text>
                                </View>


                                {/* {social media} */}
                                <View style={style.Social}>
                                    {/* <TouchableOpacity onPress={facebookLogIn} style={style.facebookContainer}>
                                        <FontAwesome name="facebook" size={20} color="white" />
                                        <Text style={{ marginLeft: 5, color: 'white', fontWeight: 'bold' }}>Facebook</Text>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity onPress={signInWithGoogle} style={style.facebookContainer}>
                                        <Image style={{ height: 25, width: 25 }} source={{ uri: 'https://freesvg.org/img/1534129544.png' }} />
                                        {/* <FontAwesome name="google" size={20} color="white" /> */}
                                        <Text style={{ marginLeft: 15, color: 'gray', fontSize: 15 }}>Sign in with Google</Text>
                                    </TouchableOpacity>

                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }} >
                                    <Text style={{ color: 'gray' }}>Don't have an account?</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                        <Text style={{ color: color.primaryColor }}> Sign Up</Text>
                                    </TouchableOpacity>

                                </View>


                            </View>

                        )}
                    </Formik>



                </View>
            }
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'


    },
    textContainer: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 20
    }
    ,
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center',
        color: color.primaryColor

    },
    Social: {
        flexDirection: 'row',
        justifyContent: 'space-around',


    },
    facebookContainer: {

        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        // borderRadius: 10,
        flexDirection: 'row',
        // backgroundColor: 'white',
        // elevation: 1,
        borderWidth: 0.2,
        borderColor: color.primaryColor





    },
    textInputContainer: {
        marginTop: 40,



    },
    textBox: {
        borderWidth: .5,
        // borderColor: color.primaryColor,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        // elevation: 1,
        flexDirection: 'row',
        paddingHorizontal: 10

    },
    textField: {
        paddingHorizontal: 10,
        flex: 1
    }
})
