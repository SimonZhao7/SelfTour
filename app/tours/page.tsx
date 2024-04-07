'use client';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import AddLocationModal from "@/components/AddLocationModal";
import { DatabasePlaces, PlaceRes, Itinerary } from "./types";
import TourDetailView from './TourDetailView';
import './ToursList.css';

const ToursList = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);

  
  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "itineraries"));
        const itinerariesData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          
          return { id: doc.id, ...data };
        });
        setItineraries(itinerariesData);
        console.log("Data:", itinerariesData);
      } catch (error) {
        console.error("Error fetching itineraries: ", error);}
    };

    fetchItineraries();
  }, []);
  function handleTourDetailClick(itinerary: Itinerary) {
    setSelectedItinerary(itinerary);
  }

  return (
    <div>
      <div className='tours-list'>
        {itineraries.map((itinerary, index) => (
          <div className='tour-container' key={index} onClick={() => handleTourDetailClick(itinerary)}>
            <h2>{itinerary.title}</h2>
            {itinerary.destinations.map((destination, i) => (
              <div key={i}>
                <h3>{destination.name}</h3>
              </div>
            ))}
            <p>tbd ai summary</p> {/*r eplced w ai descrip*/}
            <br></br>
          </div>
        ))}
      </div>
      {selectedItinerary && <TourDetailView itinerary={selectedItinerary} />}
    </div>
  );
};

export default ToursList;
