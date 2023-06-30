import React from 'react'
import Navbar from './Navbar'
import { useCookies } from 'react-cookie';
import { useState } from 'react'
import userService from '../service/UserService'
import jwtDecode from 'jwt-decode';
const ResetPassword = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  const [newPassword, setNewPassword] = useState({
    email: ""
  });

  const handleChange = (e) => {
    const value = e.target.value
    setNewPassword({ ...newPassword, [e.target.name]: value })
    console.log(newPassword);
  }

  const resetPassword = async (e) => {
    e.preventDefault();
    await userService.resetRequest(jwtDecode(cookies.jwt).sub, cookies.jwt)
  }



  return (
    <>
      <Navbar></Navbar>
      <h1 className='px-44 text-4xl font-bold py-10 mb-16'>Reset Password</h1>
      <div className='flex items-center justify-center'>
        {/* <div className='text-center'>
          <p className='py-6 text-lg font-semibold'>Enter new password</p>
          <div>
            <input type="password" onChange={(e) => handleChange(e)} className="border-[2px] w-[28rem] border-gray-900 rounded-md p-2 mb-6" id="oldPassword" name="oldPassword" />
          </div>
          <button className="bg-green-600 rounded-lg h-12  w-36 align-left text-white hover:bg-green-700 font-semibold ">Update</button>
        </div> */}
        <p className='py-6 text-4xl font-semibold text-green-600'>Mail sent! Check your email for further details</p>
      </div>
    </>
  )
}

export default ResetPassword