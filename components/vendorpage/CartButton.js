import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "../AppText";
import ShoppingCartIcon from "../../assets/shopping-cart.svg";

const Styles = StyleSheet.create({
  container: {
    width: 225,
    height: 50,
    marginBottom: 20,
    backgroundColor: "#59D9A8",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    bottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

const CartButton = ({ itemCount, navigationHandler }) => {
  return (
    <TouchableOpacity style={Styles.container} onPress={navigationHandler}>
      <View style={{ position: "absolute", left: 10 }}>
        <ShoppingCartIcon />
      </View>
      <AppText weight={"700"} style={{ color: "white", fontSize: 14 }}>
        {itemCount} item(s) in your cart
      </AppText>
    </TouchableOpacity>
  );
};

export default CartButton;
