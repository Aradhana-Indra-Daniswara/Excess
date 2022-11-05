import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SearchIcon_Gray from "../../assets/search_icon_gray.svg";
import CrossIcon_Gray from "../../assets/cross_icon_gray.svg";
import Back_button from "../../assets/Back_button.svg";
import { colorStyles } from "../Styling/GlobalStyles";
import { useFonts } from "expo-font";
import VendorList from "./VendorList";
import { firestore, storage } from "../../config/firebase-config";
import { collection, doc, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function SearchVendor() {
  const [fontsLoaded] = useFonts({
    "OpenSauceSans-Regular": require("../../assets/fonts/OpenSauceSans-Regular.ttf"),
  });
  const navigation = useNavigation();
  const placeholder = "Cheap Snack?";
  const [isLoading, setIsLoading] = useState(true);
  const [vendors, setVendors] = useState();
  const [filterText, setFilterText] = useState();
  const fetchVendorList = async () => {
    try {
      const vendorQuery = await getDocs(collection(firestore, "vendors"));
      const vendors = [];
      vendorQuery.forEach((doc) => {
        vendors.push({ id: doc.id, ...doc.data() });
      });
      setVendors(vendors);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const filteredVendors = () => {
    return vendors.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(filterText.toLowerCase()) ||
        vendor.area.toLowerCase().includes(filterText.toLowerCase())
    );
  };
  useEffect(() => {
    fetchVendorList();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        height: "100%",
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
          marginHorizontal: 16,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}>
          <Back_button />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 16,
            height: 40,
            backgroundColor: "white",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: colorStyles[80],
            borderRadius: 5,
            paddingHorizontal: 10,
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SearchIcon_Gray />
            <TextInput
              style={{
                height: "100%",
                width: "85%",
                fontSize: 16,
                fontFamily: "OpenSauceSans-Regular",
                marginLeft: 10,
              }}
              onChange={({ nativeEvent }) => {
								setFilterText(nativeEvent.text)
							}}
							value={filterText}
              placeholder={placeholder}
            />
          </View>
          <CrossIcon_Gray onPress={()=> setFilterText()}/>
        </View>
      </View>

      <FlatList
        data={filterText ? filteredVendors() : vendors}
        keyExtractor={(item) => item.id}
        renderItem={(vendor) => <VendorList vendor={vendor.item} />}
      />
    </SafeAreaView>
  );
}
