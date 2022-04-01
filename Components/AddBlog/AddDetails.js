import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { Formik } from 'formik'
import { Picker } from '@react-native-community/picker'
import * as yup from 'yup'
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { addDoc, collection, doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db, storage } from '../../Firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useNavigation } from '@react-navigation/native'
import { SignInUser } from '../../Redux/Reducers/UserSlicer'
import { useSelector } from 'react-redux'
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { color } from '../../Color'



const AddBlogSchema = yup.object().shape({
    blogTitle: yup.string().required('requid'),
    description: yup.string().required('requid'),
    category: yup.string().required('required'),
    language: yup.string().required('required')
})

export default function AddDetails() {
    const navigation = useNavigation();
    const user = useSelector(SignInUser);



    const [image, setImage] = useState(null);
    const [File, setFile] = useState(null)

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [6, 4],
            quality: 1,
        });



        if (!result.cancelled) {
            setImage(result.uri);
        }
    };


    const pickDoc = async () => {
        // No permissions request is necessary for launching the image library
        let result = await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
        });
        if (!result.cancelled) {
            setFile(result.uri);
        }
    };


    const AddSubmit = async (blogTitle, description, category, language) => {
        let ImgUrl;
        let DocUrl;

        if (image) {
            const response1 = await fetch(image);
            const blob1 = await response1.blob();
            const imgRef = ref(storage, `images/blog/${new Date().getTime()}`);
            const snap = await uploadBytes(imgRef, blob1);
            const downloadUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
            ImgUrl = downloadUrl;
        }
        if (File) {
            const response2 = await fetch(File);
            const blob2 = await response2.blob();
            const DocRef = ref(storage, `File/blog/${new Date().getTime()}`);
            const snapDoc = await uploadBytes(DocRef, blob2);
            const downloadDocUrl = await getDownloadURL(ref(storage, snapDoc.ref.fullPath));
            DocUrl = downloadDocUrl;
        }




        await addDoc(collection(db, 'blogs'), {
            title: blogTitle,
            description,
            category,
            language,
            createAt: new Date(),
            titleImage: ImgUrl,
            file: DocUrl,
            uid: auth.currentUser.uid,
            username: user.username,
            usermail: user.email,
            UserPic: user.pro_pic,
            book_mark_by: [],
            likes_by_users: [],

        }).then(() => {
            Alert.alert('Successfully Added');
            navigation.navigate('Blog');
        })

    }





    return (
        <ScrollView style={{ marginTop: 20 }} >

            <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center', height: 250, borderWidth: image ? 0 : 1, marginHorizontal: 20, borderRadius: 20, borderStyle: 'dashed', justifyContent: 'center', borderColor: 'gray' }} >

                {/* <Text style={{ color: 'gray', fontWeight: '500', letterSpacing: 1 }}>Upload Image</Text> */}
                {image ? <Image source={{ uri: image }} style={{ height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 20 }}></Image> : <Ionicons name="md-images-outline" size={50} color="black" />}
            </TouchableOpacity>

            {/* forms*/}

            <Formik initialValues={
                {
                    blogTitle: '',
                    description: '',
                    category: '',
                    language: ''
                }
            }
                onSubmit={values => {
                    AddSubmit(values.blogTitle, values.description, values.category, values.language);
                }}
                validationSchema={AddBlogSchema}
            // validateOnMount={true}
            >
                {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (

                    <View style={{ marginTop: 20, marginHorizontal: 20 }}>

                        <Text style={{ fontWeight: 'bold', letterSpacing: 1 }}>Blog Title</Text>
                        <TextInput onChangeText={handleChange('blogTitle')} style={style.textBox}></TextInput>

                        <Text style={{ fontWeight: 'bold', letterSpacing: 1 }}>Description</Text>
                        <TextInput value={values.description} onChangeText={handleChange('description')} multiline style={style.textBox}></TextInput>

                        <Text style={{ fontWeight: 'bold', letterSpacing: 1 }}>Category</Text>
                        <Picker style={style.textBox} selectedValue={values.category} onValueChange={handleChange('category')} >

                            <Picker.Item label="Technology" value="Technology" />
                            <Picker.Item label="Development" value="Development" />
                            <Picker.Item label="Programming" value="Programming" />
                            <Picker.Item label=" Web Development" value="Web Development" />
                            <Picker.Item label="Lifestyle" value="Lifestyle" />
                            <Picker.Item label="Books" value="Books" />
                            <Picker.Item label="Motivation" value="Motivation" />
                            <Picker.Item label="Productivity" value="Productivity" />

                        </Picker>

                        <Text style={{ fontWeight: 'bold', letterSpacing: 1 }}>Language</Text>
                        <Picker style={style.textBox} selectedValue={values.language} onValueChange={handleChange('language')} >

                            <Picker.Item label="Eng" value="Eng" />
                            <Picker.Item label="Tamil" value="Tamil" />
                            <Picker.Item label="Singalam" value="Singalam" />
                        </Picker>

                        <Text style={{ fontWeight: 'bold', letterSpacing: 1 }}>Upload File</Text>
                        <TouchableOpacity style={{ height: 100, borderWidth: 1, borderRadius: 10, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', marginVertical: 20, borderColor: 'gray' }} onPress={pickDoc}>
                            <Feather name="folder-plus" size={30} color="black" />
                        </TouchableOpacity>

                        <View style={{ marginTop: 30, marginBottom: 50 }}>
                            <Button color={color.primaryColor} title='Add Book' disabled={!isValid} onPress={handleSubmit}></Button>
                        </View>


                    </View>

                )}
            </Formik>



        </ScrollView>
    )
}

const style = StyleSheet.create({


    textBox: {
        borderWidth: 1,
        borderColor: '#FAFAFA',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        marginBottom: 30,
        elevation: 1,
        marginTop: 15,
        paddingHorizontal: 10,






    },
    textField: {
        paddingHorizontal: 10,

    }
})
