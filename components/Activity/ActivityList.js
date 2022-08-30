
import { View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function ActivityList(props) {
  const status = props.type === 'ongoing' ? 'On The Way' : props.price;
  const color = status === 'On The Way' ? '#51C699' : 'black';
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
        <Ionicons name='fast-food-sharp' size={24} color={color}/>
        <View style={{
          marginLeft: 8
        }}>
          <Text style={{color: color, fontSize: 16}}>{vendorName}</Text>
          <Text style={{color: '#808080', fontSize: 16}}>{date}</Text>
          <Text style={{color: '#808080', fontSize: 16}}>{endTime}</Text>
        </View>
      </View>
      <Text style={{
        fontWeight: '700',
        color: color
      }}>{status}</Text>
    </View >
  )
}