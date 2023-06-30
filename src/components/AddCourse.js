import React from 'react'
import Navbar from './Navbar'
import userService from '../service/UserService';
// import jwtDecode from "jwt-decode";
import { useCookies } from 'react-cookie';

import { useState } from 'react';

const AddCourse = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);


    const [course, setCourse] = useState({
        title: "",
        courseDescription: "",
    });

    const handleChange = (e) => {

        const value = e.target.value
        setCourse({ ...course, [e.target.name]: value })
        console.log(course.title);
        console.log(course.courseDescription);

    }

    const AddCourse = async (e) => {
        const check = document.getElementById("check")
        if ((course.title !== undefined && course.title !== "" && course.title !== null) && (course.courseDescription !== undefined && course.courseDescription !== "" && course.courseDescription !== null)) {
            await userService.addCourse(course, cookies.jwt).then((response) => {
                if (response.status === 200) {
                    check.innerHTML = "Code course is:  \" " + response.data.courseCode + " \"🎉🎉";
                    check.style.color = "green";
                }


            })
        } else {
            check.style.color = "red";
            check.innerHTML = "Please enter valid names for the fields ⚠️⚠️";
        }
    }


    return (
        <>
            <Navbar></Navbar>
            <h1 className='px-44 text-4xl font-bold py-10 '>Add course</h1>
            <div className='flex flex-start'>
                <div className='pl-44 w-full'>
                    <div>
                        <p className='text-xl font-semibold py-4'>Enter course Title</p>
                        <input onChange={(e) => handleChange(e)} type="text" className="border-[2px] w-[28rem] border-gray-900 rounded-md p-2 mb-6" id="code" name="title" />
                    </div>
                    <div>
                        <p className='text-xl font-semibold py-4'>Enter course description</p>
                        <textarea onChange={(e) => handleChange(e)} spellCheck={true} id='desc' name='courseDescription' placeholder="Write the coruse description" className='border-2 resize-none w-3/4 border-b-2 h-72 text-lg border-black rounded-xl px-4 py-4'></textarea>
                    </div >
                </div>
            </div >
            <button onClick={(e) => AddCourse(e)} className='ml-44 mt-10 bg-green-600 rounded-lg h-12  w-36 align-left text-white hover:bg-green-700 font-semibold'>Add</button>
            <p className='px-44 py-10 font-semibold text-3xl' id="check"></p>

        </>
    )
}

export default AddCourse

