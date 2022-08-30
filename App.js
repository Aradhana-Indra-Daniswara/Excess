import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import PageNavigator from './pageNavigator'
import React, { useCallback, useEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen';
import Home from './components/Home/Home';
import Navbar from './components/Navbar'
export default function App() {
  return (
    <Navbar />
  )
}
