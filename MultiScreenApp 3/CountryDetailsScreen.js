import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from './FriebaseConfig';

const CountryDetailsScreen = ({ route }) => {
  const { country } = route.params;
  const { name, capital, population, area, flag, maps, capitalInfo, cca3 } = country;

  const handleFavoritePress = async () => {
    try {
      
      const favoriteCountriesRef = collection(db, 'favoriteCountries');
      const q = query(favoriteCountriesRef, where('cca3', '==', cca3));
      const snapshot = await getDocs(q);

      console.log(favoriteCountriesRef)
      console.log(q)
      console.log(snapshot)

      if (snapshot.empty) {
        
        await addDoc(favoriteCountriesRef, country);
        alert('Country added to favorites!');
      } else {
        alert('This country is already in your favorites.');
      }
    } catch (error) {
      console.error('Error adding country to favorites:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>{name.common}</Text>
      {capital && <Text>Capital: {capital[0]}</Text>}
      {population && <Text>Country Population: {population.toLocaleString()}</Text>}
      {area && <Text>Area: {Math.round(area).toLocaleString()} sq. km</Text>}
      {flag && <Image source={{ uri: flag.png }} style={{ width: 100, height: 60, marginVertical: 10 }} />}
      <TouchableOpacity onPress={handleFavoritePress}>
        <Text style={{ color: 'blue' }}>Favorite this Country?</Text>
      </TouchableOpacity>

      {maps && maps.googleMaps && capitalInfo && capitalInfo.latlng && (
        <View style={{ flex: 1, width: '100%', marginVertical: 10 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: capitalInfo.latlng[0],
              longitude: capitalInfo.latlng[1],
              latitudeDelta: 5,
              longitudeDelta: 5,
            }}
          >
            {capitalInfo && (
              <Marker
                coordinate={{
                  latitude: capitalInfo.latlng[0],
                  longitude: capitalInfo.latlng[1],
                }}
                title={capital[0]}
              />
            )}
          </MapView>
        </View>
      )}
    </View>
  );
};

export default CountryDetailsScreen;
