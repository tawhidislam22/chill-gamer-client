// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6MduW-O2p1U1p74_WQIm39NohNZQGWUY",
  authDomain: "coffee-store-auth-1a9a6.firebaseapp.com",
  projectId: "coffee-store-auth-1a9a6",
  storageBucket: "coffee-store-auth-1a9a6.firebasestorage.app",
  messagingSenderId: "933384736212",
  appId: "1:933384736212:web:dcce3a7499093f09de5a41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)