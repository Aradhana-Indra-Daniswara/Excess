import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../AppText";
import VoucherContainer from "./VoucherContainer";

const Styles = StyleSheet.create({
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  applyVoucherButton: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 45,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#51C699",
  },
  buttonFont: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
});

export default function Voucher({ route, navigation }) {
  const [voucher, setVoucher] = useState(null);
  const [voucherData, setVoucherData] = useState(route?.params?.voucherData);

  // Handles selecting and un-selecting the vouchers
  const voucherHandler = (id) => {
    if (voucher?.id === id) {
      setVoucher(null);
    } else {
      setVoucher(voucherData.find((item) => item.id === id));
    }
  };

  const renderVoucher = ({ item }) => {
    const [backgroundColor, color] =
      item.id === voucher?.id ? ["#51C699", "white"] : ["white", "black"];

    return (
      <VoucherContainer
        discount={item.discount_percentage}
        minimumOrder={item.minimum_order}
        setVoucher={voucherHandler}
        id={item.id}
        total={route.params.total}
        isSelected={item.id === voucher?.id}
      />
    );
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <SafeAreaView style={[Styles.centerContainer, { marginTop: 20 }]}>
        <FlatList
          data={voucherData}
          renderItem={renderVoucher}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
        <View style={{ height: 100 }}></View>
      </SafeAreaView>

      {voucher && (
        <TouchableOpacity
          style={Styles.applyVoucherButton}
          onPress={() =>
            navigation.navigate({
              name: "Checkout",
              params: { voucherSelected: voucher },
              merge: true,
            })
          }
        >
          <AppText weight={"900"} style={Styles.buttonFont}>
            Apply Voucher
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
}
