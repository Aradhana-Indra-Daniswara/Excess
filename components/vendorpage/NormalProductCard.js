import React from "react";
import AppText from "../AppText";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import formatCurrency from "../../utils/formatters/formatCurrency";

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  addButton: {
    width: 82,
    height: 32,
    borderRadius: 14,
    borderRadius: 20,
    marginTop: 5,
    backgroundColor: "#51C699",
    justifyContent: "center",
    alignItems: "center",
  },
  leftColumn: {
    alignSelf: "flex-start",
    marginLeft: 5,
  },
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: 310,
    height: 105,
    marginBottom: 5,
  },
  productImage: {
    borderRadius: 14,
    width: 95,
    height: 95,
  },
});

const NormalProductCard = ({ product }) => {
  return (
    <View style={styles.container}>
      {/* Left Column */}
      <View style={styles.leftColumn}>
        <AppText
          weight="600"
          style={{ height: 20, marginBottom: 5, fontSize: 16 }}
        >
          {product.name}
        </AppText>
        <AppText weight="400" style={{ fontSize: 14, marginBottom: 20 }}>
          {formatCurrency(product.price)}
        </AppText>

        {/* Add Button */}
        <TouchableOpacity style={[styles.addButton]}>
          <AppText
            weight={"600"}
            style={{
              color: "white",
              fontSize: 15,
            }}
          >
            Add
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Right Column */}
      <Image style={[styles.productImage]} source={{ uri: product.imageUrl }} />
    </View>
  );
};

export default NormalProductCard;
