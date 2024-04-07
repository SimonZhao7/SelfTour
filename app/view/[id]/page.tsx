import { Itinerary } from "@/components/CreateTour/types";
import TourViewer from "@/components/TourViewer";
import { db } from "@/firebase";
import { getDoc, doc } from "firebase/firestore";
import styles from "./style.module.css";

const ViewTour = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const tour = (await getDoc(doc(db, "itineraries", id))).data() as Itinerary;

  return (
    <main className={styles.main}>
      <TourViewer tour={tour} />
    </main>
  );
};

export default ViewTour;
