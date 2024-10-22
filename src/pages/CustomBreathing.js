import React, { useState, useEffect } from 'react';
import './CustomBreathing.css';

const CustomBreathing = () => {
  // State for animation text and class
  const [text, setText] = useState('Breathe In!');
  const [containerClass, setContainerClass] = useState('container grow');

  // State for slider values (breathe in, hold, breathe out)
  const [breatheInTime, setBreatheInTime] = useState(3000); // default: 3 seconds
  const [holdTime, setHoldTime] = useState(1500); // default: 1.5 seconds
  const [breatheOutTime, setBreatheOutTime] = useState(3000); // default: 3 seconds

  const totalTime = breatheInTime + holdTime + breatheOutTime;

  useEffect(() => {
    const breathAnimation = () => {
      setText('Breathe In!');
      setContainerClass('container grow');

      setTimeout(() => {
        setText('Hold');

        setTimeout(() => {
          setText('Breathe Out!');
          setContainerClass('container shrink');
        }, holdTime);
      }, breatheInTime);
    };

    breathAnimation();
    const interval = setInterval(breathAnimation, totalTime);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [breatheInTime, holdTime, breatheOutTime, totalTime]);

  return (
    <div className="custom-breathing-page">
      <div className="breathing-app">
        <h1 className='bubble-text'>Custom Breathing</h1>
        <div
          className={containerClass}
          id="container"
          // Dynamically set animation timing for grow and shrink based on slider values
          style={{
            animationDuration: `${breatheInTime}ms, ${breatheOutTime}ms`,
          }}
        >
          <div className="circle"></div>
          <p id="text">{text}</p>
          <div className="pointer-container">
            <span className="pointer"></span>
          </div>
          <div className="gradient-circle"></div>
        </div>

        {/* Sliders to adjust timing */}
        <div className="slider-container">
          <div className="slider">
            <label>Breathe In: {breatheInTime / 1000}s</label>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={breatheInTime}
              onChange={(e) => setBreatheInTime(Number(e.target.value))}
            />
          </div>

          <div className="slider">
            <label>Hold: {holdTime / 1000}s</label>
            <input
              type="range"
              min="500"
              max="5000"
              step="500"
              value={holdTime}
              onChange={(e) => setHoldTime(Number(e.target.value))}
            />
          </div>

          <div className="slider">
            <label>Breathe Out: {breatheOutTime / 1000}s</label>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={breatheOutTime}
              onChange={(e) => setBreatheOutTime(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBreathing;
