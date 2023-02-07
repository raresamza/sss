import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

<FontAwesomeIcon icon="fa-solid fa-arrow-right" />


const Sidebar = () => {
  return (
    <>
    <div className='min-h-[100vh-80px] w-72 border-r-2 border-gray-400'>
        <ul className='mt-6'>
            <li className='text-lg font-bold px-4 underline'>1 - Ceva Titlu</li>
            <ul className='px-8 '>
                <li className='mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />Ceva1</li>
                <li className='mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />Ceva2</li>
                <li className='mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />Ceva3</li>
                <li className='mt-2 hover:text-blue-700 hover:cursor-pointer'>  <FontAwesomeIcon className='mr-2' icon={faArrowRight} />Ceva4</li>
            </ul>
        </ul>
        <ul className='py-8'>
            <li className='text-lg font-bold px-4 underline'>2 - Ceva Titlu</li>
            <ul className='px-8 '>
                <li className='mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />Ceva5</li>
                <li className='mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />Ceva6</li>
                <li className=' mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />Ceva7</li>
                <li className='mt-2 hover:text-blue-700 hover:cursor-pointer'> <FontAwesomeIcon className='mr-2' icon={faArrowRight} />Ceva8</li>
            </ul>
        </ul>
    </div>
    
    </>
  )
}

export default Sidebar