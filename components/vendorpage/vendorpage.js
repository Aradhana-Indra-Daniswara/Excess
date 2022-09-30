import React, { useEffect, useState } from "react";
import AppText from "../AppText";
import NormalProductCard from "./NormalProductCard";
import MainProductCard from "./MainProductCard";
import { firestore, storage } from "../../config/firebase-config";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
const onPress = () => {};
const Vendorpage = () => {
  const [data, setData] = useState(null);
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mainProducts, setMainProducts] = useState([
    // { name: "Pie 1", price: "15000" },
    // { name: "Pie 2", price: "16000" },
    // { name: "Pie 3", price: "17000" },
    // { name: "Pie 4", price: "18000" },
  ]);
  const [type, SetType] = useState(null);
  const [normalProduct, setNormalProduct] = useState([
    // { name: "Pie 1", price: "15000" },
    // { name: "Pie 2", price: "16000" },
    // { name: "Pie 3", price: "17000" },
    // { name: "Pie 4", price: "19000" },
    // { name: "Pie 6", price: "20000" },
    // { name: "Pie 7", price: "21000" },
    // { name: "Pie 8", price: "22000" },
  ]);
  const [namevendor, SetNameVendor] = useState(null);
  const getdata = async () => {
    //sppecified document

    const docRef = doc(firestore, "vendors", "GWGoNQfs6jU0yf0Uy0ml");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setData(docSnap.data());
        SetType(docSnap.data().type);
        SetNameVendor(docSnap.data().name);
        const data2 = docSnap.data().products;
        const dataimage = [];
        for (const product of data2) {
          const url = await getDownloadURL(ref(storage, product.uri));
          dataimage.push({
            ...product,
            imageUrl: url,
          });
          console.log(dataimage);
        }
        setIsLoading(false);
        setProducts(dataimage);
        setMainProducts(products.slice(0, 4));

        for (let i = 0; i < 4; i++) {
          products.shift();
        }
        setNormalProduct(products);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  if (isLoading) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ marginLeft: 40 }}>
          <AppText
            weight="900"
            style={{
              color: "black",
              fontWeight: "800",
              display: "flex",
              fontSize: 20,
            }}
          >
            {namevendor}
          </AppText>

          <AppText
            fontFamily={"OpenSauceSans-Bold"}
            style={{
              width: 200,
              height: 100,
              // marginTop: 10,
              marginRight: 40,
              fontSize: 12,
            }}
          >
            {type}
          </AppText>
        </View>
        <View style={styles.box}>
          <Image
            style={{
              width: 40,
              height: 40,
              marginLeft: 20,
              marginRight: 17,
              marginTop: 10,
            }}
            source={require("../../assets/fast-delivery-1.png")}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              // marginTop : 30,
            }}
          >
            Delivered in 10 minutes
          </Text>
        </View>
        <View>
          <Text
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignSelf: "center",
              fontSize: 16,
              fontWeight: "600",
              lineHeight: 19.5,
              marginBottom: 11,
            }}
          >
            Running Out
          </Text>
        </View>
        <View style={styles.flexbox}>
          <FlatList
            numColumns={2}
            // horizontal={true}
            // data={mainProducts}
            // products
            data={mainProducts}
            renderItem={({ item }) => (
              <MainProductCard
                productName={item.name}
                productPrice={item.price}
                imageuri={item.imageUrl}
              />
            )}
          />
        </View>
        <View styles={styles.flex2}>
          <FlatList
            ItemSeparatorComponent={() => (
              <View
                style={{
                  marginTop: 20,
                  width: 320,
                  // marginRight: 40,
                  height: 2,
                  alignSelf: "center",
                  backgroundColor: "black",
                  opacity: 0.2,
                  marginBottom: 10,
                }}
              ></View>
            )}
            data={normalProduct}
            renderItem={({ item }) => <NormalProductCard product={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  // flex2:{
  //     marginLeft:20,
  // },
  flex2: {},
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    marginTop: 50,
  },
  imgg: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 90,
  },
  cotainerkecil: {
    flexDirection: "row",
  },
  kotakkirii: {
    alignSelf: "flex-start",
  },
  hargakecil: {
    marginBottom: 20,
  },
  linee: {
    width: 320,
    height: 2,
    marginTop: -10,
    backgroundColor: "#C4C4C4",
  },
  Pretzelstxt: {
    width: 65,
    height: 20,
    marginBottom: 5,
    fontSize: 16,
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
  flx2: {
    marginTop: -40,
  },
  box: {
    width: 257,
    height: 60,
    borderWidth: 1,
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 14,
    marginTop: -56,
    borderColor: "#51C699",
    alignSelf: "center",
  },
  flexbox: {
    flex: 1,
    marginLeft: 40,
    // alignSelf:'center',
    // justifyContent:'center',
    flexDirection: "row",
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
    marginBottom: 60,
  },
  rec1: {
    marginRight: 34,
  },
  rec2: {},
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
  btn: {
    width: 82,
    height: 31,
    alignSelf: "center",
    borderRadius: 14,
    borderRadius: 20,
  },
});

export default Vendorpage;
