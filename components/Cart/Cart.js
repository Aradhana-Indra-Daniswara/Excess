import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../AppText";
import ProductCard from "./ProductCard";
import formatCurrency from "../../utils/formatters/formatCurrency";
import { SimpleLineIcons } from "@expo/vector-icons";

const Styles = StyleSheet.create({
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
  vendorInfoFont: {
    fontWeight: "800",
    fontSize: 18,
    color: "#59D9A8",
  },
});

export default function Cart({ route, navigation }) {
  // ini jadiin props dikasih dari vendorpage?
  const [ORDER_ITEMS, setORDER_ITEMS] = useState(route?.params?.items);

  // ini juga jadiin props, jadiin satu aja sama ORDER_ITEMS(?)
  const VENDOR_DETAILS = {
    id: 1,
    name: "Salad Bowl",
    address: "BINUS Ave.",
    openingHour: 8,
    closingHour: 22,
  };

  const [total, setTotal] = useState(0);

  // Run once when page first load
  useEffect(() => {
    const total = ORDER_ITEMS.reduce(
      (prev, curr) => prev + curr.price * curr.qty,
      0
    );
    setTotal(total);
  }, [ORDER_ITEMS]);

  const deleteItem = (id) => {
    const filteredItem = [];

    ORDER_ITEMS.forEach((item) => {
      if (item.id === id) {
        setTotal(total - item.price * item.qty);
      } else {
        filteredItem.push(item);
      }
    });

    // Go back to vendor https://reactnavigation.org/docs/navigation-actions/#goback
    // if (filteredItem.length === 0) {
    //   navigation.goBack();
    // }

    // console.log(filteredItem)
    setORDER_ITEMS(filteredItem);
  };

  // probs need to refactor this
  const updateItem = (id, qty) => {
    const filteredItem = [];

    // search for item, push any other item directly to filteredItem
    ORDER_ITEMS.forEach((product) => {
      if (product.id === id) {
        product.qty = qty;
      }

      filteredItem.push(product);
    });

    // renew ORDER_ITEMS w/ all items
    setORDER_ITEMS(filteredItem);
  };

  const renderItem = ({ item }) => {
    return (
      <ProductCard
        product={item}
        updateItem={updateItem}
        deleteItem={deleteItem}
      />
    );
  };

  const renderSeparatorComponent = () => {
    return (
      <View
        style={{ borderTopWidth: 1, borderColor: "#C2C2C2", marginTop: 10 }}
      ></View>
    );
  };

  return (
    <SafeAreaView style={[Styles.centerContainer, { marginTop: 10 }]}>
      {/* Vendor Information */}
      <View style={{ alignItems: "flex-start" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SimpleLineIcons
            name="clock"
            size={20}
            color="black"
            style={{ marginRight: 6 }}
          />
          <AppText weight={"600"} style={{ fontSize: 16 }}>
            {VENDOR_DETAILS.openingHour}.00 - {VENDOR_DETAILS.closingHour}.00
          </AppText>
        </View>
        <AppText style={{ color: "#59D9A8", fontSize: 18 }} weight={"700"}>
          {VENDOR_DETAILS.name}, {VENDOR_DETAILS.address}
        </AppText>
      </View>

      {/* Items in cart */}
      <FlatList
        data={ORDER_ITEMS}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparatorComponent}
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: 120,
          // borderWidth: 1,
          maxHeight: "70%",
        }}
        keyExtractor={({ id }) => id}
      />

      {/* Footer */}
      <View
        style={[
          Styles.centerContainer,
          {
            marginVertical: 20,
            position: "absolute",
            bottom: 10,
            height: 100,
            // borderWidth: 1
          },
        ]}
      >
        <AppText weight={"700"} style={{ fontSize: 18 }}>
          Total: {formatCurrency(total)}
        </AppText>
        <TouchableOpacity
          style={[
            Styles.button,
            Styles.shadow,
            {
              backgroundColor: "#51C699",
              marginTop: 20,
            },
          ]}
          onPress={() =>
            navigation.navigate("Checkout", {
              ORDER_ITEMS,
              total,
            })
          }
        >
          <Text style={[Styles.buttonFont]}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
