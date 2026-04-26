import { useState } from "react";

const ResetPasswordPage = () => {
  //TODO: Connect with Firebase Authentication and backend
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");

	const handleReset = (e) => {
		e.preventDefault();
		if (password !== confirm) {
			alert("Passwords do not match");
			return;
		}
		console.log("Resetting password to:", password);
	};

	return (
		<section className="hero-3d-bg bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 text-white px-4 sm:px-8 py-12 sm:py-20 relative overflow-hidden min-h-screen">
			<div className=" w-full sm:max-w-sm md:max-w-md mx-auto py-7 px-4 sm:px-6 lg:px-8 flex flex-col  relative z-10  bg-gray-800 text-white rounded-2xl ">
				{" "}
				<h2 className="text-2xl font-bold mb-6 text-center">
					Reset Password
				</h2>
				<form onSubmit={handleReset}>
					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-sm font-medium mb-1"
						>
							New Password
						</label>
						<input
							id="password"
							type="text"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your new password"
							className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
							required
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="confirm-password"
							className="block text-sm font-medium mb-1"
						>
							Confirm Password
						</label>
						<input
							id="confirm-password"
							type="text"
							value={confirm}
							onChange={(e) => setConfirm(e.target.value)}
							placeholder="Enter your confirm password"
							className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full mt-5 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition duration-200"
					>
						Reset Password
					</button>
				</form>
			</div>
		</section>
	);
};

export default ResetPasswordPage;
