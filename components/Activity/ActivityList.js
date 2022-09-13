
import { View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AppText from "../AppText";

export default function ActivityList(props) {
  const status = props.type === 'ongoing' ? 'Waiting for pickup' : props.price;
  const color = props.type === 'ongoing' ? '#51C699' : 'black';
  const { vendorName, date, endTime } = props;
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Ionicons name='restaurant' size={24} color={color}/>
        <View style={{
          marginLeft: 8
        }}>
          <AppText color={color}>{vendorName}</AppText>
          <AppText color='#808080'>{date}</AppText>
          <AppText color='#808080'>{endTime}</AppText>
        </View>
      </View>
      <AppText color={color}>{status}</AppText>
    </View >
  )
}