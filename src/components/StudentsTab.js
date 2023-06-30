import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import UserService from '../service/UserService'
import { useCookies } from 'react-cookie';

// import raton from '../../public/raton.jpeg'
// C:\Users\rares\Desktop\last-repo\public\WhatsApp Image 2023-03-10 at 20.12.17.jpeg

const StudentsTab = () => {

  const [cookies] = useCookies(['cookie-name']);


  const [laoding, setLaoding] = useState(true)

  const [students, setStudents] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLaoding(true);
      try {
        const students = await UserService.getStudentsBase(cookies.jwt);
        console.log(students.data);
        setStudents(students.data)
      } catch (err) {
        console.log(err)
      }
      setLaoding(false);
    };
    fetchData();
  }, []);






  return (
    <>
      <Navbar></Navbar>
      <p className='px-20 text-4xl font-bold py-10'>Your students:</p>
      <div className='px-20 py-6'>
        <table className='border-separate border-spacing-y-6'>
          {!laoding && (
            <tbody >
              {/* <tr>
            <td><img className='rounded-full w-24' src="/raton.jpeg" alt="Raton"></img></td>
            <td className='w-1/8 px-2 font-semibold text-2xl '>Rares</td>
            <td className='w-1/8 pl-2 font-semibold text-2xl'>Amza</td>
            <td className='px-1  scale-[3] font-thin' >|</td>
            <td className='w-1/8 pr-2 font-semibold text-2xl'>raresamza@gmail.com</td>
          </tr>
          <tr>
            <td><img className='rounded-full w-24' src="/raton.jpeg" alt="Raton"></img></td>
            <td className='w-1/8 px-2 font-semibold text-2xl '>Rares</td>
            <td className='w-1/8 pl-2 font-semibold text-2xl'>Amza</td>
            <td className='px-1  scale-[3] font-thin' >|</td>
            <td className='w-1/8 pr-2 font-semibold text-2xl'>raresamza@gmail.com</td>
          </tr>
          <tr>
            <td><img className='rounded-full w-24' src="/raton.jpeg" alt="Raton"></img></td>
            <td className='w-1/8 px-2 font-semibold text-2xl'>Rares</td>
            <td className='w-1/8 pl-2 font-semibold text-2xl'>Amza</td>
            <td className='px-1  scale-[3] font-thin' >|</td>
            <td className='w-1/8 pr-2 font-semibold text-2xl'>raresamza@gmail.com</td>
          </tr> */}

              {students.map((student) => (
                <tr key={student.id}>
                  {/* <td className='w-1/8 px-2 font-semibold text-lg'>poza</td> */}
                  <td><img className='rounded-full w-24' src={student.photoURL} alt="Raton"></img></td>
                  <td className='w-1/8 px-2 font-semibold text-2xl'>{student.firstName}</td>
                  <td className='w-1/8 pl-2 font-semibold text-2xl'>{student.lastName}</td>
                  <td className='px-1  scale-[3] font-thin' >|</td>
                  <td className='w-1/8 pr-2 font-semibold text-2xl'>{student.email}</td>
                </tr>))}
            </tbody>)}

        </table>
      </div>
    </>
  )
}

export default StudentsTab


