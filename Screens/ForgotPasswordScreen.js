import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator, StatusBar, ScrollView } from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik'
import * as yup from 'yup'
import * as EmailValidator from 'email-validator';
import { auth, db } from '../Firebase';

import * as Google from 'expo-google-app-auth';
import ActivityIndicators from '../Components/Common/ActivityIndicator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../Color';
import { Feather, FontAwesome } from '@expo/vector-icons';
import * as NavigationBar from 'expo-navigation-bar';
import { sendPasswordResetEmail } from 'firebase/auth';
// let navcolor = 'white'


const emailSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),

});

export default function ForgotPasswordScreen() {

    const [navcolor, setnavcolor] = useState('white')
    const navigation = useNavigation();
    const [indicater, setindicater] = useState(false)



    NavigationBar.setBackgroundColorAsync(navcolor);
    useEffect(() => (setnavcolor(color.secondaryColor)), [])



    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email).then(() => {
            alert("Check your mail")
            navigation.navigate('SignIn')
        })
    }









    return (
        <SafeAreaView style={style.container}>
            <StatusBar backgroundColor={'white'} barStyle='dark-content' />
            {indicater ? <ActivityIndicators color={'blue'} /> :
                <View style={{ marginHorizontal: 40 }}>
                    {/* {sign text} */}



                    <View style={style.textContainer}>
                        <Text style={style.text}>Forgot Password</Text>
                    </View>

                    <View style={{ height: 200, width: '100%', alignItems: 'center', }}>
                        <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../assets/undraw_Forgot_password_re_hxwm.png')}></Image>
                    </View>




                    {/* forms*/}

                    <Formik initialValues={
                        {
                            email: '',

                        }
                    }
                        onSubmit={values => {
                            resetPassword(values.email);
                        }}
                        validationSchema={emailSchema}

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

                                <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ color: color.primaryColor }}>Sign In?</Text>
                                </TouchableOpacity>

                                <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={{ marginTop: 40, backgroundColor: color.primaryColor, padding: 10, alignItems: 'center', borderRadius: 5 }}>
                                    <Text style={{ color: 'white' }}>Submit</Text>
                                </TouchableOpacity>

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

    textBox: {
        borderWidth: 1,
        borderColor: '#FAFAFA',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        elevation: 1,
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    textField: {
        paddingHorizontal: 10,
    }
})

