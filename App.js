import { NavigationContainer, DefaultTheme  } from "@react-navigation/native";
import React from "react";
import PageNavigator from "./components/PageNavigator";

const JAJANTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)',
  },
};
export default function App() {
	return (
		<NavigationContainer theme={JAJANTheme}>
			<PageNavigator />
		</NavigationContainer>
	);
}
