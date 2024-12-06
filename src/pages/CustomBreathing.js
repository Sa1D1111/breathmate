import React, { useState, useEffect } from "react";
import "./CustomBreathing.css";

const CustomBreathing = () => {
  const [text, setText] = useState("Breathe In");
  const [breatheInTime, setBreatheInTime] = useState(3000); // Default: 3 seconds
  const [holdTime, setHoldTime] = useState(1500); // Default: 1.5 seconds
  const [breatheOutTime, setBreatheOutTime] = useState(3000); // Default: 3 seconds
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

  const totalTime = breatheInTime + holdTime + breatheOutTime;

  // Function to calculate pointer position
  const calculatePointerPosition = (progress) => {
    const radius = 150; // Circle radius
    const centerX = 150; // Center X
    const centerY = 150; // Center Y
    const angle = progress * 2 * Math.PI; // Convert progress to radians
    const x = centerX + radius * Math.cos(angle - Math.PI / 2); // Offset for starting at top
    const y = centerY + radius * Math.sin(angle - Math.PI / 2);
    return { x, y };
  };

  useEffect(() => {
    let elapsedTime = 0;
    const interval = setInterval(() => {
      elapsedTime += 50; // Update every 50ms
      const phaseProgress = elapsedTime / totalTime;

      if (elapsedTime <= breatheInTime) {
        setText("Breathe In");
        const progress = elapsedTime / breatheInTime;
        setPointerPosition(calculatePointerPosition(progress / 2)); // First half of circle
      } else if (elapsedTime <= breatheInTime + holdTime) {
        setText("Hold");
        setPointerPosition(calculatePointerPosition(0.5)); // Stay at the top
      } else if (elapsedTime <= totalTime) {
        setText("Breathe Out");
        const progress =
          (elapsedTime - breatheInTime - holdTime) / breatheOutTime;
        setPointerPosition(calculatePointerPosition(0.5 + progress / 2)); // Second half of circle
      } else {
        elapsedTime = 0; // Reset cycle
      }
    }, 50);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [breatheInTime, holdTime, breatheOutTime, totalTime]);

  return (
    <div className="custom-breathing-page">
      <div className="breathing-app">
        <h1 className="bubble-text">Custom Breathing</h1>
        <div className="circle-container">
          <div className="circle">
            <p className="breathing-text">{text}</p>
            <div
              className="pointer"
              style={{
                left: `${pointerPosition.x}px`,
                top: `${pointerPosition.y}px`,
                position: "absolute",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          </div>
        </div>

        {/* Slider Controls */}
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
