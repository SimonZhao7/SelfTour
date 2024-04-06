import React from 'react';
import GeneratePlaces from "./GeneratePlaces";

interface HomePageProps {
    // Define your props here
}

const HomePage: React.FC<HomePageProps> = (props) => {
    return (
        <div>
            <h1>Welcome to the Homepage!</h1>
            <div className="homepage-content">
                <GeneratePlaces />
            </div>
            
        </div>
    );
}

export default HomePage;