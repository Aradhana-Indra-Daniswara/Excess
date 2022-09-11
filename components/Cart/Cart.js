import React, { useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppText from '../AppText'
import ProductCard from './ProductCard'
import * as Font from 'expo-font'
import formatCurrency from '../../utils/formatters/formatCurrency'

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
    { vendor_id: 1, product_id: 4, product_name: 'Product 4', price: 60000, qty: 1 },
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

  // const grandTotal = ORDER_ITEMS.reduce((prev, curr) => prev + curr.price, 0)
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const total = ORDER_ITEMS.reduce((prev, curr) => prev + curr.price, 0)
    setGrandTotal(total)
  }, [ORDER_ITEMS])
  
  return (
    <SafeAreaView style={[Styles.centerContainer, { marginTop: 10 }]}>

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
                height: 20,
                width: 20
              }}
            />
          <AppText fontFamily="Montserrat-SemiBold" size={16} >{VENDOR_DETAILS.openingHour}.00 - {VENDOR_DETAILS.closingHour}.00</AppText>
        </View>
        <AppText fontFamily="Montserrat-Bold" size={18} color="#59D9A8">{VENDOR_DETAILS.name}, {VENDOR_DETAILS.address}</AppText>
      </View>

      {/* Products scroll view */}
      <View style={[Styles.centerContainer, { height: 600 }]}>
        <FlatList
          data={ORDER_ITEMS}
          renderItem={({item}) => 
            <ProductCard 
              productName={item.product_name}
              productPrice={item.price}
            />
          }
          ItemSeparatorComponent={() => (
            <View style={{ borderTopWidth: 1, borderColor: '#C2C2C2', marginTop: 10 }}></View>
          )}
          ListFooterComponent={() => (
            <View style={[Styles.centerContainer, { marginVertical: 20 }]}>
              <AppText fontFamily="Montserrat-SemiBold" size={18} >Grand Total: {formatCurrency(grandTotal)}</AppText>
              <TouchableOpacity style={[Styles.button, Styles.shadow, { backgroundColor: '#51C699', marginTop: 20 }]}
                onPress={() => navigation.navigate("Checkout")}
              >
                <Text style={[Styles.buttonFont]}>Checkout</Text>
              </TouchableOpacity>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />

      </View>
      
    </SafeAreaView>
  )
}
