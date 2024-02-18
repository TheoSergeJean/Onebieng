// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6eM_EepgkN1Ly7mqn4rKe189OB4nAPhQ",
    authDomain: "onebieng.firebaseapp.com",
    projectId: "onebieng",
    storageBucket: "onebieng.appspot.com",
    messagingSenderId: "313176136324",
    appId: "1:313176136324:web:771c9f629071a282afc0d1"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);