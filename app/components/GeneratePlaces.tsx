import React from 'react';
import "./GeneratePlaces.css";
import SearchRequests from './SearchRequests';

interface GeneratePlacesProps {
    // Define your props here
}

const GeneratePlaces: React.FC<GeneratePlacesProps> = (props) => {
    return (
        <div>
            <h1>here we genreate places!</h1>
            {/* SEARCH BAR TO GENERATE PLACES */}
            <div className="search-bar">
                <SearchRequests placeholder="What do you wanna do? 🤩" />
            </div>

            {/* GENERATED PLACES BOD */}
            <div className="generated-places-box">
                <h2>Generated Places</h2>
                <div className="h-50vh overflow-y-scroll">
                    <button className="block w-full">Place 1</button>
                    <button className="block w-full">Place 2</button>
                    <button className="block w-full">Place 3</button>
                    <button className="block w-full">Place 1</button>
                    <button className="block w-full">Place 2</button>
                    <button className="block w-full">Place 3</button>
                    <button className="block w-full">Place 1</button>
                    <button className="block w-full">Place 2</button>
                    <button className="block w-full">Place 3</button>
                    <button className="block w-full">Place 1</button>
                    <button className="block w-full">Place 2</button>
                    <button className="block w-full">Place 3</button>
                </div>

            </div>

        </div>
    );
}

export default GeneratePlaces;