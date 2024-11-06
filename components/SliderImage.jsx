import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

const SliderImage = ({ image, imageSource, title, imageSize, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={imageSource || { uri: image.img }} // Use the correct property name
        style={[styles.image, { width: imageSize || 80, height: imageSize || 80,  borderRadius: 50}]}
        resizeMode="cover"
      />
      <Text style={styles.title}>{image.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 25,
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SliderImage;
