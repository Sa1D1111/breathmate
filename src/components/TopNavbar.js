import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWind, faChartLine, faCog, faQuestionCircle, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from './Context/ThemeContext';
import './TopNavbar.css';

const TopNavbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleGetStarted = () => {
    navigate('/custom-breathing');
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

        {/* Theme Toggle Button */}
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? (
            <>
              <FontAwesomeIcon icon={faMoon} /> Dark Mode
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faSun} /> Light Mode
            </>
          )}
        </button>

        {/* "Get Started" button */}
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;
