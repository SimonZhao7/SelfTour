import React, { useState, useEffect } from "react";
import {
  doc,
  getDocs,
  onSnapshot,
  query,
  collection,
} from "firebase/firestore";
import { db } from "@/firebase";
import AddLocationModal from "@/components/AddLocationModal";
import { DatabasePlaces, PlaceRes, Itinerary } from "./types";
import TourDetailView from "./TourDetailView";
import "./ToursList.css";
import OpenAI from "openai";
import styles from "./style.module.css";
import Link from "next/link";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const getStreetViewImage = (
  lat: number,
  lng: number,
  size: string = "300x300"
): string => {
  return `https://maps.googleapis.com/maps/api/streetview?location=${lat},${lng}&size=${size}&key=${process.env.MAPS_API_KEY}`;
};

const ToursList = async () => {
  const allToursRes = await getDocs(query(collection(db, "itineraries")));
  const allTours = allToursRes.docs.map(
    (d) => ({ id: d.id, ...d.data() } as Itinerary)
  );

  const images = allTours.map((tour) =>
    getStreetViewImage(tour.destinations[0].lat, tour.destinations[0].lng)
  );

  return (
    <main className={styles.main}>
      <section className={styles.centeredCol}>
        {allTours.map((tour, i) => {
          const { id, destinations } = tour;
          return (
            <Link style={{ textDecoration: "none" }} href={`/tours/${id}`}>
              <div key={id} className={styles.card}>
                <img
                  className={styles.img}
                  src={images[i]}
                  alt={`images for tour with id ${id}`}
                />
                <div className={styles.cardInfo}>
                  <h1 className={styles.title}>{tour.title}</h1>
                  <div className={styles.dstContainer}>
                    {destinations.map((d, i) => (
                      <li key={i}>{d.name}</li>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default ToursList;
