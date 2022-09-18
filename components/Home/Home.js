import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Image, SafeAreaView, StatusBar, FlatList } from 'react-native'
import AppText from '../AppText';
import AutoDimensionImage, { imageDimensionTypes } from 'react-native-auto-dimensions-image';
import SearchBar from './SearchBar';
import { doc, getDoc } from "firebase/firestore";
import { firestore, storage } from '../../config/firebase-config';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Icons
import { Ionicons } from '@expo/vector-icons';
import Nearme_icon from '../../assets/nearme.svg';
import Bestprice_icon from '../../assets/bestprice.svg';
import Mostloved_icon from '../../assets/mostloved.svg';
import Vendor_icon from '../../assets/vendor_icon.svg';
import { colorStyles } from '../Styling/GlobalStyles';


export default function Home() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {   
    const docRef = doc(firestore, "vendors", "GWGoNQfs6jU0yf0Uy0ml");
    try {
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        let dataWithImage = []
        const data = docSnap.data().products
        data.forEach(async (product) => {
          const url = await getDownloadURL(ref(storage, product.uri))
          dataWithImage.push({
            ...product,
            imageUrl: url
          })
          setProducts(dataWithImage);
        })
      }
    }
    catch (e) {
      console.log(e.message);
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{
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
        <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: 120 }} />
        <View style={{ padding: 8, }}>
          <AppText weight='500'>{item.name}</AppText>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 6
          }}>
            <Vendor_icon height={12} width={12} color='#666666' />
            <AppText style={{ marginLeft: 4 }} size={12}>{'Testing Bakery'}</AppText>
          </View>
          <AppText weight='700'>Rp{item.price}</AppText>
        </View>
      </View>
    )
  }

  useEffect(() => {
    getData();
  }, [])

  // if (isLoading) {
  //   return null;
  // }

  return (
    <SafeAreaView style={{
      backgroundColor: 'white',
      height: '100%'
    }}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'}/>

      {/* Header */}
      <View style={styles.header}>
        <AppText style={{ fontSize: 12 }}>Delivery Area</AppText>
        <View style={styles.actionHeader}>
          <AppText weight='700' style={{ fontSize: 14 }}>Tangerang, Banten</AppText>
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
            <AppText weight='500' color='#666666' style={{ marginTop: 8, fontSize: 14 }}>Near Me</AppText>
          </View>
          <View style={styles.maincategory_items}>
            <Bestprice_icon width={120} height={40} />
            <AppText weight='500' color='#666666' style={{ marginTop: 8, fontSize: 14 }}>Best Price</AppText>
          </View>
          <View style={styles.maincategory_items}>
            <Mostloved_icon width={120} height={40} />
            <AppText weight='500' color='#666666' style={{ marginTop: 8, fontSize: 14 }}>Most Loved</AppText>
          </View>
        </View>

        {/* Running Out */}
        <AppText weight='700' style={{ marginLeft: 18 }}>Running Out</AppText>
        <ScrollView contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 18 }} horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </ScrollView>

        {/* Selected Partners */}
        <AppText weight='700' style={{ marginLeft: 18 }}>Selected Partners</AppText>
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
