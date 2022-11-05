import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../AppText";
import { colorStyles } from "../Styling/GlobalStyles";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase-config";
import formatCurrency from "../../utils/formatters/formatCurrency";
import formatTimestamptoDate from "../../utils/formatters/formatTimestampToDate";
import { useNavigation } from "@react-navigation/native";

export default function ActivtiyItem({ activity }) {
	const completed = activity.finished_at ? true : false;
	let statusColor;
	if(activity.cancelled){
		statusColor = '#FB6868';
	}
	else if(completed){
		statusColor = colorStyles[20];
	}
	else{
		statusColor = colorStyles["excess"];
	}
	const created_at = activity.created_at ? formatTimestamptoDate(activity.created_at) : null;
	const finished_at = activity.finished_at ? formatTimestamptoDate(activity.finished_at) : null;
	const [isLoading, setIsLoading] = useState(true);
	const [vendor, setVendor] = useState();
	const [orderPrice, setOrderPrice] = useState(0);
	const navigation = useNavigation();

	const getActivityData = async () => {
		// gets the vendor data
		try {
			const docRef = doc(firestore, "vendors", activity.vendor_id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setVendor(docSnap.data());
				setIsLoading(false);
			}
		} catch (e) {
			console.log(e.message);
		}
		let totalPrice = 0;
		for (const item of activity.items) {
			totalPrice += Number(item.price);
		}
		setOrderPrice(totalPrice);
	};

	useEffect(() => {
		getActivityData();
	}, []);

	if (isLoading) {
		return null;
	}

	return (
		<TouchableOpacity
			style={{
				flexDirection: "row",
				alignItems: "center",
				marginHorizontal: 16,
				marginVertical: 8,
			}}
			onPress={() => {
				navigation.navigate("ActivityDetail", {
					vendor,
					created_at,
					finished_at,
					items: activity.items,
					order_id: activity.id,
					cancelled: activity.cancelled,
				});
			}}>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					alignItems: "center",
				}}>
				<Ionicons
					name='restaurant'
					size={24}
					color={statusColor}
				/>
				<View
					style={{
						marginLeft: 8,
					}}>
					<AppText style={{ color: statusColor, fontSize: 16 }}>{vendor.name}</AppText>
					<AppText style={{ color: colorStyles[50] }}>
						{created_at.date} {created_at.month} {created_at.year} • {("0" + created_at.hours).slice(-2)}:{("0" + created_at.minutes).slice(-2)}
					</AppText>
				</View>
			</View>
			<AppText style={{ color: statusColor }}>{completed ? <>{activity.cancelled ? "Cancelled" : formatCurrency(orderPrice)}</> : "Waiting for pickup"}</AppText>
		</TouchableOpacity>
	);
}
