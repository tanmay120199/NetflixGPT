//This file helps us in accessing the firebase from our react app

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgQjofUwWM9AkxrRGYXpgu341oZC5G1wk",
  authDomain: "netflixgpt-13e2a.firebaseapp.com",
  projectId: "netflixgpt-13e2a",
  storageBucket: "netflixgpt-13e2a.firebasestorage.app",
  messagingSenderId: "890834249861",
  appId: "1:890834249861:web:da839a006b887907cfa1ec",
  measurementId: "G-Q2L9CTTL0Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();