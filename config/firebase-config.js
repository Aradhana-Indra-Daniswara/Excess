import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth'; getAuth still imported AsyncStorage from core react-native module
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAbryo-O2k8RCV4PD5tndniDVjqAd_2nDY",
  authDomain: "excess-d8b1e.firebaseapp.com",
  projectId: "excess-d8b1e",
  storageBucket: "excess-d8b1e.appspot.com",
  messagingSenderId: "980806634804",
  appId: "1:980806634804:web:9ca61c71383fffe8fa2961",
  measurementId: "G-1CK8P99FEF"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize services
// use initializeAuth to use AsyncStorage from @react-native-async-storage/async-storage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

const firestore = getFirestore(app)
const storage = getStorage(app)

export { 
  auth, 
  firestore, 
  storage, 
}
