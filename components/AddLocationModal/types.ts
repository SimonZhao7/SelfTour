import { Dispatch, SetStateAction } from "react";

export type AddLocationModalProps = {
  setModal: Dispatch<SetStateAction<boolean>>;
  onNewPlaceData: (id: string, desc: string) => any;
};
