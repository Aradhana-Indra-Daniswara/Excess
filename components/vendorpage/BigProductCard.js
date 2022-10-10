import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import AppText from "../AppText";
import Right_arrow_icon from "../../assets/right_arrow_icon.svg";
import { colorStyles } from "../Styling/GlobalStyles";

export default function BigProductCard(){
	useEffect(() => {
		// console.log(product);
	}, []);

	return (
		<View
			style={{
				flexDirection: "row",
				borderWidth: 1,
				borderColor: "#F2F2F2",
				borderRadius: 5,
				padding: 5,
				marginVertical: 4,
				justifyContent: "space-between",
			}}>
			<View style={{ flexDirection: "row", alignItems: "center", width: 150 }}>
				<View>
					<Image
						source={{ uri: product.imageUrl }}
						style={{ width: 72, height: 72, marginRight: 8, borderRadius: 5 }}
					/>
				</View>
				<View style={{ marginLeft: 10 }}>
					<AppText style={{ fontSize: 14 }}>{product.name}</AppText>
					<AppText
						style={{ fontSize: 12, marginTop: 8 }}
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
