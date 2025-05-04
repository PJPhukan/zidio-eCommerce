// src/components/SearchBar.jsx
import React from "react";

const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        className="w-40 sm:w-64 pl-10 pr-4 py-2 rounded-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transition-all duration-300"
      />
      <svg
        className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-all duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
  );
};

export default SearchBar;
