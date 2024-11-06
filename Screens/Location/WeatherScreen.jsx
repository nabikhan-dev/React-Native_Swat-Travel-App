import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, KeyboardAvoidingView, Platform, ActivityIndicator, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';

const WeatherScreen = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDaytime, setIsDaytime] = useState(true);

    const fetchWeatherData = async (cityName) => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c3df1fc107074d33998144251240309&q=${cityName}&days=7&aqi=no`);
            const data = await response.json();

            if (response.ok && data.forecast && data.forecast.forecastday) {
                setWeatherData(data);
                const currentTime = new Date(data.location.localtime);
                const currentHour = currentTime.getHours();
                setIsDaytime(currentHour >= 6 && currentHour < 18);
            } else {
                console.log('Error: Failed to fetch weather data');
            }
        } catch (error) {
            console.log('Error: Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const fetchWeatherForCurrentLocation = async () => {
        setLoading(true);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c3df1fc107074d33998144251240309&q=${latitude},${longitude}&days=7&aqi=no`);
            const data = await response.json();

            if (response.ok && data.forecast && data.forecast.forecastday) {
                setWeatherData(data);
                const currentTime = new Date(data.location.localtime);
                const currentHour = currentTime.getHours();
                setIsDaytime(currentHour >= 6 && currentHour < 18);
            } else {
                console.log('Error: Failed to fetch weather data');
            }
        } catch (error) {
            console.log('Error: Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherForCurrentLocation();
    }, []);

    const handleSearch = () => {
        if (city.trim().length > 0) {
            fetchWeatherData(city);
            Keyboard.dismiss();  // Dismiss the keyboard after search
        }
    };

    const renderForecastItem = ({ item }) => (
        <View style={styles.forecastItem}>
            <Text style={styles.forecastDate}>{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })}</Text>
            <Image style={styles.forecastIcon} source={{ uri: `https:${item.day.condition.icon}` }} />
            <Text style={styles.forecastTemp}>{item.day.avgtemp_c}°C</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    if (!weatherData) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Weather data not available.</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : null}
            style={styles.container}
        >
            <LinearGradient
                colors={isDaytime ? ['#4facfe', '#00f2fe'] : ['#000000', '#434343']}
                style={styles.innerContainer}
            >
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search city"
                        value={city}
                        onChangeText={setCity}
                        onSubmitEditing={handleSearch}  // Fetch data on search submission
                    />
                </View>
                <View style={styles.weatherInfo}>
                    <Text style={styles.cityName}>{weatherData.location.name}</Text>
                    <Image
                        style={styles.weatherIcon}
                        source={{ uri: `https:${weatherData.current.condition.icon}` }}
                    />
                    <Text style={styles.temperature}>{weatherData.current.temp_c}°C</Text>
                </View>
                <FlatList
                    data={weatherData.forecast.forecastday}
                    renderItem={renderForecastItem}
                    keyExtractor={(item) => item.date}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.forecastList}
                />
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
    },
    searchBar: {
        borderRadius: 50,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    searchContainer: {
        padding: 20,
        marginTop: 80,
    },
    weatherInfo: {
        alignItems: 'center',
        flex: 4
    },
    cityName: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 100,
        color: '#fff',
    },
    temperature: {
        fontSize: 40,
        marginTop: 10,
        color: '#fff',
    },
    forecastList: {
        marginTop: 20,
    },
    forecastItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        marginHorizontal: 10,
        padding: 15,
        height: 120,
        borderRadius: 5,
    },
    forecastDate: {
        fontSize: 16,
        marginBottom: 5,
        color: '#000',
    },
    forecastIcon: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    forecastTemp: {
        fontSize: 16,
        color: '#000',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4facfe',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4facfe',
    },
    errorText: {
        fontSize: 18,
        color: '#fff',
    },
    weatherIcon: {
        width: 200,
        height: 200,
    },
});

export default WeatherScreen;
