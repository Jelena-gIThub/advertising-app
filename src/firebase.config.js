import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR4vMMtvddagqEDlCA3jlnTTjeinF3ho0",
  authDomain: "advertising-app-ea53a.firebaseapp.com",
  projectId: "advertising-app-ea53a",
  storageBucket: "advertising-app-ea53a.appspot.com",
  messagingSenderId: "994551958750",
  appId: "1:994551958750:web:205bb1120936488f8d064f",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
