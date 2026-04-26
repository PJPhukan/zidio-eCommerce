import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";
import {
	auth,
	googleProvider,
	facebookProvider,
	signInWithPopup,
} from "../../config/firebase.js";

const LoginPage = () => {
//TODO: Connect with Firebase Authentication and backend

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		console.log("Logging in with", email, password);
	};

	const HandleSignInWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			console.log("Google Login Success:", result.user);
		} catch (error) {
			console.error("Google Login Error:", error);
		}
	};

	const HandleSignInWithFacebook = async () => {
		try {
			const result = await signInWithPopup(auth, facebookProvider);
			console.log("Facebook Login Success:", result.user);
		} catch (error) {
			console.error("Facebook Login Error:", error);
		}
	};

	const SignInWithOptions = [
		{
			name: "Google",
			icon: FaGoogle,
			provider: googleProvider,
			method: HandleSignInWithGoogle,
			color: "#4285F4",
			backgroundColor: "#F5F5F5",
		},
		{
			name: "Facebook",
			icon: FaFacebookF,
			provider: facebookProvider,
			method: HandleSignInWithFacebook,
			color: "#3b5998",
			backgroundColor: "#F5F5F5",
		},
	];
	return (
		<section className="hero-3d-bg bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 text-white px-4 sm:px-8 py-12 sm:py-20 relative overflow-hidden min-h-screen">
			<div className=" w-full sm:max-w-sm md:max-w-md mx-auto py-7 px-4 sm:px-6 lg:px-8 flex flex-col  relative z-10  bg-gray-800 text-white rounded-2xl ">
				<h2 className="text-3xl font-bold text-center ">Log in.</h2>
				<p className="text-sm text-gray-200 text-center mb-6">Welcome back!</p>

				<form onSubmit={handleLogin} className="space-y-5">
					<label className="block mb-1 text-sm font-medium">
						Email
					</label>
					<input
						type="email"
						placeholder="Enter your email"
						className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<label className="block mb-1 text-sm font-medium">
						Password
					</label>
					<input
						type="password"
						placeholder="Enter your password"
						className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition "
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<p>
						<Link
							to="/forgot-password"
							className="  flex justify-end text-md text-white hover:text-blue-500 mt-[-10px] font-semibold transition duration-200"
						>
							Forgot your password?
						</Link>
					</p>

					<button
						type="submit"
						className="mt-5 w-full text-md bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white font-semibold transition duration-200 cursor-pointer"
					>
						Login
					</button>
				</form>
				<div className="flex items-center justify-center mt-4 gap-3">
					<span className="h-[2px] w-full bg-gray-300 rounded-2xl inline-block"></span>
					<span className="text-md text-nowrap">Sign In With </span>
					<span className="h-[2px] w-full bg-gray-300 rounded-2xl inline-block"></span>
				</div>
				{/* Social Login Buttons */}
				<div className="mt-6 space-y-3 flex justify-center gap-3">
					{SignInWithOptions.map((option) => (
						<button
							className="bg-gray-200 hover:bg-gray-300 transition duration-200 rounded-full flex items-center justify-center h-full cursor-pointer "
							onClick={option.method}
							key={option.name}
						>
							<span
								style={{
									color: option.color,
									backgroundColor: option.backgroundColor,
									padding: "15px",
									borderRadius: "50%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<option.icon />
							</span>
							
						</button>
					))}
				</div>
				<p className="pt-8 text-center text-md text-gray-400 font-semibold">
					Don't have an account?{" "}
					<Link
						to="/signup"
						className="text-blue-400 "
					>
						Sign Up
					</Link>
				</p>
			</div>
		</section>
	);
};

export default LoginPage;
