// src/components/Navbar.jsx
import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 shadow-xl sticky top-0 z-50 transform hover:shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <NavLinks />
          <div className="flex items-center space-x-1 sm:space-x-4">
            <SearchBar />
            <UserActions />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
