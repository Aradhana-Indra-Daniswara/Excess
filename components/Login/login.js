import { useFonts } from 'expo-font';
import React, { useState } from 'react'
import { Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AppText from '../AppText';

// Icons
import Excess_Logo_White from '../../assets/excess_logo-white.svg';
import Excess_Logo_Text from '../../assets/excess_text-white.svg';
import Tosca_Blob from '../../assets/tosca_elipse.svg'

// Styling
import { colorStyles, globalStyles } from '../Styling/GlobalStyles';

const Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [fontsLoaded] = useFonts({
    'OpenSauceSans-Regular': require('../../assets/fonts/OpenSauceSans-Regular.ttf'),
  });

  const validateInput = () => {
    if (email === '' || password === '') {
      return false
    } else {
      return true
    }
  }

  const loginHandler = async () => {
    if (validateInput()) {
      setError(false)

      const url = Platform.OS === 'ios'
        ? "http://localhost:3000/login"
        : "http://10.0.2.2:3000/login"

      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const { error, message } = await response.json()

      if (!error) {
        navigation.navigate("Home")
      } else {
        setError(true)
        setErrorMessage(message)
      }
    } else {
      setError(true)
      setErrorMessage("Field is blank")
    }
  }
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={{ ...globalStyles.container, position: 'relative' }}>
      {/* Decorational Blob */}
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center', 
          alignItems: 'center',
          top: -210,
          left: 0,
          right: 0,
        }}>
        <Tosca_Blob />
      </View>
      <View style={{ marginTop: 64 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Excess_Logo_White />
          <Excess_Logo_Text style={{ marginLeft: 10 }} />
        </View>
        <AppText style={{ color: colorStyles['white'], fontSize: 18, textAlign: 'center', marginTop: 16 }}>Good Food, Cheap Prices</AppText>
      </View>

      <AppText weight={'700'} style={{ fontSize: 30, color: colorStyles[20], marginTop: 48 }}>Login</AppText>
      <View style={{ marginTop: 32, width: '100%' }}>
        <AppText weight={'500'} size={16} style={{ color: colorStyles[20] }}>Email</AppText>
        <TextInput
          style={[Styles.inputField]}
          keyboardType='email-address'
          autoCapitalize='none'
          autoComplete='email'
          autoCorrect={false}
          autoFocus
          onChangeText={(input) => setEmail(input)}
          placeholder='example@gmail.com'
        />
      </View>

      <View style={{ marginTop: 14, width: '100%' }}>
        <AppText weight={'500'} style={{ fontSize: 16, color: colorStyles[20] }}>Password</AppText>
        <TextInput
          style={[Styles.inputField]}
          autoCapitalize='false'
          secureTextEntry
          onChangeText={(input) => setPassword(input)}
          placeholder='***********'
        />
      </View>

      {/* TODO: ERROR VIEW */}
      {error && <Text>{errorMessage}</Text>}

      <View style={{ marginTop: 32 }}>
        <TouchableOpacity
          style={[Styles.button, { backgroundColor: '#51C699' }]}
          onPress={loginHandler}
        >
          <AppText weight='600' style={{ fontSize: 16, color: colorStyles['white'] }}>Login</AppText>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'center' }}>
        <AppText fontFamily={"Montserrat-SemiBold"} style={{ color: colorStyles[50] }}>Don't have an account? </AppText>
        <AppText onPress={() => { navigation.navigate('Register') }} weight='700' style={{ color: colorStyles['excess'] }}>Sign Up</AppText>
      </View>

    </SafeAreaView>
  )
}
const Styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: '500',
  },
  inputField: {
    width: '100%',
    marginTop: 4,
    height: 40,
    padding: 10,
    borderColor: colorStyles[80],
    borderRadius: 5,
    borderWidth: 1,
    fontFamily: 'OpenSauceSans-Regular'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 42,
    padding: 10,
    borderRadius: 5,
  },
})
export default Login;
