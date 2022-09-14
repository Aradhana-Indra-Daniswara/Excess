import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import AppText from '../AppText';

export default function Profile() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Black': require('../../assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{
      backgroundColor: 'white',
      height: '100%',
      padding: 16
    }}>
      <View style={styles.section}>
        <AppText fontFamily={'Montserrat-Bold'}>Name</AppText>
        <TextInput style={styles.textInput} value='Aradhana Satrio Devin'></TextInput>
      </View>
      <View style={styles.section}>
        <AppText fontFamily={'Montserrat-Bold'}>Mobile Number</AppText>
        <TextInput style={styles.textInput} value='08123456789'></TextInput>
      </View>
      <View style={styles.section}>
        <AppText fontFamily={'Montserrat-Bold'}>Email</AppText>
        <TextInput style={styles.textInput} value='aratriodev@gmail.com'></TextInput>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {
    marginTop: 6,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 16,
    padding: 4,
    fontFamily: 'Montserrat-Regular'
  },
  section: {
    marginBottom: 16
  }
})