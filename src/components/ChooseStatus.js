import React from 'react'
import Navbar from "./Navbar";
import { Link } from "react-router-dom";



const ChooseStatus = () => {
  return (
    <>
        <Navbar></Navbar>
        <h1 className='text-4xl text-bold mt-[6rem] text-center'>What will you role be with this account?</h1>
        <div className='text-center mt-12 justify-center px-6 flex gap-12'>
        <Link to="/sign-up/teacher"><button className='text-xl px-10  text-center py-3 bg-green-500 rounded-lg'>Teacher</button></Link>
        <Link to="/sign-up/student"><button className='text-xl px-10  text-center py-3 bg-green-500 rounded-lg'>Student</button></Link>
        </div>
    </>
    )
}

export default ChooseStatus