import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TermsAndConditionsScreen = () => {
  return (
    <ScrollView style={styles.container}>
 
      <Text style={styles.sectionTitle}>1. Introduction</Text>
      <Text style={styles.text}>
        Welcome to our tourism guide app. By accessing or using our app, you agree to be bound by these terms and conditions.
      </Text>

      <Text style={styles.sectionTitle}>2. User Responsibilities</Text>
      <Text style={styles.text}>
        Users are responsible for their actions within the app. All information provided must be accurate, and users must not engage in any unlawful activities.
      </Text>

      <Text style={styles.sectionTitle}>3. Content Ownership</Text>
      <Text style={styles.text}>
        All content within this app, including text, images, and other media, is owned by us or our licensors. Unauthorized use is prohibited.
      </Text>

      <Text style={styles.sectionTitle}>4. Changes to Terms</Text>
      <Text style={styles.text}>
        We reserve the right to change these terms at any time. Continued use of the app following any changes will constitute acceptance of the new terms.
      </Text>

      <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
      <Text style={styles.text}>
        We are not liable for any damages or losses resulting from the use of our app. Users agree to use the app at their own risk.
      </Text>

      <Text style={styles.sectionTitle}>6. Contact Us</Text>
      <Text style={styles.text}>
        If you have any questions about these terms, please contact us through the app or via our website.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
 
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
});

export default TermsAndConditionsScreen;
