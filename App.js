import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Vendorpage from './components/vendorpage/vendorpage';

export default function App() {
  return (

    <SafeAreaView style={styles.container}>
      <Vendorpage></Vendorpage>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop : 50,
    // justifyContent: 'center',
  },
});
