import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import SearchVendor from '../SearchVendor/SearchVendor';
import Home from './Home';

export default function HomeStack() {
  const HomeStack = createNativeStackNavigator()
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <HomeStack.Screen
        name="SearchVendor"
        component={SearchVendor}
      />
    </HomeStack.Navigator>
  );
}
