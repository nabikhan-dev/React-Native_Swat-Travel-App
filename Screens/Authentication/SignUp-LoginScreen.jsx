import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
// import statusCodes along with GoogleSignin
// import {
//   GoogleSignin,
//   statusCodes,} from '@react-native-google-signin/google-signin';
//   GoogleSignin.configure({
//     webClientId: '505756855761-39cjln89s5k1o2llcfupjrc7iigq3gfe.apps.googleusercontent.com', 
//   });

export default function SignUp() {
  const navigation = useNavigation();

  const SignUp = () => {
    navigation.navigate('Signup')
  }

  const LogIn = () => {
    navigation.navigate('Login')
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Background Image Code */}
      <ImageBackground
        source={require('../../assets/Images/backgroundimg.png')}
        style={styles.imageBackground}>
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <Image source={require('../../assets/Images/logo.png')}  style={{width: 630, height: 320 , marginTop: 70}}/>
        </View>
        {/* start Footer Code */}
        <View style={styles.footer}>
          <View style={styles.loginButtonContainer}>
            <CustomButton title="Sign Up" onPress={SignUp} />
            <CustomButton title="Log In" backgroundColor="#4AA9BC" textColor="white" onPress={LogIn} customStyle={{marginTop: 50}}/>
          </View>
   
        </View>
        {/* End Footer Code */}
      </ImageBackground>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  footer: {
    flex: 3,
    marginTop: 50,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
  },
  loginButtonContainer: {
    marginVertical: 100,
    alignItems: 'center',

  },


});

