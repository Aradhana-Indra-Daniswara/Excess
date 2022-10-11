import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AppText from "../AppText";
import Right_arrow_icon from "../../assets/right_arrow_icon.svg";
import { colorStyles } from "../Styling/GlobalStyles";
import formatCurrency from "../../utils/formatters/formatCurrency";

export default function ProductCard({ product, cartHandler }) {
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
				marginHorizontal: 16,
			}}>
			<View style={{ flexDirection: "row", alignItems: "center", width: 150 }}>
				<View>
					<Image
						source={{ uri: product.imageUrl }}
						style={{ width: 72, height: 72, marginRight: 8, borderRadius: 5 }}
					/>
				</View>

				<View style={{ marginLeft: 10 }}>
					<AppText
						style={{ fontSize: 14 }}
						weight='500'>
						{product.name}
					</AppText>
					<AppText style={{ fontSize: 14, marginTop: 8 }}>{formatCurrency(product.price)}</AppText>
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
