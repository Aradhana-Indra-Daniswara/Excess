import { NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react'
import PageNavigator from './components/PageNavigator'

export default function App() {
  return (  
    <NavigationContainer>
      <PageNavigator />
    </NavigationContainer>
  )
}