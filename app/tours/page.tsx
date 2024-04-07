'use client';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import AddLocationModal from '@/components/AddLocationModal';
import { DatabasePlaces, PlaceRes, Itinerary } from './types';
import TourDetailView from './TourDetailView';
import './ToursList.css';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});

const ToursList = () => {
	const [itineraries, setItineraries] = useState<Itinerary[]>([]);
	const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(
		null
	);
	const [descriptions, setDescriptions] = useState<string[]>([]);

	useEffect(() => {
		const fetchItineraries = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'itineraries'));
				const itinerariesData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
					descriptions: [], // Initialize descriptions array for each itinerary
				}));

				// Fetch and store descriptions for destinations
				const fetchedDescriptions = await Promise.all(
					itinerariesData.map(async (itinerary) => {
						const destinationDescriptions = await Promise.all(
							itinerary.destinations.map(async (destination) => {
								const description = await fetchPlaceDescription(
									destination.name
								);
								return description;
							})
						);
						return destinationDescriptions;
					})
				);

				setDescriptions(fetchedDescriptions);
				setItineraries(itinerariesData);
			} catch (error) {
				console.error('Error fetching itineraries: ', error);
			}
		};

		fetchItineraries();
	}, []);

	const fetchPlaceDescription = async (placeName: string) => {
		try {
			const prompt = `Give a 10 token description about ${placeName} and make sure it is a complete sentence that is relevant to the ${placeName}.`;
			const completion = await openai.chat.completions.create({
				messages: [{ role: 'system', content: prompt }],
				model: 'gpt-4-1106-preview',
				n: 1,
				max_tokens: 10,
				temperature: 0,
				stop: '\n', // Stop generating completions after the first complete response
			});
			return completion.choices[0].message.content;
		} catch (error) {
			console.error('An error occurred while fetching the data: ', error);
			return ''; // Return empty string in case of error
		}
	};

	function handleTourDetailClick(itinerary: Itinerary) {
		setSelectedItinerary(itinerary);
	}

	return (
		<div>
			<div className='tours-list'>
				{/* Map over itineraries and render tour containers */}
				{itineraries.map((itinerary, index) => (
					<div
						className='tour-container'
						key={index}
						onClick={() => handleTourDetailClick(itinerary)}>
						<h2>{itinerary.title}</h2>
						{/* Map over destinations and render destination names */}
						{itinerary.destinations.map((destination, i) => (
							<div key={i}>
								<h3>{destination.name}</h3>
								{/* Render the descriptions for destinations */}
								<p>{descriptions[index] && descriptions[index][i]}</p>
							</div>
						))}
						<br />
					</div>
				))}
			</div>
			{/* Render TourDetailView if selectedItinerary is not null */}
			{selectedItinerary && <TourDetailView itinerary={selectedItinerary} />}
		</div>
	);
};

export default ToursList;
