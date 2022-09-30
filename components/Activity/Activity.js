import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import ActivityList from "./ActivityList";
import AppText from "../AppText";
import SearchIcon_Gray from "../../assets/search_icon_gray.svg";
import CrossIcon_Gray from "../../assets/cross_icon_gray.svg";
import Back_button from "../../assets/Back_button.svg";
import { colorStyles } from "../Styling/GlobalStyles";
import { useNavigation } from "@react-navigation/native";

export default function Activity() {
  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          marginVertical: 24,
          paddingHorizontal: 16,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <AppText style={{ color: colorStyles[20], fontSize: 28 }} weight="700">
          Activity
        </AppText>
      </View>

      <ScrollView
        style={{
          fontSize: 16,
          backgroundColor: "white",
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            marginBottom: 32,
          }}
        >
          <AppText
            weight="600"
            style={{
              marginBottom: 16,
              fontSize: 16,
            }}
          >
            Ongoing
          </AppText>
          <ActivityList
            type="ongoing"
            vendorName="Adinda"
            date="17 Agustus 2022"
            endTime="18:00"
          />
        </View>
        <View
          style={{
            marginBottom: 32,
          }}
        >
          <AppText
            weight="600"
            style={{
              marginBottom: 16,
              fontSize: 16,
            }}
          >
            Recently Ordered
          </AppText>
          <ActivityList
            type="finished"
            vendorName="Inti Bakery"
            date="13 Agustus 2022"
            endTime="14:00"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
