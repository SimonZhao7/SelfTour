"use client";

import {
  FunctionComponent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { TourViewerProps } from "./types";
import styles from "./style.module.css";
import { loader } from "@/util";
import Spinner from "../Spinner";
import { useRouter } from "next/navigation";

const VALID_DIST_THRESHOLD = 60;

const TourViewer: FunctionComponent<TourViewerProps> = ({ tour: tour }) => {
  const { title, destinations } = tour;
  const [idx, setIdx] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();
  const size = destinations.length;

  const srcLat = destinations[idx - 1].lat;
  const srcLng = destinations[idx - 1].lng;
  const destination = idx < size ? destinations[idx] : destinations[0];
  const dstLat = destination.lat;
  const dstLng = destination.lng;

  const haversine_distance = (
    src: google.maps.LatLng,
    dst: google.maps.LatLng
  ) => {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = src.lat() * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = dst.lat() * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (dst.lng() - src.lng()) * (Math.PI / 180); // Radian difference (longitudes)

    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d * 1000;
  };

  const checkLocation: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const d = haversine_distance(
          /* MODIFY FOR DEMO */
          new google.maps.LatLng(37.794633515372794, -122.40581673226512),
          new google.maps.LatLng(dstLat, dstLng)
        );
        if (d < VALID_DIST_THRESHOLD) {
          setShowInfo(true);
          return;
        }
        setLoading(false);
        setErrorMsg("Get a bit closer before clicking the button!");
      });
    }
  };

  useEffect(() => {
    setShowInfo(false);
    setErrorMsg("");
    setLoading(false);
    loader.load().then(async () => {
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: srcLat, lng: srcLng },
          zoom: 15,
        }
      );

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      const request = {
        origin: new google.maps.LatLng(srcLat, srcLng),
        destination: new google.maps.LatLng(dstLat, dstLng),
        travelMode: google.maps.TravelMode["DRIVING"],
      };

      directionsService.route(request, (res, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(res);
        }
      });
    });
  }, [idx]);

  return (
    <div className={styles.viewWrapper}>
      <aside className={styles.viewLeft}>
        <h1 className={styles.leftTitle}>{title}</h1>
        <div className={styles.sectionHeader}>
          {showInfo ? (
            <>
              <div>
                <h1 className={styles.title}>{destination.name}</h1>
                <br />
                <p>{destination.desc}</p>
              </div>
              <button
                className={styles.hereBtn}
                onClick={() => {
                  if (idx >= size) {
                    router.replace("/tours");
                  } else {
                    setIdx(idx + 1);
                  }
                }}
              >
                {idx < size ? "Next Stop!" : "Finish Tour"}
              </button>
            </>
          ) : (
            <>
              <div>
                <h1 className={styles.stepHeader}>
                  Step: {idx} of {size}
                </h1>
                <br />
                <h3>
                  {destinations[idx - 1].name} --&gt; {destination.name}
                </h3>
              </div>
              <div>
                <button className={styles.hereBtn} onClick={checkLocation}>
                  {loading ? <Spinner /> : "I'm Here!"}
                </button>
                {errorMsg && <p className={styles.error}>{errorMsg}</p>}
              </div>
            </>
          )}
        </div>
      </aside>
      <div id="map" className={styles.viewRight}>
        <p>&nbsp;</p>
      </div>
    </div>
  );
};

export default TourViewer;
