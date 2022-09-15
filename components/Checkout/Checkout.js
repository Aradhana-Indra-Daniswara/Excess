import { SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import formatCurrency from '../../utils/formatters/formatCurrency';
import AppText from '../AppText';

const Styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  normalFont: {
    fontWeight: '600',
    fontSize: 14
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
  }
})

export default function Checkout({ navigation, route }) {
  // TODO: price jadiin props dari Cart
  // watch for voucher application & update grand total
  useEffect(() => {
    if(route.params?.voucherSelected) {
      const discount = price * route.params.voucherSelected.discount / 100
      setVoucher(discount)
      setGrandTotal(price - discount)
    }
  }, [route.params?.voucherSelected])


  const [price, setPrice] = useState(120000)
  const [voucher, setVoucher] = useState(0)
  const [grandTotal, setGrandTotal] = useState(price - voucher)
  
  return (
      <SafeAreaView style={[Styles.centerContainer]}>
        <View style={[Styles.centerContainer, { marginTop: 10, marginRight: 122, alignItems: 'flex-start' }]}>
          <View style={{ flexDirection: 'row',justifyContent: 'center', alignItems: 'center' }}>
            <SimpleLineIcons name="clock" size={20} color="black" style={{ marginRight: 4 }} />
            <AppText fontFamily={"Montserrat-SemiBold"} size={15}>09.00 - 22.00</AppText>
          </View>
          <AppText fontFamily={"Montserrat-Bold"} size={18} style={{ color: '#51C699' }} >
            Garlic Bread
          </AppText>
        </View>
        
        {/* Voucher Button */}
        <View 
          style={[Styles.centerContainer, { 
            marginTop: 10, 
            borderWidth: 1, 
            borderRadius: 10, 
            height: 60, 
            width: 310 
          }]}
        >
          <TouchableOpacity 
            style={[Styles.centerContainer, { 
              width: '100%', 
              flex: 1, 
              flexDirection: 'row',
            }]}
            onPress={() => navigation.navigate('Voucher')}
          >
            <Image 
              source={require('../../assets/discount-icon.png')}
              style={{ width: 35, height: 35 }}
            />
            <AppText fontFamily={"Montserrat-SemiBold"} size={20} >
              Apply Voucher
            </AppText>

          </TouchableOpacity>
        </View>

        {/* Payment Summary */}
        <View style={[{ marginTop: 13, borderWidth: 1, borderRadius: 10, height: 142, width: 310 }]}>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <AppText fontFamily={"Montserrat-SemiBold"} size={16} >Payment Summary</AppText>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 18, marginTop: 8 }}>
            <AppText fontFamily={"Montserrat-SemiBold"} size={14} >Price</AppText>
            <AppText fontFamily={"Montserrat-SemiBold"} size={14} >{formatCurrency(price)}</AppText>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 18, marginTop: 8 }}>
            <AppText fontFamily={"Montserrat-SemiBold"} size={14} >Voucher</AppText>
            <AppText fontFamily={"Montserrat-SemiBold"} size={14} >-{formatCurrency(voucher)}</AppText>
          </View>
          
          <View 
            style={{ 
              width: 280, 
              borderWidth: 0.8, 
              borderColor: '#C4C4C4', 
              marginTop: 10,
            }}
          ></View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 18, marginTop: 13  }}>
            <AppText fontFamily={"Montserrat-SemiBold"} size={14} >Grand Total</AppText>  
            <AppText fontFamily={"Montserrat-SemiBold"} size={14} >-{formatCurrency(grandTotal)}</AppText>
          </View>
        </View>

        <View style={[Styles.centerContainer, { marginTop: 32 }]}>
          <TouchableOpacity 
            style={[Styles.button, Styles.shadow, { backgroundColor: '#51C699' }]}
            >
            <AppText fontFamily={"Montserrat-ExtraBold"} size={18} color={'white'} >Place Order</AppText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  )
}
