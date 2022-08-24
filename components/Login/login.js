import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Login = () => {
  const Styles = StyleSheet.create({
    centerContainer: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    label: {
      fontSize: 15,
      fontWeight: '500',
      letterSpacing: -0.33
    },
    inputField: {
      width: 250,
      height: 45,
      padding: 10,
      borderColor: '#000000',
      borderRadius: 10,
      borderWidth: 1,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 250,
      height: 45,
      padding: 10,
      borderRadius: 10,
    },
    buttonFont: {
      color: '#FFFFFF',
      fontSize: 20
    }
  })

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={[Styles.centerContainer, { marginTop: 130 }]}>
      <Text
        style={{ 
          fontSize: 30,
          fontWeight: "800"
        }}
      >
        Welcome Back!
      </Text>

      <View style={{ marginTop: 25, alignItems: 'flex-start', width: 250 }}>
        <Text style={[Styles.label]}>Email</Text>
        <TextInput 
          style={[Styles.inputField]}
          autoCapitalize='none'
          autoComplete='email'
          autoCorrect='none'
          autoFocus
          onChangeText={(input) => setEmail(input)}
        />
      </View>
      
      <View style={{ marginTop: 11, alignItems: 'flex-start', width: 250 }}>
        <Text style={[Styles.label]}>Password</Text>
        <TextInput 
          style={[Styles.inputField]}
          autoCapitalize='none'
          secureTextEntry
          onChangeText={(input) => setPassword(input)}
        />
      </View>

      <View style={[Styles.centerContainer, { marginTop: 43  }]}>
        <TouchableOpacity 
          style={[Styles.button, { backgroundColor: '#51C699' }]}
          // TODO: onPress={}
        >
          <Text style={[Styles.buttonFont]}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={[Styles.centerContainer, { marginTop: 10, flexDirection: 'row' }]}>
        <View style={{ width: 105, borderWidth: 1, borderColor: '#DDDDDD' }}></View>
        <Text style={{ marginHorizontal: 8 }}>Or</Text>
        <View style={{ width: 105, borderWidth: 1, borderColor: '#DDDDDD' }}></View>
      </View>

      <View style={[Styles.centerContainer, { marginTop: 10  }]}>
        <TouchableOpacity style={[Styles.button, { backgroundColor: '#000000' }]}>
          <Text style={[Styles.buttonFont]}>Register</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default Login;
