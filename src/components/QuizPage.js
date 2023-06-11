import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import TimerElement from './TimerElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';
import jwtDecode from "jwt-decode";
import userService from '../service/UserService';

const QuizPage = () => {

    const [cookies] = useCookies(['cookie-name']);





    let currentTime = (new Date()).getTime();
    let nextTime = currentTime + 1000 * 60 * 60

    const navigate = useNavigate();

    const [quiz, setQuiz] = useState({
        quizTitle: "",
        quizCode: "",
        usersEmails: [],
        problems: []
    });
    const [loading, setLoading] = useState(false);
    const [minutesLeft, setMinutesLeft] = useState();
    const [validSubmission, setValidSubmission] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState();
    const [timeLeft, setTimeLeft] = useState(nextTime - currentTime);

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                let email = jwtDecode(cookies.jwt).sub
                await userService.isUserActive(email).then((response) => {
                    console.log(response.data)
                    if (response.data === false) {
                        navigate('/quiz/fallback')
                    }


                }).catch((error) => {
                    console.log(error)
                })
                const code = (await userService.getQuizCodeFromUser(email)).data
                await userService.getQuizByCode(code).then((response) => {
                    quiz.quizTitle = response.data.quizTitle
                    quiz.quizCode = response.data.quizCode
                    quiz.usersEmails = response.data.usersEmails
                    quiz.problems = response.data.problems
                    console.log(quiz)
                }).catch((error) => {
                    console.log(error)
                })

            } catch (err) {
                console.log(err)
            }
        };
        setLoading(false)
        fetchData();
    }, [cookies.jwt, loading, navigate, quiz])


    useEffect(() => {

        const intervalId = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1000)
                setMinutesLeft(Math.floor(timeLeft / 60000))
                setSecondsLeft(((timeLeft % 60000) / 1000).toFixed(0))
            } else {
                setValidSubmission(false)
            }

        }, 1000);
        // console.log("test")
        return () => clearInterval(intervalId);

    }, [timeLeft, validSubmission])


    function testClick() {
        console.log("test")
    }

    return (
        <>
            <Navbar></Navbar>
            {!loading && (
                <div className='pr-72 pl-20 relative'>
                    <p className='text-3xl py-10'>{quiz.quizTitle}</p>
                    {validSubmission ? <TimerElement minutes={minutesLeft} seconds={secondsLeft}></TimerElement> : <TimerElement minutes={0} seconds={0}></TimerElement>}
                    {quiz.problems.map((problem, y) => (
                        <div className='text-2xl' key={y}>
                            <div className='bg-gray-400 h-1 my-10'></div>
                            <h1 >Problem name:</h1>
                            <h1 >{problem.problemHeader}</h1>
                            <h1 >Problem text</h1>
                            <h1 >{problem.problemText}</h1>
                            <h1 className='text-xl pt-10 pb-5'>Test outputs:</h1>
                            <textarea spellCheck={false} readOnly={true} className=' bg-black  w-full rounded-lg decoration-none border-none outline-none h-[800px] resize-none text-white px-4 py-4'></textarea>
                            <h1 className='text-xl pt-10 pb-5'>Solution</h1>
                            <div className='grid grid-cols-1 grid-rows mb-10'>
                                <textarea spellCheck={false} className=' bg-black  w-full rounded-t-lg decoration-none border-none outline-none h-[800px] resize-none text-white px-4 py-4'></textarea>
                                <div className='bg-gray-800 h-16 px-4 rounded-b-lg flex justify-end items-center  '>
                                    <button className="bg-green-600 rounded-lg h-12  w-36 align-left text-white float-right hover:bg-green-700 "><span className="text-lg mr-3 ">Run</span> <FontAwesomeIcon icon={faPlay} /></button>
                                </div>
                            </div>
                        </div>))}
                    {validSubmission ? <button onClick={() => testClick()} className='hover:decoration-2 mb-10 bg-green-600 hover:bg-green-500 text-white font-semibold w-36 h-16 rounded-lg'>Submit</button> : <button className='hover:cursor-not-allowed mb-10 hover:decoration-2 bg-green-600 hover:bg-green-500 text-white font-semibold w-36 h-16 rounded-lg'>Submit</button>}
                </div >)
            }

        </>
    )
}

export default QuizPage