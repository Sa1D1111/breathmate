import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faSquare, faCircle, faCog, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import './Techniques.css';
import { Link } from 'react-router-dom';

const Techniques = () => {
  return (
    <div className="techniques-page">
      <h1 className ="bubble-text">Breathwork Techniques</h1>
      <div className="techniques-container">
        {/* Left Section: Technique List */}
        <div className="technique-list-container">
          <ul className="technique-list">
            <li>
              <Link to="/water-breathing" className="technique-link">
                <FontAwesomeIcon icon={faCircleNotch} className="technique-icon" />
                <div className="technique-content">
                  <h3>Deep Breathing</h3>
                  <p>Deep nostril breathing to relax</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/box-breathing" className="technique-link">
                <FontAwesomeIcon icon={faSquare} className="technique-icon" />
                <div className="technique-content">
                  <h3>Box Breathing</h3>
                  <p>4-4-4-4 breathing for focus</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/alternate-nostril" className="technique-link">
                <FontAwesomeIcon icon={faLeaf} className="technique-icon" />
                <div className="technique-content">
                  <h3>Alternate Nostril Breathing</h3>
                  <p>Purposeful nostril breathing</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/478-breathing" className="technique-link">
                <FontAwesomeIcon icon={faCircle} className="technique-icon" />
                <div className="technique-content">
                  <h3>4-7-8 Breathing</h3>
                  <p>A calming breathing technique</p>
                </div>
              </Link>
            </li>
            
          </ul>
        </div>

        {/* Right Section: Video and Customized Section */}
        <div className="technique-video-container">
          <h2>Watch the Breathing Techniques</h2>
          <iframe
            className="technique-video"
            src="https://www.youtube.com/embed/TklaIRSSQ9s"
            title="Breathing Techniques"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          {/* Customized Breathing Section */}
          <div className="customized-section">
            <h2>
              <FontAwesomeIcon icon={faCog} className="section-icon" /> Customized Breathing
            </h2>
            <p>
              Create your own breathing pattern by setting the inhale, hold, and exhale times. Customize your practice to fit your needs.
            </p>
            <Link to="/custom-breathing">
              <button className="customize-button">Customize Your Breathing</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Techniques;
