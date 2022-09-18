import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
import AppText from '../AppText';
import formatCurrency from '../../utils/formatters/formatCurrency';   

const Styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 130,
    width: 310,
    borderColor: '#C2C2C2',
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

export default function ProductCard({ productId, productName, productPrice, productImageId, updateItem }) {
  const [qty, setQty] = useState(1);

  const qtyHandler = (action) => {
    switch(action) {
      case "increment":
        setQty(qty + 1)
        updateItem(productId, action)
        break
      case "decrement":
        if(qty > 1) {
          setQty(qty - 1)
          updateItem(productId, action)
          break
        }
    }
  }

  return (
    <View style={[Styles.cardContainer, { }]}>
      <View style={{ marginTop: 16 }}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <View style={{ flexDirection: 'row',  alignItems: 'center' }}>
              <AppText fontFamily="Montserrat-SemiBold" size={16} >{productName}</AppText>
              <Pressable style={{ marginLeft: 10, height: 30, width: 40, alignItems: 'center' }} >
                <Ionicons name="md-trash-outline" size={28} color="black" />
              </Pressable>
            </View>
            <AppText fontFamily="Montserrat-Regular" size={14}>{formatCurrency(productPrice)}</AppText>
          </View>
        </View>
        
        {/* QTY BTN */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',  width: 140, marginTop: 18 }}>
          <Pressable onPress={() => qtyHandler('decrement')} >
            <AntDesign name="minuscircle" size={35} color="black" />
          </Pressable>
          <View style={[Styles.centerContainer, Styles.qtyContainer]}>
            <AppText fontFamily={"Montserrat-Regular"}>{qty}</AppText>
          </View>
          <Pressable onPress={() => qtyHandler('increment')} >
            <AntDesign name="pluscircle" size={35} color="black" />
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
