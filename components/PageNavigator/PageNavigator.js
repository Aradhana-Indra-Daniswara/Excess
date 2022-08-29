import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './components/Login'
import Register from './components/Register'
import Checkout from './components/Checkout'

export default function PageNavigator() {
  const Stack = createNativeStackNavigator()
  
  return (
    <Stack.Navigator
      screenOptions={{  
        headerShown: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#F9F9F9'
        },
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{  
            headerShown: true
          }}
        />
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
