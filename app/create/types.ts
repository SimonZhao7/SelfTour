export type PlaceRes = google.maps.places.PlaceResult & { desc: string };
export type DatabasePlaces = PlaceRes & {
  lat: number;
  lng: number;
  desc: string;
};
export type Itinerary = { 
  title: string;
  destinations: DatabasePlaces[];
};
