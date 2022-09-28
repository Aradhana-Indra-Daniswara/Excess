import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
  Text,
} from "react-native";
import AppText from "../AppText";
import AutoDimensionImage, {
  imageDimensionTypes,
} from "react-native-auto-dimensions-image";
import SearchBar from "./SearchBar";
import { doc, getDoc } from "firebase/firestore";
import { firestore, storage } from "../../config/firebase-config";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Icons
import { Ionicons } from "@expo/vector-icons";
import Nearme_icon from "../../assets/nearme.svg";
import Bestprice_icon from "../../assets/bestprice.svg";
import Mostloved_icon from "../../assets/mostloved.svg";
import Vendor_icon from "../../assets/vendor_icon.svg";
import { colorStyles } from "../Styling/GlobalStyles";
import Clock_icon from "../../assets/clock_icon.svg";

export default function Home({ navigation }) {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const docRef = doc(firestore, "vendors", "kRz3YWwLpsawOneXQjzL");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data().products;
        const dataWithImage = [];
        for (const product of data) {
          const url = await getDownloadURL(ref(storage, product.uri));
          dataWithImage.push({
            ...product,
            imageUrl: url,
          });
        }
        setProducts(dataWithImage);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return null;
  }

  const itemList = ({ item }) => {
    return (
      <View
        style={{
          borderRadius: 6,
          backgroundColor: "white",
          marginRight: 16,
          width: 160,
        }}>
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: "100%", height: 120, borderRadius: 5 }}
        />
        <View
          style={{
            padding: 4,
            marginVertical: 8,
            borderRadius: 5,
            backgroundColor: "#FCDEDE",
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start",
          }}>
          <Clock_icon />
          <AppText style={{ color: "#FB6868", marginLeft: 4 }}>
            {item.max_order_time.slice(0, 2) +
              ":" +
              item.max_order_time.slice(2)}
          </AppText>
        </View>
        <View>
          <AppText
            weight="500"
            style={{ fontSize: 16, color: colorStyles[20] }}>
            {item.name}
          </AppText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 6,
            }}>
            <Vendor_icon height={12} width={12} color={colorStyles[50]} />
            <AppText
              style={{
                marginLeft: 4,
                color: colorStyles[50],
                fontSize: 12,
              }}>
              {"Testing Bakery"}
            </AppText>
          </View>
          <AppText weight="700" style={{ color: colorStyles[20] }}>
            Rp{item.price}
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
      }}>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        backgroundColor={"white"}
      />

      {/* Header */}
      <View style={styles.header}>
        <AppText style={{ fontSize: 12 }}>Delivery Area</AppText>
        <View style={styles.actionHeader}>
          <AppText weight="700" style={{ fontSize: 14 }}>
            Tangerang, Banten
          </AppText>
          <Ionicons
            name="caret-down-sharp"
            size={14}
            color={"black"}
            style={{ marginLeft: 4 }}
          />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={{ width: "100%" }}>
        {/* Banner */}
        <View
          style={{
            position: "relative",
            marginBottom: 32,
            width: "100%",
          }}>
          <Image
            source={require("../../assets/mainbanner.png")}
            style={{
              width: "100%",
              height: 200,
              resizeMode: "contain",
            }}
          />
          <SearchBar
            placeholder="Cheap Snack?"
            onPress={() => navigation.navigate("SearchVendor")}
          />
        </View>

        {/* Category */}
        <View style={styles.maincategory}>
          <View style={styles.maincategory_items}>
            <Nearme_icon width={120} height={40} />
            <AppText
              weight="500"
              style={{ marginTop: 8, fontSize: 14, color: colorStyles[40] }}>
              Near Me
            </AppText>
          </View>
          <View style={styles.maincategory_items}>
            <Bestprice_icon width={120} height={40} />
            <AppText
              weight="500"
              style={{ marginTop: 8, fontSize: 14, color: colorStyles[40] }}>
              Best Price
            </AppText>
          </View>
          <View style={styles.maincategory_items}>
            <Mostloved_icon width={120} height={40} />
            <AppText
              weight="500"
              style={{ marginTop: 8, fontSize: 14, color: colorStyles[40] }}>
              Most Loved
            </AppText>
          </View>
        </View>

        {/* Running Out */}
        <AppText
          weight="700"
          style={{ fontSize: 18, marginLeft: 18, marginTop: 12 }}>
          Running Out
        </AppText>
        <FlatList
          data={products}
          renderItem={itemList}
          keyExtractor={(item) => item.id}
          horizontal={true}
          contentContainerStyle={{
            paddingVertical: 8,
            paddingHorizontal: 18,
          }}
          showsHorizontalScrollIndicator={false}
        />

        {/* Selected Partners */}
        <AppText
          weight="700"
          style={{ fontSize: 18, marginLeft: 18, marginTop: 12 }}>
          Selected Partners
        </AppText>
        <ScrollView
          style={styles.maincontent}
          contentContainerStyle={{
            paddingVertical: 8,
            paddingHorizontal: 18,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.horizontalCards}>
            <AutoDimensionImage
              source={require("../../assets/partner_1.png")}
              dimensionType={imageDimensionTypes.HEIGHT}
              dimensionValue={50}
            />
          </View>
          <View style={styles.horizontalCards}>
            <AutoDimensionImage
              source={require("../../assets/partner_2.png")}
              dimensionType={imageDimensionTypes.HEIGHT}
              dimensionValue={50}
            />
          </View>
          <View style={styles.horizontalCards}>
            <AutoDimensionImage
              source={require("../../assets/partner_3.png")}
              dimensionType={imageDimensionTypes.HEIGHT}
              dimensionValue={50}
            />
          </View>
          <View style={styles.horizontalCards}>
            <AutoDimensionImage
              source={require("../../assets/partner_4.png")}
              dimensionType={imageDimensionTypes.HEIGHT}
              dimensionValue={50}
            />
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    padding: 8,
  },
  actionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  maincategory: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 18,
    marginVertical: 18,
  },
  maincategory_items: {
    alignItems: "center",
  },

  horizontalCards: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#D9D9D9",
    marginRight: 8,
  },
});
