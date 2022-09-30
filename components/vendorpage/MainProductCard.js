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
    marginTop: 5,
    width: 82,
    height: 31,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    borderRadius: 20,
    backgroundColor: "#51C699",
  },
  container: {
    alignItems: "center",
    borderRadius: 25,
    width: 137,
    height: 210,
    backgroundColor: "#F9F9F9",
    borderWidth: 0.25,
    borderColor: "#dedede",
    margin: 10,
  },
  productImage: {
    borderRadius: 14,
    width: 135,
    height: 115,
    marginTop: 2,
  },
});

const MainProductCard = ({ productName, productPrice, imageuri }) => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <Image style={styles.productImage} source={{ uri: imageuri }} />
      <AppText
        weight="600"
        style={{ marginTop: 5, marginBottom: 6, fontSize: 16 }}
      >
        {productName}
      </AppText>
      <AppText weight="500" style={{ fontSize: 13 }}>
        {formatCurrency(productPrice)}
      </AppText>

      <TouchableOpacity style={[styles.addButton, styles.shadow]}>
        <AppText weight="600" style={{ color: "white", fontSize: 13 }}>
          Add
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default MainProductCard;
