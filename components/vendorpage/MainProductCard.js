import React, { useEffect, useState } from "react";
import AppText from "../AppText";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
const onPress = () => {};
const MainProductCard = ({ productName, productPrice, imageuri }) => {
  return (
    <View style={[styles.rectangle, styles.rec1]}>
      <Image
        style={styles.imgdummy}
        // source={require("../../assets/dummyfooddata.png")}
        source={{ uri: imageuri }}
      />
      <AppText weight="700" style={styles.textvendor}>
        {productName}
      </AppText>
      <AppText weight="700" style={styles.textprice}>
        {productPrice}
      </AppText>
      <View style={styles.btn}>
        {/* <Button
            title="Add"
            color='#51C699'
             /> */}
        <TouchableOpacity onPress={onPress} style={styles.rnd}>
          <AppText weight="700" style={styles.txtadd}>
            Add
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  txtadd: {
    // alignContent :'center',
    // alignContent : 'center',
    marginTop: 8,
    color: "white",
    alignSelf: "center",
    lineHeight: 18,
    fontSize: 15,
    // fontWeight:'600',
  },
  rnd: {
    marginTop: 5,
    backgroundColor: "#51C699",
    // padding: 20,
    width: 80,
    height: 31,
    borderRadius: 14,
  },
  btn: {
    width: 82,
    height: 31,
    alignSelf: "center",
    borderRadius: 14,
    // marginRight: 40,
    //   marginLeft: 40,
    //   marginTop: 10,
    //   paddingTop: 20,
    //   paddingBottom: 20,
    //   backgroundColor: '#68a0cf',
    borderRadius: 20,
    //   borderWidth: 1,
    //   borderColor: '#fff',
  },
  rectangle: {
    borderRadius: 14,
    width: 137,
    height: 207,
    backgroundColor: "#dddede",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 2,
    shadowRadius: 3,
    elevation: 5,
    // marginBottom: 60,
  },
  rec1: {
    // marginLeft:20,
    // marginRight: 34,
    // marginBottom:50,
    margin: 10,
  },
  imgdummy: {
    borderRadius: 14,
    width: 135,
    height: 115,
    alignContent: "center",
    marginTop: 2,
    alignSelf: "center",
  },
  textvendor: {
    textAlign: "center",
    alignSelf: "center",
    marginTop: 5,
    fontSize: 19,
    fontWeight: "600",
  },
  textprice: {
    alignItems: "center",
    alignSelf: "center",
    fontWeight: "600",
    fontSize: 15,
  },
});
export default MainProductCard;
