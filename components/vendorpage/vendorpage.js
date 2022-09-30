import React, { useEffect, useState } from "react";
import AppText from "../AppText";
import NormalProductCard from "./NormalProductCard";
import MainProductCard from "./MainProductCard";
import { firestore, storage } from "../../config/firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    // marginLeft: 40,
    alignItems: "center",
    flexWrap: 1,
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

const Vendorpage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mainProducts, setMainProducts] = useState([]);
  const [type, SetType] = useState(null);
  const [normalProduct, setNormalProduct] = useState([]);
  const [namevendor, SetNameVendor] = useState(null);

  // get vendor's items
  const getdata = async () => {
    const docRef = doc(firestore, "vendors", "GWGoNQfs6jU0yf0Uy0ml");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
        SetType(docSnap.data().type);
        SetNameVendor(docSnap.data().name);

        // get url for product images
        const products = docSnap.data().products;
        const dataimage = [];

        for (const product of products) {
          const url = await getDownloadURL(ref(storage, product.uri));
          dataimage.push({
            ...product,
            imageUrl: url,
          });
        }

        // set main and normal products
        setMainProducts(dataimage.slice(0, 4));

        for (let i = 0; i < 4; i++) {
          dataimage.shift();
        }

        setNormalProduct(dataimage);
      }
    } catch (e) {
      console.warn(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  // get vendor's data
  useEffect(() => {
    getdata();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Main Products */}
          <FlatList
            numColumns={2}
            data={mainProducts}
            renderItem={({ item }) => (
              <MainProductCard
                productName={item.name}
                productPrice={item.price}
                imageuri={item.imageUrl}
              />
            )}
            scrollEnabled={false}
            style={{
              marginBottom: 30,
            }}
            ListHeaderComponent={() => (
              <AppText fontWeight="700" style={{ fontSize: 18 }}>
                Running Out
              </AppText>
            )}
          />

          {/* Normal Products */}
          <FlatList
            ItemSeparatorComponent={() => (
              <View
                style={{
                  marginTop: 20,
                  width: 320,
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
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Vendorpage;
