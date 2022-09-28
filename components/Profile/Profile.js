import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../AppText";
import { auth } from "../../config/firebase-config";
import { signOut } from "firebase/auth";
import { colorStyles } from "../Styling/GlobalStyles";
import { getAuth } from "firebase/auth";

export default function Profile() {
  const user = getAuth().currentUser;
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "OpenSauceSans-Regular": require("../../assets/fonts/OpenSauceSans-Regular.ttf"),
    "OpenSauceSans-Medium": require("../../assets/fonts/OpenSauceSans-Medium.ttf"),
    "OpenSauceSans-SemiBold": require("../../assets/fonts/OpenSauceSans-SemiBold.ttf"),
    "OpenSauceSans-Bold": require("../../assets/fonts/OpenSauceSans-Bold.ttf"),
    "OpenSauceSans-ExtraBold": require("../../assets/fonts/OpenSauceSans-ExtraBold.ttf"),
    "OpenSauceSans-Black": require("../../assets/fonts/OpenSauceSans-Black.ttf"),
    "OpenSauceSans-Light": require("../../assets/fonts/OpenSauceSans-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        height: "100%",
        paddingBottom: 100,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          marginVertical: 24,
          paddingHorizontal: 16,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <AppText style={{ color: colorStyles[20], fontSize: 28 }} weight="700">
          Profile
        </AppText>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          height: "100%",
          // paddingBottom: 100,
        }}
      >
        <View>
          <View style={styles.section}>
            <AppText weight="600" style={{ fontSize: 16 }}>
              Name
            </AppText>
            <TextInput
              style={styles.textInput}
              value={user.displayName}
            ></TextInput>
          </View>
          <View style={styles.section}>
            <AppText weight="600" style={{ fontSize: 16 }}>
              Mobile Number
            </AppText>
            <TextInput
              style={styles.textInput}
              value={user.phoneNumber}
            ></TextInput>
          </View>
          <View style={styles.section}>
            <AppText weight="600" style={{ fontSize: 16 }}>
              Email
            </AppText>
            <TextInput style={styles.textInput} value={user.email}></TextInput>
          </View>
        </View>

        <TouchableOpacity
          style={{
            alignItems: "center",
            borderWidth: 1,
            paddingVertical: 16,
            marginHorizontal: 16,
            borderColor: "#BF4040",
            borderRadius: 5,
          }}
          onPress={handleSignOut}
        >
          <AppText
            style={{
              color: "#BF4040",
            }}
          >
            Log Out
          </AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textInput: {
    marginTop: 6,
    borderBottomColor: colorStyles[80],
    borderBottomWidth: 1,
    fontSize: 16,
    padding: 4,
    fontFamily: "OpenSauceSans-Regular",
  },
  section: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
});
