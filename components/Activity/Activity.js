import { View, Text, ScrollView, StyleSheet } from "react-native";
import ActivityList from "./ActivityList";
import AppText from "../AppText";

export default function Activity() {
  return (
    <ScrollView style={{
      fontSize: 16,
      backgroundColor: 'white',
      paddingHorizontal: 16
    }}>
      <View style={{
        marginBottom: 32
      }}>
        <AppText fontFamily={'Montserrat-Bold'} style={{
          marginBottom: 16
        }}>Ongoing</AppText>
        <ActivityList type='ongoing' vendorName='Adinda' date='17 Agustus 2022' endTime='18:00' />
      </View>
      <View style={{
        marginBottom: 32
      }}>
        <AppText fontFamily={'Montserrat-Bold'} style={{
          marginBottom: 16
        }}>Recently</AppText>
        <ActivityList type='finished' vendorName='Inti Bakery' date='13 Agustus 2022' endTime='14:00' />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

})