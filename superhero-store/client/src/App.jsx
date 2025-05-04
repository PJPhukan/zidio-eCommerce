// src/App.jsx
import React from "react";
import Navbar from "./components/navbar/Navbar";
import HeroSection from "./components/hero/HeroSection";
import CategoryLinks from "./components/hero/CategoryLinks";
import FeaturedProducts from "./components/hero/FeaturedProducts";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoryLinks />
      <FeaturedProducts />
    </div>
  );
}

export default App;
