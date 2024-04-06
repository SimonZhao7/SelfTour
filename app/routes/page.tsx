"use client";
import AutocompleteSearch from "@/components/AutocompleteSearch";
import { Loader } from "@googlemaps/js-api-loader";
import "dotenv/config";
import { useState, useEffect, FormEvent } from "react";

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
  version: "weekly",
  libraries: ["places", "routes"],
});

const Routing = () => {
  const [map, setMap] = useState<google.maps.Map>();
  const [placeId, setPlaceId] = useState("");

  useEffect(() => {
    loader.load().then(async () => {
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 37.724258589095534, lng: -122.47994314589549 },
        zoom: 15,
        mapId: "TEST_MAP_ID",
      })
      setMap(map);
    });
  }, []);

  return (
    <main>
      <div id="map" style={{ width: "500px", height: "500px" }}></div>
      <AutocompleteSearch placeIdChangeHandle={setPlaceId} />
    </main>
  );
};

export default Routing;
