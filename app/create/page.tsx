"use client";

import { useState, useEffect } from "react";
import "./GeneratePlaces.css";
import { Loader } from "@googlemaps/js-api-loader";
import styles from "./style.module.css";
import AddLocationModal from "@/components/AddLocationModal";
import { RxCross2 } from "react-icons/rx";
import { PlaceRes } from "./types";

interface GeneratePlacesProps {
  // Define your props here
}

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
  version: "weekly",
  libraries: ["places", "routes"],
});

const GeneratePlaces: React.FC<GeneratePlacesProps> = (props) => {
  const [map, setMap] = useState<google.maps.Map>();
  const [places, setPlaces] = useState<PlaceRes[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loader.load().then(async () => {
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: 37.724258589095534, lng: -122.47994314589549 },
          zoom: 15,
          mapId: "TEST_MAP_ID",
        }
      );
      setMap(map);

      if (places.length < 1) return;
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map!);

      const waypoints = places.map((place) => {
        const { lat, lng } = place.geometry?.location!;
        return {
          location: new google.maps.LatLng(lat(), lng()),
          stopover: true,
        };
      });

      const request = {
        origin: waypoints[0].location,
        destination: waypoints[0].location,
        waypoints: waypoints.slice(1),
        travelMode: google.maps.TravelMode["DRIVING"],
      };

      directionsService.route(request, (res, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(res);
        }
      });
    });
  }, [places]);

  return (
    <div className={styles.wrapper}>
      <aside className={styles.tourItems}>
        <div className={styles.itinRow}>
          <h1>Itinerary</h1>
          <button
            className={styles.addButton}
            onClick={() => setModalOpen(true)}
          >
            Add Location
          </button>
        </div>
        {places.map((place) => (
          <div className={styles.placeCard} key={place.place_id}>
            <div className={styles.cardRow}>
              <p>{place.name}</p>
              <RxCross2
                size={25}
                onClick={() => {
                  setPlaces(
                    places.filter((p) => p.place_id !== place.place_id)
                  );
                }}
              />
            </div>
            <p className={styles.desc}>{place.desc}</p>
          </div>
        ))}
      </aside>
      <div id="map" style={{ width: "66%", height: "100%" }}>
        <p>hi</p>
      </div>
      {modalOpen && (
        <AddLocationModal
          setModal={setModalOpen}
          onNewPlaceData={(placeData) => setPlaces([...places, placeData])}
          map={map!}
        />
      )}
    </div>
  );
};

export default GeneratePlaces;
