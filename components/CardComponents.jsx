import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FavoriteContext from '../context/FavoriteContext';

const CircularImageWithFavorite = ({ imageSource, title, imageWidth, imageHeight, onPress, item }) => {
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoriteContext);
  const isItemFavorite = isFavorite(item.key);

  const handleFavoritePress = () => {
    if (isItemFavorite) {
      removeFavorite(item.key);
    } else {
      addFavorite(item);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image 
          source={imageSource} 
          style={[styles.image, { width: imageWidth, height: imageHeight }]} 
          resizeMode="cover" // Ensures smooth scaling of the image
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteButton}>
        <Icon
          name="favorite"
          size={18}
          color={isItemFavorite ? 'red' : 'gray'}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden', // Ensures border radius applies to the image
    elevation: 1, // Optional: adds a slight shadow to the entire container
  },
  image: {
    borderRadius: 10, // Apply border radius to the image
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',// Set background color to transparent
    borderRadius: 50, // Circular shape
    padding: 4, // Increase padding for better touch area
    shadowColor: '#000', // Adds shadow effect
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 3, // Shadow blur radius
  },
  title: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: to make the text more readable
    padding: 8,
    borderRadius: 5, // Slightly rounded corners for the title background
  },
});

export default CircularImageWithFavorite;
