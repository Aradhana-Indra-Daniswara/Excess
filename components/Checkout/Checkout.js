import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Checkout() {
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
      fontSize: 20
    },
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    }
  })
  
  return (
    <SafeAreaView style={[Styles.centerContainer]}>
      <View style={[Styles.centerContainer, { marginTop: 10, marginRight: 122, alignItems: 'flex-start' }]}>
        <View style={{ flexDirection: 'row',justifyContent: 'center', alignItems: 'center' }}>
          <Image 
            source={require('../../assets/clock.png')}
            style={{ 
              marginRight: 4,
              height: 10,
              width: 10
            }}
          />
          <Text style={{ fontWeight: '400', fontSize: 11 }}>09.00 - 22.00</Text>
        </View>
        <Text style={{  
          color: '#51C699',
          fontSize: 18,
          fontWeight: '500'
        }}
        >
          Garlic Bread
        </Text>
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
        >
          <Image 
            source={require('../../assets/discount-icon.png')}
            style={{ width: 35, height: 35 }}
          />
          <Text style={{ fontWeight: '600',fontSize: 20 }}>
            Apply Voucher
          </Text>

        </TouchableOpacity>
      </View>

      {/* Payment Summary */}
      <View style={[{ marginTop: 13, borderWidth: 1, borderRadius: 10, height: 142, width: 310 }]}>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Text style={[Styles.normalFont]}>Payment Summary</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 18, marginTop: 8 }}>
          <Text style={[Styles.normalFont]}>Price</Text>
          <Text style={[Styles.normalFont]}>Rp. 120.000,00</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 18, marginTop: 8 }}>
          <Text style={[Styles.normalFont]}>Coupon</Text>
          <Text style={[Styles.normalFont]}>-Rp. 0,00</Text>
        </View>
        
        <View 
          style={{ 
            width: 280, 
            borderWidth: 1, 
            borderColor: '#C4C4C4', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginTop: 10
          }}
        ></View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 18, marginTop: 13  }}>
          <Text style={[Styles.normalFont]}>Grand Total</Text>
          <Text style={[Styles.normalFont]}>Rp. 120.000,00</Text>
        </View>
      </View>

      <View style={[Styles.centerContainer, { marginTop: 32 }]}>
        <TouchableOpacity 
          style={[Styles.button, Styles.shadow, { backgroundColor: '#51C699' }]}
          >
          <Text style={[Styles.buttonFont]}>
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
