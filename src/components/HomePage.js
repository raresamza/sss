import React from 'react'
import Navbar from './Navbar'
import {  useCookies } from 'react-cookie';


const HomePage = () => {


  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);



  console.log(cookies.mihai)



  return (
    <>
    <Navbar></Navbar>
    <p>Hello HOme</p>
    </>
    )
}

export default HomePage