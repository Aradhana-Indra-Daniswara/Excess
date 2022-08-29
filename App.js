import { NavigationContainer } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import PageNavigator from './components/PageNavigator'

export default function App() {
  return (
    <NavigationContainer>
      <PageNavigator />
    </NavigationContainer>
  )
}
