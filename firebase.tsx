// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9VMDfbfyK4dHFImzu9T99lWrLy8q4e6I",
  authDomain: "selftours-ff298.firebaseapp.com",
  projectId: "selftours-ff298",
  storageBucket: "selftours-ff298.appspot.com",
  messagingSenderId: "869484098724",
  appId: "1:869484098724:web:a86da73eae853bc284a231",
  measurementId: "G-HRBL7X7E2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app }