import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import formatCurrency from '../../utils/formatters/formatCurrency';


const Styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 115,
    width: 310,
    borderTopWidth: 1,
    borderColor: '#C2C2C2',
    marginTop: 10
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  qtyContainer: {
    width: 50,
    height: 30,
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
    <View style={[Styles.cardContainer, ]}>
      <View style={{ marginTop: 16 }}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text>{productName}</Text>
            <Text>{formatCurrency(productPrice)}</Text>
          </View>
          <View>
            <Ionicons name="md-trash-outline" size={24} color="black" />
          </View>
        </View>
        
        {/* QTY BTN */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, alignItems: 'center',  width: 128 }}>
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
