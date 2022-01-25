import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native'
import { Formik } from 'formik'
import { Picker } from '@react-native-community/picker'
import * as yup from 'yup'
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db, storage } from '../../Firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useNavigation } from '@react-navigation/native'

const uploadImage = 'https://cdn.iconscout.com/icon/premium/png-256-thumb/image-gallery-1733269-1478308.png'

const AddBlogSchema = yup.object().shape({
    blogTitle: yup.string().required('requid'),
    description: yup.string().required('requid'),
    category: yup.string().required('required'),
    language: yup.string().required('required')
})

export default function AddDetails() {
    const navigation = useNavigation();

    const [image, setImage] = useState(uploadImage);
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
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };


    const pickDoc = async () => {
        // No permissions request is necessary for launching the image library
        let result = await DocumentPicker.getDocumentAsync();
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
            createAt: serverTimestamp(),
            titleImage: ImgUrl,
            file: DocUrl,
            uid: auth.currentUser.uid

        }).then(() => {
            Alert.alert('Successfully Added');
            navigation.navigate('Blog');
        })
    }





    return (
        <View>

            <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center', height: 100, }} >
                <Image source={{ uri: image }} style={{ height: '100%', width: '100%', resizeMode: 'contain', borderRadius: 20 }}></Image>
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
                validateOnMount={true}
            >
                {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (

                    <View style={{ marginTop: 20, marginHorizontal: 20 }}>

                        <Text style={{ fontWeight: 'bold', letterSpacing: 1 }}>Blog Title</Text>
                        <TextInput onChangeText={handleChange('blogTitle')} style={style.textBox}></TextInput>

                        <Text style={{ fontWeight: 'bold', letterSpacing: 1 }}>Description</Text>
                        <TextInput value={values.description} onChangeText={handleChange('description')} multiline style={style.textBox}></TextInput>

                        <Text style={{ fontWeight: 'bold', letterSpacing: 1 }}>Category</Text>
                        <Picker style={style.textBox} selectedValue={values.category} onValueChange={handleChange('category')} >
                            <Picker.Item label="" value=" " />
                            <Picker.Item label="Technology" value="Technology" />
                            <Picker.Item label="Development" value="Development" />
                            <Picker.Item label="Life Style" value="Life Style" />

                        </Picker>

                        <Text style={{ fontWeight: 'bold', letterSpacing: 1 }}>Language</Text>
                        <Picker style={style.textBox} selectedValue={values.language} onValueChange={handleChange('language')} >
                            <Picker.Item label="" value=" " />
                            <Picker.Item label="Eng" value="Eng" />
                            <Picker.Item label="Tamil" value="Tamil" />
                            <Picker.Item label="Singala" value="Singala" />
                        </Picker>

                        <Text style={{ fontWeight: 'bold', letterSpacing: 1 }}>Upload File</Text>
                        <TouchableOpacity onPress={pickDoc}>
                            <Image style={{ height: 50, width: 50, marginTop: 10 }} source={{ uri: 'https://static.thenounproject.com/png/729367-200.png' }}></Image>
                        </TouchableOpacity>

                        <View style={{ marginTop: 30 }}>
                            <Button title='Add Book' disabled={!isValid} onPress={handleSubmit}></Button>
                        </View>


                    </View>

                )}
            </Formik>



        </View>
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
        marginBottom: 10,
        elevation: 1,
        marginTop: 10,
        paddingHorizontal: 10,






    },
    textField: {
        paddingHorizontal: 10,

    }
})
