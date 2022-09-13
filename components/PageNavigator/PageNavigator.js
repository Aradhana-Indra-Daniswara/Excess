import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Checkout from '../Checkout'
import Register from '../Register'
import Login from '../Login'
import Voucher from '../Voucher'
import Cart from '../Cart'
import MainNavigator from '../MainNavigator'

export default function PageNavigator() {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#F9F9F9',
        },
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: '900'
        },
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: true
          }}
        />
        <Stack.Screen
          name="Main"
          component={MainNavigator}
        />

        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{
            headerShown: true,
            headerBackButtonMenuEnabled: true
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
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Voucher"
          component={Voucher}
          options={{
            headerShown: true,
            headerBackVisible: true,
            headerBackButtonMenuEnabled: true,
            headerTitle: "Vouchers Available",
            headerTitleStyle: {
              fontWeight: '900',
              fontSize: 20
            }
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
