type SearchResult = {
  formatted_address: string;
  name: string;
  place_id: string;
  geometry: {
    location: google.maps.LatLng;
  };
};
