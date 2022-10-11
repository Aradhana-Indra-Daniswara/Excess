import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, TouchableOpacityComponent, View } from "react-native";
import AppText from "../AppText";
import Right_arrow_icon from "../../assets/right_arrow_icon.svg";
import { colorStyles } from "../Styling/GlobalStyles";
import AutoDimensionImage from "react-native-auto-dimensions-image";

export default function BigProductCard({ product, cartHandler }) {
	return (
		<View
			style={{
				borderWidth: 1,
				borderColor: "#F2F2F2",
				borderRadius: 5,
				padding: 5,
				marginVertical: 4,
				justifyContent: "space-between",
				// marginHorizontal: 16,
				// flex: 1,
				width: "48%",
			}}>
			<View style={{ alignItems: "flex-start", width: "100%" }}>
				<View style={{ width: "100%" }}>
					<Image
						source={{ uri: product.imageUrl }}
						style={{ width: "100%", height: 150, borderRadius: 5 }}
					/>
				</View>
				<View>
					<AppText
						style={{ fontSize: 14, marginTop: 8 }}
						weight='600'>
						{product.name}
					</AppText>
					<AppText style={{ fontSize: 14, marginTop: 4, marginBottom: 12 }}>Rp{product.price}</AppText>
				</View>
			</View>
			<TouchableOpacity
				style={{ flexDirection: "row", alignItems: "center" }}
				onPress={() => cartHandler(product)}>
				<AppText
					style={{ marginRight: 4, color: colorStyles["excess"], fontSize: 14 }}
					weight='500'>
					Add to Cart
				</AppText>
				<Right_arrow_icon />
			</TouchableOpacity>
		</View>
	);
}
