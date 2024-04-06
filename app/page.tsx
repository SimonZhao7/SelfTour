import Image from "next/image";
import HomePage from "./components/HomePage";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db , app} from "@/firebase";
import firebase from "firebase/compat/app";

export const addLocation = async (itineraryId = "", location = {}) => {
  try {
    const docRef = doc(db, "itinerary", itineraryId);
    await updateDoc(docRef, {
      locations: arrayUnion(location)
    });
    console.log("Location added to itinerary!");
  } catch (e) {
    console.error("Error adding location: ", e);
  }
};

export const removeLocation = async (itineraryId = "", location = {}) => {
  try {
    const docRef = doc(db, "itinerary", itineraryId);
    await updateDoc(docRef, {
      locations: arrayRemove(location)
    });
    console.log("Location removed from itinerary!");
  } catch (e) {
    console.error("Error removing location: ", e);
  }
};

export default function Home() {  
  const itineraryData = {
    name: "Trip to San Francisco",
    locations: {
      location1: {
        name: "Golden Gate Bridge",
        description: "Iconic bridge in San Francisco..."
      },
      location2: {
        name: "Chinatown",
        description: "Historic neighborhood..."
      }
    }
  };

  

  return (
    <main>
      <HomePage />

    </main>
  );
}
