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
      // const { Map } = (await google.maps.importLibrary(
      //   "maps"
      // )) as google.maps.MapsLibrary;
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: 37.724258589095534, lng: -122.47994314589549 },
          zoom: 15,
          mapId: "TEST_MAP_ID",
        }
      );
      setMap(map);

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map!);

      var haight = new google.maps.LatLng(37.7699298, -122.4469157);
      var oceanBeach = new google.maps.LatLng(
        37.7683909618184,
        -122.51089453697205
      );

      const request = {
        origin: haight,
        destination: oceanBeach,
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
