import React from 'react'
import { Image, View } from 'react-native'

export default function BackButton() {
  return (
    <View>
      <Image 
        source={require('../../assets/Back-Button.png')}
      />
    </View>
  )
}