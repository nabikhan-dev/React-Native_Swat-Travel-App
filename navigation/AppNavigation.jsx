import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from '../components/TabBar.jsx';
import { FavoriteProvider } from '../context/FavoriteContext.jsx';
import SignUp_Login from '../Screens/Authentication/SignUp-LoginScreen.jsx';
import SignUp from '../Screens/Authentication/SignUpScreen';
import LogIn from '../Screens/Authentication/LoginScreen';
import Forgot from '../Screens/Authentication/ForgotScreen';
import OnBoardingScreen from '../Screens/Authentication/OnBoardingScreen';
import CategoryScreen from '../Screens/Home/CategoryScreen.jsx';
import CategoriesDetailsScreen from '../Screens/Home/CategoryDetailsScreen.jsx';
import useAuth from '../hooks/useAuth.jsx';
import DetailScreen from '../Screens/Home/DetailScreen.jsx';
import EditScreen from '../Screens/Profile/ProfileEditScreen.jsx';
import WeatherScreen from '../Screens/Location/WeatherScreen.jsx';
import TermsAndConditionsScreen from '../Screens/Profile/TermsAndConditions.jsx';
import PrivacyPolicy from '../Screens/Profile/PrivacyPolicy.jsx';
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [fontsLoaded] = useFonts({
    regular: require("../assets/Fonts/Poppins-Regular.ttf"),
    medium: require("../assets/Fonts/Poppins-Medium.ttf"),
    semibold: require("../assets/Fonts/Poppins-SemiBold.ttf"),
    bold: require("../assets/Fonts/Poppins-Bold.ttf"),
    extrabold: require("../assets/Fonts/Poppins-ExtraBold.ttf"),
  });

  const { user } = useAuth();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FavoriteProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {user ? (
              <>
                <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Category" component={CategoryScreen} options={{
                    headerStyle: {
                      backgroundColor: 'transparent',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitle: 'Category'
                  }}/>
                <Stack.Screen name="Detail" component={DetailScreen} options={{
                    headerStyle: {
                      backgroundColor: 'transparent',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitle: 'Detail'
                  }}/>
                   <Stack.Screen name='termsandcondition' component={TermsAndConditionsScreen} options={{
                    headerStyle: {
                      backgroundColor: 'transparent',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitle: ''
                  }}/>  
                  <Stack.Screen name='privacypolicy' component={PrivacyPolicy} options={{
                    headerStyle: {
                      backgroundColor: 'transparent',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitle: ''
                  }}/>
                <Stack.Screen name="Edit" component={EditScreen}  options={{
                    headerStyle: {
                      backgroundColor: 'transparent',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitle: 'Edit Profile'
                  }}/>
                <Stack.Screen
                  name="Weather"
                  component={WeatherScreen}
                  options={{
                    headerStyle: {
                      backgroundColor: 'transparent',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                  }}
                /><Stack.Screen
                  name="CategoriesDetails"
                  component={CategoriesDetailsScreen}
                  options={{
                    headerStyle: {
                      backgroundColor: 'transparent',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnBoardingScreen} />
                <Stack.Screen name="SignUpLogin" options={{ headerShown: false }} component={SignUp_Login} />
                <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignUp} />
                <Stack.Screen name="Login" options={{ headerShown: false }} component={LogIn} />
                <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} component={Forgot} />
       
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </FavoriteProvider>
    </GestureHandlerRootView>
  );
}
