import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../db/firebase-config'; // Adjust the import path
import CustomButton from '../../components/CustomButton'; // Adjust the import path

const { width, height } = Dimensions.get('window');

export default function LogIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
    if (email === '') {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
  
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          'Success',
          'Password reset email sent! Please check your inbox for further instructions.'
        );
      })
      .catch((error) => {
        console.log('Error details:', error); // Log full error object
        Alert.alert('Error', error.message);
      });
  };
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/Images/backgroundimg.png')}
        style={styles.imageBackground}>
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <Image source={require('../../assets/Images/logo.png')} style={{width: 630, height: 320 , marginTop: 50}}  />
        </View>
        <View style={styles.footer}>
          <View style={styles.welcomeContainer}>
            <Text style={{ fontFamily: 'medium', fontSize: 42, color: '#fff' }}>Reset Password</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={{ marginTop: 40 }}>
              <Text style={styles.Label}>Email</Text>
              <TextInput
                placeholder='Enter your email'
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <CustomButton
              title={'Send'}
              backgroundColor={'#4AA9BC'}
              textColor={'#fff'}
              customStyle={{ marginTop: 60 }}
              onPress={handlePasswordReset}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  footer: {
    flex: 3,
    marginTop: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
  },
  welcomeContainer: {
    marginTop: 20,
    alignItems: 'center',
    alignContent: 'center',
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
  textInput: {
    backgroundColor: '#fff',
    width: width * 0.7,
    height: height * 0.05,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingLeft: 15,
  },
  Label: {
    fontFamily: 'regular',
    fontSize: width * 0.04,
    color: '#fff',
    marginLeft: 5,
  },
});
