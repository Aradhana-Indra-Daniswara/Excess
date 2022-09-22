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

export default function Cart({ navigation }) {
  // ini jadiin props dikasih dari vendorpage?
  const [ORDER_ITEMS, setORDER_ITEMS] = useState([
    {
      vendor_id: 1,
      product_id: 1,
      product_name: "Product 1",
      price: 30000,
      qty: 1,
    },
    {
      vendor_id: 1,
      product_id: 2,
      product_name: "Product 2",
      price: 40000,
      qty: 1,
    },
    {
      vendor_id: 1,
      product_id: 3,
      product_name: "Product 3",
      price: 50000,
      qty: 1,
    },
    {
      vendor_id: 1,
      product_id: 4,
      product_name: "Product 4",
      price: 60000,
      qty: 1,
    },
    {
      vendor_id: 1,
      product_id: 5,
      product_name: "Product 5",
      price: 60000,
      qty: 1,
    },
    {
      vendor_id: 1,
      product_id: 6,
      product_name: "Product 6",
      price: 60000,
      qty: 1,
    },
  ]);

  // ini juga jadiin props, jadiin satu aja sama ORDER_ITEMS(?)
  const VENDOR_DETAILS = {
    id: 1,
    name: "Salad Bowl",
    address: "BINUS Ave.",
    openingHour: 8,
    closingHour: 22,
  };

  const [grandTotal, setGrandTotal] = useState(0);

  // Run once when page first load
  useEffect(() => {
    const total = ORDER_ITEMS.reduce(
      (prev, curr) => prev + curr.price * curr.qty,
      0
    );
    setGrandTotal(total);
  }, [ORDER_ITEMS]);

  const deleteItem = (id) => {
    const filteredItem = [];

    ORDER_ITEMS.forEach((item) => {
      if (item.product_id === id) {
        setGrandTotal(grandTotal - item.price * item.qty);
      } else {
        filteredItem.push(item);
      }
    });

    // console.log(filteredItem)
    setORDER_ITEMS(filteredItem);
  };

  // probs need to refactor this
  const updateItem = (id, qty) => {
    const filteredItem = [];

    // search for item, push any other item directly to filteredItem
    ORDER_ITEMS.forEach((product) => {
      if (product.product_id === id) {
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
        }}
        keyExtractor={({ product_id }) => product_id}
      />

      {/* Footer */}
      <View
        style={[
          Styles.centerContainer,
          {
            marginVertical: 20,
            position: "absolute",
            bottom: 20,
            height: 100,
          },
        ]}
      >
        <AppText weight={"700"} style={{ fontSize: 18 }}>
          Grand Total: {formatCurrency(grandTotal)}
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
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={[Styles.buttonFont]}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
