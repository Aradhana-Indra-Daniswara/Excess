import React from 'react';
import { ScrollView, StyleSheet, View, Image, Text, TextInput } from 'react-native'
import AppText from '../AppText';
import AutoDimensionImage, { imageDimensionTypes } from 'react-native-auto-dimensions-image';
// Icons
import { Ionicons } from '@expo/vector-icons';
import Nearme_icon from '../../assets/nearme.svg';
import Bestprice_icon from '../../assets/bestprice.svg';
import Mostloved_icon from '../../assets/mostloved.svg';
import SearchBar from './SearchBar';


export default function Home() {

  return (
    <View style={{
      backgroundColor: 'white'
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
      <ScrollView >

        {/* Banner */}
        <View style={{ position: 'relative', marginBottom: 32 }}>
          <Image source={require('../../assets/mainbanner.png')} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
          <SearchBar placeholder='Cheap Snack?' />
        </View>

        {/* Category */}
        <View style={styles.maincategory}>
          <View style={styles.maincategory_items}>
            <Nearme_icon width={120} height={40} />
            <AppText fontFamily={'Montserrat-Medium'} color='#666666'>Near Me</AppText>
          </View>
          <View style={styles.maincategory_items}>
            <Bestprice_icon width={120} height={40} />
            <AppText fontFamily={'Montserrat-Medium'} color='#666666'>Best Price</AppText>
          </View>
          <View style={styles.maincategory_items}>
            <Mostloved_icon width={120} height={40} />
            <AppText fontFamily={'Montserrat-Medium'} color='#666666'>Most Loved</AppText>
          </View>
        </View>

        {/* Running Out */}
        <AppText style={{ fontWeight: 'bold', marginLeft: 18 }}>Running Out</AppText>
        <View style={styles.maincontent}>
          <View></View>
        </View>

        {/* Selected Partners */}
        <AppText style={{ fontWeight: 'bold', marginLeft: 18 }}>Selected Partners</AppText>
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
      <View >

      </View>
    </View>
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
