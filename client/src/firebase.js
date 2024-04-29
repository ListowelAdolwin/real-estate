// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_SECRET,
  authDomain: "real-estate-listo.firebaseapp.com",
  projectId: "real-estate-listo",
  storageBucket: "real-estate-listo.appspot.com",
  messagingSenderId: "667917258376",
  appId: "1:667917258376:web:138069cac3600dd135193d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);