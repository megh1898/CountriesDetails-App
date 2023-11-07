

import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';

const WorldCountriesScreen = ({ navigation }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/independent?status=true');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleCountryPress = (country) => {
    navigation.navigate('CountryDetails', { country });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCountryPress(item)}>
      <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name.common}</Text>
        <Text>Capital: {item.capital[0]}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={countries}
        keyExtractor={(item) => item.cca3}
        renderItem={renderItem}
      />
    </View>
  );
};

export default WorldCountriesScreen;