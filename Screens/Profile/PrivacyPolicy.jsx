import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
       
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.text}>
          Welcome to the [App Name] app. Your privacy is important to us, and this policy outlines how we handle your personal information.
        </Text>

        <Text style={styles.sectionTitle}>Information Collection</Text>
        <Text style={styles.text}>
          We collect personal information that you provide to us directly, such as your name, email address, and location data when you use our app.
        </Text>

        <Text style={styles.sectionTitle}>Use of Information</Text>
        <Text style={styles.text}>
          The information we collect is used to improve our services, communicate with you, and personalize your experience within the app.
        </Text>

        <Text style={styles.sectionTitle}>Data Sharing and Disclosure</Text>
        <Text style={styles.text}>
          We do not share your personal information with third parties, except when required by law or to protect our rights.
        </Text>

        <Text style={styles.sectionTitle}>Security</Text>
        <Text style={styles.text}>
          We take reasonable measures to protect your personal information from unauthorized access and disclosure.
        </Text>

        <Text style={styles.sectionTitle}>User Rights</Text>
        <Text style={styles.text}>
          You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.
        </Text>

        <Text style={styles.sectionTitle}>Changes to This Policy</Text>
        <Text style={styles.text}>
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </Text>

        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.text}>
          If you have any questions about this privacy policy, please contact us at [your contact information].
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // backgroundColor: '#333333',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    // color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    // color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    // color: '#CCCCCC',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default PrivacyPolicyScreen;
