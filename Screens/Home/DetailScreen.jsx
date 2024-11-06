import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, ScrollView, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width } = Dimensions.get('window');

export default function DetailScreen({ route }) {
  const { image, title, Descripation, location, name } = route.params || {};
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef(null);

  const hasLocation = location && location.latitude && location.longitude;

  const initialRegion = hasLocation ? {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  } : {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentImageIndex + 1;
      if (nextIndex >= (image?.length || 1)) {
        nextIndex = 0;
      }
      scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentImageIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentImageIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {image && image.length > 0 ? (
              image.map((img, index) => (
                <Animated.Image
                  key={index}
                  source={{ uri: img }}
                  style={[styles.image, { opacity: fadeAnim }]}
                />
              ))
            ) : (
              <Animated.Image
                source={{ uri: 'https://via.placeholder.com/250' }}
                style={[styles.image, { opacity: fadeAnim }]}
              />
            )}
          </ScrollView>

          <View style={styles.pagination}>
            {image && image.length > 0 && image.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentImageIndex ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.name}>{name || 'Title not available'}</Text>
            <Text style={styles.title}>{title || 'Title not available'}</Text>
          </View>
          {/* Removed the favorite button */}
        </View>

        <Text style={styles.descriptionHeader}>Description</Text>
        <Text style={styles.description}>
          {showFullDescription ? (Descripation || 'No description available') : ((Descripation|| 'No description available').substring(0, 100) + '...')}
          <TouchableOpacity onPress={toggleDescription}>
            <Text style={styles.readMoreText}>{showFullDescription ? ' Read Less' : ' Read More'}</Text>
          </TouchableOpacity>
        </Text>

        {hasLocation ? (
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
          >
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title={title}
              description={Descripation
              }
            />
          </MapView>
        ) : (
          <Text style={styles.noLocationText}>Location not available</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: width - 40,
    height: 250,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 50,
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: 20,
  },
  activeDot: {
    backgroundColor: '#007BFF',
  },
  inactiveDot: {
    backgroundColor: '#CCCCCC',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  title: {
    fontSize: 18,
    color: '#374151',
    fontWeight: 'normal',
    marginBottom: 20,
  },
  descriptionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color: '#374151',
    fontWeight: 'normal',
    marginBottom: 20,
  },
  readMoreText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  noLocationText: {
    fontSize: 18,
    color: '#ff0000',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'normal',
  },
});
