// src/components/CategoryLinks.jsx
import React from "react";

const CategoryLinks = () => {
  const categories = [
    { name: "Crew Neck", href: "/category/crew-neck", icon: "👕" },
    { name: "V-Neck", href: "/category/v-neck", icon: "👕" },
    { name: "Hoodies", href: "/category/hoodies", icon: "🧥" },
    { name: "Marvel", href: "/category/marvel", icon: "🦸‍♂️" },
    { name: "DC Comics", href: "/category/dc", icon: "🦸‍♀️" },
    { name: "Starry Night", href: "/category/starry-night", icon: "🌌" },
  ];

  return (
    <section className="bg-gray-900 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center transform hover:scale-105 transition-all duration-300">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.href}
              className="bg-gray-800 text-white rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
            >
              <span className="text-2xl sm:text-3xl mb-2">{category.icon}</span>
              <span className="text-sm sm:text-base font-medium text-center">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryLinks;
