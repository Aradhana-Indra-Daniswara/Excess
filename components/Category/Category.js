import React, { useEffect, useState } from "react";
import AppText from "../AppText";
import { collection, getDocs, orderBy, query, Query } from "firebase/firestore";
import { firestore } from "../../config/firebase-config";
import { StyleSheet, Text, View } from "react-native";
import Nearme from "../../assets/nearme1.svg";
export default function Category() {
  const [doc, setDoc] = useState(null);
  const datatemparray = [];
  const getdata = async () => {
    const citiesRef = collection(firestore, "vendors");
    const queryy = query(citiesRef, orderBy("distance"));
    const qsnapshot = await getDocs(queryy);
    qsnapshot.forEach((doc) => {
      datatemparray.push(doc.data());
      // console.log(doc.data());
    });
    setDoc(datatemparray);
  };
  useEffect(() => {
    getdata();
  }, []);
  // useEffect(() => {
  //   console.log(doc);
  // }, []);
  // console.log("Tes");
  return (
    <View>
      <View style={styles.sectionone}>
        <Nearme></Nearme>
        <AppText style={styles.nearmetxt}>Near Me</AppText>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  sectionone: { flexDirection: "row" },
  nearmetxt: { marginTop: 12 },
});
