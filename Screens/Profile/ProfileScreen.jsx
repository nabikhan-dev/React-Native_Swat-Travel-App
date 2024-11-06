import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderComponents from '../../components/HeaderComponent';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { auth, firestore } from '../../db/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [name, setName] = useState('User'); // Default name set to 'User'
  const [email, setEmail] = useState('');

  const fetchProfileData = async () => {
    try {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const userDoc = doc(firestore, "user", userId);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // console.log("Profile data:", data); // Log fetched data
          setName(data.name || 'User'); // Use 'User' as the default name if data.name is missing
          setEmail(data.email || '');
          if (data.profileImage) {
            setImage(data.profileImage);
          }
        } else {
          // console.log("No such document!");
        }
      } else {
        // console.log("No current user");
      }
    } catch (error) {
      console.log("Error fetching profile data:", error);
    }
  };

  // Use useFocusEffect to refresh the profile data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
    }, [])
  );

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // console.log('User signed out!');
      navigation.navigate('Login'); // Ensure navigation after logout
    } catch (error) {
      console.error("Error signing out:", error);
      Alert.alert("Error", "Could not sign out. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponents title={'Profile'} />
      <View style={styles.profileHeader}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Icon name="person-circle-outline" size={100} color="#888" />
          )}
        </View>

        <View style={styles.profileInfoContainer}>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
        </View>
      </View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Edit')}>
          <Icon name="person-outline" size={24} style={styles.icon} />
          <Text style={styles.settingText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('privacypolicy')}>
          <Icon name="shield-checkmark-outline" size={24} color="#007bff" style={styles.icon} />
          <Text style={styles.settingText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('termsandcondition')}>
          <Icon name="document-text-outline" size={24} color="#007bff" style={styles.icon} />
          <Text style={styles.settingText}>Terms of Service</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out-outline" size={24} style={styles.icon} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileInfoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 16,
    color: '#888',
  },
  settingsContainer: {
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logoutButtonText: {
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    color: '#000',
  },
});

export default ProfileScreen;
