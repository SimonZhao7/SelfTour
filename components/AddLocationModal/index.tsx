import React, { FunctionComponent, MouseEventHandler, useState } from 'react';
import styles from './style.module.css';
import { RxCross2 } from 'react-icons/rx';
import { AddLocationModalProps } from './types';
import AutocompleteSearch from '../AutocompleteSearch';
import { PlaceRes } from '@/app/create/types';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});

const AddLocationModal: FunctionComponent<AddLocationModalProps> = ({
	setModal,
	onNewPlaceData,
	map,
}) => {
	const [id, setId] = useState<string>('');
	const [desc, setDesc] = useState<string>('');

	const handleNewPlaceData = async (id: string, desc: string) => {
		const placesService = new google.maps.places.PlacesService(map!);
		placesService.getDetails(
			{
				placeId: id,
			},
			async (res, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK && res) {
					const newPlaceRes: PlaceRes = { ...res, desc };
					// Fetch description from OpenAI
					const description = await fetchPlaceDescription(res.name);
					newPlaceRes.desc = description;
					onNewPlaceData(newPlaceRes);
				}
			}
		);
	};

	const handleFormSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		handleNewPlaceData(id, desc);
		setModal(false);
	};

	const fetchPlaceDescription = async (placeName: string) => {
		try {
			const prompt = `Give a 50 token description about ${placeName} and make sure it ends in a complete sentence.`;

			const completion = await openai.chat.completions.create({
				messages: [{ role: 'system', content: prompt }],
				model: 'gpt-4-1106-preview',
				n: 1,
				max_tokens: 50,
				temperature: 0,
				stop: '\n', // Stop generating completions after the first complete response
			});

			return completion.choices[0].message.content;
		} catch (error) {
			console.error('An error occurred while fetching the data: ', error);
			return ''; // Return empty string in case of error
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.formWrapper}>
				<RxCross2
					onClick={() => setModal(false)}
					size={25}
					style={{
						position: 'absolute',
						right: '10px',
						top: '10px',
					}}
				/>
				<form className={styles.form}>
					<AutocompleteSearch
						placeIdChangeHandle={setId}
						placeholder='What do you wanna do? 🤩'
					/>
					<textarea
						onChange={(e) => setDesc(e.target.value)}
						className={styles.textarea}
						placeholder='Enter a description...'></textarea>
					<button onClick={handleFormSubmit} className={styles.submitButton}>
						Add Location
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddLocationModal;
