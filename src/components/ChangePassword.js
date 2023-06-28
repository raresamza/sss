import React from 'react'
import jwtDecode from "jwt-decode";
import { useCookies } from 'react-cookie';
import userService from '../service/UserService';
import Navbar from './Navbar';


const ChangePassword = () => {


    const [cookies] = useCookies(['cookie-name']);


    const changePassword = async (e) => {
        e.preventDefault();
        let responseText = document.getElementById("responseText")
        let changePasswordObject = {
            email: jwtDecode(cookies.jwt).sub,
            oldPassword: document.getElementById("oldPassword").value,
            newPassword: document.getElementById("newPassword").value
        }
        console.log(changePasswordObject)
        await userService.changePassword(changePasswordObject, cookies.jwt).then((response) => {
            console.log(response.data)
            console.log(response)
            if (response.statusCode === 200) {
                responseText.innerHTML = "Password changed successfully 🎉🎉"
            } else {
                responseText.innerHTML = "Bad data ⚠️⚠️"
            }


        });

    };



    return (
        <>
            <Navbar></Navbar>
            <h1 className='px-44 text-4xl font-bold py-10 mb-16'>Change Password</h1>
            <div className='flex items-center justify-center'>
                <div className='text-center'>
                    <p className='py-6 text-lg font-semibold'>Enter old password</p>
                    <div>
                        <input type="password" className="border-[2px] w-[28rem] border-gray-900 rounded-md p-2 mb-6" id="oldPassword" name="oldPassword" />
                    </div>
                    <div>
                        <p className='py-6 text-lg font-semibold'>Enter new password</p>
                        <input type="password" className="border-[2px] w-[28rem] border-gray-900 rounded-md p-2 mb-6" id="newPassword" name="newPassword" />
                    </div>
                    <div>
                        <p id="responseText"></p>
                    </div>
                    <button onClick={(e) => changePassword(e)} className="bg-green-600 rounded-lg h-12  w-36 align-left text-white hover:bg-green-700 font-semibold ">Update</button>
                </div>
            </div>
        </>
    )
}

export default ChangePassword