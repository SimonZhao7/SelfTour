import { Dispatch, SetStateAction } from "react"

export type AutocompleteSearchProps = {
  placeIdChangeHandle: Dispatch<SetStateAction<string>>
}