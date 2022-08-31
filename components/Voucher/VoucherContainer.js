import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const Styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  voucherContainer: {
    height: 94,
    width: 300,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'flex-start',
    paddingLeft: 32,
    marginBottom: 20,
    flex: 1
  },
  voucherHeading: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 6
  },
  voucherDetail: {
    fontSize: 15,
    fontWeight: '500'
  }
})

export default function VoucherContainer({ discount, minimumOrder, setIsClicked, setVoucher }) {
  return (
    <TouchableOpacity 
      style={[Styles.centerContainer, Styles.voucherContainer]}
      onPress={() => (setIsClicked(true), setVoucher({ discount, minimumOrder }))}
    >
      <Text style={[Styles.voucherHeading]}>{discount}% Off</Text>
      {minimumOrder === 0 && (
        <Text style={[Styles.voucherDetail]}>No minimum order</Text>
      )}
      {minimumOrder !== 0 && (
        <Text style={[Styles.voucherDetail]}>Min. Order {minimumOrder}K</Text>
      )}
    </TouchableOpacity>
  )
}
