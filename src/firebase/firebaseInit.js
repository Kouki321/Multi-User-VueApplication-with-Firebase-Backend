// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';


//import { collection, doc, setDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXLhu9opLuARMIP6o9dNi-AKVQMm1-HKU",
  authDomain: "fire-doctor.firebaseapp.com",
  projectId: "fire-doctor",
  storageBucket: "fire-doctor.appspot.com",
  messagingSenderId: "911388288149",
  appId: "1:911388288149:web:d1a6bc627e22b9dd60e79c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

// Initialize Auth
const auth = getAuth(firebaseApp);

// Export the timestamp
const timestamp = serverTimestamp();
const storage = getStorage(firebaseApp);

export { storage,db, auth, timestamp };
export default firebaseApp;
