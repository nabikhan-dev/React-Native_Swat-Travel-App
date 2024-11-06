import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, FlatList, Animated, Text, Dimensions } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../db/firebase-config';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const Banner = () => {
  const [myBanner, setMyBanner] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, 'Banner');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const BannerData = Object.values(data);
        setMyBanner(BannerData);
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (myBanner.length > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % myBanner.length);
      }
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [myBanner]);

  useEffect(() => {
    if (flatListRef.current && myBanner.length > 0) {
      flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
    }
  }, [currentIndex, myBanner]);

  const renderItem = ({ item }) => (
    <View style={[styles.bannerItem, { marginRight: 10 }]}>
      <Image source={{ uri: item.ImgUrl }} style={styles.bannerImage} />
      <LinearGradient
        colors={['rgba(0, 0, 0, .1)', 'rgba(0, 0, 0, 0.4)']} // Black background with fade effect
        style={styles.gradient}
      />
      <Text style={styles.bannerTitle}>{item.Title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {myBanner.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={myBanner}
          horizontal
          pagingEnabled
          renderItem={renderItem}
          keyExtractor={(item) => item.Key.toString()}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false} // Disable manual scrolling
          contentContainerStyle={styles.flatList}
        />
      ) : (
        <Text>Loading...</Text> // Placeholder or loading indicator
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flexDirection: 'row',
  },
  bannerItem: {
    width: 410, // Full width of the device screen
    height: 188, // Adjust height as needed
    borderRadius: 5, // Border radius
    overflow: 'hidden', // Ensure the border radius is applied
    position: 'relative', // For absolute positioning of gradient and title
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject, // Fill the entire bannerItem
  },
  bannerTitle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
 
  },
});

export default Banner;
