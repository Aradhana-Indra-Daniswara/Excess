import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

export default function Register() {
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

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAgreed, setIsAgreed] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const validateInput = () => {
    if(name === '' 
        || phoneNumber === ''
        || email === ''
        || password === '' 
        || !isAgreed
      ){
      setError(true)
      setErrorMessage('All fields must be filled')
      return false
    } else {
      setError(false)
      return true
    }
  }

  const sendRegisterRequest = async() => {
    if(validateInput()) {
      const url = 'http://localhost:3000/register'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          phoneNumber, 
          email,
          password
        })
      })

      const JSONResponse = await response.json()

      console.log(JSONResponse)
    }
  }
  
  return (
    <SafeAreaView style={[Styles.centerContainer, { marginTop: 112 }]}>
      <Text 
        style={{  
          fontSize: 30,
          fontWeight: '800'
        }}
      >
        Welcome Aboard!
      </Text>

      <View style={{ marginTop: 25, alignItems: 'flex-start', width: 250 }}>

        <View>
          <Text style={[Styles.label]}>Nama Lengkap</Text>
          <TextInput 
            style={[Styles.inputField]}
            autoCapitalize='words'
            autoComplete='name'
            autoCorrect='false'
            autoFocus
            onChangeText={(input) => setName(input)}
          />
        </View>

        <View style={{ marginTop: 11 }}>
          <Text style={[Styles.label]}>No. Handphone</Text>
          <TextInput 
            style={[Styles.inputField]}
            keyboardType='phone-pad'
            onChangeText={(input) => setPhoneNumber(input)}
          />
        </View>

        <View style={{ marginTop: 11 }}>
          <Text style={[Styles.label]}>Email</Text>
          <TextInput 
            style={[Styles.inputField]}
            autoCapitalize='none'
            autoComplete='email'
            autoCorrect='false'
            keyboardType='email-address'
            onChangeText={(input) => setEmail(input)}
          />
        </View>

        <View style={{ marginTop: 11 }}>
          <Text style={[Styles.label]}>Password</Text>
          <TextInput 
            style={[Styles.inputField]}
            autoCapitalize='none'
            autoCorrect='false'
            secureTextEntry
            onChangeText={(input) => setPassword(input)}
          />
        </View>
        
        <View style={{ marginTop: 11, flexDirection: 'row', alignItems: 'center' }}>
          <BouncyCheckbox
            text="I agree to the terms and conditions"
            textStyle={{
              textDecorationLine: 'none',
              color: '#000',
              fontSize: 12
            }}
            size={32}
            fillColor="#51C699"
            innerIconStyle={{  
              borderRadius:10,
              borderColor: 'black'
            }}
            iconStyle={{ 
              borderRadius: 10
            }}
            onPress={() => setIsAgreed(!isAgreed)}
          />
          {/* <Text>I Agree to the <Text style={{ color: '#6C25b4' }}>terms and conditions</Text> </Text> */}
        </View>

        {error && <Text>{errorMessage}</Text>}

        <View style={{ marginTop: 43 }}>
          <TouchableOpacity
            style={[Styles.button, { backgroundColor: '#51C699' }]}
            onPress={sendRegisterRequest}
          >
            <Text style={[Styles.buttonFont]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}