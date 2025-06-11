// src/components/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.section
      className="bg-gray-900 py-12 sm:py-16 hero-3d-bg"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
      data-animate
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6"
          variants={childVariants}
        >
          Discover Your Style
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto"
          variants={childVariants}
        >
          Explore our premium collection of T-Shirts and Hoodies designed for
          comfort and style.
        </motion.p>
        <motion.div variants={childVariants}>
          <Link
            to="/products"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            aria-label="Shop now"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
