import React from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { FaHome } from 'react-icons/fa';
import { IoEarth } from 'react-icons/io5';
import { CiCirclePlus } from 'react-icons/ci';
import { Metadata } from 'next/types';
import styles from "./style.module.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<nav className={styles.navBar}>
					<ul >

						{/* Add the anchor tags here */}
						<div >
							<li >
								<a href='/' className='home-button'>
									<h1>home</h1>
								</a>
							</li>
							<li>
								<a href='/tours' className='browse-button'>
									<h1>tours</h1>
								</a>
							</li>
							<li>
								<a href='/create' className='itinerary-button'>
									<h1>create</h1>
								</a>
							</li>
						</div>
					</ul>
				</nav>
				{children}
			</body>
		</html>
	);
}
