import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, firestore, storage } from '../../db/firebase-config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Toast from '../../components/Toast'
const EditProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (userId) {
          const userDoc = doc(firestore, "user", userId);
          const docSnap = await getDoc(userDoc);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setName(data.name || '');
            setEmail(data.email || '');
            setImage(data.profileImage || '');
          } else {
            // console.log("No such document!");
          }
        } else {
          // console.log("User not logged in.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera roll permissions are required to change the profile picture.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    } else {
      // console.log("Image picker canceled or no image selected");
    }
  };

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleUpdate = async () => {
    try {
      let profileImageURL = image;

      if (image && !image.startsWith('http')) {
        profileImageURL = await uploadImageAsync(image);
      }

      const userId = auth.currentUser?.uid;
      if (userId) {
        const userDoc = doc(firestore, "user", userId);
        await updateDoc(userDoc, {
          name: name || '',
          email: email || '',
          profileImage: profileImageURL || '',
        });

        setToastMessage('Profile updated successfully.');
        setToastVisible(true);
      } else {
        setToastMessage('User not logged in.');
        setToastVisible(true);
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
      setToastMessage('Could not update profile. Please try again.');
      setToastVisible(true);
    }
  };

  const uploadImageAsync = async (uri) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(new TypeError("Network request failed"));
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const userId = auth.currentUser?.uid;
      if (userId) {
        const storageRef = ref(storage, `UserImage/${userId}`);
        await uploadBytes(storageRef, blob);

        blob.close();

        return await getDownloadURL(storageRef);
      } else {
        // console.log("User not logged in.");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity onPress={handleImagePicker} style={styles.imagePicker}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <Icon name="person-circle-outline" size={100} color="#888" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImagePicker} style={styles.changeImageButton}>
            <Icon name="camera-outline" size={24} color="#007bff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
       <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <Toast
        visible={toastVisible}
        message={toastMessage}
        onClose={() => setToastVisible(false)}
      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 120,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 5,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default EditProfileScreen;
