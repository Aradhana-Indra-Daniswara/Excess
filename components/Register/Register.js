import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AppText from "../AppText";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config";

// Icons
import JAJAN_logo from "../../assets/JAJAN_logo-white.svg";
import JAJAN_text from "../../assets/JAJAN_text-white.svg";
import Tosca_Blob from "../../assets/tosca_elipse.svg";

// Styling
import { colorStyles, globalStyles } from "../Styling/GlobalStyles";

export default function Register({ navigation }) {
	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isAgreed, setIsAgreed] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const validateInput = () => {
		if (name === "" || phoneNumber === "" || email === "" || password === "" || !isAgreed) {
			setError(true);
			setErrorMessage("All fields must be filled");
			return false;
		} else {
			setError(false);
			return true;
		}
	};

	const registerHandler = async () => {
		setError(false);
		if (validateInput()) {
			try {
				const userCredential = await createUserWithEmailAndPassword(auth, email, password);
				// figure out how to add phone number lmao
				// await setDoc(doc(firestore, "users", userCredential.user.uid), {
				//   email,
				//   name,
				//   phoneNumber
				// })
				console.log(userCredential);
				navigation.navigate("Main");
			} catch (e) {
				setError(true);
				setErrorMessage(e.message);
			}
		} else {
			setError(true);
			setErrorMessage("Fields can't be blank");
		}
	};

	return (
		<KeyboardAvoidingView
			behavior='position'
			style={{ ...globalStyles.container }}>
			<StatusBar backgroundColor={colorStyles["excess"]} />

			<View
				style={{
					position: "absolute",
					justifyContent: "center",
					alignItems: "center",
					top: -210,
					left: 0,
					right: 0,
				}}>
				<Tosca_Blob />
			</View>
			<View style={{ marginTop: 64 }}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<JAJAN_logo />
					<JAJAN_text style={{ marginLeft: 10 }} />
				</View>
				<AppText
					style={{
						color: colorStyles["white"],
						fontSize: 18,
						textAlign: "center",
						marginTop: 16,
					}}>
					Good Food, Cheap Prices
				</AppText>
			</View>

			<AppText
				weight={"700"}
				style={{ fontSize: 30, color: colorStyles[20], marginTop: 48 }}>
				Sign up
			</AppText>
			<View style={{ marginTop: 32, width: "100%" }}>
				<AppText
					weight={"500"}
					size={16}
					style={{ color: colorStyles[20] }}>
					Full Name
				</AppText>
				<TextInput
					style={[Styles.inputField]}
					autoCapitalize='words'
					autoComplete='name'
					autoCorrect={false}
					onChangeText={(input) => setName(input)}
					placeholder='Full Name'
				/>
			</View>

			<View style={{ marginTop: 14 }}>
				<AppText
					weight={"500"}
					size={16}
					style={{ color: colorStyles[20] }}>
					Phone Number
				</AppText>
				<TextInput
					style={[Styles.inputField]}
					keyboardType='phone-pad'
					onChangeText={(input) => setPhoneNumber(input)}
					placeholder='+62xxxxxxx'
				/>
			</View>

			<View style={{ marginTop: 14 }}>
				<AppText
					weight={"500"}
					size={16}
					style={{ color: colorStyles[20] }}>
					Email
				</AppText>
				<TextInput
					style={[Styles.inputField]}
					autoCapitalize='none'
					autoComplete='email'
					autoCorrect={false}
					keyboardType='email-address'
					onChangeText={(input) => setEmail(input)}
					placeholder='example@gmail.com'
				/>
			</View>

			<View style={{ marginTop: 14 }}>
				<AppText
					weight={"500"}
					size={16}
					style={{ color: colorStyles[20] }}>
					Password
				</AppText>
				<TextInput
					style={[Styles.inputField]}
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry
					onChangeText={(input) => setPassword(input)}
					placeholder='******'
				/>
			</View>

			<View style={{ marginTop: 14, flexDirection: "row", alignItems: "center" }}>
				<BouncyCheckbox
					text='I agree to the terms and conditions'
					textStyle={{
						textDecorationLine: "none",
						color: colorStyles[20],
						fontSize: 12,
						fontFamily: "OpenSauceSans-Regular",
					}}
					size={24}
					fillColor={colorStyles["excess"]}
					innerIconStyle={{
						borderRadius: 5,
						borderColor: colorStyles[80],
					}}
					iconStyle={{
						borderRadius: 5,
					}}
					onPress={() => setIsAgreed(!isAgreed)}
				/>
			</View>

			{error && <Text>{errorMessage}</Text>}

			<View style={{ marginTop: 32 }}>
				<TouchableOpacity
					style={[Styles.button, { backgroundColor: "#51C699" }]}
					onPress={registerHandler}>
					<AppText
						weight='600'
						style={{ fontSize: 16, color: colorStyles["white"] }}>
						Sign up
					</AppText>
				</TouchableOpacity>
			</View>

			<View
				style={{
					marginTop: 16,
					flexDirection: "row",
					justifyContent: "center",
				}}>
				<AppText
					fontFamily={"Montserrat-SemiBold"}
					style={{ color: colorStyles[50] }}>
					Already made an account?{" "}
				</AppText>
				<AppText
					onPress={() => {
						navigation.navigate("Login");
					}}
					weight='700'
					style={{ color: colorStyles["excess"] }}>
					Log in
				</AppText>
			</View>
		</KeyboardAvoidingView>
	);
}
const Styles = StyleSheet.create({
	inputField: {
		width: "100%",
		marginTop: 4,
		height: 40,
		padding: 10,
		borderColor: colorStyles[80],
		borderRadius: 5,
		borderWidth: 1,
		fontFamily: "OpenSauceSans-Regular",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: 42,
		padding: 10,
		borderRadius: 5,
	},
});
