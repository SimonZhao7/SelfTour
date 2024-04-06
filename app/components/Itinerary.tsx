'use client';
import React from 'react';
import "./Itinerary.css";
import SearchRequests from './SearchRequests';

interface ItineraryProps {
    // Define your props here
}

const Itinerary: React.FC<ItineraryProps> = (props) => {
    function handlePlaceButtonClick() {
        console.log(`Clicked on place`);
    }

    function handleSmallButtonClick() {
        console.log("Clicked on smaller button");
    }
    return (
        <div>
            <h1>itinerary!</h1>
            {/* GENERATED PLACES BOD */}
            <div className="generated-places-box">
                <h2>Generated Places</h2>
                <div className="h-50vh overflow-y-scroll">
                    <div className='place-container'>
                        <button className="big-button block w-full" onClick={handlePlaceButtonClick}>Place 1</button>
                        <button className="small-button" onClick={handleSmallButtonClick}>-</button>
                    </div>
                    
                </div>

            </div>

        </div>
    );
}

export default Itinerary;