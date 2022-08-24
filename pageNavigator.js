import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './components/Login'

export default function PageNavigator() {
  const Stack = createNativeStackNavigator()
  
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Login"
          component={Login}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
