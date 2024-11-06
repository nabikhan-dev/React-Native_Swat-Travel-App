import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import SliderImage from '../../components/SliderImage';
import CircularImageWithFavorite from '../../components/CardComponents';
import { useNavigation } from '@react-navigation/native';
import { app } from '../../db/firebase-config';
import { getDatabase, onValue, ref } from 'firebase/database';
import BannerComponent from '../../components/bannerComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [mySlider, setMySlider] = useState([]);
  const [places, setPlaces] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const navigation = useNavigation();

  const handleCategory = (title) => {
    navigation.navigate('Category', { category: title });
  };
  
  const handleDetail = (place) => {
    navigation.navigate('Detail', {
      image: place.img,
      name: place.name,
      title: place.title,
      Descripation: place.Descripation,
      location: place.location,
    });
  };

  const handleWeather = () => {
    navigation.navigate('Weather');
  };

  useEffect(() => {
    const db = getDatabase(app);

    const sliderRef = ref(db, 'Slider');
    onValue(sliderRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMySlider(Object.values(data));
      }
    });

    const placesRef = ref(db, 'PapularPlace');
    onValue(placesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPlaces(Object.values(data));
      }
    });

    const recommendationsRef = ref(db, 'Recommendation ');
    onValue(recommendationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRecommendations(Object.values(data));
      }
    });
  }, []);

  const getImageSource = (uri) => {
    return typeof uri === 'string' ? { uri } : { uri: 'https://via.placeholder.com/150' };
  };

  const renderPopularPlaceItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <CircularImageWithFavorite
        imageSource={getImageSource(item.img[0])}
        title={item.name}
        imageWidth={230}
        imageHeight={138}
        onPress={() => handleDetail(item)}
        item={item}
      />
    </View>
  );

  const renderRecommendationItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <CircularImageWithFavorite
        imageSource={getImageSource(item.img[0])}
        title={item.name}
        imageWidth={198}
        imageHeight={138}
        onPress={() => handleDetail(item)}
        item={item}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={recommendations}
        renderItem={renderRecommendationItem}
        keyExtractor={(item, index) => `recommendation-${index}`}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={
          <>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>
                Where Do You {'\n'}Want <Text style={styles.headerHighlight}>Discover</Text>
              </Text>
              <TouchableOpacity style={styles.weatherIcon} onPress={handleWeather}>
                <Icon name="cloud" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={styles.banner}>
              <BannerComponent />
            </View>
            <View style={styles.sliderContainer}>
              <FlatList
                data={mySlider}
                renderItem={({ item, index }) => (
                  <SliderImage image={item} key={`slider-${index}`} onPress={() => handleCategory(item.title)} />
                )}
                keyExtractor={(item, index) => `slider-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <Text style={styles.title}>Popular Places</Text>
            <FlatList
              data={places}
              renderItem={renderPopularPlaceItem}
              keyExtractor={(item, index) => `place-${index}`}
              horizontal
              contentContainerStyle={styles.horizontalScrollViewContent}
              showsHorizontalScrollIndicator={false}
            />
            <Text style={styles.title}>Recommendation Places</Text>
          </>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'medium',
    fontSize: width * 0.08,
  },
  headerHighlight: {
    color: '#4AA9BC',
    fontSize: width * 0.09,
    fontFamily: 'bold',
  },
  weatherIcon: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 40,
    backgroundColor: '#3433',
  },
  banner: {
    width: '100%',
    height: 188,
    marginVertical: 20,
  },
  sliderContainer: {
    marginTop: 20,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: 'bold',
    marginVertical: 20,
  },
  horizontalScrollViewContent: {
    flexDirection: 'row',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
