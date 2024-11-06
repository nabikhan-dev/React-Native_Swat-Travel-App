import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home/HomeScreen';
import FavoriteScreen from '../Screens/Favorite/FavoriteScreen';
import LocationScreen from '../Screens/Location/LocationScreen'; // Ensure you have this screen
import ProfileScreen from '../Screens/Profile/ProfileScreen'; // Ensure you have this screen
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'HomeTab':
                iconName = 'home';
                break;
              case 'LocationTab':
                iconName = 'location-on'; // Icon for Location
                break;
              case 'FavoriteTab':
                iconName = 'favorite';
                break;
              case 'ProfileTab':
                iconName = 'person'; // Icon for Profile
                break;
              default:
                iconName = 'home';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4AA9BC',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="HomeTab" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="LocationTab" component={LocationScreen} options={{ headerShown: false }} />
        <Tab.Screen name="FavoriteTab" component={FavoriteScreen} options={{ headerShown: false }} />
        <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
}
