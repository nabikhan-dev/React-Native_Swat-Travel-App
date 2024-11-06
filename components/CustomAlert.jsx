import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const CustomAlert = ({ isVisible, title, message, onCancel, onConfirm }) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.5} style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        <View style={styles.buttons}>
         
          <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
            <Text style={[styles.buttonText, styles.confirmButtonText]}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 334,
    height: 235,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'column', // Ensure buttons are in a column
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10, // Add vertical space between buttons
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#4AA9BC',
    
  },
  confirmButton: {
    backgroundColor: '#4AA9BC',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4AA9BC',
  },
  confirmButtonText: {
    color: 'white',
  },
});

export default CustomAlert;
