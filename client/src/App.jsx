// src/App.jsx

import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

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
import RecentOrders from "./components/admin/RecentOrders";
import LoginPage from "./components/authentication/LoginPage";
import SignupPage from "./components/authentication/SignupPage";
import ForgotPasswordPage from "./components/authentication/ForgetPassword";
import OTPVerificationPage from "./components/authentication/OTPVerificationPage";
import ResetPasswordPage from "./components/authentication/ResetPasswordPage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CategoriesPage from "./pages/CategoriesPage";
import DealsPage from "./pages/DealsPage";
import { CartProvider } from "./context/CartContext";

function AppContent() {
	// const authToken = localStorage.getItem("authToken");
	// const userRole = localStorage.getItem("userRole");
	// const isAdmin = userRole === "admin";
	const [isOpen, setIsOpen] = useState(true);
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const authToken = true;
	const adminParam = (query.get("admin") || "").toLowerCase();
	const isAdmin = adminParam === "true" || adminParam === "1";
	const backgroundLocation = location.state?.backgroundLocation;

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};
	return (
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
						<div className="mt-4">
							<Routes>
								<Route path="/" element={<Dashboard />} />
								<Route path="/orders" element={<RecentOrders />} />

								<Route
									path="/customers"
									element={<Customers />}
								/>
								<Route
									path="/analytics"
									element={<Analytics />}
								/>
								<Route path="/users" element={<Users />} />
								<Route path="*" element={<Dashboard />} />
							</Routes>
						</div>
						{/* <Footer /> */}
					</div>
				</div>
			) : (
				<>
					<Navbar />
					<Routes location={backgroundLocation || location}>
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
						<Route
							path="/products"
							element={<ProductListingPage />}
						/>
						<Route
							path="/products/:id"
							element={<ProductDetailPage />}
						/>
						<Route path="/categories" element={<CategoriesPage />} />
						<Route path="/deals" element={<DealsPage />} />
						<Route path="/cart" element={<CartPage />} />
					</Routes>
					{backgroundLocation && (
						<Routes>
							<Route path="/cart" element={<CartPage />} />
						</Routes>
					)}
				</>
			)}
		</div>
	);
}

function App() {
	return (
		<CartProvider>
			<BrowserRouter>
				<AppContent />
			</BrowserRouter>
		</CartProvider>
	);
}

export default App;
