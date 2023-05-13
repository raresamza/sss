import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
import { useStore } from '../utils/store'
import { useState } from 'react'
import Discussions from './Discussions'
import Solutions from './Solutions'
const ProblemView = () => {

	const courseZustand = useStore((state) => state.course)
	const lectureZustand = useStore((state) => state.lecture)

	const [switcher, setSwitcher] = useState(true)

	// let switcher = true



	function toggle() {
		// setSwitcher(!switcher)
		setSwitcher(!switcher)
		console.log(switcher)
	}



	const courses = useLocation();
	console.log(courseZustand)
	console.log("courseZustand")
	console.log(lectureZustand);
	console.log("lectureZustand")

	return (
		<>
			<Navbar></Navbar>
			<div className='grid grid-cols-[288px,1fr] grid-rows-1'>
				<Sidebar></Sidebar>
				<main className='max-h-[calc(100vh-80px)] w-full overflow-y-auto'>
					<div className=' px-44'>
						{lectureZustand !== null ? <h1 className='py-4  text-3xl font-semibold'>{lectureZustand.header}</h1> : <h1 className='py-4  text-3xl font-semibold'>{courseZustand.lectures[0].header}</h1>}
						{lectureZustand !== null ? <p className='pb-4' >{lectureZustand.content}</p> : <p className='pb-4' >{courseZustand.lectures[0].content}</p>}
						{lectureZustand !== null ? <h1 className='py-4  text-3xl font-semibold'>{lectureZustand.problemHeader}</h1> : <h1 className='py-4  text-3xl font-semibold'>{courseZustand.lectures[0].problemHeader}</h1>}
						{lectureZustand !== null ? <p className='pb-4' >{lectureZustand.problemContent}</p> : <p className='pb-4' >{courseZustand.lectures[0].problemContent}</p>}
						<h1 className='pb-4 font-semibold'>Test output</h1>
						<textarea spellCheck={false} readOnly={true} className='bg-black  w-full rounded-lg decoration-none border-none outline-none h-[800px] resize-none text-white px-4 py-4'></textarea>
						<h1 className='font-semibold pb-4'>Solution</h1>
						<div className='grid grid-cols-1 grid-rows mb-10'>
							<textarea spellCheck={false} className='bg-black  w-full rounded-t-lg decoration-none border-none outline-none h-[800px] resize-none text-white px-4 py-4'></textarea>
							<div className='bg-gray-800 h-16 px-4 rounded-b-lg flex justify-end items-center  '>
								<button className="bg-green-600 rounded-lg h-12  w-36 align-left text-white float-right hover:bg-green-700 "><span className="text-lg mr-3 ">Run</span> <FontAwesomeIcon icon={faPlay} /></button>
							</div>
						</div>
					</div>
					<div className='my-10  border-t-2 border-gray-400'></div>
					<div className='px-44 flex items-center justify-start mb-10 '>
						<button onClick={toggle} className="rounded-xl h-12 w-32 border-2 border-black mr-10">Discussions</button>
						<button onClick={toggle} className="rounded-xl h-12 w-32 border-2 border-black">Solutions</button>
					</div>
					{switcher ? <Discussions></Discussions> : <Solutions></Solutions>}
				</main>

			</div >
		</>

	)
}

export default ProblemView;