// src/App.jsx

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import HeroSection from "./components/hero/HeroSection";
import CategoryLinks from "./components/hero/CategoryLinks";
import FeaturedProducts from "./components/hero/FeaturedProducts";

import Sidebar from "./components/admin/Sidebar";
import AdminTopbar from "./components/admin/Topbar";
import Dashboard from "./components/admin/Dashboard";
import Analytics from "./components/admin/Analytics";
import Footer from "./components/admin/Footer";
import Customers from "./components/admin/Customers";
import Users from "./components/admin/Users";
import LoginPage from "./components/authentication/LoginPage";
import SignupPage from "./components/authentication/SignupPage";
import ForgotPasswordPage from "./components/authentication/ForgetPassword";
import OTPVerificationPage from "./components/authentication/OTPVerificationPage";
import ResetPasswordPage from "./components/authentication/ResetPasswordPage";

import Users from "./components/admin/Users";




function App() {
	// const authToken = localStorage.getItem("authToken");
	// const userRole = localStorage.getItem("userRole");
	// const isAdmin = userRole === "admin";
	const [isOpen, setIsOpen] = useState(true);
	const authToken = false;
	const isAdmin = false;

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};
	return (
		<BrowserRouter>
			<div className="bg-gray-900 min-h-screen">
				{isAdmin && authToken ? (
					<div className="flex bg-gray-900 text-white">
						<Sidebar
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							toggleSidebar={toggleSidebar}
						/>

						{/* Main Content */}
						<div className="flex-1 p-4  md:ml-0">
							<AdminTopbar toggleSidebar={toggleSidebar} />
							<Routes>
								<Route path="/" element={<Dashboard />} />

								<Route
									path="/customers"
									element={<Customers />}
								/>
								<Route
									path="/analytics"
									element={<Analytics />}
								/>
								<Route path="/users" element={<Users />} />
							</Routes>
							<Footer />
						</div>
					</div>
				) : (
					<>
						<Navbar />
						<Routes>
							<Route
								path="/"
								element={
									<>
										<HeroSection />
										<CategoryLinks />
										<FeaturedProducts />
									</>
								}
							/>

							<Route path="/signin" element={<LoginPage />} />
							<Route path="/signup" element={<SignupPage />} />
							<Route
								path="/forgot-password"
								element={<ForgotPasswordPage />}
							/>
							<Route
								path="/verify-otp"
								element={<OTPVerificationPage />}
							/>
							<Route
								path="/reset-password"
								element={<ResetPasswordPage />}
							/>
						</Routes>
						{/* <Route path="/products" element={<ProductListingPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} /> */}
					</>
				)}
			</div>
		</BrowserRouter>
	);
}

export default App;
