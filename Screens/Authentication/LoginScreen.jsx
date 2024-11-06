import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../db/firebase-config';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

const { width, height } = Dimensions.get('window');

export default function LogIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [emailBorderColor, setEmailBorderColor] = useState('#ccc'); // Default border color
  const [passwordBorderColor, setPasswordBorderColor] = useState('#ccc'); // Default border color
  const [emailErrorMessage, setEmailErrorMessage] = useState(''); // State for email error message
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(''); // State for password error message

  const handleSubmit = async () => {
    let valid = true;

    // Validate email
    if (!email) {
      setEmailBorderColor('red');
      setEmailErrorMessage('Please enter your email.');
      valid = false;
    } else {
      setEmailBorderColor('#ccc'); // Reset email border color
      setEmailErrorMessage(''); // Reset email error message
    }

    // Validate password
    if (!password) {
      setPasswordBorderColor('red');
      setPasswordErrorMessage('Please enter your password.');
      valid = false;
    } else {
      setPasswordBorderColor('#ccc'); // Reset password border color
      setPasswordErrorMessage(''); // Reset password error message
    }

    if (valid) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // Reset border colors and error messages on successful login
        setEmailBorderColor('#ccc');
        setPasswordBorderColor('#ccc');
        setEmailErrorMessage('');
        setPasswordErrorMessage('');
      } catch (error) {
        // Set border color and error message for password if there's an error
        setEmailBorderColor('#ccc'); // Reset email border color
        setPasswordBorderColor('red');
        setPasswordErrorMessage("Password or Email does not match. Please check and try again.");
      }
    }
  }

  const SignUp = () => {
    navigation.navigate('Signup');
  }
  
  const Forgot = () => {
    navigation.navigate('ForgotPassword');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/Images/backgroundimg.png')}
        style={styles.imageBackground}>
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <Image source={require('../../assets/Images/logo.png')} style={{width: 630, height: 320 , marginTop: 50}} />
        </View>
        <View style={styles.footer}>
          <View style={styles.welcomeContainer}>
            <Text style={{ fontFamily: 'medium', fontSize: 42, color: '#fff' }}>Log In</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={{ marginTop: 40 }}>
              <Text style={styles.Label}>Email</Text>
              <TextInput
                placeholder='Email'
                style={[styles.textInput, { borderColor: emailBorderColor }]} // Dynamic border color
                value={email}
                onChangeText={value => {
                  setEmail(value);
                  if (value) {
                    setEmailBorderColor('#ccc'); // Reset border color when typing
                    setEmailErrorMessage(''); // Reset email error message
                  }
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {emailErrorMessage ? (
                <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
              ) : null}
            </View>

            <View style={{ marginTop: 25 }}>
              <Text style={styles.Label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder='Password'
                  style={[styles.textInput, { borderColor: passwordBorderColor }]} // Dynamic border color
                  value={password}
                  onChangeText={value => {
                    setPassword(value);
                    if (value) {
                      setPasswordBorderColor('#ccc'); // Reset border color when typing
                      setPasswordErrorMessage(''); // Reset error message
                    }
                  }}
                  secureTextEntry={!showPassword} // Toggle password visibility
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Icon name={showPassword ? 'eye' : 'eye-off'} size={24} color="#aaa" />
                </TouchableOpacity>
              </View>
              {passwordErrorMessage ? (
                <Text style={styles.errorMessage}>{passwordErrorMessage}</Text>
              ) : null}
              <TouchableOpacity onPress={Forgot}>
                <Text style={{ color: '#fff', alignSelf: 'flex-end', marginTop: 10, fontFamily: 'regular', fontSize: width * 0.03, textDecorationLine: 'underline', }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <CustomButton title={'Log In'} backgroundColor={'#4AA9BC'} textColor={'#fff'} customStyle={{ marginTop: 60 }} onPress={handleSubmit} />

            <View style={styles.Button}>
              <Text style={{ color: '#fff', fontFamily: 'regular', fontSize: width * 0.03 }}>Already have an account?</Text>
              <TouchableOpacity onPress={SignUp}>
                <Text style={{ color: '#4AA9BC', fontFamily: 'extrabold', fontSize: width * 0.04 }}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    borderRadius: 5,
    paddingLeft: 15,
    borderWidth: 1, // Ensure borderWidth is set for the borderColor to be visible
  },
  Label: {
    fontFamily: 'regular',
    fontSize: width * 0.04,
    color: '#fff',
    marginLeft: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  Button: {
    color: '#fff',
    marginTop: 50,
    alignItems: 'center',
    flexDirection: 'row'
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
    fontSize: width * 0.03,
    fontFamily: 'regular',
  },
});
