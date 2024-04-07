import React from 'react';
import Itinerary from './Itinerary';
import './HomePage.css';
import { FaHome } from 'react-icons/fa';
import { IoEarth } from 'react-icons/io5';
import { CiCirclePlus } from 'react-icons/ci';
import Image from 'next/image';
import { BsStars } from "react-icons/bs";

interface HomePageProps {
    // Define your props here
}

const HomePage: React.FC<HomePageProps> = (props) => {
	return (
		<div className='page'>
			<link href="https://fonts.cdnfonts.com/css/porter-sans-block" rel="stylesheet">
            </link>
			<BsStars className='starone' />
			<BsStars className='two' />
			<BsStars className='starthree' />


			<div className='home-text'>
				<text>Let&apos;s</text><br></br>
				<text>&nbsp;&nbsp;Tour!</text>
			</div>
            <Image
                src="/mascot.png"
                width={500}
                height={500}
                alt="mascot" className="mascot" />
			<div className='homepage-content'>
				<button className='start-button'>
					<text
						className='start-text'
						style={{ fontFamily: 'Roboto Mono, monospace' }}>
						<a href='/create' style={{ color: 'white', background: 'none' }}>
							start 🏁
						</a>
					</text>
				</button>
			</div>
		</div>
	);
};

export default HomePage;
