import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FavoriteContext from '../../context/FavoriteContext';
import SwipeableItem from '../../components/SwipeableItem';
import HeaderComponent from '../../components/HeaderComponent';
import { ScrollView } from 'react-native-gesture-handler';

export default function FavoriteScreen() {
  const { favoriteItems, handleFavoritePress } = useContext(FavoriteContext);

  useEffect(() => {
    // console.log('FavoriteScreen - favoriteItems:', favoriteItems); // Debugging log
  }, [favoriteItems]);

  const handleSwipeLeft = (item) => {
    handleFavoritePress(item);
  };

  const handleCancel = () => {
    // Add any additional cancel functionality if needed
  };

  return (
    <>
      <HeaderComponent title={'Favorite'} />
      <ScrollView>
      <View style={styles.container}>
        {Array.isArray(favoriteItems) && favoriteItems.length === 0 ? (
          <Text>No favorites yet.</Text>
        ) : (
          Array.isArray(favoriteItems) && favoriteItems.map((item) => (
            <SwipeableItem
              key={item.key}
              item={item}
              onSwipeLeft={() => handleSwipeLeft(item)}
              onCancel={handleCancel}
            />
          ))
        )}
      </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    alignItems: 'center',
  },
});
