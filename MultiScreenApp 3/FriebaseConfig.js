// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmNk93axDqOiA-4_Ld2hsOYIrqz3sgDgo",
  authDomain: "fir-2-2987a.firebaseapp.com",
  projectId: "fir-2-2987a",
  storageBucket: "fir-2-2987a.appspot.com",
  messagingSenderId: "662631521070",
  appId: "1:662631521070:web:e628623b2070fbbda4b8bf",
  measurementId: "G-Q5Y7F5W8ZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
export { db };


