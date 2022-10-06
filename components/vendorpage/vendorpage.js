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
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import CartButton from "./CartButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
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

const Vendorpage = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [vendor, setVendor] = useState({});

  // get vendor's data on mount
  useEffect(() => {
    const getVendordata = async () => {
      try {
        const docRef = doc(firestore, "vendors", "GWGoNQfs6jU0yf0Uy0ml");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Store vendor info to pass to cart
          const { address, area, opening_hour, closing_hour, name } =
            docSnap.data();
          setVendor({
            address,
            area,
            opening_hour,
            closing_hour,
            name,
            id: "GWGoNQfs6jU0yf0Uy0ml",
          });

          // get url for product images
          const products = docSnap.data().products;
          const finalData = [];

          for (const product of products) {
            const url = await getDownloadURL(ref(storage, product.uri));
            finalData.push({
              ...product,
              imageUrl: url,
            });
          }

          // finalize data
          setData(finalData);
        }
      } catch (e) {
        console.warn(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    getVendordata();
  }, []);

  const navigationHandler = () => {
    navigation.navigate("Cart", {
      items: cart,
      vendor,
    });
  };

  // Will only count item once. enaknya gimana?
  const cartHandler = (item) => {
    if (!cart.find((product) => product.id === item.id)) {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const renderMainProducts = ({ item }) => {
    return <MainProductCard item={item} cartHandler={cartHandler} />;
  };

  const renderNormalProducts = ({ item }) => {
    return <NormalProductCard item={item} cartHandler={cartHandler} />;
  };

  const renderItemSeparatorComponent = () => {
    return (
      <View
        style={{
          marginTop: 20,
          width: 300,
          height: 2,
          alignSelf: "center",
          backgroundColor: "black",
          opacity: 0.2,
          marginBottom: 10,
        }}
      ></View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={{ marginTop: 20 }}>
        <FlatList
          data={data.slice(4, data.length)}
          renderItem={renderNormalProducts}
          ItemSeparatorComponent={renderItemSeparatorComponent}
          ListFooterComponent={() => <View style={{ marginBottom: 70 }}></View>}
        />
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {/* Main Products */}
        <FlatList
          data={data.slice(0, 4)}
          renderItem={renderMainProducts}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <AppText fontWeight="700" style={{ fontSize: 18 }}>
              Running Out
            </AppText>
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter} // Normal products goes here
        />
      </View>

      {/* Cart button will show when first item is added */}
      {cart.length !== 0 && (
        <CartButton
          itemCount={cart.length}
          navigationHandler={navigationHandler}
        />
      )}
    </SafeAreaView>
  );
};

export default Vendorpage;
