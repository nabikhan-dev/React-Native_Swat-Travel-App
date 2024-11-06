import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../../db/firebase-config';
import { useNavigation, useRoute } from '@react-navigation/native';

const CategoryScreen = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { category } = route.params;

  useEffect(() => {
    const reference = ref(database, `/CategoryDetails/${category}`);
    const unsubscribe = onValue(reference, (snapshot) => {
      setLoading(true);
      try {
        const data = snapshot.val();
        if (data) {
          setCategoriesData(Object.values(data));
        } else {
          setCategoriesData([]);
        }
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
        setCategoriesData([]);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [category]);

  const handlePress = (item) => {
    navigation.navigate('CategoriesDetails', {
      image: item.image,
      name: item.name,
      title: item.title,
      description: item.description,
      location: item.location,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.categoryContainer}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
        <Text style={styles.categoryTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={categoriesData}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={renderItem}
        numColumns={1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  categoryContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
  },
  categoryImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  categoryTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoryScreen;
