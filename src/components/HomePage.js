import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


const HomePage = () => {


	const navigate = useNavigate()

	const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);



	function handleLoginButton() {
		navigate("/");
	}
	function handleStartLearningButton() {
		navigate("/sign-up");

	}



	return (
		<>
			<Navbar></Navbar>
			<div className='flex items-center justify-between relative'>
				<div className='w-1/2'>
					<h1 className='px-32 text-4xl font-bold pb-8'>Unlock the Power of Coding</h1>
					<div>
						<h1 className='px-32 text-3xl font-bold mb-16'>Leetik helps you level up in your coding journey through interactive coding challenges and lectures</h1>
					</div>
					<button onClick={handleStartLearningButton} className="bg-blue-600 ml-32 mr-16 rounded-xl h-20 text-2xl font-bold w-56 align-left text-black hover:bg-blue-700 ">Start learning</button>
					<button onClick={handleLoginButton} className=" h-12  w-36  text-black underline text-2xl font-bold ">Log in</button>
				</div>
				<div className='mt-10 mr-10'>
					<img className='mt-16 w-full' src="herosvg.svg" alt="My Happy SVG" />
				</div>
				<p className='text-center fixed bottom-10 w-full font-bold text-lg '>© Leetik 2023  </p>
			</div>


		</>



	)
}

export default HomePage


