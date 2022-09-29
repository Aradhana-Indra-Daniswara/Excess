import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import formatCurrency from "../../utils/formatters/formatCurrency";
import AppText from "../AppText/AppText";

const Styles = StyleSheet.create({
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  voucherContainer: {
    height: 94,
    width: 300,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "flex-start",
    paddingLeft: 32,
    marginBottom: 20,
    flex: 1,
  },
});

export default function VoucherContainer({
  id,
  discount,
  minimumOrder,
  setVoucher,
  total,
  isSelected,
}) {
  const styles = { color: isSelected ? "white" : "black" };

  return (
    <TouchableOpacity
      style={[
        Styles.centerContainer,
        Styles.voucherContainer,
        {
          borderWidth: isSelected ? 0 : 1,
          // spaghetti solution
          backgroundColor: isSelected
            ? "#51C699"
            : total < minimumOrder
            ? "grey"
            : "white",
        },
      ]}
      onPress={() => setVoucher(id)}
      disabled={total < minimumOrder}
    >
      <AppText weight={"800"} style={{ marginBottom: 8, ...styles }}>
        {discount}% Off
      </AppText>
      {minimumOrder === 0 && (
        <AppText weight={"600"} style={{ fontSize: 15, ...styles }}>
          No minimum order
        </AppText>
      )}
      {minimumOrder !== 0 && (
        <AppText weight={"600"} style={{ fontSize: 15, ...styles }}>
          Min. Order {formatCurrency(minimumOrder)}
        </AppText>
      )}
    </TouchableOpacity>
  );
}
