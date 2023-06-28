import React from "react";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from "react";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import UserService from "../service/UserService";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { useCookies } from 'react-cookie';



const Register = (event) => {

  const [cookies] = useCookies(['cookie-name']);


  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    uniName: "",
    age: "",
    email: "",
    password: "",
    photoURL: ""

  });

  const handleChange = (e) => {

    const value = e.target.value
    setUser({ ...user, [e.target.name]: value })
    console.log(user.password);

  }

  const regInt = new RegExp("^[0-9]+$")
  const regString = new RegExp("^\\p{L}+$", 'u')
  const regMail = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")






  function checkString() {

    let isValid = true;

    const stringFields = [];

    const firstName = document.getElementById("fname");
    const lastName = document.getElementById("lname");
    const uni = document.getElementById("uname");


    stringFields.push(firstName, lastName, uni);
    stringFields.forEach(el => {
      if (!regString.test(el.value)) {
        isValid = false
        el.style.borderColor = "red"
      } else if (regString.test(el.value)) {
        el.style.borderColor = "black"
      }


    })
    return isValid;
  }
  function checkMail() {
    let isValid = true;
    const emal = document.getElementById("ename");

    if (!regMail.test(emal.value)) {
      emal.style.borderColor = "red"
      isValid = false
    } else if (regMail.test(emal.value)) {
      emal.style.borderColor = "black"
    }

    return isValid;
  }

  function checkAge() {
    let isValid = true;
    const age = document.getElementById("aname");
    if (!regInt.test(age.value)) {
      console.log("getred")
      age.style.borderColor = "#FF0000"
      isValid = false
    } else if (regInt.test(age.value)) {
      age.style.borderColor = "black"
    }

    return isValid;
  }






  function togglePassword(e) {
    e.preventDefault();

    // el represents the input element
    const el = document.getElementById("pname");

    // Switch element's type on click
    if (el.type === "password") {
      el.type = "text";
    } else {
      el.type = "password";
    }
  }

  function togglePasswordConfirm(e) {
    e.preventDefault();

    // el represents the input element
    const el = document.getElementById("pcname");

    // Switch element's type on click
    if (el.type === "password") {
      el.type = "text";
    } else {
      el.type = "password";
    }
  }

  // const saveUser = (e) => {
  //   e.preventDefault();
  //   checkAge()
  //   checkMail()
  //   checkString()
  //   if(checkAge() && checkMail() && checkString()) {
  //     UserService.saveUser(user).then((response) => {
  //       console.log(response);
  //     }).catch((err) => {
  //       console.log(err);
  //     })

  //   }

  // }
  // const saveBaseUser = (e) => {
  //   e.preventDefault();
  //   checkAge()
  //   checkMail()
  //   checkString()
  //   if(checkAge() && checkMail() && checkString()) {
  //     UserService.saveUserBase(user).then((response) => {
  //       console.log(response);
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  //   }
  // }

  const saveBaseUserPhoto = (e) => {
    e.preventDefault();

    checkAge()
    checkMail()
    checkString()
    // checkURL();
    if (checkAge() && checkMail() && checkString()) {
      UserService.saveUserBasePhoto(user).then((response) => {
        console.log(response);
        // console.log("testing user url: "+ user.photoURL);
      }).catch((err) => {
        console.log(err);
      })
    }

  }

  // function checkURL() {
  //   let isValid=true;
  //   const photo = document.getElementById("photo");
  //   // const photo2= window.getComputedStyle(photo, "::file-selector-button");
  //   // console.log(photo);
  //   if (user.photoURL!==null || user.photoURL!=="") {
  //     isValid=false;
  //     // photo2.style.background = "#FF00FF";
  //     // console.log(photo2);

  //   }

  //   return isValid;

  // }

  const saveBoth = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    getDownloadURL(sotrageRef).then((downloadURL) => {
      console.log(downloadURL)
      user.photoURL = downloadURL;
      console.log("user url in function before save: " + user.photoURL);
      saveBaseUserPhoto(e)
    });
  }

  return (
    <>
      <Navbar></Navbar>
      {/* <form className="max-w-[480px] mx-auto mt-[4rem] " onSubmit={formHandler}>
        <input type="file" id="photo" className="file:border-none file:hover:shadow-xl file:bg-blue-700 cursor-pointer font-semibold w-[max-content] rounded-lg file:rounded-lg file:hover:bg-blue-600 file:px-6 file:py-3" />
        <button className="hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold" type="submit">Upload</button>
      </form> */}
      {/* { formHandler(e); saveBaseUserPhoto(e);} */}
      <form onSubmit={saveBoth} className="flex flex-col max-w-[480px] mx-auto mt-[4rem]">
        <input type="file" id="photo" className="file:border-none file:hover:shadow-xl file:bg-blue-700 cursor-pointer font-semibold w-[max-content] rounded-lg file:rounded-lg file:hover:bg-blue-600 file:px-6 file:py-3" />
        <h1 className="text-4xl font-bold mb-8">Register</h1>
        <label className="font-semibold text-xl mb-2">First name:</label>
        <input onChange={(e) => handleChange(e)} className="border-[2px] border-gray-900 rounded-md p-2 mb-6" type="text" id="fname" name="firstName" placeholder="John" value={user.firstName} />
        <label className="font-semibold text-xl">Last name:</label>
        <input onChange={(e) => handleChange(e)} className="border-[2px] border-gray-900 rounded-md p-2 mb-6" type="text" id="lname" name="lastName" placeholder="Doe" value={user.lastName} />
        <label className="font-semibold text-xl">University name:</label>
        <input onChange={(e) => handleChange(e)} className="border-[2px] border-gray-900 rounded-md p-2 mb-6" type="text" id="uname" name="uniName" placeholder="UPT" value={user.uniName} />
        <label className="font-semibold text-xl">Age:</label>
        <input onChange={(e) => handleChange(e)} className="border-[2px] border-gray-900 rounded-md p-2 mb-6" type="text" id="aname" name="age" placeholder="21" value={user.age} />
        <label className="font-semibold text-xl">Email:</label>
        <input onChange={(e) => handleChange(e)} type="email" className="border-[2px] border-gray-900 rounded-md p-2 mb-6" id="ename" name="email" placeholder="johndoe@gmail.com" value={user.email} />
        <label className="font-semibold text-xl">Password:</label>


        <div className="protectedInput flex rounded-md hover:shadow-lg border-2 border-black mb-6">
          <input onChange={(e) => handleChange(e)} type="password" name="password" id="pname" placeholder="**************" defaultValue={user.password} className="bg-transparent w-full rounded-tl-md rounded-bl-md px-2 focus:outline-none focus:shadow-md" />
          <button onClick={(e) => { togglePassword(e) }} className="bg-gray-100 px-4 py-2 rounded-tr-md rounded-br-md">
            <FontAwesomeIcon icon={faEyeSlash} />
          </button>
        </div>




        {/* <input  className="border-[2px] border-gray-900 rounded-md p-2 mb-6"  type="password"  id="pname"  name="password"   placeholder="**************"/> */}
        <label className="font-semibold text-xl">Confirm password:</label>



        <div className="protectedInput flex rounded-md hover:shadow-lg border-2 border-black mb-6">
          <input onChange={(e) => handleChange(e)} type="password" name="pcname" id="pcname" placeholder="**************" className="bg-transparent w-full rounded-tl-md rounded-bl-md px-2 focus:outline-none focus:shadow-md" />
          <button onClick={(e) => { togglePasswordConfirm(e) }} className="bg-gray-100 px-4 py-2 rounded-tr-md rounded-br-md">
            <FontAwesomeIcon icon={faEyeSlash} />
          </button>
        </div>



        {/* <input  className="border-[2px] border-gray-900 rounded-md p-2 mb-6"  type="password"  id="pcname"  name="pcname"  placeholder="**************"/> */}
        <div className="flex gap-12 items-center mb-6">
          <input type="submit" value="Register" className="px-6 py-3 bg-blue-700 cursor-pointer hover:bg-blue-600 hover:shadow-xl duration-150 font-semibold w-[max-content] rounded-lg" />
        </div>
        <div className="flex gap-12 items-center mb-6">
          <input type="submit" value="Test" className="px-6 py-3 bg-blue-700 cursor-pointer hover:bg-blue-600 hover:shadow-xl duration-150 font-semibold w-[max-content] rounded-lg" />
        </div>
        {/* <ProtectedTextInput name="password" id="password" placeholder="password" /> */}
      </form>

    </>
  );
};

export default Register;
