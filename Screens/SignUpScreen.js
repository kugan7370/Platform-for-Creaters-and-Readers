import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView, Alert, Image } from 'react-native'
import { FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik'
import * as yup from 'yup'
import * as EmailValidator from 'email-validator';
import { auth, db, googleProvider } from '../Firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithCredential, sendEmailVerification } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import * as Google from 'expo-google-app-auth';
import confiqs from '../confiq';
import ActivityIndicators from '../Components/Common/ActivityIndicator';
import { color } from '../Color';
import { SafeAreaView } from 'react-native-safe-area-context';

const pro_pic = 'https://register.pravasikerala.org/public/images/avatar5.png'

// {Validation yup}
const SignupSchema = yup.object().shape({
    email: yup.string().trim().email().required('Email is required'),
    password: yup.string().trim().required('Password is required').min(8, 'Min 8 characters'),
    username: yup.string().trim().required('Username is required'),
    confirmPassword: yup.string().trim().oneOf([yup.ref('password'), null], 'Passwords must be matched').required('Confirm password is required')
})

export default function SignUpScreen() {
    const navigation = useNavigation();
    const [indicator, setindicator] = useState(false)
    // signwith google
    const config = {
        expoClientId: confiqs.ANDROID_CLIENT_ID,
        androidClientId: confiqs.EXPO_CLIENT_ID,
        scopes: ['profile', 'email'],
        permissions: ["public_profile", "email", "gender", "location"],
    };
    const signInWithGoogle = async () => {
        setindicator(true)
        const { type, accessToken, user, idToken } = await Google.logInAsync(config);

        if (type === 'success') {
            const credential = GoogleAuthProvider.credential(idToken, accessToken);
            await signInWithCredential(auth, credential);

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




                        setindicator(false)


                    })

                }
                //  for update

                updateDoc(doc(db, 'users', auth.currentUser.uid), {
                    isOnline: true,
                });

            }
            catch (error) {
                Alert.alert(error);
            }
            /* Log-Out */
            //   await Google.logOutAsync({ accessToken, ...config });
            /* `accessToken` is now invalid and cannot be used to get data from the Google API with HTTP requests */
        }
        return Promise.reject();
    }


    // take random profile
    const getRandomProfilePic = async () => {
        const responce = await fetch('https://randomuser.me/api')
        const data = await responce.json()

        return data.results[0].picture.large

    }


    const userSignUp = async (email, password, username) => {

        try {
            await createUserWithEmailAndPassword(auth, email, password).then(() => {
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        alert('check your mail and verify')
                    });
            })
            await setDoc(doc(db, 'users', auth.currentUser.uid), {
                uid: auth.currentUser.uid,
                username,
                pro_pic: pro_pic,
                email,
                isOnline: true,

            }).then(async () => {

                // Alert.alert('Successfully Registered')
                await setDoc(doc(db, 'Follow', auth.currentUser.uid), {
                    uid: auth.currentUser.uid,
                    following: [],
                    followers: [],

                })



            })

            //  for update

            updateDoc(doc(db, 'users', auth.currentUser.uid), {
                isOnline: true,
            });

        }
        catch (error) {
            alert(error);

        }




    }




    return (
        <SafeAreaView style={style.container}>
            {indicator ? <ActivityIndicators color={'blue'} /> :
                <View showsVerticalScrollIndicator={false} style={{ marginHorizontal: 40, marginBottom: 20 }}>
                    {/* {sign text} */}

                    <View style={style.textContainer}>
                        <Text style={style.text}>Let's Get Started!</Text>
                    </View>

                    {/* <View style={{ height: 200, width: '100%', alignItems: 'center', }}>
                    <Image source={{ uri: 'https://i.pinimg.com/originals/47/94/73/479473ee35eff3744b072724e7a70e7a.png' }} style={{ height: '100%', width: '100%', resizeMode: 'cover' }}></Image>
                </View> */}



                    {/* Form */}

                    <Formik initialValues={
                        {
                            email: '',
                            password: '',
                            username: '',
                            confirmPassword: '',
                        }
                    }
                        onSubmit={values => {
                            userSignUp(values.email, values.password, values.username);
                        }}
                        validationSchema={SignupSchema}

                    >
                        {({ handleBlur, handleChange, handleSubmit, values, errors, isValid, setFieldTouched, touched, }) => (


                            <View style={{ marginTop: 40 }}>


                                <View style={[style.textBox, { borderColor: values.email.length < 1 || EmailValidator.validate(values.email) ? '#ccc' : 'red' }]}>
                                    <Feather name="mail" size={20} color="gray" />
                                    <TextInput style={style.textField} onBlur={() => setFieldTouched('email')} onChangeText={handleChange('email')} placeholder='Email'></TextInput>
                                </View>
                                {touched.email && errors.email &&
                                    <Text style={{ fontSize: 12, color: '#FF0D10', marginBottom: 10 }}>{errors.email}</Text>
                                }

                                <View style={[style.textBox, { borderColor: (1 > values.username.length || 1 < values.username.length) ? '#ccc' : 'red' }]}>
                                    <FontAwesome name="user" size={20} color="gray" />
                                    <TextInput style={style.textField} value={values.username} onBlur={() => setFieldTouched('username')} onChangeText={handleChange('username')} placeholder='Username' autoComplete={false} ></TextInput>
                                </View>
                                {touched.username && errors.username &&
                                    <Text style={{ fontSize: 12, color: '#FF0D10', marginBottom: 10 }}>{errors.username}</Text>
                                }

                                <View style={[style.textBox, { borderColor: 1 > values.password.length || values.password.length >= 8 ? '#ccc' : 'red' }]}>
                                    <FontAwesome name="lock" size={20} color="gray" />
                                    <TextInput style={style.textField} value={values.password} onBlur={() => setFieldTouched('password')} onChangeText={handleChange('password')} placeholder='Password' autoComplete={false} secureTextEntry={true}></TextInput>
                                </View>
                                {touched.password && errors.password &&
                                    <Text style={{ fontSize: 12, color: '#FF0D10', marginBottom: 10 }}>{errors.password}</Text>
                                }

                                <View style={[style.textBox, { borderColor: 1 > values.confirmPassword.length || values.confirmPassword.length >= 8 ? '#ccc' : 'red' }]}>
                                    <MaterialCommunityIcons name="shield-lock" size={20} color="gray" />
                                    <TextInput style={style.textField} value={values.confirmPassword} onBlur={() => setFieldTouched('confirmPassword')} onChangeText={handleChange('confirmPassword')} placeholder='Confirm Password' autoComplete={false} secureTextEntry={true}></TextInput>
                                </View>
                                {touched.confirmPassword && errors.confirmPassword &&
                                    <Text style={{ fontSize: 12, color: '#FF0D10', marginBottom: 10 }}>{errors.confirmPassword}</Text>
                                }


                                <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={{ marginTop: 40, backgroundColor: color.primaryColor, padding: 15, alignItems: 'center', borderRadius: 5 }}>
                                    <Text style={{ color: 'white' }}>SIGN UP</Text>
                                </TouchableOpacity>

                                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                                    <Text style={{ color: 'gray' }}>Or</Text>
                                </View>


                                {/* {social media} */}
                                <View style={style.Social}>
                                    {/* <View style={style.facebookContainer}>
                                        <FontAwesome name="facebook" size={20} color="white" />
                                        <Text style={{ marginLeft: 5, color: 'white', fontWeight: 'bold' }}>Facebook</Text>
                                    </View> */}
                                    <TouchableOpacity onPress={signInWithGoogle} style={style.facebookContainer}>
                                        <Image style={{ height: 25, width: 25 }} source={{ uri: 'https://freesvg.org/img/1534129544.png' }} />
                                        {/* <FontAwesome name="google" size={20} color="white" /> */}
                                        <Text style={{ marginLeft: 15, color: 'gray', fontSize: 15 }}>Sign in with Google</Text>
                                    </TouchableOpacity>

                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }} >
                                    <Text style={{ color: 'gray' }}>Already have an account?</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                        <Text style={{ color: color.primaryColor }}> Sign In</Text>
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
        backgroundColor: '#ffffff'


    },
    textContainer: {
        alignItems: 'center',
        marginTop: 80,
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
        // marginTop: 100,
        justifyContent: 'space-between'

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
