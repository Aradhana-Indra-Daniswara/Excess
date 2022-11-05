import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Back_button from "../../assets/Back_button.svg";
import AppText from "../AppText";
import { colorStyles } from "../Styling/GlobalStyles";

// Icons
import Vendor_icon from "../../assets/activtiy/vendor.svg";
import User_icon from "../../assets/activtiy/user.svg";
import { getAuth } from "firebase/auth";
import formatCurrency from "../../utils/formatters/formatCurrency";

// Database
import { updateDoc, serverTimestamp, doc } from "firebase/firestore";
import { firestore } from "../../config/firebase-config";

export default function ActivityDetail({ route }) {
	const auth = getAuth();
	const user = auth.currentUser;
	const vendor = route?.params?.vendor;
	const created_at = route?.params?.created_at;
	const finished_at = route?.params?.finished_at;
	const items = route?.params?.items;
	const cancelled = route?.params?.cancelled;
	const order_id = route?.params?.order_id;
	const [totalPrice, setTotalPrice] = useState(0);

	const navigation = useNavigation();
	const ItemList = ({ item }) => {
		return (
			<AppText style={{ fontSize: 16 }}>
				{item.name} x {item.qty}
			</AppText>
		);
	};
	const countTotalPrice = () => {
		let temp = 0;
		items.map(({ price }) => {
			temp += price;
		});
		setTotalPrice(temp);
	};

	const finishTransaction = async () => {
		// Set order to have a finished at time
		const transactionRef = doc(firestore, "orders", order_id);
		await updateDoc(transactionRef, {
			finished_at: serverTimestamp(),
		});
		navigation.navigate("Activity");
	};

	const cancelTransaction = async () => {
		// Set order to have a finished at time
		const transactionRef = doc(firestore, "orders", order_id);
		await updateDoc(transactionRef, {
			finished_at: serverTimestamp(),
			cancelled: true
		});
		navigation.navigate("Activity");
	};

	useEffect(() => {
		countTotalPrice();
	}, []);
	return (
		<View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					marginVertical: 10,
					marginHorizontal: 16,
					position: "relative",
				}}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("Home");
					}}
					style={{
						position: "absolute",
						left: 0,
					}}>
					<Back_button />
				</TouchableOpacity>
				<AppText
					style={{ color: colorStyles[20], fontSize: 24 }}
					weight='700'>
					Transaction
				</AppText>
			</View>
			<View style={{ margin: 16 }}>
				{finished_at ? (
				<>
					{cancelled ?
						(
							<AppText
								style={{ fontSize: 24, color: '#FB6868' }}
								weight='700'>
								Cancelled
							</AppText>
						): 
						(
							<AppText
								style={{ fontSize: 24 }}
								weight='700'>
								Finished
							</AppText>
						)
					}
					
				</>
					
				) : (
					<AppText
						style={{ fontSize: 24, color: colorStyles["excess"] }}
						weight='700'>
						Waiting for pickup
					</AppText>
				)}

				<AppText>
					Starts {created_at.date} {created_at.month} {created_at.year} • {("0" + created_at.hours).slice(-2)}:{("0" + created_at.minutes).slice(-2)}
				</AppText>

				{finished_at && (
					<AppText>
						Ends {finished_at.date} {finished_at.month} {finished_at.year} • {("0" + finished_at.hours).slice(-2)}:{("0" + finished_at.minutes).slice(-2)}
					</AppText>
				)}

				<View style={{ marginTop: 32 }}>
					{/* Vendor */}
					<View style={{ flexDirection: "row" }}>
						<Vendor_icon />
						<View style={{ marginLeft: 16 }}>
							<AppText style={{ fontSize: 16 }}>{vendor.name}</AppText>
							<AppText style={{ fontSize: 12, color: colorStyles[40] }}>{vendor.address}</AppText>
							<AppText style={{ fontSize: 12, color: colorStyles[40] }}>{vendor.distance} km away</AppText>
						</View>
					</View>

					{/* User */}
					<View style={{ flexDirection: "row", marginTop: 16 }}>
						<User_icon />
						<View style={{ marginLeft: 16 }}>
							<AppText style={{ fontSize: 16 }}>{user.email}</AppText>
						</View>
					</View>
				</View>

				{/* Orders */}
				<AppText
					style={{ fontSize: 16, marginTop: 32, marginBottom: 8 }}
					weight='700'>
					Orders
				</AppText>
				<FlatList
					data={items}
					renderItem={({ item }) => <ItemList item={item} />}
					keyExtractor={(item) => item.id}
				/>

				<View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 32 }}>
					<AppText
						style={{ fontSize: 16 }}
						weight='700'>
						Total
					</AppText>
					<AppText
						style={{ fontSize: 24 }}
						weight='700'>
						{formatCurrency(totalPrice)}
					</AppText>
				</View>
			</View>

			{/* Buttons */}
			{!finished_at && (
				<View style={{ marginHorizontal: 16, marginTop: 32 }}>
				<TouchableOpacity
					style={{ backgroundColor: colorStyles["excess"], alignItems: "center", justifyContent: "center", paddingVertical: 16, paddingHorizontal: 18, borderRadius: 6 }}
					onPress={finishTransaction}>
					<AppText
						style={{ fontSize: 16, color: "white" }}
						weight='700'>
						Finish Order
					</AppText>
				</TouchableOpacity>

				<TouchableOpacity style={{ alignItems: "center", justifyContent: "center", paddingVertical: 16, paddingHorizontal: 18, borderRadius: 6, borderColor: "#FB6868", borderWidth: 1, marginTop: 16 }}
				onPress={cancelTransaction}
				>
					<AppText
						style={{ fontSize: 16, color: "#FB6868" }}
						weight='700'>
						Cancel Order
					</AppText>
				</TouchableOpacity>
			</View>
			)}
			

			<AppText style={{ textAlign: "center", marginTop: 32 }}>Need help? Contact Us</AppText>
		</View>
	);
}
