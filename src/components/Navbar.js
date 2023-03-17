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
            <Link to="/home"><a className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold'>Home</a></Link>
            </li>
            <li>
            <Link to="/students-tab"><a className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold' href='#'>Students</a></Link>
            </li>
            <li>
            <Link to="/courses-tab"><a className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold ' href='#'>Lessons</a></Link>
            </li>
            <li>
                <a className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold ' href='#'>Create Quiz</a>
            </li>
            <li>
            <Link to="/user-profile"><a className='text-2xl' href='#'><FontAwesomeIcon icon={faUser} /></a></Link>
            </li>
            <li>
                <a className='text-2xl' href='#'><FontAwesomeIcon icon={faFire} /></a>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar