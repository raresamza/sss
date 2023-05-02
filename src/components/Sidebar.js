import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import userService from '../service/UserService';
<FontAwesomeIcon icon="fa-solid fa-arrow-right" />


const Sidebar = () => {


    const navigate = useNavigate();

    const courseCodeToSend = useLocation();

    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);


    const [laoding, setLaoding] = useState(true)

    const [courses, setCourses] = useState(null)

    let email = jwtDecode(cookies.jwt).sub
    let i = 0

    useEffect(() => {
        const fetchData = async () => {
            setLaoding(true);
            try {
                const coursees = await userService.getCoursesByCode(courseCodeToSend.state);
                setCourses(coursees.data)
                console.log(coursees.data)
                console.log("coursees.data")
            } catch (err) {
                console.log(err)
            }
            setLaoding(false);
        };
        fetchData();
    }, []);


    return (
        <>
            {!laoding && (
                <div className='min-h-[calc(100vh-80px)] w-72 border-r-2 border-gray-400 relative'>
                    {/* {coursees.map((course) => (

                        <ul key={course.id} className='mt-6'>
                            <li onClick={(e) => navigate("/courses-tab/" + course.courseCode, { state: coursees })} className='  text-lg font-bold px-4 underline'><span className='hover:text-xl cursor-pointer'>{course.title}</span></li>
                            {course.lectures.map((lecture) => (
                                <ul key={lecture.header} className='px-8 '>
                                    <li onClick={(e) => navigate("/courses-tab/" + course.courseCode + "/lecture/" + lecture.header, { state: lecture })} className='mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />{lecture.header}</li>
                                </ul>))}
                        </ul>))} */}
                    <ul key={courses.id} className='mt-6'>
                        <li onClick={(e) => navigate("/courses-tab/" + courses.courseCode, { state: courses })} className='  text-lg font-bold px-4 underline'><span className='hover:text-xl cursor-pointer'>{courses.title}</span></li>
                        {courses.lectures.map((lecture) => (
                            <ul key={lecture.header} className='px-8 '>
                                <li onClick={(e) => navigate("/courses-tab/" + courses.courseCode + "/lecture/" + lecture.header, { state: lecture })} className='mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />{lecture.header}</li>
                            </ul>))}
                    </ul>
                    <ul className='py-8'>
                        <li className='text-lg font-bold px-4 underline'>2 - Ceva Titlu</li>
                        <ul className='px-8 pb-8'>
                            <li className='mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />Ceva5</li>
                            <li className='mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />Ceva6</li>
                            <li className=' mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />Ceva7</li>
                            <li className='mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />Ceva8</li>
                            <li className='mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />Ceva8</li>
                            <li className='mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />Ceva8</li>
                            <li className='mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />Ceva8</li>
                            <li className='mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />Ceva8</li>
                        </ul>
                    </ul>

                    <Link to="/courses-tab/addLecture"><button className=' bg-green-500 hover:bg-green-600 px-4 py-4 rounded-lg font-semibold absolute bottom-2 left-[25%] w-36'>Add lecture</button></Link>

                </div>)}

        </>
    )
}

export default Sidebar