import {
  useRef,
  useState,
  useEffect,
  useContext,
  FunctionComponent,
} from "react";
import { AutocompleteSearchProps } from "./types";
import styles from "./style.module.css";
// Icons
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { LocationContext } from "@/components/CreateTour";

const AutocompleteSearch: FunctionComponent<AutocompleteSearchProps> = ({
  placeholder,
  placeIdChangeHandle,
}) => {
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [showRes, setShowRes] = useState(false);
  const inputWrapper = useRef<HTMLDivElement>(null);
  const pos = useContext(LocationContext);

  const handleClickEvent = (e: MouseEvent) => {
    if (inputWrapper.current?.contains(e.target as Node)) {
      setShowRes(true);
    } else {
      setShowRes(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickEvent);
    return () => window.removeEventListener("click", handleClickEvent);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => searchLocations(search), 250);
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
      <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      <input
        className={styles.autoInput}
        type="text"
        disabled={pos === null}
        style={{ marginBottom: "20px" }}
        value={search}
        placeholder={pos === null ? "Getting location..." : placeholder}
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
