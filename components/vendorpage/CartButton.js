import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppText from "../AppText";
import ShoppingCartIcon from "../../assets/shopping_cart.svg";
import { colorStyles } from "../Styling/GlobalStyles";


const CartButton = ({ itemCount, navigationHandler }) => {
  return (
    <TouchableOpacity onPress={navigationHandler} style={{ position: "absolute", bottom: 20, right: 20 }}>
      <View style={{ position: 'relative' }}>
        <ShoppingCartIcon />
				<View style={{ position: 'absolute', right: -10, top: -10, backgroundColor: 'white', width: 32, height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 100}}>
					<AppText style={{ color: colorStyles['excess'] }} weight='600'>{itemCount}</AppText>
				</View>
      </View>
    </TouchableOpacity>
  );
};

export default CartButton;
