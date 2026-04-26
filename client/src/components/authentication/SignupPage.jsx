import { useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { facebookProvider, googleProvider } from "../../config/firebase";

const SignupPage = () => {
	//TODO: Connect with Firebase Authentication and backend
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignup = (e) => {
		e.preventDefault();
		console.log("Signing up with", name, email, password);
	};

	const HandleSignUpWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			console.log("Google Login Success:", result.user);
		} catch (error) {
			console.error("Google Login Error:", error);
		}
	};

	const HandleSignUpWithFacebook = async () => {
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
			method: HandleSignUpWithGoogle,
			color: "#4285F4",
			backgroundColor: "#F5F5F5",
		},
		{
			name: "Facebook",
			icon: FaFacebookF,
			provider: facebookProvider,
			method: HandleSignUpWithFacebook,
			color: "#3b5998",
			backgroundColor: "#F5F5F5",
		},
	];

	return (
		<section className="hero-3d-bg bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 text-white px-4 sm:px-8 py-12 sm:py-20 relative overflow-hidden min-h-screen">
			<div className=" w-full sm:max-w-sm md:max-w-md mx-auto py-7 px-4 sm:px-6 lg:px-8 flex flex-col  relative z-10  bg-gray-800 text-white rounded-2xl ">
				<h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
				<form onSubmit={handleSignup} className="space-y-5">
					<label
						htmlFor="name"
						className="block text-sm font-medium mb-1"
					>
						Name
					</label>
					<div>
						<input
							id="name"
							type="text"
							placeholder="Enter your name"
							className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
					<label
						htmlFor="email"
						className="block text-sm font-medium mb-1"
					>
						Email
					</label>
					<div>
						<input
							id="email"
							type="email"
							placeholder="Enter your email"
							className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<label
						htmlFor="password"
						className="block text-sm font-medium mb-1"
					>
						Password
					</label>
					<div>
						<input
							id="password"
							type="password"
							placeholder="Enter your password"
							className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition duration-200"
					>
						Sign Up
					</button>
				</form>
				<div className="flex items-center justify-center mt-4 gap-3">
					<span className="h-[2px] w-full bg-gray-300 rounded-2xl inline-block"></span>
					<span className="text-md text-nowrap">Sign Up With </span>
					<span className="h-[2px] w-full bg-gray-300 rounded-2xl inline-block"></span>
				</div>
				{/* Social Login Buttons */}
				<div className="mt-6 space-y-3 flex justify-center gap-3">
					{SignInWithOptions.map((option) => (
						<button
							className="bg-gray-200 cursor-pointer hover:bg-gray-300 transition duration-200 rounded-full flex items-center justify-center h-full "
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
					Already have an account?{" "}
					<Link to="/signin" className="text-blue-400 ">
						Login
					</Link>
				</p>
			</div>
		</section>
	);
};

export default SignupPage;
