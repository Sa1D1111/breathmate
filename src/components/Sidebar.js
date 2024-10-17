import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWind, faChartLine, faCog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
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
    </div>
  );
};

export default Sidebar;
