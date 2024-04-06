// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-bNOxtlSN7QMzu25_JpW-GOjVVQzg2co",
  authDomain: "selftours-c96e6.firebaseapp.com",
  projectId: "selftours-c96e6",
  storageBucket: "selftours-c96e6.appspot.com",
  messagingSenderId: "970101690135",
  appId: "1:970101690135:web:a81dd9e86a3691778bf152",
  measurementId: "G-0T8C03PH8H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app }