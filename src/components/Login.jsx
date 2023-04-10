import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";

const Login = () => {
  // const nav = useNavigate()
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  let userData = {
    first_name: firstName,
    last_name: lastName
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('works');
    console.log(userData);
  };

  return (
    <>
      <Navbar></Navbar>
      <form className="flex flex-col max-w-[480px] mx-auto mt-[4rem]" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        <label className="font-semibold text-xl mb-2">First name:</label>
        <input className="border-[2px] border-gray-900 rounded-md p-2 mb-6" type="text" id="fname" name="fname" placeholder="John" onChange={e => setFirstName(e.target.value)} />
        <label className="font-semibold text-xl">Last name:</label>
        <input className="border-[2px] border-gray-900 rounded-md p-2 mb-6" type="text" id="lname" name="lname" placeholder="Doe" onChange={e => setLastName(e.target.value)} />
        <div className="flex gap-12 items-center mb-6">
          <Link to="/main-page"><input type="submit" value="Log in" className="px-6 py-3 bg-blue-700 cursor-pointer hover:bg-blue-600 hover:shadow-xl duration-150 font-semibold w-[max-content] rounded-lg" /></Link>
          <Link to="/forgot-password" className="underline font-semibold hover:text-gray-800 duration-150">Forgot password</Link>
        </div>
        <p className="text-md font-semibold">No account? <Link to="/sign-up" className="text-blue-700 hover:text-blue-600 duration-150 underline">Sign up</Link></p>
      </form>
    </>
  );
};

//3 ron

export default Login;
