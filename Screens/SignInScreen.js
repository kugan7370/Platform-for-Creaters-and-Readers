import React from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function SignInScreen() {
    const navigation = useNavigation();
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

                {/* {text input} */}

                <View style={style.textInputContainer}>
                    <View style={style.textInput}>
                        <TextInput placeholder='Email' />
                    </View>
                    <View style={style.textInput}>
                        <TextInput placeholder='Password' />
                    </View>
                </View>

                {/* {button} */}
                <View style={style.button}>
                    <Button onPress={() => navigation.push('Blog')} title='Sign In'></Button>
                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
                        <Text>Don't you have account? </Text>
                        <TouchableOpacity onPress={() => navigation.push('SignUp')}>
                            <Text style={{ color: '#1d7df2' }}>Sign Up</Text>
                        </TouchableOpacity>

                    </View>
                </View>
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
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5

    },
    button: {
        marginTop: 50,

    }
})