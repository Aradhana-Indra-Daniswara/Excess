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
import formatTime from "../../utils/formatters/formatTime";

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
  // get items and vendor from route params
  const [items, setItems] = useState(route?.params?.items);
  const vendor = route?.params?.vendor;

  // keep track of total (price)
  const [total, setTotal] = useState(0);

  // Run once when page first load
  useEffect(() => {
    const total = items.reduce(
      (prev, curr) => prev + curr.discounted_price * curr.qty,
      0
    );
    setTotal(total);
  }, [items]);

  const deleteItem = (id) => {
    const filteredItem = [];

    // Search item and update total
    items.forEach((item) => {
      if (item.id === id) {
        setTotal(total - item.price * item.qty);
      } else {
        filteredItem.push(item);
      }
    });

    // Go back to vendor page if length is 0
    if (filteredItem.length === 0) {
      setTimeout(() => {
        navigation.goBack();
      }, 250);
    }

    // Finalize item
    setItems(filteredItem);
  };

  const updateItem = (id, qty) => {
    const filteredItem = [];

    // search for item, push any other item directly to filteredItem
    items.forEach((product) => {
      if (product.id === id) {
        product.qty = qty;
      }
      filteredItem.push(product);
    });

    // renew items w/ all items
    setItems(filteredItem);
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

  const checkoutNavigationHandler = () => {
    // filter items to only their id, name, price, and qty
    const finalItems = items.map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      qty: i.qty,
    }));

    navigation.navigate("Checkout", {
      vendor,
      items: finalItems,
      total,
    });
  };

  return (
    <SafeAreaView style={[Styles.centerContainer, { marginTop: 10 }]}>
      {/* Vendor Information */}
      <View style={{ alignItems: "flex-start", marginBottom: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SimpleLineIcons
            name="clock"
            size={20}
            color="black"
            style={{ marginRight: 6 }}
          />
          <AppText weight={"600"} style={{ fontSize: 16 }}>
            {formatTime(vendor.opening_hour)} -{" "}
            {formatTime(vendor.closing_hour)}
          </AppText>
        </View>
        <View style={{ width: 280 }}>
          <AppText style={{ color: "#59D9A8", fontSize: 18 }} weight={"700"}>
            {vendor.name}, {vendor.address}
          </AppText>
        </View>
      </View>

      {/* Items in cart */}
      <FlatList
        data={items}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparatorComponent}
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: 100,
          maxHeight: "70%",
        }}
        keyExtractor={({ id }) => id}
        ListFooterComponent={() => <View style={{ marginBottom: 10 }}></View>}
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
          onPress={checkoutNavigationHandler}
        >
          <Text style={[Styles.buttonFont]}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
