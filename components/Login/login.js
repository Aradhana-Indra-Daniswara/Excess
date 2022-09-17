import React, { useEffect, useState } from 'react'
import { Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AppText from '../AppText';
import { auth } from '../../config/firebase-config';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

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
  },
})

const Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const validateInput = () => {
    if(email === '' || password === '') {
      return false
    } else {
      return true
    }
  }

  const loginHandler = async () => {
    setError(false);
    if(validateInput()) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate("Home");
      } catch(e) {
        setError(true);
        setErrorMessage(e.message);
      }
    } else {
      setError(true);
      setErrorMessage("Fields can't be blank")
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        navigation.navigate("Home")
      }
    })
  }, [])

  return (
    <SafeAreaView style={[Styles.centerContainer, { marginTop: 205 }]}>
      <AppText fontFamily={"Montserrat-ExtraBold"} size={30}>Welcome Back!</AppText>

      <View style={{ marginTop: 25, alignItems: 'flex-start', width: 250 }}>
        <AppText fontFamily={"Montserrat-Medium"} size={16}>Email</AppText>
        <TextInput 
          style={[Styles.inputField]}
          keyboardType='email-address'
          autoCapitalize='none'
          autoComplete='email'
          autoCorrect={false}
          autoFocus
          onChangeText={(input) => setEmail(input)}
        />
      </View>
      
      <View style={{ marginTop: 11, alignItems: 'flex-start', width: 250 }}>
      <AppText fontFamily={"Montserrat-Medium"} size={16}>Password</AppText>
        <TextInput 
          style={[Styles.inputField]}
          autoCapitalize='false'
          secureTextEntry
          onChangeText={(input) => setPassword(input)}
        />
      </View>

      {/* TODO: ERROR VIEW */}
      {error && <Text>{errorMessage}</Text>}

      <View style={[Styles.centerContainer, { marginTop: 43  }]}>
        <TouchableOpacity 
          style={[Styles.button, { backgroundColor: '#51C699' }]}
          onPress={loginHandler}
        >
          <AppText fontFamily={"Montserrat-SemiBold"} size={20} color={"white"}>Login</AppText>
        </TouchableOpacity>
      </View>

      <View style={[Styles.centerContainer, { marginTop: 10, flexDirection: 'row' }]}>
        <View style={{ width: 105, borderWidth: 1, borderColor: '#DDDDDD' }}></View>
        <AppText fontFamily={"Montserrat-SemiBold"} size={18} style={{ marginHorizontal: 8 }}>Or</AppText>
        <View style={{ width: 105, borderWidth: 1, borderColor: '#DDDDDD' }}></View>
      </View>

      <View style={[Styles.centerContainer, { marginTop: 10  }]}>
        <TouchableOpacity 
          style={[Styles.button, { backgroundColor: '#000000' }]}
          onPress={() => {navigation.navigate('Register')}}  
        >
          <AppText fontFamily={"Montserrat-SemiBold"} size={20} color={"white"}>Register</AppText>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default Login;
