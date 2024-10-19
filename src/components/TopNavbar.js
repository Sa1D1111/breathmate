import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWind, faChartLine, faCog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import './TopNavbar.css';

const TopNavbar = () => {
  const navigate = useNavigate(); // Get navigate function from react-router-dom

  // Handle "Get Started" button click
  const handleGetStarted = () => {
    navigate('/custom-breathing'); // Navigate to the CustomBreathing page
  };

  return (
    <nav className="top-navbar">
      <div className="navbar-content">
        {/* Navigation links */}
        <ul className="nav-links">
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </li>
          <li>
            <Link to="/techniques">
              <FontAwesomeIcon icon={faWind} /> Breathing Techniques
            </Link>
          </li>
          <li>
            <Link to="/progress">
              <FontAwesomeIcon icon={faChartLine} /> Progress Tracker
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FontAwesomeIcon icon={faCog} /> Settings
            </Link>
          </li>
          <li>
            <Link to="/help">
              <FontAwesomeIcon icon={faQuestionCircle} /> Help
            </Link>
          </li>
        </ul>

        {/* "Get Started" button */}
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;
