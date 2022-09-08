import React from 'react';
import { ScrollView, StyleSheet, View, Image, Text, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export default function Home() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
  });
  return (
    <View style={{
      backgroundColor: 'white'
    }}>
      <View style={styles.header}>
        <View style={styles.actionHeader}>
          <Ionicons name='location-sharp' size={18} color={'black'} />
        
          <Text style={{ marginHorizontal: 4, fontFamily:'Montserrat-Regular' }}>Binus Alam Sutera</Text>
          <Ionicons name='caret-down-sharp' size={14} color={'black'} />
        </View>
        <View style={styles.actionHeader}>
          <Ionicons name='person-sharp' size={18} color={'black'} />
          <Text style={{ marginLeft: 4 }}>Edo</Text>
        </View>
      </View>
      <ScrollView >
        <View>
          <Image source={require('../../assets/mainbanner.png')} style={{ width: '100%', marginTop: 16 }} />
          <TextInput style={styles.searchBar} placeholder="Search Food" />
        </View>
        <View style={styles.maincategory}>
          <View style={styles.maincategory_items}>
            <Image source={require('../../assets/nearme.png')} style={{ width: 45, height: 45 }} />
            <Text>Near Me</Text>
          </View>
          <View style={styles.maincategory_items}>
            <Image source={require('../../assets/bestprice.png')} style={{ width: 45, height: 45 }} />
            <Text>Best Price</Text>
          </View>
          <View style={styles.maincategory_items}>
            <Image source={require('../../assets/mostloved.png')} style={{ width: 45, height: 45 }} />
            <Text>Most Loved</Text>
          </View>
        </View>

        {/* Running Out */}
        <Text style={{ fontWeight: 'bold', marginLeft: 18 }}>Running Out</Text>
        <View style={styles.maincontent}>
          <View></View>
        </View>

        {/* Selected Partners */}
        <Text style={{ fontWeight: 'bold', marginLeft: 18 }}>Selected Partners</Text>
        <ScrollView style={styles.maincontent} horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.horizontalCards}>
            <Image source={require('../../assets/partner_1.png')} style={{ height: 50 }} />
          </View>
          <View style={styles.horizontalCards}>
            <Image source={require('../../assets/partner_2.png')} style={{ height: 50 }} />
          </View>
          <View style={styles.horizontalCards}>
            <Image source={require('../../assets/partner_3.png')} style={{ height: 50 }} />
          </View>
          <View style={styles.horizontalCards}>
            <Image source={require('../../assets/partner_4.png')} style={{ height: 50 }} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 18,
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  searchBar: {
    borderRadius: 100,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 16,
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
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
    borderColor: '#D9D9D9',
    marginRight: 8,
    borderRadius: 5,
  },
})
