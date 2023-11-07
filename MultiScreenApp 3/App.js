import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import WorldCountriesScreen from './WorldCountries';
import CountryDetailsScreen from './CountryDetailsScreen';
import FavoritesListScreen from './FavoritesListScreen.';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const WorldStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WorldCountries" component={WorldCountriesScreen} />
      <Stack.Screen name="CountryDetails" component={CountryDetailsScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="World" component={WorldStack} />
        <Tab.Screen name="Favorites" component={FavoritesListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
