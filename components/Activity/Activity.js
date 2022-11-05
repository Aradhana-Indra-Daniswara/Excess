import {
  View,
  StyleSheet,
  SafeAreaView,
  SectionList,
  ActivityIndicator,
} from "react-native";
import ActivityItem from "./ActivityItem";
import AppText from "../AppText";
import { colorStyles } from "../Styling/GlobalStyles";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../config/firebase-config";
import { getAuth } from "firebase/auth/react-native";

export default function Activity() {
  const [activities, setActivities] = useState();
  const [isLoading, setIsLoading] = useState(true);

	// Fetch orders by user
  const fetchActivities = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const q = query(
        collection(firestore, "orders"),
        where("user_id", "==", user.uid)
      );
      const activityQuery = await getDocs(q);
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
  });

	const EmptyActivity = () => {
		return(
			<View>
				<AppText>No Orders Yet</AppText>
			</View>
		)
	}

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          marginVertical: 24,
          paddingHorizontal: 16,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <AppText style={{ color: colorStyles[20], fontSize: 28 }} weight="700">
          Activity
        </AppText>
      </View>

      <SectionList
        sections={activities}
        renderSectionHeader={({ section: { title } }) => (
          <AppText
            style={{ marginHorizontal: 16, fontSize: 14, marginBottom: 4 }}
            weight="500"
          >
            {title}
          </AppText>
        )}
        renderSectionFooter={({ section }) => (
          <View style={{ marginBottom: 16 }}></View>
        )}
        renderItem={({ item }) => <ActivityItem activity={item} />}
				ListEmptyComponent={()=> <EmptyActivity />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
