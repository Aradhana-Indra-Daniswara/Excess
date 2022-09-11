import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
// import formatCurrency from '../../utils/formatters/formatCurrency';
import AppText from '../AppText';
import formatCurrency from '../../utils/formatters/formatCurrency';

const Styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 130,
    width: 310,
    // borderTopWidth: 1,
    borderColor: '#C2C2C2',
    // marginTop: 10
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  qtyContainer: {
    width: 50,
    height: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C2C2C2'
  }
})

export default function ProductCard({ productName, productPrice, productImageId }) {
  const [qty, setQty] = useState(1);

  const decrementQty = () => {
    qty === 1 ? null : setQty(qty - 1)
  }

  return (
    <View style={[Styles.cardContainer, { }]}>
      <View style={{ marginTop: 16 }}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <View style={{ flexDirection: 'row',  alignItems: 'center' }}>
              <AppText fontFamily="Montserrat-SemiBold" size={16} >{productName}</AppText>
              <Pressable style={{ }}>
                <Ionicons style={{ marginLeft: 10 }} name="md-trash-outline" size={30} color="black" />
              </Pressable>
            </View>
            <AppText fontFamily="Montserrat-Regular" size={14}>{formatCurrency(productPrice)}</AppText>
          </View>
        </View>
        
        {/* QTY BTN */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',  width: 130, marginTop: 18 }}>
          <Pressable onPress={() => decrementQty()} >
            <Image source={require('../../assets/MinusButton.png')} style={{ height: 35, width: 35 }} />
          </Pressable>
          <View style={[Styles.centerContainer, Styles.qtyContainer]}>
            <Text>{qty}</Text>
          </View>
          <Pressable onPress={() => setQty(qty + 1)} >
            <Image source={require('../../assets/PlusButton.png')} style={{ height: 35, width: 35 }}/>
          </Pressable>
        </View>
      </View>

      {/* product image */}
      <View>
        <Image source={require('../../assets/1-1.png')} />
      </View>
    </View>
  )
}
