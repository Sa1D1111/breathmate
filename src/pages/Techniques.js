// src/pages/Techniques.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faSquare, faCircle, faCog } from '@fortawesome/free-solid-svg-icons';
import './Techniques.css';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Techniques = () => {
  return (
    <div className="techniques-page">
      <h1>Breathwork Techniques</h1>
      <ul className="technique-list">
        <li>
          <FontAwesomeIcon icon={faLeaf} className="technique-icon" />
          <div className="technique-content">
            <h3>Diaphragmatic Breathing</h3>
            <p>Deep belly breathing to relax.</p>
          </div>
        </li>
        <li>
          <FontAwesomeIcon icon={faSquare} className="technique-icon" />
          <div className="technique-content">
            <h3>Box Breathing</h3>
            <p>4-4-4-4 breathing for focus.</p>
          </div>
        </li>
        <li>
          <FontAwesomeIcon icon={faCircle} className="technique-icon" />
          <div className="technique-content">
            <h3>4-7-8 Breathing</h3>
            <p>A calming breathing technique.</p>
          </div>
        </li>
      </ul>

      {/* New Customized Breathing Section */}
      <div className="customized-section">
        <h2><FontAwesomeIcon icon={faCog} className="section-icon" /> Customized Breathing</h2>
        <p>Create your own breathing pattern by setting the inhale, hold, and exhale times. Customize your practice to fit your needs.</p>

        {/* Link to the new custom breathing page */}
        <Link to="/custom-breathing">
          <button className="customize-button">Customize Your Breathing</button>
        </Link>
      </div>
    </div>
  );
};

export default Techniques;
