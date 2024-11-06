// Toast.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

const Toast = ({ visible, message, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Show for 3 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.toast}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  toast: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    marginBottom: 50, // Margin from the bottom
  },
  message: {
    color: 'white',
    fontSize: 16,
  },
});

export default Toast;
