import React from 'react'
import Navbar from './Navbar'
import userService from '../service/UserService'
import { useState } from 'react'
const CreateQuiz = () => {
    const [quiz, setQuiz] = useState({
        quizCode: "",
        problemHeader: "",
        problemContent: ""
    })


    function genQuizCode() {
        return "s"
        //cand generez cod nou bag si quziu in DB
    }

    const handleChange = (e) => {

        const value = e.target.value
        setQuiz({ ...quiz, [e.target.name]: value })
        console.log(quiz);
    }

    const addQuiz = (e) => {
        e.preventDefault();
        console.log("hello")
        if (quiz.quizCode === null || quiz.quizCode === undefined || quiz.quizCode === "") {
            document.getElementById("quizCode").style.borderColor = "red"
            console.log("red")
            console.log("red coode")
        } else {
            document.getElementById("quizCode").style.borderColor = "black"
            console.log("black")
        }
        if (quiz.problemHeader === null || quiz.problemHeader === undefined || quiz.problemHeader === "") {
            document.getElementById("problemHeader").style.borderColor = "red"
            console.log("red")
        } else {
            document.getElementById("problemHeader").style.borderColor = "black"
        }
        if (quiz.problemContent === null || quiz.problemContent === undefined || quiz.problemContent === "") {
            document.getElementById("problemContent").style.borderColor = "red"
            console.log("red")
        } else {
            document.getElementById("problemContent").style.borderColor = "black"
        }

        let quizObject = {
            problemHeader: quiz.problemHeader,
            problemContent: quiz.problemContent
        }

        let quizDTO = {
            quizCode: quiz.quizCode,
            quiz: quizObject
        }
        console.log(quizDTO)

        userService.addquizToCourse(quizDTO).then((response) => {
            console.log(response)
        })

    }


    return (

        <>
            <Navbar></Navbar>
            <div className='flex justify-between'>
                <div className='w-3/4'>
                    <h1 className='px-44 text-4xl font-bold py-10'>Add quiz</h1>
                    <h1 className='px-44 text-2xl font-bold py-10'>Please provide the quiz code (not necessary to generate new one, can use old) :</h1>
                    <input onChange={(e) => handleChange(e)} type="text" className="ml-44 border-[2px] w-2/5 border-gray-900 rounded-md p-2 mb-10" id="quizCode" name="quizCode" />
                    <h1 className='px-44 text-2xl font-bold py-10'>Please provide the problem title:</h1>
                    <input onChange={(e) => handleChange(e)} type="text" className="ml-44 border-[2px] w-2/5 border-gray-900 rounded-md p-2 mb-10" id="problemHeader" name="problemHeader" />
                    <h1 className='px-44 text-2xl font-bold py-10'>Please provide the problem text:</h1>
                    <textarea onChange={(e) => handleChange(e)} id='problemContent' name='problemContent' spellCheck={true} className='ml-44 w-3/4 rounded-lg   outline-none h-[300px] resize-none border-2 border-black px-4 py-4 mb-10'></textarea>
                    <p>test</p>

                </div>
                <div className='flex'>
                    <button onClick={(e) => addQuiz(e)} className='text-white bg-green-500 hover:bg-green-600 rounded-lg px-4 py-4 mr-10 mt-10 w-52 h-[4.5rem] font-bold'>Add quiz</button>
                    <button onClick={(e) => genQuizCode(e)} className='text-white bg-green-500 hover:bg-green-600 rounded-lg px-4 py-4 mr-20 mt-10 w-52 h-[4.5rem] font-bold'>Generate Quiz Code</button>
                </div>
            </div>
        </>
    )
}


export default CreateQuiz