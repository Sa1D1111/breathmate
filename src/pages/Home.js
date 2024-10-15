// src/pages/Home.js
import React from 'react';
import './Home.css';
import breathworkImage from '../images/image1.png'; // Adjust the path if needed

const Home = () => {
  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Welcome to BreathMate</h1>
        <p>Explore different breathing techniques to improve your mental and physical well-being. Whether you need to relax, focus, or energize, BreathMate has you covered.</p>
        <img src={breathworkImage} alt="Breathwork Visual" className="welcome-image" />
      </div>

      <div className="introduction-section">
        <h2>Introduction to Breathing Techniques</h2>
        <div className="technique-cards">
          <div className="card">
            <p>Explore the benefits of various breathing techniques and learn how they can improve your wellbeing.</p>
          </div>
          <div className="card">
            <p>Discover the different breathing exercises available in BreathMate to help you relax and destress.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
