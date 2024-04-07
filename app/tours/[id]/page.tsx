import { Itinerary } from "../types";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import styles from "./style.module.css";
import TourDetail from "@/components/TourDetail";

const TourDetailView = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const res = await getDoc(doc(db, "itineraries", id));
  const tour = res.data() as Itinerary;

  return (
    <div className={styles.wrapper}>
      <TourDetail tour={tour} />
    </div>
  );
};

export default TourDetailView;
