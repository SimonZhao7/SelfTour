import { useRef, useState, useEffect, FunctionComponent } from "react";
import { AutocompleteSearchProps } from "./types";
import styles from "./style.module.css";

const AutocompleteSearch: FunctionComponent<AutocompleteSearchProps> = ({
  placeIdChangeHandle,
}) => {
  const [search, setSearch] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [locations, setLocations] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [showRes, setShowRes] = useState(false);
  const [pos, setPos] = useState<google.maps.LatLngLiteral>();
  const inputWrapper = useRef<HTMLDivElement>(null);

  const handleClickEvent = (e: MouseEvent) => {
    e.stopPropagation();
    if (inputWrapper.current?.contains(e.target as Node)) {
      setShowRes(true);
    } else {
      setShowRes(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
    setDisabled(false);

    window.addEventListener("click", handleClickEvent);
    return () => window.removeEventListener("click", handleClickEvent);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => searchLocations(search), 500);
    return () => clearTimeout(timeoutId);
  }, [search]);

  const searchLocations = async (searchText: string) => {
    if (searchText.length === 0) {
      return;
    }

    const autocompleteService = new google.maps.places.AutocompleteService();
    const request = {
      input: searchText,
      locationBias: new google.maps.Circle({ center: pos, radius: 16000 }),
    };

    autocompleteService.getPlacePredictions(request, (res, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK && res) {
        setLocations(res);
      }
    });
  };

  return (
    <div className={styles.wrapper} ref={inputWrapper}>
      <input
        className={styles.autoInput}
        disabled={disabled}
        type="text"
        style={{ marginBottom: "20px" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {locations.length > 0 && showRes && (
        <div className={styles.resultWrapper}>
          {locations.map((loc) => (
            <div key={loc.place_id}>
              <p
                onClick={(_) => {
                  setShowRes(false);
                  setSearch(loc.description);
                  placeIdChangeHandle(loc.place_id);
                }}
              >
                {loc.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;
