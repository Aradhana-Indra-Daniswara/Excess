import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import AppText from "../AppText";
import Right_arrow_icon from "../../assets/right_arrow_icon.svg";
import { colorStyles } from "../Styling/GlobalStyles";
import AutoDimensionImage from "react-native-auto-dimensions-image";

export default function BigProductCard({ product }){
	// useEffect(() => {
	// 	console.log(product);
	// }, []);

	return (
		<View
			style={{
				borderWidth: 1,
				borderColor: "#F2F2F2",
				borderRadius: 5,
				padding: 5,
				marginVertical: 4,
				justifyContent: "space-between",
				marginHorizontal: 16,
			}}>
			<View style={{ alignItems: "flex-start", width: 150 }}>
				<View>
					<Image
						source={{ uri: product.imageUrl }}
						style={{ width: 150, height: 150, borderRadius: 5 }}
					/>
				</View>
				<View >
					<AppText style={{ fontSize: 16, marginTop: 8 }}>{product.name}</AppText>
					<AppText
						style={{ fontSize: 12, marginTop: 4, marginBottom: 12 }}
						weight='500'>
						Rp{product.price}
					</AppText>
				</View>
			</View>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<AppText
					style={{ marginRight: 4, color: colorStyles["excess"], fontSize: 14 }}
					weight='500'>
					Add to Cart
				</AppText>
				<Right_arrow_icon />
			</View>
		</View>
	);
}
