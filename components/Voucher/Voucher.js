import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

  // TODO: ganti warna pas vouchernya diklik
  
  const [voucher, setVoucher] = useState(null);
  const [voucherData, setVoucherData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getVouchers = async () => {
    const url = "http://localhost:3000/vouchers"
    const repsonse = await fetch(url)
    const JSONResponse = await repsonse.json()
    setVoucherData(JSONResponse.vouchers)
    setIsLoading(false)
  }

  useEffect(() => {
    getVouchers()
  }, [])

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }} >
      <SafeAreaView style={[Styles.centerContainer, { marginTop: 20}]}>
        {isLoading 
          ? (<Text>Loading</Text>)
          :  (
            <FlatList
              data={voucherData}
              renderItem={({item}) => 
                <VoucherContainer
                  discount={item.discountPercentage}
                  minimumOrder={item.minimumPrice}
                  setVoucher={setVoucher}
                />
              }
              showsVerticalScrollIndicator={false}
            />
        )}
        <View style={{ height: 100 }}></View>
      </SafeAreaView>
      
      {voucher && (
        <TouchableOpacity 
          style={Styles.applyVoucherButton}
          onPress={() => navigation.navigate({
            name: 'Checkout',
            params: { voucherSelected: voucher },
            merge: true
          })}
        >
          <Text style={Styles.buttonFont}>Apply Voucher</Text>
        </TouchableOpacity>
      )}

    </View>
  )  
}
