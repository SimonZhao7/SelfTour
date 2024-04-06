import React from 'react';
import './map.css';

export default function Page() {
	return (
		<div className='app-container'>
			<header className='app-header'>
				<button className='section-btn'>Section 9</button>
				<button className='add-btn'>add new</button>
				<button className='section-btn'>Section 10</button>
				<div className='icon-container'>
					{/* Replace # with the path to your icons */}
					<img src='#' alt='Home' />
					<img src='#' alt='Refresh' />
					<img src='#' alt='Add' />
				</div>
			</header>
			<div className='app-content'>
				<div className='search-container'>
					<input type='text' placeholder='Search...' />
					<span className='clear-search'>X</span>
				</div>
				<div className='map-container'>
					{/* Map component or image goes here */}
					map
				</div>
			</div>
		</div>
	);
}
