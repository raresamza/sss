import React from 'react'
import Navbar from './Navbar'
import { useState } from 'react'

const AddLecture = () => {

    const [lecture, setLecture] = useState({
        courseCode: "",
        header: "",
        content: "",
        problemHeader: "",
        problemContent: ""
    })


    const handleChange = (e) => {

        const value = e.target.value
        setLecture({ ...lecture, [e.target.name]: value })
        console.log(lecture);
    }

    const addLecture = (e) => {
        e.preventDefault();
        console.log("hello")
        if (lecture.courseCode === null || lecture.courseCode === undefined || lecture.courseCode === "") {
            document.getElementById("courseCode").style.borderColor = "red"
            console.log("red")
            console.log("red coode")
        } else {
            document.getElementById("courseCode").style.borderColor = "black"
            console.log("black")
        }
        if (lecture.header === null || lecture.header === undefined || lecture.header === "") {
            document.getElementById("header").style.borderColor = "red"
            console.log("red")
        } else {
            document.getElementById("header").style.borderColor = "black"
        }
        if (lecture.content === null || lecture.content === undefined || lecture.content === "") {
            document.getElementById("content").style.borderColor = "red"
            console.log("red")
        } else {
            document.getElementById("content").style.borderColor = "black"
        }
        if (lecture.problemHeader === null || lecture.problemHeader === undefined || lecture.problemHeader === "") {
            document.getElementById("problemHeader").style.borderColor = "red"
            console.log("red")
        } else {
            document.getElementById("problemHeader").style.borderColor = "black"
        }
        if (lecture.problemContent === null || lecture.problemContent === undefined || lecture.problemContent === "") {
            document.getElementById("problemContent").style.borderColor = "red"
            console.log("red")
        } else {
            document.getElementById("problemContent").style.borderColor = "black"
        }


    }


    return (

        <>
            <Navbar></Navbar>
            <div className='flex justify-between'>
                <div className='w-3/4'>
                    <h1 className='px-44 text-4xl font-bold py-10'>Add lecture</h1>
                    <h1 className='px-44 text-2xl font-bold py-10'>Please provide the course code:</h1>
                    <input onChange={(e) => handleChange(e)} type="text" className="ml-44 border-[2px] w-2/5 border-gray-900 rounded-md p-2 mb-10" id="courseCode" name="courseCode" />
                    <h1 className='px-44 text-2xl font-bold py-10'>Please provide the lecture title:</h1>
                    <input onChange={(e) => handleChange(e)} type="text" className="ml-44 border-[2px] w-2/5 border-gray-900 rounded-md p-2 mb-10" id="header" name="header" />
                    <h1 className='px-44 text-2xl font-bold py-10'>Please provide the lecture text:</h1>
                    <textarea onChange={(e) => handleChange(e)} id='content' name='content' spellCheck={true} className='ml-44 w-3/4 rounded-lg   outline-none h-[300px] resize-none border-2 border-black px-4 py-4'></textarea>
                    <h1 className='px-44 text-2xl font-bold py-10'>Please provide the problem title:</h1>
                    <input onChange={(e) => handleChange(e)} type="text" className="ml-44 border-[2px] w-2/5 border-gray-900 rounded-md p-2 mb-10" id="problemHeader" name="problemHeader" />
                    <h1 className='px-44 text-2xl font-bold py-10'>Please provide the problem text:</h1>
                    <textarea onChange={(e) => handleChange(e)} id='problemContent' name='problemContent' spellCheck={true} className='ml-44 w-3/4 rounded-lg   outline-none h-[300px] resize-none border-2 border-black px-4 py-4 mb-10'></textarea>
                </div>
                <div>
                    <button onClick={(e) => addLecture(e)} className='bg-green-500 hover:bg-green-600 rounded-lg px-4 py-4 mr-20 mt-10 w-36 h-16 font-bold'>Add Lecture</button>
                </div>
            </div>
        </>
    )
}

export default AddLecture