import React from 'react'
import { ScrollView, StyleSheet, View, Image, Text, TextInput } from 'react-native'

function Home() {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.actionHeader}>
          <Image source={require('../../assets/location-icon.png')} />
          <Text style={{ marginHorizontal: 4 }}>Binus Alam Sutera</Text>
          <Image source={require('../../assets/dropdown-icon.png')} />
        </View>
        <View style={styles.actionHeader}>
          <Image source={require('../../assets/profile-icon.png')} />
          <Text style={{ marginLeft: 4 }}>Edo</Text>
        </View>
      </View>
      <ScrollView >
        <View>
          <Image source={require('../../assets/mainbanner.png')} style={{ width: '100%', marginTop: 16 }} />
          <TextInput style={styles.searchBar} />
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
        <View style={styles.maincontent}>
          <Text style={{ fontWeight: 'bold' }}>Running Out</Text>
          <View></View>
        </View>

        {/* Selected Partners */}
        <Text style={{ fontWeight: 'bold', marginLeft: 18 }}>Selected Partners</Text>
        <ScrollView style={styles.maincontent}>
          <View>
            <Image source={require('../../assets/partner_1.png')} style={{ height: 50 }} />
          </View>
          <View>
            <Image source={require('../../assets/partner_2.png')} style={{ height: 50 }} />
          </View>
          <View>
            <Image source={require('../../assets/partner_3.png')} style={{ height: 50 }} />
          </View>
          <View>
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
    paddingHorizontal: 18
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    borderRadius: 100,
    borderWidth: 1,
    width: '70%',
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: 3,
    shadowOpacity: '8%',
    shadowRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 15,
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
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 18,
  }
})
export default Home;