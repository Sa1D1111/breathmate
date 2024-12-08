import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWind, faChartLine, faQuestionCircle, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from './Context/ThemeContext';
import './TopNavbar.css';

const TopNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleGetStarted = () => {
    navigate('/custom-breathing');
  };

  const isActive = (path) => location.pathname === path; // Check active path

  return (
    <nav className="top-navbar">
      <div className="navbar-content">
        {/* Navigation links */}
        <ul className="nav-links">
          <li className={isActive('/') ? 'active' : ''}>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </li>
          <li className={isActive('/techniques') ? 'active' : ''}>
            <Link to="/techniques">
              <FontAwesomeIcon icon={faWind} /> Breathing Techniques
            </Link>
          </li>
          <li className={isActive('/progress') ? 'active' : ''}>
            <Link to="/progress">
              <FontAwesomeIcon icon={faChartLine} /> Progress Tracker
            </Link>
          </li>
          <li className={isActive('/help') ? 'active' : ''}>
            <Link to="/help">
              <FontAwesomeIcon icon={faQuestionCircle} /> Help
            </Link>
          </li>
        </ul>

        {/* "Get Started" button */}
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>

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
      </div>
    </nav>
  );
};

export default TopNavbar;
