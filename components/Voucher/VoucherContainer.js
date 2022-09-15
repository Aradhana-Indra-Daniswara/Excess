import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import formatCurrency from '../../utils/formatters/formatCurrency'
import AppText from '../AppText/AppText'

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
  }
})

export default function VoucherContainer({ id, discount, minimumOrder, setVoucher, style }) {
  return (
    <TouchableOpacity 
      style={[Styles.centerContainer, Styles.voucherContainer, {...style}]}
      onPress={() => setVoucher({ id, discount, minimumOrder })}
    >
      <AppText fontFamily={'Montserrat-ExtraBold'} style={{ marginBottom: 8 }}>{discount}% Off</AppText>
      {minimumOrder === 0 && (
        <AppText fontFamily={'Montserrat-Medium'} size={15} >No minimum order</AppText>
      )}
      {minimumOrder !== 0 && (
        <AppText fontFamily={'Montserrat-Medium'} size={15} >Min. Order {formatCurrency(minimumOrder)}</AppText>
      )}
    </TouchableOpacity>
  )
}
