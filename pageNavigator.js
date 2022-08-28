import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './components/Login'
import Register from './components/Register/Register'

export default function PageNavigator() {
  const Stack = createNativeStackNavigator()
  
  return (
    <Stack.Navigator
      screenOptions={{  
        headerShown: false
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{  
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="Register"
          component={Register}
          options={{ 
            headerShown: true
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
