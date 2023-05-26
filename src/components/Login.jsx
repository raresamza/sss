import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
//if stop working add Cookies and withCookies  to the import statement from react-cookie
import Navbar from "./Navbar";
import UserService from "../service/UserService";


const Login = () => {







	const nav = useNavigate()
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
	const handleChange = (e) => {

		const value = e.target.value
		setUser({ ...user, [e.target.name]: value })
		console.log(user.email);
		console.log(user.password);

	}

	const authBaseUser = async (e) => {
		e.preventDefault();
		console.log(user);
		await UserService.authenticateBaseUser(user).then((response) => {
			let decodedToken = jwtDecode(response.data.access_token);
			setCookie("jwt", response.data.access_token, { path: "/", expires: new Date(decodedToken.exp * 1000) });
			nav("/courses-tab")
			window.location.reload();
			// setCookie("jwt-refresh", response.data.refresh_token, { path: "/", expires: new Date(decodedToken.exp * 1000) });
		}).catch((err) => {
			const loginInfo = document.getElementById("login-info");
			loginInfo.style.color = 'red';
			loginInfo.innerHTML = "Login failed, please enter the correct credentials ⚠️⚠️"
			console.log(err);
		})

	}




	return (
		<>
			<Navbar></Navbar>
			<form className="flex flex-col max-w-[480px] mx-auto mt-[4rem]" onSubmit={authBaseUser} >
				<h1 className="text-4xl font-bold mb-8">Login</h1>
				<label className="font-semibold text-xl mb-2">Email:</label>
				<input onChange={(e) => handleChange(e)} type="email" className="border-[2px] border-gray-900 rounded-md p-2 mb-6" id="ename" name="email" placeholder="johndoe@gmail.com" value={user.email} />
				<label className="font-semibold text-xl">Password:</label>
				<input onChange={(e) => handleChange(e)} className="border-[2px] border-gray-900 rounded-md p-2 mb-6" defaultValue={user.password} type="password" id="password" name="password" placeholder="Doe" />
				<p className="pb-4 font-semibold" id="login-info"></p>
				<div className="flex gap-12 items-center mb-6">
					<input type="submit" value="Log in" className="px-6 py-3 bg-blue-700 cursor-pointer hover:bg-blue-600 hover:shadow-xl duration-150 font-semibold w-[max-content] rounded-lg" />
					{/* <button onClick={(e) => getSessionStorage(e)} className="bg-green-600 rounded-lg h-12  w-36 align-left text-white float-right hover:bg-green-700 font-semibold ">Get session storage</button> */}
					<Link to="/forgot-password" className="underline font-semibold hover:text-gray-800 duration-150">Forgot password</Link>
				</div>
				<p className="text-md font-semibold">No account? <Link to="/sign-up" className="text-blue-700 hover:text-blue-600 duration-150 underline">Sign up</Link></p>
			</form>
		</>
	);
};

//3 ron

export default Login;
