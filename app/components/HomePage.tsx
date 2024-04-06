import React from 'react';
import Itinerary from './Itinerary';
import './HomePage.css';
import { FaHome } from 'react-icons/fa';
import { IoEarth } from 'react-icons/io5';
import { CiCirclePlus } from 'react-icons/ci';

interface HomePageProps {
	// Define your props here
}

const HomePage: React.FC<HomePageProps> = (props) => {
	return (
		<div className='page'>
			<a href='/' className='home-button'>
				{' '}
				{/* Use anchor tag with href attribute */}
				<FaHome className='icon home' />
			</a>
			<a href='/tours' className='itinerary-button'>
				{' '}
				{/* Use anchor tag with href attribute */}
				<CiCirclePlus className='icon itinerary' />
			</a>
			<a href='/create' className='browse-button'>
				{' '}
				{/* Use anchor tag with href attribute */}
				<IoEarth className='browse icon' />
			</a>
			<h1>
				<text className='home-text'>Let's Tour!</text>
			</h1>
			<div className='homepage-content'>
				<button className='start-button'>
					<text
						className='start-text'
						style={{ fontFamily: 'Roboto Mono, monospace' }}>
						start
					</text>
				</button>
			</div>
		</div>
	);
};

export default HomePage;
