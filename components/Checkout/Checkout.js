import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Checkout() {
  const Styles = StyleSheet.create({
    centerContainer: {
      alignItems: 'center',
      justifyContent: 'center'
    },
  })
  
  return (
    <SafeAreaView style={[Styles.centerContainer]}>
      <View style={[Styles.centerContainer, { marginTop: 10, marginRight: 122 }]}>
        <Text>09.00 - 22.00</Text>
      </View>
    </SafeAreaView>
  )
}
