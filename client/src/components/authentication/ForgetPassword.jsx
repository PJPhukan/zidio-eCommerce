import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
	//TODO: Connect with Firebase Authentication and backend
	// This page allows users to request a password reset link

	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Sending reset link to:", email);
		navigate("/verify-otp");
	};

	return (
		<section className="hero-3d-bg bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 text-white px-12 py-12 sm:py-20 relative overflow-hidden min-h-screen">
			<div className=" w-full sm:max-w-sm md:max-w-md mx-auto py-7 px-4 sm:px-6 lg:px-8 flex flex-col  relative z-10  bg-gray-800 text-white rounded-2xl ">
				<h2 className="text-2xl font-bold mb-6 text-center">
					Forgot Password
				</h2>

				<form onSubmit={handleSubmit} className="space-y-5">
					<label
						htmlFor="email"
						className="block text-sm font-medium mb-1"
					>
						Email Address
					</label>
					<div>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
							className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition duration-200"
					>
						Send Verification OTP
					</button>
				</form>

				<p className="mt-6 text-sm text-center">
					Remembered your password?{" "}
					<Link
						to="/signin"
						className="text-blue-400 hover:underline"
					>
						Login
					</Link>
				</p>
			</div>
		</section>
	);
};

export default ForgotPasswordPage;
