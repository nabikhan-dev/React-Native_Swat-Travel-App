import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import CustomAlert from './CustomAlert'; // Import your custom alert component
import Icon from 'react-native-vector-icons/MaterialIcons';
import FavoriteContext from '../context/FavoriteContext'; // Import the context

const { width } = Dimensions.get('window');

const SwipeableItem = ({ item }) => {
  const [isDeleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const { removeFavorite } = useContext(FavoriteContext); // Use the removeFavorite function from context

  const showDeleteConfirmation = () => {
    setDeleteAlertVisible(true);
  };

  const handleDeleteConfirm = () => {
    removeFavorite(item.key); // Remove item from favorites using the item's key
    setDeleteAlertVisible(false); // Close the alert after confirming
  };

  const handleDeleteCancel = () => {
    setDeleteAlertVisible(false); // Close the alert if cancelled
  };

  const renderRightActions = () => (
    <TouchableOpacity onPress={showDeleteConfirmation} style={styles.rightAction}>
      <Icon name="delete" size={30} color="white" />
    </TouchableOpacity>
  );



  return (
    <>
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.container}>
          <Image
            source={{ uri: item.imageSource || 'https://via.placeholder.com/80' }} // Fallback image for testing
            style={styles.image}
            resizeMode="cover"
         
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>Swipe left to remove</Text>
          </View>
        </View>
      </Swipeable>

      <CustomAlert
        isVisible={isDeleteAlertVisible}
        title="Remove from Favorites?"
        message="Are you sure you want to remove this item from your favorites?"
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9, // Adjust width to be responsive
    height: 100, // Increased height to accommodate image and text
    backgroundColor: '#f8f8f8', // Changed to a lighter color for better visibility
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000', // Add shadow for better visibility
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    borderColor: '#ccc', // Add border color to improve image visibility
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Changed text color for better contrast
  },
  subtitle: {
    fontSize: 14,
    marginTop: 5,
    color: '#666', // Changed text color for better contrast
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Slightly transparent background
    padding: 5,
    borderRadius: 5,
  },
  rightAction: {
    width: 70,
    height: '100%',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});

export default SwipeableItem;
