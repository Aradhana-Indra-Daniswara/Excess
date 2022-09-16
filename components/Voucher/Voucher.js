import React, { useEffect, useState } from 'react'
import { FlatList, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import VoucherContainer from './VoucherContainer'
import { firestore } from '../../config/firebase-config'
import { collection, getDocs } from 'firebase/firestore'

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
    try {
      const querySnapshot = await getDocs(collection(firestore, "vouchers"));
      const filteredData = []
      querySnapshot.forEach((doc) => {
        filteredData.push({id: doc.id, ...doc.data()})
      })
      setVoucherData(filteredData);
    } catch(e) {
      console.warn(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getVouchers()
  }, [])

  const renderVoucher = ({item}) => {
    const [backgroundColor, color] = item.id === voucher?.id ? ['#51C699', 'white'] : [null, 'black']

    return (
      <VoucherContainer
        discount={item.discount_percentage}
        minimumOrder={item.minimum_order}
        setVoucher={setVoucher}
        style={{ backgroundColor: backgroundColor, color: color }}
        id={item.id}
      />
    )
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }} >
      <SafeAreaView style={[Styles.centerContainer, { marginTop: 20}]}>
        {isLoading 
          ? (<Text>Loading</Text>)
          :  (
            <FlatList
              data={voucherData}
              renderItem={renderVoucher}
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
