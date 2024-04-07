"use client";
import { FunctionComponent, useEffect } from "react";
import { loader } from "@/util";
import { Itinerary } from "@/app/create/types";
import { TourDetailProps } from "./types";
import styles from "./style.module.css";

const TourDetail: FunctionComponent<TourDetailProps> = ({ tour }) => {
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

      // if (places.length < 1) return;
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map!);

      const waypoints = tour!.destinations.map((d) => {
        const { lat, lng } = d;
        return {
          location: new google.maps.LatLng(lat, lng),
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
  }, []);

  return (
    <>
      <aside className={styles.leftCol}>
        {tour.destinations.map((d, i) => (
          <div className={styles.card} key={i}>
            <h3 className={styles.cardHeading}>{d.name}</h3>
            <p className={styles.cardDetail}>{d.desc}</p>
          </div>
        ))}
      </aside>
      <div className={styles.map} id="map">
        <p>&nbsp;</p>
      </div>
    </>
  );
};

export default TourDetail;
