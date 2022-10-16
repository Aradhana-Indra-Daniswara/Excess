import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, SectionList, ActivityIndicator } from "react-native";
import ActivityList from "./ActivityList";
import AppText from "../AppText";
import SearchIcon_Gray from "../../assets/search_icon_gray.svg";
import CrossIcon_Gray from "../../assets/cross_icon_gray.svg";
import Back_button from "../../assets/Back_button.svg";
import { colorStyles } from "../Styling/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../config/firebase-config";

export default function Activity() {
	const [activities, setActivities] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const fetchActivities = async () => {
		try {
			const activityQuery = await getDocs(collection(firestore, "orders"));
			const ongoingActivities = [];
			const completedActivities = [];
			activityQuery.forEach((doc) => {
				if (!doc.data().finished_at) {
					ongoingActivities.push({ id: doc.id, ...doc.data() });
				} else {
					completedActivities.push({ id: doc.id, ...doc.data() });
				}
			});
			setActivities([
				{
					title: "Ongoing",
					data: ongoingActivities,
				},
				{
					title: "Completed",
					data: completedActivities,
				},
			]);
			setIsLoading(false);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		fetchActivities();
	}, []);

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
		<SafeAreaView
			style={{
				height: "100%",
				backgroundColor: "white",
			}}>
			<View
				style={{
					flexDirection: "row",
					backgroundColor: "white",
					marginVertical: 24,
					paddingHorizontal: 16,
					justifyContent: "flex-start",
					alignItems: "center",
				}}>
				<AppText
					style={{ color: colorStyles[20], fontSize: 28 }}
					weight='700'>
					Activity
				</AppText>
			</View>

			<SectionList
				sections={activities}
				renderSectionHeader={({ section: { title } }) => (
					<AppText
						style={{ marginHorizontal: 16, fontSize: 14, marginBottom: 4 }}
						weight='500'>
						{title}
					</AppText>
				)}
				renderSectionFooter={({ section }) => <View style={{ marginBottom: 16 }}></View>}
				renderItem={({ item }) => <ActivityList activity={item} />}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({});
