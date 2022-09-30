import React, { useEffect, useState } from "react";
import AppText from "../AppText";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import formatCurrency from "../../utils/formatters/formatCurrency";
const styles = StyleSheet.create({
  garis: {
    marginTop: 20,
    width: 320,
    // marginRight: 40,
    height: 2,
    alignSelf: "center",
    backgroundColor: "black",
    opacity: 0.2,
  },
  txtadd: {
    marginTop: 8,
    color: "white",
    alignSelf: "center",
    lineHeight: 18,
    fontSize: 15,
  },
  rnd: {
    marginTop: 5,
    backgroundColor: "#51C699",
    width: 80,
    height: 31,
    borderRadius: 14,
  },
  btn: {
    width: 82,
    height: 31,
    // alignSelf: 'center',
    borderRadius: 14,
    borderRadius: 20,
  },
  hargakecil: {
    marginBottom: 20,
  },
  Pretzelstxt: {
    // fontWeight :'2   00',
    // width: 65,
    height: 20,
    marginBottom: 5,
    fontSize: 16,
    // fontWeight:600,
  },
  cotainerkecil: {
    flexDirection: "row",
  },
  kotakkirii: {
    alignSelf: "flex-start",
  },
  containerr: {
    justifyContent: "space-between",
    marginLeft: 35,
    flexDirection: "row",
  },
  imgdummy: {
    borderRadius: 14,
    width: 135,
    height: 115,
    marginRight: 20,
  },
});
const onPress = () => {};
const NormalProductCard = ({ product }) => {
  console.log(product.name);
  return (
    <View style={styles.containerr}>
      <View style={styles.kotakkirii}>
        {/* <View style={styles.garis}></View> */}
        <AppText weight="700" style={styles.Pretzelstxt}>
          {product.name}
        </AppText>
        <AppText weight="700" style={styles.hargakecil}>
          {formatCurrency(product.price)}
        </AppText>

        <View style={styles.btn}>
          <TouchableOpacity style={styles.rnd}>
            <Text style={styles.txtadd}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image
        style={styles.imgdummy}
        // source={require("../../assets/dummyfooddata.png")}

        source={{ uri: product.imageUrl }}
      />
    </View>
  );
};
export default NormalProductCard;
