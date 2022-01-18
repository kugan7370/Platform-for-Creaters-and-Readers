import React from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik'
import * as yup from 'yup'
import * as EmailValidator from 'email-validator';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const LoginSchema = yup.object().shape({
    email: yup.string().email().required('email is requid'),
    password: yup.string().required().min(8, 'min 8 characters'),
});

export default function SignInScreen() {
    const navigation = useNavigation();


    const userSign = (email, password) => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigation.navigate('Blog');
        })
    }



    return (
        <View style={style.container}>

            <View style={{ marginHorizontal: 40 }}>
                {/* {sign text} */}

                <View style={style.textContainer}>
                    <Text style={style.text}>Sign In</Text>
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

                        <View style={{ marginTop: 40 }}>
                            <View style={[style.textBox, { borderColor: values.email.length < 1 || EmailValidator.validate(values.email) ? '#ccc' : 'red' }]}>
                                <TextInput style={style.textField} onBlur={handleBlur('email')} onChangeText={handleChange('email')} placeholder='Email'></TextInput>
                            </View>

                            <View style={[style.textBox, { borderColor: 1 > values.password.length || values.password.length >= 8 ? '#ccc' : 'red' }]}>
                                <TextInput style={style.textField} value={values.password} onBlur={handleBlur('password')} onChangeText={handleChange('password')} placeholder='Password' autoComplete={false} secureTextEntry={true}></TextInput>
                            </View>

                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ color: '#2d9efa' }}>Forgot Password?</Text>
                            </View>

                            <View style={{ marginTop: 50, }}>
                                <Button disabled={!isValid} onPress={handleSubmit} title="Sign in" ></Button>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'center' }} >
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
    textInputContainer: {
        marginTop: 40,



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
