import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faFire } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';





//  
const Navbar = () => {

  const [cookies] = useCookies(['cookie-name']);



  return (
    <nav className=' font-poppins flex justify-between items-center h-20 border-b-2 border-gray-400'>
      <div>
        <h4 className='px-3 font-bold text-3xl'><FontAwesomeIcon className='px-5' icon={faCode} />Leetik</h4>
      </div>
      <ul className='flex items-center space-x-10 px-10 text-lg '>
        <li>
          {/* {lectureZustand !== null ? <p className='pb-4' >{lectureZustand.content}</p> : <p className='pb-4' >{courseZustand.lectures[0].content}</p>} */}
          {cookies.jwt !== undefined ? <Link to="/home" className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold'>Home</Link> : <h1 className='hover:cursor-not-allowed  hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold hover:underline'>Home</h1>}
          {/* <Link to="/home" className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold'>Home</Link> */}
        </li>
        <li>
          {cookies.jwt !== undefined ? <Link to="/students-tab" className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold'>Students</Link> : <h1 className='hover:cursor-not-allowed  hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold hover:underline'>Students</h1>}
          {/* <Link to="/students-tab" className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold'>Students</Link> */}
        </li>
        <li>
          {cookies.jwt !== undefined ? <Link to="/courses-tab" className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold'>Lessons</Link> : <h1 className='hover:cursor-not-allowed  hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold hover:underline'>Lessons</h1>}
          {/* <Link to="/courses-tab" className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold '>Lessons</Link> */}
        </li>
        <li>
          {cookies.jwt !== undefined ? <Link to="/create-quiz" className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold'>Create Quiz</Link> : <h1 className='hover:cursor-not-allowed  hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold hover:underline'>Create Quiz</h1>}
          {/* <Link to="/home" className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold ' >      Create Quiz</Link> */}
        </li>
        <li>
          {cookies.jwt !== undefined ? <Link to="/quiz-page" className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold'>Take Quiz</Link> : <h1 className='hover:cursor-not-allowed  hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold hover:underline'>Take Quiz </h1>}

        </li>
        <li>
          {cookies.jwt !== undefined ? <Link to="/user-profile" className=' text-2xl hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold'><FontAwesomeIcon icon={faUser} /></Link> : <h1 className='hover:cursor-not-allowed  hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:underline hover:font-bold text-2xl'><FontAwesomeIcon icon={faUser} /></h1>}
          {/* <Link to="/user-profile" className='text-2xl'><FontAwesomeIcon icon={faUser} /></Link> */}
        </li>

        <li>
          <Link to="/home" className='text-2xl'>   <FontAwesomeIcon icon={faFire} /></Link>



        </li>
      </ul>
    </nav>
  )
}

export default Navbar