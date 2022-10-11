import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, TouchableOpacityComponent, View } from "react-native";
import AppText from "../AppText";
import Right_arrow_icon from "../../assets/right_arrow_icon.svg";
import { colorStyles } from "../Styling/GlobalStyles";
import AutoDimensionImage from "react-native-auto-dimensions-image";
import formatCurrency from "../../utils/formatters/formatCurrency";
import Clock_icon from "../../assets/clock_icon.svg";

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
				width: "48%",
			}}>
			<View style={{ alignItems: "flex-start", width: "100%" }}>
				<View style={{ width: "100%" }}>
					<Image
						source={{ uri: product.imageUrl }}
						style={{ width: "100%", height: 150, borderRadius: 5 }}
					/>
				</View>
				<View
					style={{
						padding: 4,
						marginVertical: 4,
						borderRadius: 5,
						backgroundColor: "#FCDEDE",
						flexDirection: "row",
						alignItems: "center",
						alignSelf: "flex-start",
					}}>
					<Clock_icon />
					<AppText style={{ color: "#FB6868", marginLeft: 4 }}>{product.max_order_time.slice(0, 2) + ":" + product.max_order_time.slice(2)}</AppText>
				</View>
				<View style={{ marginTop: 4 }}>
					<AppText
						style={{ fontSize: 14 }}
						weight='600'>
						{product.name}
					</AppText>
					<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
						<AppText style={{ fontSize: 14 }}>{formatCurrency(product.discounted_price)}</AppText>
						<AppText style={{ fontSize: 12, marginLeft: 8, textDecorationLine: "line-through" }}>{formatCurrency(product.price)}</AppText>
					</View>
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
