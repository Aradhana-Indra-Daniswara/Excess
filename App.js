import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Home from './components/Home/Home';

export default function App() {
  return (
    <SafeAreaView style={{ marginTop: 30 }}>
      <Home />
    </SafeAreaView>
  );
}
