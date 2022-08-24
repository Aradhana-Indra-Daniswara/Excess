import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import PageNavigator from './pageNavigator'
import React, { useCallback, useEffect } from 'react'
import { Text } from 'react-native'
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  return (
    <NavigationContainer>
      <PageNavigator />
    </NavigationContainer>
  )
}