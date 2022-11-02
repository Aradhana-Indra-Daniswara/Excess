import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import AppText from "../AppText";
import formatCurrency from "../../utils/formatters/formatCurrency";

const Styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    // height: 150,
    maxHeight: 180,
    width: 310,
    borderColor: "#C2C2C2",
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  qtyContainer: {
    width: 50,
    height: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C2C2C2",
  },
});

export default function ProductCard({ product, updateItem, deleteItem }) {
  const [qty, setQty] = useState(1);

  const qtyHandler = (action) => {
    switch (action) {
      case "increment":
        setQty(qty + 1);
        break;
      case "decrement":
        if (qty > 1) {
          setQty(qty - 1);
          break;
        }
    }
  };

  useEffect(() => {
    updateItem(product.id, qty);
  }, [qty]);

  return (
    <View style={[Styles.cardContainer]}>
      <View style={{ marginTop: 16 }}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: 170,
              }}
            >
              <AppText weight={"600"} style={{ fontSize: 18, width: 120 }}>
                {product.name}
              </AppText>
              <Pressable
                style={{
                  marginLeft: 10,
                  height: 30,
                  width: 40,
                }}
                onPress={() => deleteItem(product.id)}
              >
                <Ionicons name="md-trash-outline" size={28} color="black" />
              </Pressable>
            </View>
            <AppText weight={"300"} style={{ fontSize: 15, marginTop: 5 }}>
              {formatCurrency(product.discounted_price)}
            </AppText>
          </View>
        </View>

        {/* QTY BTN */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: 140,
            marginTop: 18,
          }}
        >
          <Pressable onPress={() => qtyHandler("decrement")}>
            <AntDesign name="minuscircle" size={35} color="black" />
          </Pressable>
          <View style={[Styles.centerContainer, Styles.qtyContainer]}>
            <AppText weight={"400"} style={{ fontSize: 15 }}>
              {qty}
            </AppText>
          </View>
          <Pressable onPress={() => qtyHandler("increment")}>
            <AntDesign name="pluscircle" size={35} color="black" />
          </Pressable>
        </View>
      </View>

      {/* product image */}
      <View>
        <Image
          source={{ uri: product.imageUrl }}
          style={{ height: 100, width: 100, borderRadius: 10 }}
        />
      </View>
    </View>
  );
}
