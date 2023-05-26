import React from 'react'
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import userService from '../service/UserService'
import jwtDecode from "jwt-decode";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { useStore } from '../utils/store'





const CoursesTab = () => {

	const setCourse = useStore((state) => state.setCourse)


	const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

	const navigate = useNavigate();



	const [laoding, setLaoding] = useState(true)

	const [courses, setCourses] = useState(null)

	let email = jwtDecode(cookies.jwt).sub

	useEffect(() => {
		const fetchData = async () => {
			setLaoding(true);
			try {
				const courses = await userService.getCoursesByEmail(email);
				setCourses(courses.data)
			} catch (err) {
				console.log(err)
			}
			setLaoding(false);
		};
		fetchData();
	}, []);




	function handleClick(course) {
		setCourse(course);
		navigate("/courses-tab/" + course.courseCode);
	}


	return (
		<>
			<Navbar></Navbar>
			<div className='flex justify-between items-center'>
				<h1 className='text-4xl font-bold px-20 py-10 '>Your courses:</h1>
				<Link to="/courses-tab/enroll">	<button className='mr-20 bg-green-600 rounded-lg h-14 text-xl w-fit px-12 align-left text-white hover:bg-green-700 font-bold'>Enroll to course <FontAwesomeIcon className='font-bold px-1 ml-1' icon={faPlus} /></button></Link>
			</div>


			{!laoding && courses !== null && (
				<div>
					{courses.map((course) => (
						// console.log(course),
						// console.log("course inside map"),
						<div key={course.courseCode} onClick={() => handleClick(course)} className='border-2 border-black mx-20 px-4 py-4 rounded-lg hover:border-4 mb-6'>
							<p className='text-4xl font-bold'>{course.title}</p>
							<p className='text-lg font-semibold'>{course.courseDescription}</p>
						</div>))}
				</div>)}
			<div>
				<div className='border-2 border-black mx-20 px-4 py-4 rounded-lg hover:border-4 mb-6'>
					<p className='text-4xl font-bold'>Tile</p>
					<p className='text-lg font-semibold'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisl nisl, posuere non iaculis eget, viverra ac dolor. Mauris arcu justo, elementum cursus vehicula et, sagittis non ante. Sed at metus enim. Donec pretium dui id euismod aliquet. Proin dolor arcu, dignissim pulvinar interdum id, venenatis ullamcorper lorem. Quisque at pretium velit. Nam vel nisl in nibh molestie feugiat quis imperdiet justo. Praesent et volutpat purus. Maecenas id cursus velit. Cras vestibulum fermentum nunc vitae ultrices. Morbi auctor vel eros vel finibus. Fusce sed ullamcorper risus, et viverra diam. Nulla sed nunc vulputate urna tristique iaculis in ut sem. Sed.</p>
				</div>
			</div>
			<div className='border-2 border-black mx-20 px-4 py-4 rounded-lg hover:border-4 mb-6'>
				<p className='text-4xl font-bold'>Tile</p>
				<p className='text-lg font-semibold'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisl nisl, posuere non iaculis eget, viverra ac dolor. Mauris arcu justo, elementum cursus vehicula et, sagittis non ante. Sed at metus enim. Donec pretium dui id euismod aliquet. Proin dolor arcu, dignissim pulvinar interdum id, venenatis ullamcorper lorem. Quisque at pretium velit. Nam vel nisl in nibh molestie feugiat quis imperdiet justo. Praesent et volutpat purus. Maecenas id cursus velit. Cras vestibulum fermentum nunc vitae ultrices. Morbi auctor vel eros vel finibus. Fusce sed ullamcorper risus, et viverra diam. Nulla sed nunc vulputate urna tristique iaculis in ut sem. Sed.</p>
			</div>

			<Link to="/courses-tab/add">	<button className='ml-20 my-10 bg-blue-700 rounded-lg h-14 text-xl w-fit px-12 align-left text-white hover:bg-blue-600 font-bold'>Add course <FontAwesomeIcon className='font-bold px-1 ml-1' icon={faPlus} /></button></Link>

		</>
	)
}


//buton jos align right cu add course ca sa poti si adauga si se vede doar daca esti teacher
export default CoursesTab