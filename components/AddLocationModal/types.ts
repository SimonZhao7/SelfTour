import { PlaceRes } from "@/components/CreateTour/types";
import { Dispatch, SetStateAction } from "react";

export type AddLocationModalProps = {
  setModal: Dispatch<SetStateAction<boolean>>;
  onNewPlaceData: (place: PlaceRes) => any;
  map: google.maps.Map;
};
