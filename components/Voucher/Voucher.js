import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import VoucherContainer from './VoucherContainer'

const Styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyVoucherButton: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 45,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#51C699',
  },
  buttonFont: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900'
  },  
})

export default function Voucher({ navigation, route }) {

  // TODO: pass props to previous screen
  // https://reactnavigation.org/docs/params
  
  const [voucherIsClicked, setVoucherIsClicked] = useState(false);
  const [voucher, setVoucher] = useState({})

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }} >
      <ScrollView contentContainerStyle={[Styles.centerContainer, { marginTop: 20 }]} showsVerticalScrollIndicator={false}>
        <SafeAreaView style={[Styles.centerContainer]}>
          <VoucherContainer discount={30} minimumOrder={45} setIsClicked={setVoucherIsClicked} setVoucher={setVoucher} />
          <VoucherContainer discount={10} minimumOrder={20} setIsClicked={setVoucherIsClicked} setVoucher={setVoucher} />
          <VoucherContainer discount={20} minimumOrder={15} setIsClicked={setVoucherIsClicked} setVoucher={setVoucher} />
          <VoucherContainer discount={35} minimumOrder={25} setIsClicked={setVoucherIsClicked} setVoucher={setVoucher} />
          <VoucherContainer discount={10} minimumOrder={20} setIsClicked={setVoucherIsClicked} setVoucher={setVoucher} />
          <VoucherContainer discount={10} minimumOrder={20} setIsClicked={setVoucherIsClicked} setVoucher={setVoucher} />
          <VoucherContainer discount={40} minimumOrder={30} setIsClicked={setVoucherIsClicked} setVoucher={setVoucher} />
          <View style={{ height: 100 }}></View>
        </SafeAreaView>
      </ScrollView> 
      
      {voucherIsClicked && (
        <TouchableOpacity 
          style={Styles.applyVoucherButton}
          onPress={() => navigation.navigate({
            name: 'Checkout',
            params: { voucherSelected: voucher },
            merge: true
          })}
        >
          <Text style={Styles.buttonFont}>Apply Voucher {voucher.discount}</Text>
        </TouchableOpacity>
      )}

    </View>
  )  
}
