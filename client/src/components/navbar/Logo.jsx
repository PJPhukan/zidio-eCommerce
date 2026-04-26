// src/components/Logo.jsx
import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="text-2xl font-bold text-white transform hover:scale-105 transition-all duration-300">
      <Link to="/">Shop.com</Link>
    </div>
  );
};

export default Logo;
