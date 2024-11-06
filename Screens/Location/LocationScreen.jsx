import React, { useState, useEffect, useRef } from 'react';
import { View, Linking, Platform, Alert, StyleSheet, Text, Pressable } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Callout } from 'react-native-maps'; // Import Callout
import { MaterialIcons } from '@expo/vector-icons'; // or use another icon library

const LocationScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null); // Ref to the MapView component

  useEffect(() => {
    const getLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          setHasPermission(true);
          getCurrentLocation();
        } else {
          setHasPermission(false);
          Alert.alert(
            'Location Permission Required',
            'You need to grant location permission to use this feature.',
            [
              {
                text: 'Open Settings',
                onPress: () => openLocationSettings(),
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ]
          );
        }
      } catch (error) {
        console.error('Error requesting location permissions:', error);
        setLocationError('Failed to request location permissions.');
      }
    };

    getLocationPermission();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let { coords } = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    } catch (error) {
      console.error('Error getting location:', error);
      setLocationError('Failed to get current location.');
    }
  };

  const openLocationSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const getDirections = async () => {
    if (!location) {
      setLocationError('Location not available.');
      return;
    }

    const { latitude, longitude } = location;

    // Test URL scheme based on platform
    const url = Platform.select({
      ios: `maps:0,0?q=${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}`,
    });

    if (url) {
      try {
        await Linking.openURL(url);
      } catch (error) {
        console.error('Error opening map:', error);
        setLocationError('Failed to open map with current location.');
      }
    } else {
      setLocationError('Unsupported platform.');
    }
  };

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000); // Duration of the animation
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef} // Attach the ref to MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : 37.78825,
          longitude: location ? location.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }}>
            <Callout>
              <View style={styles.calloutContainer}>
                <Pressable onPress={getDirections} style={styles.calloutButton}>
                  <MaterialIcons name="directions" size={24} color="blue" />
                  <Text style={styles.calloutText}>Get Directions</Text>
                </Pressable>
                <Pressable onPress={getDirections} style={styles.calloutButton}>
                  <MaterialIcons name="map" size={24} color="blue" />
                  <Text style={styles.calloutText}>View on Map</Text>
                </Pressable>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
      <View style={styles.topRightIcons}>
        <Pressable onPress={getDirections} style={styles.iconButton}>
          <MaterialIcons name="directions" size={30} color="blue" />
          <Text style={styles.iconText}>Directions</Text>
        </Pressable>
        <Pressable onPress={getDirections} style={styles.iconButton}>
          <MaterialIcons name="map" size={30} color="blue" />
          <Text style={styles.iconText}>Map</Text>
        </Pressable>
      </View>
      {locationError ? <Text style={styles.errorText}>{locationError}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  topRightIcons: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1, // Ensures icons are above other elements
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    elevation: 3, // Adds a shadow effect on Android
    shadowColor: '#000', // Adds a shadow effect on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  iconText: {
    marginLeft: 5,
    fontSize: 14,
  },
  calloutContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  calloutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  calloutText: {
    marginLeft: 5,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LocationScreen;
