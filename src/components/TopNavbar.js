// src/components/TopNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './TopNavbar.css'; // Ensure you have the right path to the CSS

const TopNavbar = () => {
  return (
    <nav className="top-navbar">
      <div className="navbar-content">
        <span className="logo">BreathMate</span>
        <ul className="nav-links">
          
        </ul>
        {/* Use the Link component to navigate to Breathing Techniques */}
        <Link to="/techniques">
          <button className="get-started-btn">Get Started</button>
        </Link>
      </div>
    </nav>
  );
};

export default TopNavbar;
