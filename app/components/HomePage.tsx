import React from 'react';
import GeneratePlaces from "./GeneratePlaces";
import Itinerary from "./Itinerary";
import "./HomePage.css";
import { FaHome } from "react-icons/fa";
import { IoEarth } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
interface HomePageProps {
    // Define your props here
}

const HomePage: React.FC<HomePageProps> = (props) => {
    return (
        <div className='page'>
            <button className='home-button'>
                <FaHome className='icon home' />
            </button>
            <button className='itinerary-button'>
                <CiCirclePlus className='icon itinerary' />
            </button>
            <button className='browse-button'>
                <IoEarth className='browse icon' />
            </button>
            <h1>
                <text className='home-text'>
                    Let's Tour!
                </text>
            </h1>
            <div className="homepage-content">
                <button className='start-button'><text className='start-text' style={{ fontFamily: 'Roboto Mono, monospace' }}>start</text></button>
            </div>
        </div>
    );
}

export default HomePage;
