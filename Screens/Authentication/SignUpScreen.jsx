import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../db/firebase-config';
import { TextInput } from 'react-native-gesture-handler';
import { doc, setDoc } from 'firebase/firestore';  // Use setDoc for specific document
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

const { width, height } = Dimensions.get('window');

export default function SignUp() {
  const navigation = useNavigation();
  const LogIn = () => {
    navigation.navigate('Login');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(''); // State for profile image URL
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const [errorMessage, setErrorMessage] = useState({ email: '', password: '', confirmpassword: '' }); // State for error messages

  const handleSubmit = async () => {
    let hasError = false;
    let newErrorMessage = { email: '', password: '', confirmpassword: '' };

    if (!email || !password || !confirmpassword) {
      newErrorMessage.email = !email ? 'Please enter your email.' : '';
      newErrorMessage.password = !password ? 'Please enter your password.' : '';
      newErrorMessage.confirmpassword = !confirmpassword ? 'Please confirm your password.' : '';
      hasError = true;
    }

    if (password !== confirmpassword) {
      newErrorMessage.confirmpassword = 'Passwords do not match.';
      hasError = true;
    }

    setErrorMessage(newErrorMessage);

    if (hasError) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      // Store user data in Firestore
      await setDoc(doc(firestore, "user", user.uid), {
        email: user.email,
        profileImage: profileImage, // Store the profile image URL
        createdAt: new Date(),
      });

      console.log('User registered and data stored successfully');
      navigation.navigate('Login'); // Navigate to Login screen after successful registration
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setErrorMessage(prev => ({ ...prev, email: 'This email is already in use.' }));
      } else {
        setErrorMessage(prev => ({ ...prev, email: 'An error occurred. Please try again.' }));
      }
    }
  };

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
            <Text style={{ fontFamily: 'medium', fontSize: 42, color: '#fff' }}>Welcome!</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.Label}>Email</Text>
              <TextInput placeholder='email' style={styles.textInput} value={email} onChangeText={value => setEmail(value)} />
              {errorMessage.email ? (
                <Text style={styles.errorMessage}>{errorMessage.email}</Text>
              ) : null}
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.Label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  secureTextEntry={!showPassword}
                  placeholder='password'
                  style={styles.textInput}
                  value={password}
                  onChangeText={value => setPassword(value)}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Icon name={showPassword ? 'eye' : 'eye-off'} size={24} color="#aaa" />
                </TouchableOpacity>
              </View>
              {errorMessage.password ? (
                <Text style={styles.errorMessage}>{errorMessage.password}</Text>
              ) : null}
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.Label}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  secureTextEntry={!showConfirmPassword}
                  placeholder='confirm password'
                  style={styles.textInput}
                  value={confirmpassword}
                  onChangeText={value => setConfirmPassword(value)}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                  <Icon name={showConfirmPassword ? 'eye' : 'eye-off'} size={24} color="#aaa" />
                </TouchableOpacity>
              </View>
              {errorMessage.confirmpassword ? (
                <Text style={styles.errorMessage}>{errorMessage.confirmpassword}</Text>
              ) : null}
            </View>
            <CustomButton title={'SignUp'} backgroundColor={'#4AA9BC'} textColor={'#fff'} customStyle={{ marginTop: 30 }} onPress={handleSubmit} />
            <View style={styles.Button}>
              <Text style={{ color: '#fff', fontFamily: 'regular', fontSize: width * 0.03 }}>Already have an account?</Text>
              <TouchableOpacity onPress={LogIn}>
                <Text style={{ color: '#4AA9BC', fontFamily: 'extrabold', fontSize: width * 0.04 }}> Log In</Text>
              </TouchableOpacity>
            </View>
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
  inputWrapper: {
    width: width * 0.7,
    marginBottom: 25, // Space between input fields
  },
  textInput: {
    backgroundColor: '#fff',
    width: '100%',
    height: height * 0.05,
    borderRadius: 5,
    paddingLeft: 15,
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
  },
  Button: {
    color: '#fff',
    marginTop: 50,
    alignItems: 'center',
    flexDirection: 'row'
  },
  errorMessage: {
    color: 'red',
    fontSize: width * 0.03,
    fontFamily: 'regular',
    marginTop: 5, // Space between input field and error message
  },
});
