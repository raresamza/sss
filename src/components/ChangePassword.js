import React from 'react'
import jwtDecode from "jwt-decode";
import {  useCookies } from 'react-cookie';
import userService from '../service/UserService';


const ChangePassword = () => {


    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);


    const changePassword= async (e) => {
        e.preventDefault();
        let changePasswordObject={email:jwtDecode(cookies.jwt).sub,oldPassword:document.getElementById("oldPassword").value,newPassword:document.getElementById("newPassword").value}
        console.log(changePasswordObject)
        await userService.changePassword(changePasswordObject).then((response)=> {
            console.log(response.data)
            console.log(response)
        });
    };



  return (
    <>
        <h1 className='px-44 text-4xl font-bold py-10 mb-16'>Change Password</h1>
        <div className='flex items-center justify-center'>
            <div className='text-center'>
                <p className='py-6 text-lg font-semibold'>Enter old password</p>
                <div>
                    <input type="password"  className="border-[2px] w-[28rem] border-gray-900 rounded-md p-2 mb-6"  id="oldPassword"  name="oldPassword"/>
                </div>
                <div>
                <p className='py-6 text-lg font-semibold'>Enter new password</p>
                <input type="password"  className="border-[2px] w-[28rem] border-gray-900 rounded-md p-2 mb-6"  id="newPassword"  name="newPassword"/>
                </div>
                <button onClick={(e)=>changePassword(e)} className="bg-green-600 rounded-lg h-12  w-36 align-left text-white hover:bg-green-700 font-semibold ">Update</button> 
            </div>
        </div>
        </>
  )
}

export default ChangePassword