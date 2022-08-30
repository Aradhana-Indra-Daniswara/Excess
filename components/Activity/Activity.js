import { View, Text, ScrollView, StyleSheet } from "react-native";
import ActivityList from "./ActivityList";

export default function Activity() {
  return (
    <ScrollView style={{
      fontSize: 16
    }}>
      <View>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Ongoing</Text>
        <ActivityList type='ongoing' vendorName='Adinda' date='17 Agustus 2022' endTime='18:00' />
      </View>
      <View>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Recent</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

})