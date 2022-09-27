import React, { useEffect, useState } from "react";
import AppText from "../AppText";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
const onPress = () => {};
const Vendorpage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getdata = async () => {
    const url =
      Platform.OS === "ios"
        ? "http://localhost:3000/vendors"
        : "http://10.0.2.2:3000/vendors";
    try {
      const repsonse = await fetch(url);
      const JSONResponse = await repsonse.json();
      setData(JSONResponse);
      setIsLoading(false);
    } catch (e) {
      console.warn(e);
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  if (isLoading) {
    return null;
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text
            style={{
              color: "black",
              fontWeight: "800",
              display: "flex",
              fontSize: 20,
            }}>
            {data.vendor_name}
          </Text>
          <View>
            <Text></Text>
          </View>
          <Text
            style={{
              width: 120,
              height: 100,
              marginTop: -20,
            }}>
            {data.vendor_cuisine_type}
          </Text>
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
            }}>
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
            }}>
            Running Out
          </Text>
        </View>
        <ScrollView>
          <View style={styles.flexbox}>
            <View style={[styles.rectangle, styles.rec1]}>
              <Image
                style={styles.imgdummy}
                source={require("../../assets/dummyfooddata.png")}
                // source={{ uri: 'http://10.0.2.2:3000/product_images/pretzels.png' }}
              />
              <AppText fontFamily={"Montserrat-Bold"} style={styles.textvendor}>
                Pie
              </AppText>
              <AppText fontFamily={"Montserrat-Bold"} style={styles.textprice}>
                Rp.15.000,00
              </AppText>
              <View style={styles.btn}>
                {/* <Button
                title="Add"
                color='#51C699'
                /> */}
                <TouchableOpacity onPress={onPress} style={styles.rnd}>
                  <AppText fontFamily={"Montserrat-Bold"} style={styles.txtadd}>
                    Add
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.rectangle, styles.rec2]}>
              <Image
                style={styles.imgdummy}
                source={{
                  uri: "http://10.0.2.2:3000/product_images/macaron.png",
                }}
              />
              <AppText fontFamily={"Montserrat-Bold"} style={styles.textvendor}>
                Macaron
              </AppText>
              <AppText fontFamily={"Montserrat-Bold"} style={styles.textprice}>
                Rp.32.000,00
              </AppText>
              <View style={styles.btn}>
                <TouchableOpacity onPress={onPress} style={styles.rnd}>
                  <AppText fontFamily={"Montserrat-Bold"} style={styles.txtadd}>
                    Add
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[styles.flexbox, styles.flx2]}>
            <View style={[styles.rectangle, styles.rec1]}>
              <Image
                style={styles.imgdummy}
                source={{
                  uri: "http://10.0.2.2:3000/product_images/eclairs.png",
                }}
              />
              <AppText fontFamily={"Montserrat-Bold"} style={styles.textvendor}>
                Eclairs
              </AppText>
              <AppText fontFamily={"Montserrat-Bold"} style={styles.textprice}>
                Rp.23.000,00
              </AppText>
              <View style={styles.btn}>
                <TouchableOpacity onPress={onPress} style={styles.rnd}>
                  <Text style={styles.txtadd}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.rectangle, styles.rec2]}>
              <Image
                style={styles.imgdummy}
                source={{
                  uri: "http://10.0.2.2:3000/product_images/pretzels.png",
                }}
              />
              <AppText fontFamily={"Montserrat-Bold"} style={styles.textvendor}>
                Pretzels
              </AppText>
              <AppText fontFamily={"Montserrat-Bold"} style={styles.textprice}>
                Rp.42.000,00
              </AppText>
              <View style={styles.btn}>
                <TouchableOpacity onPress={onPress} style={styles.rnd}>
                  <AppText fontFamily={"Montserrat-Bold"} style={styles.txtadd}>
                    Add
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.linee}></View>
          <View>
            <View style={styles.cotainerkecil}>
              <View style={styles.kotakkirii}>
                <AppText
                  fontFamily={"Montserrat-Bold"}
                  style={styles.Pretzelstxt}>
                  Pretzels
                </AppText>
                <AppText
                  fontFamily={"Montserrat-Bold"}
                  style={styles.hargakecil}>
                  Rp. 42000
                </AppText>
                <View style={styles.btn}>
                  <TouchableOpacity onPress={onPress} style={styles.rnd}>
                    <Text style={styles.txtadd}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.kotakkanan}>
                <Image
                  style={[styles.imgdummy, styles.imgg]}
                  source={{
                    uri: "http://10.0.2.2:3000/product_images/pretzels.png",
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.linee}></View>
          <View>
            <View style={styles.cotainerkecil}>
              <View style={styles.kotakkirii}>
                <AppText
                  fontFamily={"Montserrat-Bold"}
                  style={styles.Pretzelstxt}>
                  Pretzels
                </AppText>
                <AppText
                  fontFamily={"Montserrat-Bold"}
                  style={styles.hargakecil}>
                  Rp. 42000
                </AppText>
                <View style={styles.btn}>
                  <TouchableOpacity onPress={onPress} style={styles.rnd}>
                    <Text style={styles.txtadd}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.kotakkanan}>
                <Image
                  style={[styles.imgdummy, styles.imgg]}
                  source={{
                    uri: "http://10.0.2.2:3000/product_images/pretzels.png",
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.linee}></View>
          <View>
            <View style={styles.cotainerkecil}>
              <View style={styles.kotakkirii}>
                <AppText
                  fontFamily={"Montserrat-Bold"}
                  style={styles.Pretzelstxt}>
                  Pretzels
                </AppText>
                <AppText
                  fontFamily={"Montserrat-Bold"}
                  style={styles.hargakecil}>
                  Rp. 42000
                </AppText>
                <View style={styles.btn}>
                  <TouchableOpacity onPress={onPress} style={styles.rnd}>
                    <Text style={styles.txtadd}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.kotakkanan}>
                <Image
                  style={[styles.imgdummy, styles.imgg]}
                  source={{
                    uri: "http://10.0.2.2:3000/product_images/pretzels.png",
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.linee}></View>
          <View>
            <View style={styles.cotainerkecil}>
              <View style={styles.kotakkirii}>
                <AppText
                  fontFamily={"Montserrat-Bold"}
                  style={styles.Pretzelstxt}>
                  Pretzels
                </AppText>
                <AppText
                  fontFamily={"Montserrat-Bold"}
                  style={styles.hargakecil}>
                  Rp. 42000
                </AppText>
                <View style={styles.btn}>
                  <TouchableOpacity onPress={onPress} style={styles.rnd}>
                    <Text style={styles.txtadd}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.kotakkanan}>
                <Image
                  style={[styles.imgdummy, styles.imgg]}
                  source={{
                    uri: "http://10.0.2.2:3000/product_images/pretzels.png",
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.linee}></View>
          <View>
            <View style={styles.cotainerkecil}>
              <View style={styles.kotakkirii}>
                <AppText
                  fontFamily={"Montserrat-Bold"}
                  style={styles.Pretzelstxt}>
                  Pretzels
                </AppText>
                <AppText
                  fontFamily={"Montserrat-Bold"}
                  style={styles.hargakecil}>
                  Rp. 42000
                </AppText>
                <View style={styles.btn}>
                  <TouchableOpacity onPress={onPress} style={styles.rnd}>
                    <Text style={styles.txtadd}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.kotakkanan}>
                <Image
                  style={[styles.imgdummy, styles.imgg]}
                  source={{
                    uri: "http://10.0.2.2:3000/product_images/pretzels.png",
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.linee}></View>
          <View>
            <View style={styles.cotainerkecil}>
              <View style={styles.kotakkirii}>
                <AppText
                  fontFamily={"Montserrat-Bold"}
                  style={styles.Pretzelstxt}>
                  Pretzels
                </AppText>
                <AppText
                  fontFamily={"Montserrat-Bold"}
                  style={styles.hargakecil}>
                  Rp. 42000
                </AppText>
                <View style={styles.btn}>
                  <TouchableOpacity onPress={onPress} style={styles.rnd}>
                    <Text style={styles.txtadd}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.kotakkanan}>
                <Image
                  style={[styles.imgdummy, styles.imgg]}
                  source={{
                    uri: "http://10.0.2.2:3000/product_images/pretzels.png",
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
    // fontWeight :'2   00',
    width: 65,
    height: 20,
    marginBottom: 5,

    fontSize: 16,
    // fontWeight:600,
  },
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
    // justifyContent : 'center',
    // alignItems : 'center',
    // margin :'auto',
  },
  flexbox: {
    flex: 1,
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
    // marginLeft:20,
    marginRight: 34,
    // marginBottom:50,
  },
  rec2: {
    // marginLeft:15,
    // marginRight:38,
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
  // buttonadd:{
  //     width:82,
  //     height:31,
  //     color:'#51C699',

  // },
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
});

export default Vendorpage;
