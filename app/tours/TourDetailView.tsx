import Link from 'next/link';
import { Itinerary } from "./types";

interface TourDetailViewProps {
    itinerary: Itinerary;
}

const TourDetailView: React.FC<TourDetailViewProps> = ({ itinerary }) => {
    return (
        <div>
            <h1>Welcome to the Tour Detail View!</h1>
            <div className='tour-container'>
                <h2>{itinerary.title}</h2>
                {itinerary.destinations.map((destination, i) => (
                    <div key={i}>
                        <h3>{destination.name}</h3>
                        <p>{destination.desc}</p>
                    </div>
                ))}
            </div>
            {/* Link to open TourDetailView in a new tab */}
            <Link href={`/tours/${itinerary.id}`} passHref>
                <a target="_blank" rel="noopener noreferrer">Open in new tab</a>
            </Link>
        </div>
    );
}

export default TourDetailView;
