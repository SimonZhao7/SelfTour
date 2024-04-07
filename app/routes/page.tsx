"use client";
import AutocompleteSearch from "@/components/AutocompleteSearch";
import "dotenv/config";
import { useState, useEffect } from "react";
import { loader } from "@/util";


const Routing = () => {
  const [map, setMap] = useState<google.maps.Map>();
  const [placeId, setPlaceId] = useState("");

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
    });
  }, []);

  return (
    <main>
      <div id="map" style={{ width: "500px", height: "500px" }}></div>
      <AutocompleteSearch
        placeIdChangeHandle={setPlaceId}
        placeholder="What do you wanna do?"
      />
    </main>
  );
};

export default Routing;
