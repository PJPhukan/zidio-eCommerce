// src/components/CategoryLinks.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryLinks = () => {
  const categories = [
    { name: "Oversized T-Shirts", path: "/products?category=oversized" },
    { name: "Crew Neck T-Shirts", path: "/products?category=crew-neck" },
    { name: "V-Neck T-Shirts", path: "/products?category=v-neck" },
    { name: "Hoodies", path: "/products?category=hoodies" },
    { name: "Sleeveless", path: "/products?category=sleeveless" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.section
      className="bg-gray-900 py-12 sm:py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-animate
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center"
          variants={cardVariants}
        >
          Shop by Category
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <motion.div key={category.name} variants={cardVariants}>
              <Link
                to={category.path}
                className="block bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
                aria-label={`Shop ${category.name}`}
              >
                <h3 className="text-sm sm:text-base font-semibold text-white">
                  {category.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CategoryLinks;
