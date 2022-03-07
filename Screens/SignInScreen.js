import React from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik'
import * as yup from 'yup'
import * as EmailValidator from 'email-validator';
import { auth, db } from '../Firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithCredential } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import * as Google from 'expo-google-app-auth';
import confiqs from '../confiq';



const LoginSchema = yup.object().shape({
    email: yup.string().email().required('email is requid'),
    password: yup.string().required().min(8, 'min 8 characters'),
});

export default function SignInScreen() {
    const navigation = useNavigation();

    const config = {
        expoClientId: confiqs.ANDROID_CLIENT_ID,
        androidClientId: confiqs.EXPO_CLIENT_ID,

        scopes: ['profile', 'email'],
        permissions: ["public_profile", "email", "gender", "location"],
    };
    const signInWithGoogle = async () => {
        const { type, accessToken, user, idToken } = await Google.logInAsync(config);

        if (type === 'success') {
            const credential = GoogleAuthProvider.credential(idToken, accessToken);
            await signInWithCredential(auth, credential);

            try {

                await setDoc(doc(db, 'users', auth.currentUser.uid), {
                    uid: auth.currentUser.uid,
                    username: user.name,
                    pro_pic: user.photoUrl,
                    email: user.email,
                    isOnline: true,

                }).then(async () => {

                    Alert.alert('Successfully Registered')
                    await setDoc(doc(db, 'Follow', auth.currentUser.uid), {
                        uid: auth.currentUser.uid,
                        following: [],
                        followers: [],

                    })



                })

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

    const userSign = (email, password) => {
        signInWithEmailAndPassword(auth, email, password).then(() => {

            //  for update

            updateDoc(doc(db, 'users', auth.currentUser.uid), {
                isOnline: true,
            });
        })
    }



    return (
        <View style={style.container}>

            <View style={{ marginHorizontal: 40 }}>
                {/* {sign text} */}



                <View style={style.textContainer}>
                    <Text style={style.text}>Welcome back!</Text>
                </View>

                <View style={{ height: 200, width: '100%', alignItems: 'center' }}>
                    <Image source={{ uri: 'https://i.pinimg.com/originals/47/94/73/479473ee35eff3744b072724e7a70e7a.png' }} style={{ height: '100%', width: '100%', resizeMode: 'contain' }}></Image>
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
                    {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (

                        <View style={{ marginTop: 20 }}>
                            <View style={[style.textBox, { borderColor: values.email.length < 1 || EmailValidator.validate(values.email) ? '#ccc' : 'red' }]}>
                                <TextInput style={style.textField} onBlur={handleBlur('email')} onChangeText={handleChange('email')} placeholder='Email'></TextInput>
                            </View>

                            <View style={[style.textBox, { borderColor: 1 > values.password.length || values.password.length >= 8 ? '#ccc' : 'red' }]}>
                                <TextInput style={style.textField} value={values.password} onBlur={handleBlur('password')} onChangeText={handleChange('password')} placeholder='Password' autoComplete={false} secureTextEntry={true}></TextInput>
                            </View>

                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ color: '#2d9efa' }}>Forgot Password?</Text>
                            </View>

                            <View style={{ marginTop: 40, }}>
                                <Button disabled={!isValid} onPress={handleSubmit} title="Sign in" ></Button>
                            </View>

                            <View style={{ alignItems: 'center', marginVertical: 20 }}>
                                <Text style={{ color: 'gray' }}>or connect using</Text>
                            </View>


                            {/* {social media} */}
                            <View style={style.Social}>
                                <View style={style.facebookContainer}>
                                    <FontAwesome name="facebook" size={20} color="white" />
                                    <Text style={{ marginLeft: 5, color: 'white', fontWeight: 'bold' }}>Facebook</Text>
                                </View>
                                <TouchableOpacity onPress={signInWithGoogle} style={{ ...style.facebookContainer, backgroundColor: '#c40e0e' }}>
                                    <FontAwesome name="google" size={20} color="white" />
                                    <Text style={{ marginLeft: 5, color: 'white', fontWeight: 'bold' }}>Google</Text>
                                </TouchableOpacity>

                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }} >
                                <Text>Don't have an account?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                    <Text style={{ color: '#2d9efa' }}> Sign Up</Text>
                                </TouchableOpacity>

                            </View>


                        </View>

                    )}
                </Formik>



            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'


    },
    textContainer: {
        alignItems: 'center',
        marginTop: 80,
        marginBottom: 20
    }
    ,
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center',
        color: '#76a9ea'

    },
    Social: {
        flexDirection: 'row',
        justifyContent: 'space-around',


    },
    facebookContainer: {
        backgroundColor: '#76a9ea',
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#475993'




    },
    textInputContainer: {
        marginTop: 40,



    },
    textBox: {
        borderWidth: 1,
        borderColor: '#FAFAFA',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        marginBottom: 10,
        elevation: 1
    },
    textField: {
        paddingHorizontal: 10,
    }
})
