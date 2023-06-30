import React from 'react'
import Navbar from './Navbar'
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import jwtDecode from "jwt-decode";
import userService from '../service/UserService';


const Enroll = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    const [addDTO, setAddDTO] = useState({
        email: jwtDecode(cookies.jwt).sub,
        courseCode: ""
    })

    const responseElement = document.getElementById("response")

    const handleChange = (e) => {

        const value = e.target.value
        setAddDTO({ ...addDTO, [e.target.name]: value })
        console.log(addDTO.courseCode);

    }

    const enroll = async (e) => {
        if (addDTO.courseCode !== undefined && addDTO.courseCode !== "" && addDTO.courseCode !== null) {
            await userService.addCourseUser(addDTO, cookies.jwt).then((response) => {
                if (response.status !== 200) {
                    responseElement.innerHTML = "Please provide a valid course code ⚠️⚠️"
                    responseElement.style.color = "red"
                }
                else {
                    responseElement.innerHTML = "Success!🎉🎉"
                    responseElement.style.color = "green"
                }
            })
        }


    }

    return (
        <>
            <Navbar></Navbar>
            <p className='px-44 text-4xl font-bold py-10'>Please add the course code</p>
            <div className='flex items-center justify-center'>
                <div className='text-center'>
                    <div>
                        <input onChange={(e) => handleChange(e)} type="text" className="border-[2px] w-[28rem] border-gray-900 rounded-md p-2 mb-6" id="courseCode" name="courseCode" />
                    </div>
                    <button onClick={(e) => enroll(e)} className="bg-green-600 rounded-lg h-12  w-52 align-left text-white hover:bg-green-700 font-bold ">Enroll</button>
                </div>
            </div>
            <p className='px-44 text-2xl font-semibold py-10' id="response"></p>
        </>
    )
}

export default Enroll


