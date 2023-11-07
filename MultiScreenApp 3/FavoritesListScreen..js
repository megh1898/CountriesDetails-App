import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from './FriebaseConfig';

const FavoritesListScreen = () => {
  const [favoriteCountries, setFavoriteCountries] = useState([]);

  useEffect(() => {
    const fetchFavoriteCountries = async () => {
      try {
        const favoriteCountriesRef = collection(db, 'favoriteCountries');
        const q = query(favoriteCountriesRef);
        const snapshot = await getDocs(q);

        const favoriteCountriesData = snapshot.docs.map((doc) => doc.data());
        setFavoriteCountries(favoriteCountriesData);
      } catch (error) {
        console.error('Error fetching favorite countries:', error);
      }
    };

    fetchFavoriteCountries();
  }, []);

  const renderFavoriteCountry = ({ item }) => {
    const { name, capital, population, flags } = item;
    const pngUrl = flags && flags.png;
  
    return (
      <View style={styles.countryContainer}>
        {pngUrl && (
          <Image source={{ uri: pngUrl }} style={styles.flag} />
        )}
        {name && name.common && (
          <Text style={styles.countryName}>{name.common}</Text>
        )}
        {capital && capital[0] && <Text>Capital: {capital[0]}</Text>}
        {population && <Text>Population: {population.toLocaleString()}</Text>}
      </View>
    );
  };
  
  

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {favoriteCountries.length > 0 ? (
        <FlatList
          data={favoriteCountries}
          keyExtractor={(item) => item.cca3}
          renderItem={renderFavoriteCountry}
        />
      ) : (
        <Text>No favorite countries yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  countryContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  countryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  flag: {
    width: 100,
    height: 60,
    marginVertical: 10,
  },
});

export default FavoritesListScreen;
