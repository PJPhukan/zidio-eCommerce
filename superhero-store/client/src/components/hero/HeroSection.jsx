// src/components/HeroSection.jsx
import React from "react";

const HeroSection = () => {
  return (
    <section className="hero-3d-bg bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 text-white py-12 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 transform hover:scale-105 transition-all duration-300">
          Discover Epic T-Shirts
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-2xl">
          Explore our exclusive collection inspired by Starry Night, Marvel, DC,
          and more!
        </p>
        <a
          href="/products"
          className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
