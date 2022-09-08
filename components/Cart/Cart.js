import React, { useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppText from '../AppText'
import ProductCard from './ProductCard'
import * as Font from 'expo-font'

const Styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
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
    fontSize: 18,
    fontWeight: '900',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10
  },
  operationalHoursFont: {
    fontSize: 11,
    fontWeight: '600'
  }, 
  vendorInfoFont: {
    fontWeight: '800',
    fontSize: 18,
    color: '#59D9A8'
  }
})

export default function Cart({ navigation }) {
  
  // ini jadiin props dikasih dari vendorpage?
  const ORDER_ITEMS = [
    { vendor_id: 1, product_id: 1, product_name: 'Product 1', price: 30000, qty: 1 },
    { vendor_id: 1, product_id: 2, product_name: 'Product 2', price: 40000, qty: 1 },
    { vendor_id: 1, product_id: 3, product_name: 'Product 3', price: 50000, qty: 1 },
    { vendor_id: 1, product_id: 4, product_name: 'Product 4', price: 60000, qty: 1 },
  ]

  // ini juga jadiin props, jadiin satu aja sama ORDER_ITEMS(?)
  const VENDOR_DETAILS = {
    id: 1,
    name: 'Salad Bowl',
    address: 'BINUS Ave.',
    openingHour: 8,
    closingHour: 22
  }
  
  return (
    <SafeAreaView style={[Styles.centerContainer, { marginTop: 10, }]}>

      {/* Vendor Information */}
      <View
        style={{ alignItems: 'flex-start' }}
      > 
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* KECIL BANGET NEED TO RAMP IT UP (sekalian yg di checkout juga samain) */}
          <Image 
              source={require('../../assets/clock.png')}
              style={{ 
                marginRight: 4,
                height: 10,
                width: 10
              }}
            />
          <Text style={[Styles.operationalHoursFont, ]}>{VENDOR_DETAILS.openingHour}.00 - {VENDOR_DETAILS.closingHour}.00</Text>
        </View>
        <AppText fontFamily={"Montserrat-Black"}>{VENDOR_DETAILS.name}, {VENDOR_DETAILS.address}</AppText>
      </View>
      
      <FlatList
        data={ORDER_ITEMS}
        renderItem={({item}) => 
          <ProductCard 
            productName={item.product_name}
            productPrice={item.price}
          />
        }
      />
      
      <TouchableOpacity style={[Styles.button, Styles.shadow, { backgroundColor: '#51C699' }]}
        onPress={() => navigation.navigate("Checkout")}
      >
        <Text style={[Styles.buttonFont]}>Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
