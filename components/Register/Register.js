import React, { useState } from 'react'
import { Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import AppText from '../AppText'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from '../../config/firebase-config'
import { doc, setDoc } from 'firebase/firestore'

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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10
  },
  buttonFont: {
    color: '#FFFFFF',
    fontSize: 20
  }
})

export default function Register({ navigation }) {

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
  
  const registerHandler = async () => {
    setError(false);
    if(validateInput()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // figure out how to add phone number lmao 
        // await setDoc(doc(firestore, "users", userCredential.user.uid), {
        //   email,
        //   name,
        //   phoneNumber
        // })
        console.log(userCredential);
        navigation.navigate("Home");
      } catch(e) {
        setError(true);
        setErrorMessage(e.message);
      }
    } else {
      setError(true);
      setErrorMessage("Fields can't be blank");
    }
  }
  
  return (
    <SafeAreaView style={[Styles.centerContainer, { marginTop: 112 }]}>
      <AppText fontFamily={'Montserrat-ExtraBold'} size={30}>Welcome Aboard!</AppText>

      <View style={{ marginTop: 25, alignItems: 'flex-start', width: 250 }}>
        <View>
          <AppText fontFamily={'Montserrat-Medium'} size={16}>Nama Lengkap</AppText>
          <TextInput 
            style={[Styles.inputField]}
            autoCapitalize='words'
            autoComplete='name'
            autoCorrect={false}
            autoFocus
            onChangeText={(input) => setName(input)}
          />
        </View>

        <View style={{ marginTop: 11 }}>
          <AppText fontFamily={'Montserrat-Medium'} size={16}>No. Handphone</AppText>
          <TextInput 
            style={[Styles.inputField]}
            keyboardType='phone-pad'
            onChangeText={(input) => setPhoneNumber(input)}
          />
        </View>

        <View style={{ marginTop: 11 }}>
          <AppText fontFamily={'Montserrat-Medium'} size={16}>Email</AppText>
          <TextInput 
            style={[Styles.inputField]}
            autoCapitalize='none'
            autoComplete='email'
            autoCorrect={false}
            keyboardType='email-address'
            onChangeText={(input) => setEmail(input)}
          />
        </View>

        <View style={{ marginTop: 11 }}>
          <AppText fontFamily={'Montserrat-Medium'} size={16}>Password</AppText>
          <TextInput 
            style={[Styles.inputField]}
            autoCapitalize='none'
            autoCorrect={false}
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
        </View>

        {error && <Text>{errorMessage}</Text>}

        <View style={{ marginTop: 43 }}>
          <TouchableOpacity
            style={[Styles.button, { backgroundColor: '#51C699' }]}
            onPress={registerHandler}
          >
            <AppText fontFamily={'Montserrat-SemiBold'} size={20} color="white">
              Register
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}