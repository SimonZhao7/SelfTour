"use client";
import { db, app } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import "./GeneratePlaces.css";
import { Loader } from "@googlemaps/js-api-loader";
import styles from "./style.module.css";
import AddLocationModal from "@/components/AddLocationModal";
import { RxCross2 } from "react-icons/rx";
import { FaSadCry } from "react-icons/fa";
import { DatabasePlaces, PlaceRes } from "./types";

interface GeneratePlacesProps {
  // Define your props here
}


const addItinerary = async (itinerary: DatabasePlaces) => {
  try {
    // Add a new document with a generated ID to the "places" collection
    const docRef = await addDoc(collection(db, "itineraries"), itinerary);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
  version: "weekly",
  libraries: ["places", "routes"],
});

const GeneratePlaces = () => {
  const [map, setMap] = useState<google.maps.Map>();
  const [places, setPlaces] = useState<PlaceRes[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
    // Optionally, you can return a value here if needed, but it's not necessary for an onClick handler

  const handleNewPlaceData = (id: string, desc: string) => {
    const placesService = new google.maps.places.PlacesService(map!);
    placesService.getDetails(
      {
        placeId: id,
      },
      (res, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && res) {
          const newPlaceRes: PlaceRes = { ...res, desc };
          setPlaces([...places, newPlaceRes]);
        }
      }
    );
  };

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
  const handleAddToFirestore = () => {
    if (places.length < 1) return;
  
    places.forEach(place => {
      if (typeof place?.geometry?.location?.lat() === 'number' && typeof place?.geometry?.location?.lng() === 'number') {
        const currentItinerary: DatabasePlaces = {
          name: place.name, 
          lat: place?.geometry?.location?.lat(), 
          lng: place?.geometry?.location?.lng(),
          desc: place.desc || ''
        };
        
        addItinerary(currentItinerary);
      }
    });
  };
  

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
        {places.length > 0 ? (
          places.map((place) => (
            <div className={styles.placeCard} key={place.place_id}>
              <div className={styles.cardRow}>
                <h3>{place.name}</h3>
                <RxCross2
                  size={25}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setPlaces(
                      places.filter((p) => p.place_id !== place.place_id)
                    );
                  }}
                />
              </div>
              {place.desc && <p className={styles.desc}>{place.desc}</p>}
            </div>
          ))
        ) : (
          <div className={styles.emptyWrapper}>
            <div>
              <FaSadCry
                size={30}
                style={{ margin: "auto", display: "block" }}
              />
              <br />
              <p>You have no entries in your itinerary!!!</p>
            </div>
          </div>
        )}
        ))}
      

        <button
            className={styles.addbutton}
            onClick={() => handleAddToFirestore()}
          >
          Submit
        </button>
      </aside>
      <div id="map" style={{ width: "66%", height: "100%" }}>
        <p>&nbsp;</p>
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
