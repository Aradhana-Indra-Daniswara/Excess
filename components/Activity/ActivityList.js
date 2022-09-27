import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../AppText";
import { colorStyles } from "../Styling/GlobalStyles";

export default function ActivityList({
  type,
  vendorName,
  date,
  endTime,
  price,
}) {
  const status = type === "ongoing" ? "Waiting for pickup" : price;
  const statusColor =
    type === "ongoing" ? colorStyles["excess"] : colorStyles[20];
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}>
        <Ionicons name="restaurant" size={24} color={statusColor} />
        <View
          style={{
            marginLeft: 8,
          }}>
          <AppText style={{ color: statusColor, fontSize: 16 }}>
            {vendorName}
          </AppText>
          <AppText style={{ color: colorStyles[50] }}>
            {date} • {endTime}
          </AppText>
        </View>
      </View>
      <AppText style={{ color: statusColor }}>{status}</AppText>
    </View>
  );
}
