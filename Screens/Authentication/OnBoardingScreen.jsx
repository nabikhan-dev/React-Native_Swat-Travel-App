import React, { useRef, useState } from 'react';
import { View, Text, ImageBackground, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CustomIndicator from '../../components/OnboardingIndicator';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function OnBoardingScreen() {


    const navigation = useNavigation();
    const onboardingRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);


    // Done Button Function
    const handleDone = () => {
        navigation.navigate('SignUpLogin');
    };


    // Next Button Function 
    const nextButton = () => {
        if (onboardingRef.current) {
            onboardingRef.current.goNext();
         }
    };


    //  Default Props remove for funtion from components 
    if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        const originalWarn = console.error;
        // eslint-disable-next-line no-console
        console.error = (...args) => {
          if (
            args[0].includes(
              "Support for defaultProps will be removed from function components in a future major release.",
            )
          ) {
            return;
          }
          originalWarn(...args);
        };
      }

    return (
        <SafeAreaView style={{flex: 1,}}>
            <Onboarding

                ref={onboardingRef}
                showNext={false}
                showDone={false}
                showSkip={false}
                showPagination={false}
                pages={[
                    {
                        //  background Image code
                        backgroundColor: '#000',
                        image: (
                            <ImageBackground
                                source={require('../../assets/Images/onboradingImage 1.png')}
                                style={styles.imageBackground}>
                                <LinearGradient
                                    colors={['rgba(0,0,0, 1)', 'rgba(0,0,0,0)']}
                                    style={styles.overlay}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 0, y: 0 }}>
                                    <View style={styles.overlay}>
                                        <Text style={styles.title}>Explore your interests</Text>
                                        <TouchableOpacity style={styles.button} onPress={nextButton}>
                                            <View style={styles.button_container}>
                                                <AntDesign name="right" size={28} color="white" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </LinearGradient>
                            </ImageBackground>
                        ),
                        title: '',
                        subtitle: '',
                    },
                    {
                        backgroundColor: '#000',
                        image: (
                            <ImageBackground
                                source={require('../../assets/Images/onboradingImage 2.png')}
                                style={styles.imageBackground}>
                                <LinearGradient
                                    colors={['rgba(0,0,0, 1)', 'rgba(0,0,0,0)']}
                                    style={styles.overlay}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 0, y: 0 }}>
                                    <View style={styles.overlay}>
                                        <Text style={styles.title}>Find your Travel Mate</Text>
                                        <TouchableOpacity style={styles.button} onPress={nextButton}>
                                            <View style={styles.button_container}>
                                                <AntDesign name="right" size={28} color="white" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </LinearGradient>
                            </ImageBackground>
                        ),
                        title: '',
                        subtitle: '',
                    },
                    {
                        backgroundColor: '#000',
                        image: (
                            <ImageBackground
                                source={require('../../assets/Images/onboradingImage 3.png')}
                                style={styles.imageBackground}>
                                <LinearGradient
                                    colors={['rgba(0,0,0, 1)', 'rgba(0,0,0,0)']}
                                    style={styles.overlay}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 0, y: 0 }}>
                                    <View style={styles.overlay}>
                                        <Text style={styles.title}>Plan your Trip</Text>
                                        <TouchableOpacity style={styles.button} onPress={handleDone}>
                                            <View style={styles.button_container}>
                                                <AntDesign name="check" size={28} color="white" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </LinearGradient>
                            </ImageBackground>
                        ),
                        title: '',
                        subtitle: '',
                    },
                ]}
                pageIndexCallback={(index) => setCurrentIndex(index)} // Track current index
            />
         
            <View style={styles.footer} />
            <CustomIndicator pageCount={3} currentIndex={currentIndex} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
   
    imageBackground: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        width: '48%',
        color: '#fff',
        fontSize: width * 0.07,
        fontFamily: 'medium',
        position: 'absolute',
        top: '80%',
        right: -10,
    },
    button_container: {
        width: width * 0.14,
        height: width * 0.14,
        backgroundColor: '#4AA9BC',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    button: {
        width: width * 0.2,
        height: width * 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 20,
        position: 'absolute',
        top: '80%',
        left: '25%',
    },
    footer: {
        width: '100%',
        height: height * 0.1,
        backgroundColor: '#000',
    },
});
