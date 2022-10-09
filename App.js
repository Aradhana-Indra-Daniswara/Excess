import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import PageNavigator from "./components/PageNavigator";
// import Vendorpage from "./components/vendorpage/vendorpage";
export default function App() {
	return (
		<NavigationContainer>
			<PageNavigator />
		</NavigationContainer>
	);
}
