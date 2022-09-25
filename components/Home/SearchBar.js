import { View, TextInput, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";

import Search_icon from "../../assets/search_icon.svg";
import AppText from "../AppText";
import { colorStyles } from "../Styling/GlobalStyles";

export default function SearchBar(props) {
  const { onPress, placeholder } = props;
  const [fontsLoaded] = useFonts({
    "OpenSauceSans-Regular": require("../../assets/fonts/OpenSauceSans-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignSelf: "center",
        width: "80%",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        position: "absolute",
        bottom: -24,
      }}
      onPress={onPress}>
      <Search_icon height={32} width={32} />
      <View pointerEvents="none">
        <AppText
          style={{
            marginLeft: 8,
            width: "100%",
            color: colorStyles[70],
          }}>
          {placeholder}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}
