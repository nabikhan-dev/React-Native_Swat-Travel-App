import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon set you want to use

const { width } = Dimensions.get('window');

const CustomButton = ({ onPress, title, backgroundColor, textColor, Width, Height, FontWidth, customStyle, icon }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, customStyle, { backgroundColor: backgroundColor || 'white' }, { width: Width ||   width * 0.7 }, { height: Height || 60 }]} 
      onPress={onPress}
    >
      <View style={styles.buttonContent}>
        {icon && <Icon name={icon} size={20} color={textColor || '#4AA9BC'} style={styles.icon} />}
        <Text style={[styles.buttonText, { color: textColor || '#4AA9BC' }, { fontSize: FontWidth || width * 0.06 }]} >
          {title}
        </Text>
      </View>
    </TouchableOpacity> 
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, // Optional, for rounded corners
    borderWidth: 1,
    borderColor: '#4AA9BC', // Optional, for border color
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'medium',
    textAlign: 'center',
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
});

export default CustomButton;
