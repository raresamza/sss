import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import TimerElement from './TimerElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

const QuizPage = () => {


    let currentTime = (new Date()).getTime();
    let nextTime = currentTime + 1000 * 60 * 60

    const [minutesLeft, setMinutesLeft] = useState();
    const [validSubmission, setValidSubmission] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState();
    const [timeLeft, setTimeLeft] = useState(nextTime - currentTime);
    // const [timeLeft, setTimeLeft] = useState(10000);


    useEffect(() => {

        const intervalId = setInterval(() => {
            if (timeLeft > 0) {
                // console.log("Start")
                // console.log(timeLeft);
                setTimeLeft(timeLeft - 1000)
                // console.log(timeLeft)
                setMinutesLeft(Math.floor(timeLeft / 60000))
                setSecondsLeft(((timeLeft % 60000) / 1000).toFixed(0))
                // console.log("end")
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
            <div className='pr-72 pl-20 relative'>
                <p className='text-3xl py-10'>Quiz title</p>
                {validSubmission ? <TimerElement minutes={minutesLeft} seconds={secondsLeft}></TimerElement> : <TimerElement minutes={0} seconds={0}></TimerElement>}
                <textarea spellCheck={false} readOnly={true} className='mt-40 bg-black  w-full rounded-lg decoration-none border-none outline-none h-[800px] resize-none text-white px-4 py-4'></textarea>
                <h1 className='font-semibold pb-4'>Solution</h1>
                <div className='grid grid-cols-1 grid-rows mb-10'>
                    <textarea spellCheck={false} className=' bg-black  w-full rounded-t-lg decoration-none border-none outline-none h-[800px] resize-none text-white px-4 py-4'></textarea>
                    <div className='bg-gray-800 h-16 px-4 rounded-b-lg flex justify-end items-center  '>
                        <button className="bg-green-600 rounded-lg h-12  w-36 align-left text-white float-right hover:bg-green-700 "><span className="text-lg mr-3 ">Run</span> <FontAwesomeIcon icon={faPlay} /></button>
                    </div>
                </div>
                {validSubmission ? <button onClick={() => testClick()} className='hover:decoration-2 mb-10 bg-green-600 hover:bg-green-500 text-white font-semibold w-36 h-16 rounded-lg'>Submit</button> : <button className='hover:cursor-not-allowed mb-10 hover:decoration-2 bg-green-600 hover:bg-green-500 text-white font-semibold w-36 h-16 rounded-lg'>Submit</button>}
            </div>

        </>
    )
}

export default QuizPage