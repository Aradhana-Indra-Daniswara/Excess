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

export default function Profile() {
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
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        justifyContent: "space-between",
        padding: 16,
        paddingBottom: 48,
      }}
    >
      <View>
        <View style={styles.section}>
          <AppText fontFamily={"OpenSauceSans-Bold"}>Name</AppText>
          <TextInput
            style={styles.textInput}
            value="Aradhana Satrio Devin"
          ></TextInput>
        </View>
        <View style={styles.section}>
          <AppText fontFamily={"OpenSauceSans-Bold"}>Mobile Number</AppText>
          <TextInput style={styles.textInput} value="08123456789"></TextInput>
        </View>
        <View style={styles.section}>
          <AppText fontFamily={"OpenSauceSans-Bold"}>Email</AppText>
          <TextInput
            style={styles.textInput}
            value="aratriodev@gmail.com"
          ></TextInput>
        </View>
      </View>

      <TouchableOpacity
        style={{
          alignItems: "center",
          borderWidth: 1,
          paddingVertical: 16,
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
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 6,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    fontSize: 16,
    padding: 4,
    fontFamily: "OpenSauceSans-Regular",
  },
  section: {
    marginBottom: 16,
  },
});
