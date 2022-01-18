import React from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik'
import * as yup from 'yup'
import * as EmailValidator from 'email-validator';
import { auth, db } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const pro_pic = 'https://cdn.pixabay.com/photo/2015/12/23/14/56/man-profile-1105761_960_720.jpg'
// {Validation yup}
const SignupSchema = yup.object().shape({
    email: yup.string().trim().email().required('email is requid'),
    password: yup.string().trim().required().min(8, 'min 8 characters'),
    username: yup.string().trim().required('username required'),
    confirmPassword: yup.string().trim().oneOf([yup.ref('password'), null], 'Passwords must match').required('username required')
})

export default function SignUpScreen() {
    const navigation = useNavigation();


    const userSignUp = (email, password, username) => {

        try {
            createUserWithEmailAndPassword(auth, email, password).then(() => {
                setDoc(doc(db, 'users', auth.currentUser.uid), {
                    uid: auth.currentUser.uid,
                    username,
                    pro_pic,
                    email,

                })

            }).then(() => {

                Alert.alert('Successfully Registered')
                console.log("Successfully Registered", email, password);



            })

        }
        catch (error) {
            Alert.alert(error);
        }




    }




    return (
        <View style={style.container}>

            <View style={{ marginHorizontal: 40 }}>
                {/* {sign text} */}

                <View style={style.textContainer}>
                    <Text style={style.text}>Sign Up</Text>
                </View>

                <View style={{ alignItems: 'center', marginVertical: 50 }}>
                    <Text style={{ color: 'gray', fontSize: 20 }}>or</Text>
                </View>

                {/* {social media} */}
                <View style={style.Social}>
                    <View style={{ ...style.facebookContainer, backgroundColor: '#475993' }}>
                        <FontAwesome name="google-plus-square" size={40} color="white" />
                    </View>
                    <View style={style.facebookContainer}>
                        <FontAwesome name="facebook-square" size={40} color="white" />
                    </View>
                </View>

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
                    {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (

                        <View style={{ marginTop: 40 }}>
                            <View style={[style.textBox, { borderColor: values.email.length < 1 || EmailValidator.validate(values.email) ? '#ccc' : 'red' }]}>
                                <TextInput style={style.textField} onBlur={handleBlur('email')} onChangeText={handleChange('email')} placeholder='Email'></TextInput>
                            </View>

                            <View style={[style.textBox, { borderColor: (1 > values.username.length || 1 < values.username.length) ? '#ccc' : 'red' }]}>
                                <TextInput style={style.textField} value={values.username} onBlur={handleBlur('username')} onChangeText={handleChange('username')} placeholder='Username' autoComplete={false} ></TextInput>
                            </View>

                            <View style={[style.textBox, { borderColor: 1 > values.password.length || values.password.length >= 8 ? '#ccc' : 'red' }]}>
                                <TextInput style={style.textField} value={values.password} onBlur={handleBlur('password')} onChangeText={handleChange('password')} placeholder='Password' autoComplete={false} secureTextEntry={true}></TextInput>
                            </View>

                            <View style={[style.textBox, { borderColor: 1 > values.confirmPassword.length || values.confirmPassword.length >= 8 ? '#ccc' : 'red' }]}>
                                <TextInput style={style.textField} value={values.confirmPassword} onBlur={handleBlur('confirmPassword')} onChangeText={handleChange('confirmPassword')} placeholder='Confirm Password' autoComplete={false} secureTextEntry={true}></TextInput>
                            </View>

                            <View style={{ marginTop: 50, }}>
                                <Button disabled={!isValid} onPress={handleSubmit} title="Sign up"  ></Button>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'center' }} >
                                <Text>Already have an account?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                    <Text style={{ color: '#2d9efa' }}> Sign In</Text>
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
        backgroundColor: '#f0f0f0'


    },
    textContainer: {
        alignItems: 'center',
        marginTop: 100,
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
        // marginTop: 100,
        justifyContent: 'space-between'

    },
    facebookContainer: {
        backgroundColor: '#76a9ea',
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',



    },

    textBox: {
        borderWidth: 1,
        borderColor: '#FAFAFA',
        height: 50,
        backgroundColor: '#dedede',
        borderRadius: 5,
        justifyContent: 'center',
        marginBottom: 10,

    },
    textField: {
        paddingHorizontal: 10,
    }

})
