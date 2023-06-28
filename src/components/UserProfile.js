import React from 'react'
import Navbar from './Navbar'
import { useCookies } from 'react-cookie';
import jwtDecode from "jwt-decode";
import { useState, useEffect } from 'react'
import UserService from '../service/UserService'
import { Link } from "react-router-dom";
import userService from '../service/UserService';




const UserProfile = () => {


  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  // console.log(cookies.jwt);
  // console.log(jwtDecode(cookies.jwt));
  // console.log(jwtDecode(cookies.jwt).sub);


  const [AddBioDto, setAddBioDto] = useState({
    email: jwtDecode(cookies.jwt).sub,
    bio: ''
  })

  const handleBioChange = (e) => {
    const value = e.target.value
    setAddBioDto({ ...AddBioDto, [e.target.name]: value })
    // console.log(bio);

  }

  const onKeyDown = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      console.log(AddBioDto)
      await userService.addBio(AddBioDto, cookies.jwt).then((response) => {
        console.log(response.data)
      }).catch((err) => {
        console.log(err)
      });
    }
  }


  const [laoding, setLaoding] = useState(true)

  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLaoding(true);
      try {
        const user = await UserService.getUserByEmail(jwtDecode(cookies.jwt).sub, cookies.jwt)
        setUser(user.data)
      } catch (err) {
        console.log(err)
      }
      setLaoding(false);
    };
    fetchData();
  }, []);

  // const saveUser = (e) => {
  //   e.preventDefault();

  //     let email=jwtDecode(cookies.jwt).sub
  //     UserService.getUserByEmail(email).then((response) => {
  //       console.log(response);
  //     }).catch((err) => {
  //       console.log(err);
  //     })

  //   }

  return (
    <>
      <Navbar></Navbar>
      <h1 className='px-44 text-4xl font-bold py-10   mb-16'> User Profile</h1>
      {!laoding && (
        <div className='pl-44 flex items-center justify-start'>
          <div>
            <div className='px-36 py-16  bg-gray-300  w-[560px]  rounded-lg'>
              <img className='  rounded-full w-28 absolute left-48 top-[295px]' src={user.photoURL} alt="Raton"></img>
              <p className=' text-2xl font-semibold'>{user.firstName} {user.lastName}</p>
            </div>
            <div className=' border-gray-400 flex justify-center items-center'>
              {/* <p className=' py-8 text-xl underline font-semibold flex justify-center items-center '>Change photo</p> */}
              <button className='outline-none border-none bg-transparent underline flex py-8 text-xl font-semibold  '> Change photo</button>
            </div>
          </div>
          <div className='pl-10  '>
            <div className='pb-20 w-2/4  '>
              <label className="font-semibold text-xl ">First name:</label>
              <input className="border-[2px] border-gray-900 rounded-md p-2 h-12 w-[500px]" type="text" id="fname" name="firstName" placeholder={user.firstName} />
            </div>
            <div className='w-2/4'>
              <label className="font-semibold text-xl">Last name:</label>
              <input className="border-[2px] border-gray-900 rounded-md p-2 h-12 w-[500px]" type="text" id="fname" name="firstName" placeholder={user.lastName} />
            </div>
          </div>
        </div>)}
      <div className=' border-gray-400 border-b-2 pt-24'></div>
      <div className='grid grid-cols-test grid-rows-4 gap-10 py-32  justify-start'>
        <p className=''></p>
        <p className='pl-28 text-xl font-semibold'>Short Bio</p>
        {/* <p className='text-xl underline font-semibold px-44 flex justify-start items-center'>Change password</p> */}
        <Link to="/change-email"> <button className='px-44 outline-none border-none bg-transparent underline text-xl font-semibold flex justify-start items-center '> Change e-mail</button></Link>
        <textarea placeholder='Write something about  yourself' className='ml-[100px]  border-2 row-span-3 border-b-2 text-lg border-black rounded-xl px-4 py-4' id='bio' name='bio' onChange={(e) => handleBioChange(e)} onKeyDown={(e) => onKeyDown(e)}></textarea>
        {/* <p className=' text-xl underline font-semibold  px-44  flex justify-start items-center'>Reset Password</p> */}
        {/* <p className=' text-xl underline font-semibold  px-44  flex justify-start items-center'>Change e-mail</p>  */}
        <Link to="/reset-password"> <button className='px-44 outline-none border-none bg-transparent underline text-xl font-semibold flex justify-start items-center '> Reset password</button></Link>
        <Link to="/change-password"> <button className='px-44 outline-none border-none bg-transparent underline text-xl font-semibold flex justify-start items-center '> Change password</button></Link>
      </div>
    </>
  )
}
//sa schimbi in plm marimea la coloane din tailwind.confing
export default UserProfile