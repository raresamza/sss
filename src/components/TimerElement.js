import React from 'react'

const TimerElement = ({ minutes, seconds }) => {
    return (

        <div className='flex py-20 text-md font-semibold top-1/2 right-6 fixed'>
            <p className='mr-5'>{minutes} minutes left</p>
            <p>{seconds} seconds left</p>
        </div>
    )
}

export default TimerElement