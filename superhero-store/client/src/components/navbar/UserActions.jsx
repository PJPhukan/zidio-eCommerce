// src/components/UserActions.jsx
import React, { useState } from "react";

const UserActions = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="flex items-center space-x-1 sm:space-x-4">
      {/* Cart Icon */}
      <a
        href="/cart"
        className="relative p-1 sm:p-2 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300"
      >
        <svg
          className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 hover:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-md">
          3
        </span>
      </a>

      {/* Conditional Rendering */}
      {isSignedIn ? (
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Profile Icon */}
          <a
            href="/profile"
            className="text-gray-300 hover:text-blue-400 transition-all duration-300 p-1 sm:p-2 transform hover:scale-110 hover:-translate-y-1"
          >
            <svg
              className="w-5 sm:w-6 h-5 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </a>

          {/* Logout Icon */}
          <a
            href="/logout"
            className="text-gray-300 hover:text-blue-400 transition-all duration-300 p-1 sm:p-2 transform hover:scale-110 hover:-translate-y-1"
          >
            <svg
              className="w-5 sm:w-6 h-5 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
          </a>
        </div>
      ) : (
        <div className="flex items-center max-w-xs w-full">
          <a
            href="/signin"
            className="w-full px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base text-white bg-gray-800 hover:bg-blue-600 rounded-full text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Sign In
          </a>
        </div>
      )}

      {/* Temporary Toggle Button */}
      <button
        onClick={() => setIsSignedIn(!isSignedIn)}
        className="text-gray-300 text-sm hidden"
      >
        Toggle Sign-In
      </button>
    </div>
  );
};

export default UserActions;
