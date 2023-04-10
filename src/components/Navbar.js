import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode,faFire } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { Link } from "react-router-dom";



//  
const Navbar = () => {
  return (
    <nav className=' font-poppins flex justify-between items-center h-20 border-b-2 border-gray-400'>
        <div>
            <h4 className='px-3 font-bold text-3xl'><FontAwesomeIcon className='px-5' icon={faCode} />Leetik</h4>
        </div>
        <ul className='flex items-center space-x-10 px-10 text-lg '>
            <li>
            <Link to="/home" className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold'>Home</Link>
            </li>
            <li>
            <Link to="/students-tab" className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold'>Students</Link>
            </li>
            <li>
            <Link to="/courses-tab" className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold '>Lessons</Link>
            </li>
            <li>
            <Link to="/home"   className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold ' >      Create Quiz</Link>
            </li>
            <li>
            <Link to="/user-profile" className='text-2xl'><FontAwesomeIcon icon={faUser} /></Link>
            </li>
            <li>
            <Link to="/home" className='text-2xl'>   <FontAwesomeIcon icon={faFire} /></Link> 
            </li>
        </ul>
    </nav>
  )
}

export default Navbar