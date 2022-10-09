import React, { useEffect, useState } from "react";
import AppText from "../AppText";
import { firestore, storage } from "../../config/firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { View, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Back_button from "../../assets/Back_button.svg";
import CartButton from "./CartButton";
import { colorStyles } from "../Styling/GlobalStyles";
import Star_icon from "../../assets/star_icon.svg";
import Store_icon from "../../assets/store_icon.svg";
import SmallProductCard from "./SmallProductCard";

const VendorPage = ({ route, navigation }) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [cart, setCart] = useState([]);
	// Vendor is already fetched from SearchVendor.
	const [vendor, setVendor] = useState(route?.params?.vendor);
	const [vendorIconURI, setVendorIconURI] = useState(route?.params?.vendorIconURI);
	// get vendor's data on mount
	useEffect(() => {
		const getVendordata = async () => {
			// Store vendor info to pass to cart
			const { address, area, opening_hour, closing_hour, name, id, rating } = vendor;
			setVendor({
				address,
				area,
				opening_hour,
				closing_hour,
				name,
				id,
				rating,
			});

			// get url for product images
			const products = vendor.products;
			const finalData = [];
			for (const product of products) {
				// console.log(product);
				const url = "";
				try {
					url = await getDownloadURL(ref(storage, product.uri));
				} catch (error) {
					url = await getDownloadURL(ref(storage, "gs://excess-d8b1e.appspot.com/product images/default_image.jpg"));
				} finally {
					finalData.push({
						...product,
						imageUrl: url,
					});
				}
			}

			// finalize data
			setData(finalData);
			setIsLoading(false);
		};
		// console.log(vendor);
		getVendordata();
	}, []);

	useEffect(() => {
		console.log(vendor);
	});
	const navigationHandler = () => {
		navigation.navigate("Cart", {
			items: cart,
			vendor,
		});
	};

	// Will only count item once. enaknya gimana?
	const cartHandler = (item) => {
		if (!cart.find((product) => product.id === item.id)) {
			setCart([...cart, { ...item, qty: 1 }]);
		}
	};

	if (isLoading) {
		return (
			<SafeAreaView
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100%",
				}}>
				<ActivityIndicator size={"large"} />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={{ backgroundColor: "white", height: "100%", paddingTop: 16, paddingBottom: 16 }}>
			<View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
				{/* Vendor Name, Rating, Open Time */}
				<View style={{ marginLeft: 16, alignSelf: "flex-start", width: 250 }}>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("SearchVendor");
						}}>
						<Back_button />
					</TouchableOpacity>

					<AppText
						style={{ fontSize: 18, marginTop: 16, marginBottom: 8 }}
						weight='700'>
						{vendor.name}, {vendor.area}
					</AppText>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<AppText style={{ fontSize: 12, color: colorStyles[50], marginRight: 4 }}>{vendor.rating / 10}</AppText>
							<Star_icon />
						</View>
						<AppText style={{ fontSize: 12, color: colorStyles[50], marginLeft: 8 }}>
							Opens {vendor.opening_hour} - {vendor.closing_hour}
						</AppText>
					</View>
				</View>
				{/* Vendor Image */}
				<View>
					<Image
						source={{ uri: vendorIconURI }}
						style={{ width: 90, height: 90, marginRight: 8 }}
					/>
				</View>
			</View>
			{/* Pickup */}
			<View style={{ marginHorizontal: 16, flexDirection: "row", alignItems: "center", alignSelf: "flex-start", padding: 12, borderWidth: 1, borderColor: "#F2F2F2", borderRadius: 5, width: "auto" }}>
				<Store_icon style={{ marginRight: 8 }} />
				<View>
					<AppText style={{ fontSize: 14 }}>Pickup</AppText>
					<AppText style={{ fontSize: 12, color: colorStyles[50] }}>Ready in 5 minutes</AppText>
				</View>
			</View>

			{/* Running Out */}
			<View
				style={{ marginHorizontal: 16, fontSize: 14 }}
				weight='500'>
				<AppText>Running Out</AppText>
			</View>

			{/* All Products */}
			<View
				style={{ marginHorizontal: 16, fontSize: 14 }}
				weight='500'>
				<AppText>All Products</AppText>
				<FlatList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={(data) => <SmallProductCard product={data.item} />}
				/>
			</View>
		</SafeAreaView>
	);
};

export default VendorPage;
