import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAbryo-O2k8RCV4PD5tndniDVjqAd_2nDY",
  authDomain: "excess-d8b1e.firebaseapp.com",
  projectId: "excess-d8b1e",
  storageBucket: "excess-d8b1e.appspot.com",
  messagingSenderId: "980806634804",
  appId: "1:980806634804:web:9ca61c71383fffe8fa2961",
  measurementId: "G-1CK8P99FEF"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore = getFirestore(app)

export { auth, firestore }
