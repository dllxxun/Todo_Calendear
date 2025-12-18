// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDlml2mV4HWCPgE5iaovn4sAhr9ppt4XWc",
  authDomain: "pb-7d768.firebaseapp.com",
  projectId: "pb-7d768",
  storageBucket: "pb-7d768.firebasestorage.app",
  messagingSenderId: "68676853294",
  appId: "1:68676853294:web:7edb22ad57b7c792c309bf",
  measurementId: "G-JFY2H34N0H"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); 
