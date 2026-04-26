import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const OTPVerificationPage = () => {
//TODO: Connect with Firebase Authentication and backend

	const [otp, setOtp] = useState("");
	const navigate = useNavigate();
	const handleVerifyOTP = (e) => {
		e.preventDefault();
		console.log("Verifying OTP:", otp);
		navigate("/reset-password"); //TODO: verify OTP logic here
		// After successful verification, redirect to reset password page
	};

	return (
		<section className="hero-3d-bg bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 text-white px-4 sm:px-8 py-12 sm:py-20 relative overflow-hidden min-h-screen">
			<div className=" w-full sm:max-w-sm md:max-w-md mx-auto py-7 px-4 sm:px-6 lg:px-8 flex flex-col  relative z-10  bg-gray-800 text-white rounded-2xl ">
				<h2 className="text-2xl font-bold mb-6 text-center">
					Verify Your One Time Password (OTP)
				</h2>

				<form onSubmit={handleVerifyOTP} className="space-y-5">
					<label
						htmlFor="otp"
						className="block text-sm font-medium mb-1"
					>
						Verify OTP
					</label>
					<div>
						<input
							id="otp"
							type="text"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							placeholder="Enter your OTP"
							className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition duration-200"
					>
						Verify OTP
					</button>
				</form>
			</div>
		</section>
	);
};

export default OTPVerificationPage;
