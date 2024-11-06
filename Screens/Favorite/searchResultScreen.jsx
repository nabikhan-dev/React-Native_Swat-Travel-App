import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getApp } from 'firebase/app';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const app = getApp();
  const database = getDatabase(app);

  // Debounce function to delay the search operation
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchData = () => {
    const dbRef = ref(database, 'your/data/path'); // Adjust the path as needed
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = Object.values(data); // Convert object to array
      setAllData(dataArray);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const results = allData.filter(item =>
        item.name.toLowerCase().includes(lowercasedTerm) ||
        item.description.toLowerCase().includes(lowercasedTerm) ||
        item.title.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredData(results);
    } else {
      setFilteredData(allData);
    }
  }, [searchTerm, allData]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Search..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={{ padding: 8, borderColor: '#ccc', borderWidth: 1, marginBottom: 16 }}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 18 }}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>No results found.</Text>}
        />
      )}
    </View>
  );
};

export default SearchScreen;
