import React from 'react'
import jwtDecode from "jwt-decode";
import { useCookies } from 'react-cookie';
import { useState } from "react";
import userService from '../service/UserService';
import Navbar from './Navbar';

const ChangeEmail = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    const regMail = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")


    // const [email, setEmail] = useState({
    //     oldEmail: jwtDecode(cookies.jwt).sub,
    //     newEmail: "",
    //   });

    // const handleChange = (e) => {

    //     const value = e.target.value
    //     setEmail({ ...email, [e.target.name]: value })
    //     console.log(email.email);

    //   }

    function checkMail() {
        let isValid = true;
        const emal = document.getElementById("email");

        if (!regMail.test(emal.value)) {
            emal.style.borderColor = "red"
            isValid = false
        } else if (regMail.test(emal.value)) {
            emal.style.borderColor = "black"
        }

        return isValid;
    }


    const updateEmail = async (e) => {
        e.preventDefault();
        let email = { oldEmail: jwtDecode(cookies.jwt).sub, newEmail: document.getElementById("email").value }


        if (checkMail()) {
            console.log(email);
            console.log("email")
            await userService.changeEmail(email, cookies.jwt).then((response) => {
                console.log(response.data)
            });
            //  userService.getUserByEmail(jwtDecode(cookies.jwt).sub)
            // console.log("user email: "+user);
            // let user = await userService.getUserByEmail(email.newEmail)
            let user = { email: email.newEmail, password: document.getElementById("password").value }
            console.log(user)
            console.log("user")
            await userService.authenticateBaseUser(user).then((response) => {
                let decodedToken = jwtDecode(response.data.access_token);
                console.log("new token data: " + decodedToken.sub);
                setCookie("jwt", response.data.access_token, { path: "/", expires: new Date(decodedToken.exp * 1000) });
            }).catch((err) => {
                console.log(err);
            })
        }
    };


    return (
        <>
            <Navbar></Navbar>
            <h1 className='px-44 text-4xl font-bold py-10 mb-16'>Change Email</h1>
            <div className='flex items-center justify-center'>
                <div className='text-center'>
                    <p className='py-6 text-lg font-semibold'>Enter new e-mail</p>
                    <div>
                        <input type="email" className="border-[2px] w-[28rem] border-gray-900 rounded-md p-2 mb-6" id="email" name="email" />
                    </div>
                    <div>
                        <p className='py-6 text-lg font-semibold'>Re-enter password</p>
                        <input type="password" className="border-[2px] w-[28rem] border-gray-900 rounded-md p-2 mb-6" id="password" name="password" />
                    </div>
                    <button onClick={(e) => updateEmail(e)} className="bg-green-600 rounded-lg h-12  w-36 align-left text-white hover:bg-green-700 font-semibold ">Update</button>
                </div>
            </div>
        </>
    )
}

export default ChangeEmail


