import React from 'react';
import { Itinerary } from "./types";
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY

interface TourDetailViewProps {
    itinerary: Itinerary;
}

const getStreetViewImage = (lat: number, lng: number, size: string = '300x300'): string => {
    return `https://maps.googleapis.com/maps/api/streetview?location=${lat},${lng}&size=${size}&key=${apiKey}`;
};


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
                        <div>
                            <a href={getStreetViewImage(destination.lat, destination.lng, '500x400')}>View Street View</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TourDetailView;
