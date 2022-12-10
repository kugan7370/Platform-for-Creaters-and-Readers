import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../Color';
import { Feather, } from '@expo/vector-icons';
import * as NavigationBar from 'expo-navigation-bar';

const OnboardingScreen = () => {
    const navigation = useNavigation();

    const [navcolor, setnavcolor] = useState('white')
    NavigationBar.setBackgroundColorAsync(navcolor);
    useEffect(() => (setnavcolor(color.secondaryColor)), [])

    // const Skip = ({ ...props }) => {
    //     return (
    //         <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 20, backgroundColor: '#f5f5f5', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}  {...props}>
    //             <Text style={{ color: 'white', fontSize: 20 }}>Skip</Text>
    //             <Feather name="arrow-right" size={24} color="black" />
    //         </TouchableOpacity>
    //     )
    // }
    // const Next = ({ ...props }) => {
    //     return (
    //         <TouchableOpacity style={{ flexDirection: 'row', marginRight: 20, backgroundColor: color.primaryColor, paddingHorizontal: 30, paddingVertical: 10, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}  {...props}>
    //             <Text style={{ color: 'white', fontSize: 20 }}>Go Next</Text>
    //             {/* <Feather name="arrow-right" size={24} color="white" /> */}
    //         </TouchableOpacity>
    //     )
    // }
    const Done = ({ ...props }) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', marginRight: 20, backgroundColor: color.primaryColor, paddingHorizontal: 5, paddingVertical: 5, borderRadius: 15, alignItems: 'center', justifyContent: 'center', }}  {...props}>
                {/* <Text style={{ color: 'white', fontSize: 15 }}>Get Started</Text> */}
                <Feather name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
        )
    }
    const Dots = ({ selected }) => {

        return (
            <View style={{ height: 5, width: selected ? 20 : 5, borderRadius: 2, backgroundColor: selected ? color.primaryColor : '#c0f2df', marginHorizontal: 5 }} >

                {/* <Feather name="arrow-right" size={24} color="white" /> */}
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.primaryColor }}>
            <StatusBar backgroundColor='white' />
            <Onboarding

                // onSkip={() => navigation.navigate('SignIn')}
                onDone={() => navigation.navigate('SignIn')}
                bottomBarColor='white'
                imageContainerStyles={{ width: '90%', height: 450, }}
                // SkipButtonComponent={Skip}
                // NextButtonComponent={Next}
                DotComponent={Dots}
                DoneButtonComponent={Done}
                showNext={false}
                showSkip={false}
                subTitleStyles={{ paddingHorizontal: 10, textAlign: 'center', color: 'gray', letterSpacing: 1, lineHeight: 25 }}
                titleStyles={{ color: color.primaryColor, letterSpacing: 1, }}
                pages={[

                    {

                        backgroundColor: 'white',
                        image: <Image style={styles.Images} source={require('../assets/onbording/onboarding1.webp')} />,
                        title: 'Enrich Your Knowledge',
                        subtitle: 'Always provide resourceful blog, business perspective that helps you to grow your knowledge',
                    },
                    {
                        backgroundColor: 'white',

                        image: <Image style={styles.Images} source={require('../assets/onbording/onboarding2.webp')} />,
                        title: 'Connect With Chat',
                        subtitle: 'You can connect with anybody, connect with liked-minded people and share your experience with them',
                    },
                    {
                        backgroundColor: 'white',
                        image: <Image style={styles.Images} source={require('../assets/onbording/onboarding3.jpg')} />,
                        title: 'Learn From Experts',
                        subtitle: 'Our content creators are mostly professional in their fields. they more then work and research experience',
                    },
                    {
                        backgroundColor: 'white',
                        image: <Image style={styles.Images} source={require('../assets/onbording/onboarding4.jpg')} />,
                        title: 'Save Blogs That You Like',
                        subtitle: 'Just save that blogs that you wanna read in furture. you will find the saved blogs in one place',
                    },

                ]}
            />
        </SafeAreaView>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    Images: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'

    }
})