import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width } = Dimensions.get('window');

const CategoryDetailScreen = ({ route }) => {
  const { image, name, title, description, location } = route.params;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const descriptionStyle = isExpanded ? styles.descriptionExpanded : styles.descriptionCollapsed;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.descriptionHeader}>Description</Text>
        <Text style={descriptionStyle}>{description}</Text>
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.readMoreButton}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </Text>
        </TouchableOpacity>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={title}
            />
          </MapView>
        </View>
      </View>
    </ScrollView>
  );
};

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
  detailsContainer: {
    padding: 10,
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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  descriptionCollapsed: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
    maxHeight: 100, // Adjust as needed
  },
  descriptionExpanded: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  readMoreButton: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 20,
  },
  mapContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default CategoryDetailScreen;
