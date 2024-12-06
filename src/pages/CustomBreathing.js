import React, { useState, useEffect } from 'react';
import './CustomBreathing.css';

const CustomBreathing = () => {
  const [text, setText] = useState('Breathe In!');
  const [containerClass, setContainerClass] = useState('container grow');
  const [breatheInTime, setBreatheInTime] = useState(3000); // Default: 3 seconds
  const [holdTime, setHoldTime] = useState(1500); // Default: 1.5 seconds
  const [breatheOutTime, setBreatheOutTime] = useState(3000); // Default: 3 seconds
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

  const totalTime = breatheInTime + holdTime + breatheOutTime;

  useEffect(() => {
    const radius = 150; // Radius of the circle
    const centerX = 150; // Center X position
    const centerY = 150; // Center Y position

    const updatePointerPosition = (progress) => {
      // Calculate angle based on progress (360° corresponds to full progress)
      const angle = progress * 2 * Math.PI; // Convert to radians
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      setPointerPosition({ x, y });
    };

    const startAnimation = () => {
      let elapsedTime = 0;

      const interval = setInterval(() => {
        elapsedTime += 100; // Update every 100ms
        const phaseProgress = elapsedTime / totalTime;

        if (elapsedTime <= breatheInTime) {
          setText('Breathe In!');
          setContainerClass('container grow');
          updatePointerPosition((elapsedTime / breatheInTime) * 0.5); // First half of circle
        } else if (elapsedTime <= breatheInTime + holdTime) {
          setText('Hold');
          updatePointerPosition(0.5); // Stay at the top (50% progress)
        } else if (elapsedTime <= totalTime) {
          setText('Breathe Out!');
          setContainerClass('container shrink');
          const outProgress = (elapsedTime - breatheInTime - holdTime) / breatheOutTime;
          updatePointerPosition(0.5 + outProgress * 0.5); // Second half of circle
        } else {
          elapsedTime = 0; // Reset animation
        }
      }, 100);

      return () => clearInterval(interval);
    };

    startAnimation();
    const interval = setInterval(startAnimation, totalTime);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [breatheInTime, holdTime, breatheOutTime, totalTime]);

  return (
    <div className="custom-breathing-page">
      <div className="breathing-app">
        <h1 className="bubble-text">Custom Breathing</h1>
        <div
          className={containerClass}
          id="container"
          style={{
            animationDuration: `${breatheInTime}ms, ${breatheOutTime}ms`,
          }}
        >
          <div className="circle"></div>
          <p id="text">{text}</p>
          <div className="pointer-container">
            <span
              className="pointer"
              style={{
                left: `${pointerPosition.x}px`,
                top: `${pointerPosition.y}px`,
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
              }}
            ></span>
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

      {/* Embed external iframe */}
      <div className="iframe-container">
        <iframe
          src="https://xhalr.com"
          width="400"
          height="400"
          frameBorder="0"
          allowFullScreen
          style={{ maxWidth: '100%' }}
          title="Breathing Guide"
        ></iframe>
      </div>
    </div>
  );
};

export default CustomBreathing;
