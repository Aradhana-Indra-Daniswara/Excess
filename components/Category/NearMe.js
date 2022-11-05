import React, { useEffect, useState } from "react";
import AppText from "../AppText";
import { firestore, storage } from "../../config/firebase-config";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// import NearmePage from "NearMe.js";
import NearMeCard from "./NearMe.js";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  orderBy,
  Query,
  query,
} from "firebase/firestore";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Nearme from "../../assets/nearme1.svg";
export default function Category() {
  // const [mainProducts, setMainProducts] = useState([
  //   { name: "Pie 1", price: "15000" },
  //   { name: "Pie 2", price: "16000" },
  //   { name: "Pie 3", price: "17000" },
  //   { name: "Pie 4", price: "18000" },
  // ]);
  // console.log("akjsd hkjsadjkasdkjashdkjashdkjashdkjashdkjash");
  const [data, setData] = useState(null);
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [docs, setDocs] = useState(null);
  const dataakhir = [];

  const [temp, setTemp] = useState(null);
  const getdata = async () => {
    const citiesRef = collection(firestore, "vendors");
    const temp1 = [];
    const q = query(citiesRef, orderBy("distance"));
    // console.log(q);
    // temp.push();
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      temp1.push(doc.data());
      // console.log(doc.id, "=>", doc.data().distance);
    });
    setDocs(temp1);
    // console.log("hi");
    // temp.forEach((aa) => {
    //   console.log(aa.address);
    // });
    // console.log(temp1);
    setTemp(temp1);
    setIsLoading(false);
    //sppecified document
    // const docRef = doc(firestore, "vendors", "GWGoNQfs6jU0yf0Uy0ml");
    // const querySnapShot = await getDocs(collection(firestore, "vendors"));
    // let counter = 0;
    // const vendors = querySnapShot.map;
    // querySnapShot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    //   // console.log(doc.data().address);
    //   dataakhir[counter] = doc.data().distance;
    //   console.log(dataakhir[counter]);
    //   counter++;
    //   setIsLoading(false);
    // });
    // try {
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     console.log(docSnap.data());
    //     setData(docSnap.data());
    //     SetType(docSnap.data().type);
    //     SetNameVendor(docSnap.data().name);
    //     const data2 = docSnap.data().products;
    //     const dataimage = [];
    //     for (const product of data2) {
    //       const url = await getDownloadURL(ref(storage, product.uri));
    //       dataimage.push({
    //         ...product,
    //         imageUrl: url,
    //       });
    //       console.log(dataimage);
    //     }
    //     setIsLoading(false);
    //     setProducts(dataimage);
    //     setMainProducts(products.slice(0, 4));
    //     for (let i = 0; i < 4; i++) {
    //       products.shift();
    //     }
    //     setNormalProduct(products);
    //   }
    // } catch (e) {
    //   console.log(e.message);
    // }
  };
  useEffect(() => {
    getdata();
  }, []);
  useEffect(() => {
    console.log(temp);
  }, [temp]);
  if (isLoading) {
    return null;
  }
  return (
    <View>
      <View style={styles.Nearme}>
        <Nearme width={30} height={30} />
        <AppText fontFamily={"OpenSauceSans-Bold"} style={styles.neartext}>
          Near me
        </AppText>
      </View>
      <View style={styles.flexbox}>
        <FlatList
          numColumns={2}
          data={temp}
          renderItem={({ item }) => (
            <NearMeCard
              productName={item.name}
              productPrice={item.rating}
              imageuri={item.address}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Nearme: {
    // flex: 1,
    marginLeft: 20,
    marginTop: 20,
    flexDirection: "row",
  },
  neartext: {
    marginLeft: 10,
    marginTop: 5,
  },
  flexbox: {
    flex: 1,
    marginLeft: 40,
    // alignSelf:'center',
    // justifyContent:'center',
    flexDirection: "row",
  },
});
