'use client';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import React, { useState, useEffect } from 'react';

dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});

// Your page component
export default function Page() {
	useEffect(() => {
		const fetchData = async () => {
			try {
				const prompt =
					'Give a 5 sentence description about mcdonalds. Please only give me one response that is complete';

				const completion = await openai.chat.completions.create({
					messages: [{ role: 'system', content: prompt }],
					model: 'gpt-4-1106-preview',
					n: 1,
					max_tokens: 150,
					temperature: 0.3,
					stop: '\n', // Stop generating completions after the first complete response
				});

				console.log(completion.choices[0].message.content);
			} catch (error) {
				console.error('An error occurred while fetching the data: ', error);
			}
		};

		fetchData();
	}, []); // Empty dependency array to run only once on component mount

	return (
		<main>
			<h1>CHAT</h1>
		</main>
	);
}
