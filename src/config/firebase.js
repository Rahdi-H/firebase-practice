// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-v0yoY95KaBHAfZtcgntFTZqZmreDdMU",
  authDomain: "fir-6cd12.firebaseapp.com",
  projectId: "fir-6cd12",
  storageBucket: "fir-6cd12.appspot.com",
  messagingSenderId: "659347832993",
  appId: "1:659347832993:web:b195147e10aa5ab2a0f0e0",
  measurementId: "G-L2YSE9CCD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const GAuth = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);