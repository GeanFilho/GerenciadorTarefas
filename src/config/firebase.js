// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEtnScPBBGCerDTFCvkC9bn-OU79CiSUw",
  authDomain: "nuven-d2232.firebaseapp.com",
  projectId: "nuven-d2232",
  storageBucket: "nuven-d2232.appspot.com",
  messagingSenderId: "107118624508",
  appId: "1:107118624508:web:62dd7c5f02ff3211432179",
  measurementId: "G-CXBGQDRYMS"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
