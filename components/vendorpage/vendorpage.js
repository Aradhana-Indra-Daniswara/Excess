import React, { useEffect, useState } from "react";
import AppText from "../AppText";
import { firestore, storage } from "../../config/firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { View, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, Text, TouchableOpacity, Image, ScrollView, SectionList } from "react-native";
import Back_button from "../../assets/Back_button.svg";
import CartButton from "./CartButton";
import { colorStyles } from "../Styling/GlobalStyles";
import Star_icon from "../../assets/star_icon.svg";
import Store_icon from "../../assets/store_icon.svg";
import ProductCard from "./ProductCard";
import BigProductCard from "./BigProductCard";
import formatTime from "../../utils/formatters/formatTime";

const VendorPage = ({ route, navigation }) => {
	const [products, setProducts] = useState([]);
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
			let rawProducts = [];
			try{
				rawProducts = vendor.products;
			}catch(error){
				console.error(error);
			}
			const allProducts = [];
			const runningOutProducts = [];
			for (const product of rawProducts) {
				// console.log(product);
				const url = "";
				try {
					url = await getDownloadURL(ref(storage, product.uri));
				} catch (error) {
					url = await getDownloadURL(ref(storage, "gs://excess-d8b1e.appspot.com/product images/default_image.jpg"));
				} finally {
					if (product.limited_time) {
						runningOutProducts.push({
							...product,
							imageUrl: url,
						});
					}
					allProducts.push({
						...product,
						imageUrl: url,
					});
				}
			}

			// finalize data
			setProducts([
				{
					title: "Running Out Products",
					tileType: "BigProducts",
					data: [runningOutProducts],
				},
				{
					title: "All Products",
					renderItem: ({ item }) => (
						<ProductCard
							product={item}
							cartHandler={cartHandler}
						/>
					),
					data: allProducts,
				},
			]);
			setIsLoading(false);
		};
		getVendordata();
	}, []);

	// Will only count item once. enaknya gimana?
	const cartHandler = (x) => {
		if (!cart.find((cartProduct) => cartProduct.id === x.id)) {
			setCart((prev) => {
				return [...prev, { ...x, qty: 1 }];
			});
		}
	};

	const navigationHandler = () => {
		navigation.navigate("Cart", {
			items: cart,
			vendor,
		});
	};

	const Header = () => {
		return (
			<View style={{ width: '100%', paddingTop: 16 }}>
				<View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16, marginHorizontal: 16 }}>
					{/* Vendor Name, Rating, Open Time */}
					<View style={{ alignSelf: "flex-start", width: 250, flex: 1 }}>
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
								Opens {formatTime(vendor.opening_hour)} - {formatTime(vendor.closing_hour)}
							</AppText>
						</View>
					</View>
					{/* Vendor Image */}
					<View style={{ marginLeft: 8 }}>
						<Image
							source={{ uri: vendorIconURI }}
							style={{ width: 100, height: 100}}
						/>
					</View>
				</View>
				<View style={{ marginHorizontal: 16, flexDirection: "row", alignItems: "center", alignSelf: "flex-start", padding: 12, borderWidth: 1, borderColor: "#F2F2F2", borderRadius: 5, width: "auto" }}>
					<Store_icon style={{ marginRight: 8 }} />
					<View>
						<AppText style={{ fontSize: 14 }}>Pickup</AppText>
						<AppText style={{ fontSize: 12, color: colorStyles[50] }}>Ready in 5 minutes</AppText>
					</View>
				</View>
			</View>
		);
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
		<View style={{ backgroundColor: "white", height: "100%", position: 'relative' }}>
			<SectionList
				sections={products}
				keyExtractor={(item, index) => item + index}
				ListHeaderComponent={<Header />}
				ListFooterComponent={<View style={{ paddingBottom: 16}}></View>}
				renderItem={({ section }) => {
					if (section.tileType === "BigProducts") {
						return (
							<FlatList
								data={section.data[0]}
								numColumns={2}
								columnWrapperStyle={{
									justifyContent: "space-between",
									marginHorizontal: 16,
									marginVertical: 2
								}}
								keyExtractor={(item) => item.id}
								renderItem={({ item }) => (
									<BigProductCard
										product={item}
										cartHandler={cartHandler}
									/>
								)}
							/>
						);
					}
					return <View>{section.renderItem}</View>;
				}}
				renderSectionHeader={({ section: { title } }) => (
					<AppText
						style={{ marginHorizontal: 16, fontSize: 14, marginTop: 16, marginBottom: 8 }}
						weight='500'>
						{title}
					</AppText>
				)}
				renderScrollComponent={false}
			/>

			{/* Cart button will show when first item is added */}
			{cart.length !== 0 && (
				<CartButton
					itemCount={cart.length}
					navigationHandler={navigationHandler}
				/>
			)}
		</View>
	);
};

export default VendorPage;
