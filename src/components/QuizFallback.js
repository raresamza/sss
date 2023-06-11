import React from 'react'
import Navbar from './Navbar'

const QuizFallback = () => {
    return (
        <>
            <Navbar />
            <h1 className='text-3xl px-44 pt-10 text-red-600 font-semibold'>Your user is not eligible for taking a test,please talk to your teacher</h1>
        </>
    )
}

export default QuizFallback