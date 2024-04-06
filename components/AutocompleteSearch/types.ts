import { Dispatch, SetStateAction } from "react";

export type AutocompleteSearchProps = {
  placeholder: string;
  placeIdChangeHandle: Dispatch<SetStateAction<string>>;
};
