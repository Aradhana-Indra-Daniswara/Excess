import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Image, Text, TextInput, SafeAreaView, StatusBar } from 'react-native'
import AppText from '../AppText';
import AutoDimensionImage, { imageDimensionTypes } from 'react-native-auto-dimensions-image';
import SearchBar from './SearchBar';

// Icons
import { Ionicons } from '@expo/vector-icons';
import Nearme_icon from '../../assets/nearme.svg';
import Bestprice_icon from '../../assets/bestprice.svg';
import Mostloved_icon from '../../assets/mostloved.svg';
import Vendor_icon from '../../assets/vendor_icon.svg';


export default function Home() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getLimitedTimeProducts = async () => {
    const url = Platform.OS === 'ios'
      ? "http://localhost:3000/home"
      : "http://10.0.2.2:3000/home"

    try {
      const repsonse = await fetch(url)
      const JSONResponse = await repsonse.json()
      setProducts(JSONResponse.products)
      setIsLoading(false)
    } catch (e) {
      console.warn(e)
    }
  }

  useEffect(() => {
    getLimitedTimeProducts()
  }, [])

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaView style={{
      backgroundColor: 'white',
      paddingTop: StatusBar.currentHeight,
      height: '100%'
    }}>

      {/* Header */}
      <View style={styles.header}>
        <AppText>Delivery Area</AppText>
        <View style={styles.actionHeader}>
          <AppText fontFamily={'Montserrat-Bold'}>Tangerang, Banten</AppText>
          <Ionicons name='caret-down-sharp' size={14} color={'black'} style={{ marginLeft: 4 }} />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView>

        {/* Banner */}
        <View style={{ position: 'relative', marginBottom: 32 }}>
          <Image source={require('../../assets/mainbanner.png')} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
          <SearchBar placeholder='Cheap Snack?' />
        </View>

        {/* Category */}
        <View style={styles.maincategory}>
          <View style={styles.maincategory_items}>
            <Nearme_icon width={120} height={40} />
            <AppText fontFamily={'Montserrat-Medium'} size={14} color='#666666' style={{ marginTop: 8 }}>Near Me</AppText>
          </View>
          <View style={styles.maincategory_items}>
            <Bestprice_icon width={120} height={40} />
            <AppText fontFamily={'Montserrat-Medium'} size={14} color='#666666' style={{ marginTop: 8 }}>Best Price</AppText>
          </View>
          <View style={styles.maincategory_items}>
            <Mostloved_icon width={120} height={40} />
            <AppText fontFamily={'Montserrat-Medium'} size={14} color='#666666' style={{ marginTop: 8 }}>Most Loved</AppText>
          </View>
        </View>

        {/* Running Out */}
        <AppText fontFamily={'Montserrat-Bold'} style={{ marginLeft: 18 }}>Running Out</AppText>
        <ScrollView contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 18 }} horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            products.map((product) => {
              return (
                <View key={product.id} style={{
                  borderRadius: 6,
                  backgroundColor: 'white',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 3,
                  marginRight: 16,
                  width: 160
                }}>
                  <Image source={{ uri: `http://10.0.2.2:3000/product_images/${product.image_id}.png` }} style={{ width: '100%', height: 120 }} />
                  <View style={{ padding: 8, }}>
                    <AppText fontFamily={'Montserrat-Medium'}>{product.name}</AppText>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 6
                    }}>
                      <Vendor_icon height={12} width={12} color='#666666' />
                      <AppText style={{ marginLeft: 4 }} size={12}>{'Testing Bakery'}</AppText>
                    </View>
                    <AppText fontFamily={'Montserrat-Bold'}>Rp{product.price}</AppText>
                  </View>
                </View>
              )
            })
          }
        </ScrollView>

        {/* Selected Partners */}
        <AppText fontFamily={'Montserrat-Bold'} style={{ marginLeft: 18 }}>Selected Partners</AppText>
        <ScrollView style={styles.maincontent} horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.horizontalCards}>
            <AutoDimensionImage
              source={require('../../assets/partner_1.png')}
              dimensionType={imageDimensionTypes.HEIGHT}
              dimensionValue={50} />
          </View>
          <View style={styles.horizontalCards}>
            <AutoDimensionImage
              source={require('../../assets/partner_2.png')}
              dimensionType={imageDimensionTypes.HEIGHT}
              dimensionValue={50} />
          </View>
          <View style={styles.horizontalCards}>
            <AutoDimensionImage
              source={require('../../assets/partner_3.png')}
              dimensionType={imageDimensionTypes.HEIGHT}
              dimensionValue={50} />
          </View>
          <View style={styles.horizontalCards}>
            <AutoDimensionImage
              source={require('../../assets/partner_4.png')}
              dimensionType={imageDimensionTypes.HEIGHT}
              dimensionValue={50} />
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 8
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  maincategory: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 18,
    marginVertical: 18
  },
  maincategory_items: {
    alignItems: 'center'
  },
  maincontent: {
    width: '100%',
    paddingHorizontal: 18,
  },
  horizontalCards: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#D9D9D9',
    marginRight: 8,
  },
})
