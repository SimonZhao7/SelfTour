import { FunctionComponent, MouseEventHandler, useState } from "react";
import styles from "./style.module.css";
// Icons
import { RxCross2 } from "react-icons/rx";
import { AddLocationModalProps } from "./types";
import AutocompleteSearch from "../AutocompleteSearch";
import { PlaceRes } from "@/app/create/types";

const AddLocationModal: FunctionComponent<AddLocationModalProps> = ({
  setModal,
  onNewPlaceData,
  map,
}) => {
  const [id, setId] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const handleNewPlaceData = (id: string, desc: string) => {
    const placesService = new google.maps.places.PlacesService(map!);
    placesService.getDetails(
      {
        placeId: id,
      },
      (res, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && res) {
          const newPlaceRes: PlaceRes = { ...res, desc };
          onNewPlaceData(newPlaceRes);
        }
      }
    );
  };

  const handleFormSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    handleNewPlaceData(id, desc);
    setModal(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <RxCross2
          onClick={() => setModal(false)}
          size={25}
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
          }}
        />
        <form className={styles.form}>
          <AutocompleteSearch
            placeIdChangeHandle={setId}
            placeholder="What do you wanna do? 🤩"
          />
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            className={styles.textarea}
            placeholder="Enter a description..."
          ></textarea>
          <button onClick={handleFormSubmit} className={styles.submitButton}>
            Add Location
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLocationModal;
