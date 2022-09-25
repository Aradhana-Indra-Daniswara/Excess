import { SimpleLineIcons } from "@expo/vector-icons";
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, firestore } from "../../config/firebase-config";
import formatCurrency from "../../utils/formatters/formatCurrency";
import AppText from "../AppText";

const Styles = StyleSheet.create({
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  normalFont: {
    fontSize: 15,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 45,
    padding: 10,
    borderRadius: 10,
  },
  buttonFont: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default function Checkout({ route, navigation }) {
  // watch for voucher application & update grand total
  useEffect(() => {
    if (route.params?.voucherSelected) {
      const discount = (price * route.params.voucherSelected.discount) / 100;
      setVoucher(discount);
      setGrandTotal(price - discount);
    }
  }, [route.params?.voucherSelected]);

  useEffect(() => {
    const getVouchers = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "vouchers"));
        const filteredData = [];
        querySnapshot.forEach((doc) => {
          filteredData.push({ id: doc.id, ...doc.data() });
        });
        setVoucherData(filteredData);
      } catch (e) {
        console.warn(e);
      }
    };

    getVouchers();
  }, []);

  const orderHandler = async () => {
    try {
      const docRef = await addDoc(collection(firestore, "orders"), {
        created_at: Timestamp.now(),
        finished_at: null,
        item: [
          {
            item_id: "makeBetterStructure",
            item_price: 0,
            item_quantity: 1,
          },
        ],
        vendor_id: "GWGoNQfs6jU0yf0Uy0ml",
        user_id: auth.currentUser?.uid, // Assume user is logged in (fix with Authorization later)
        voucher: voucher,
      });
    } catch (e) {
      console.warn(e);
    } finally {
      // navigation.navigate("Activity");
      console.log("Success");
    }
  };

  const [price, setPrice] = useState(route?.params?.total);
  const [voucher, setVoucher] = useState(0);
  const [voucherData, setVoucherData] = useState([]);
  const [grandTotal, setGrandTotal] = useState(price - voucher);

  return (
    <SafeAreaView style={[Styles.centerContainer]}>
      <View
        style={[
          Styles.centerContainer,
          { marginTop: 10, marginRight: 122, alignItems: "flex-start" },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SimpleLineIcons
            name="clock"
            size={20}
            color="black"
            style={{ marginRight: 6 }}
          />
          <AppText weight={"600"} style={{ fontSize: 15 }}>
            09.00 - 22.00
          </AppText>
        </View>
        <AppText weight={"700"} style={{ color: "#51C699", fontSize: 18 }}>
          Garlic Bread
        </AppText>
      </View>

      {/* Voucher Button */}
      <View
        style={[
          Styles.centerContainer,
          {
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 10,
            height: 60,
            width: 310,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            Styles.centerContainer,
            {
              width: "100%",
              flex: 1,
              flexDirection: "row",
              position: "relative",
            },
          ]}
          onPress={() =>
            navigation.navigate("Voucher", {
              voucherData,
            })
          }
        >
          <Image
            source={require("../../assets/discount-icon.png")}
            style={{ width: 35, height: 35, position: "absolute", left: 20 }}
          />
          <AppText style={{ fontSize: 17 }} weight={"600"}>
            Apply Voucher
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Payment Summary */}
      <View
        style={[
          {
            marginTop: 13,
            borderWidth: 1,
            borderRadius: 10,
            height: 142,
            width: 310,
          },
        ]}
      >
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <AppText weight={"600"} style={{ fontSize: 17 }}>
            Payment Summary
          </AppText>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 18,
            marginTop: 8,
          }}
        >
          <AppText weight={"400"} style={{ fontSize: 15 }}>
            Price
          </AppText>
          <AppText weight={"400"} style={{ fontSize: 15 }}>
            {formatCurrency(price)}
          </AppText>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 18,
            marginTop: 8,
          }}
        >
          <AppText weight={"400"} style={{ fontSize: 15 }}>
            Voucher
          </AppText>
          <AppText weight={"400"} style={{ fontSize: 15 }}>
            -{formatCurrency(voucher)}
          </AppText>
        </View>

        <View style={{ marginHorizontal: 18 }}>
          <View
            style={{
              width: "100%",
              borderWidth: 0.8,
              borderColor: "#C4C4C4",
              marginTop: 10,
              alignItems: "center",
            }}
          ></View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 18,
            marginTop: 13,
          }}
        >
          <AppText weight={"400"} style={{ fontSize: 15 }}>
            Grand Total
          </AppText>
          <AppText weight={"400"} style={{ fontSize: 15 }}>
            {formatCurrency(grandTotal)}
          </AppText>
        </View>
      </View>

      <View style={[Styles.centerContainer, { marginTop: 32 }]}>
        <TouchableOpacity
          style={[Styles.button, Styles.shadow, { backgroundColor: "#51C699" }]}
          onPress={orderHandler}
        >
          <AppText weight={"800"} style={{ color: "white", fontSize: 17 }}>
            Place Order
          </AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
