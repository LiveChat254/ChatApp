
// Import the functions you need from the modular SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaE0LWQL5IjXpI9eVPtZ7X3P8TMfEnKMQ",
  authDomain: "chatapp-f0b9b.firebaseapp.com",
  projectId: "chatapp-f0b9b",
  storageBucket: "chatapp-f0b9b.appspot.com",
  messagingSenderId: "119113541480",
  appId: "1:119113541480:web:a1dc7a615e177b7a6b18dd",
  measurementId: "G-35YX49P2XZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
