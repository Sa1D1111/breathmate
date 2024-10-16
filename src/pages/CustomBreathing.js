import React, { useState, useEffect, useRef } from 'react';
import './CustomBreathing.css';  // Make sure the CSS is properly imported

const CustomBreathing = () => {
  const [inhaleTime, setInhaleTime] = useState(4);   // Initial Inhale Duration
  const [holdInTime, setHoldInTime] = useState(4);   // Initial Hold In Duration
  const [exhaleTime, setExhaleTime] = useState(4);   // Initial Exhale Duration
  const [holdOutTime, setHoldOutTime] = useState(4); // Initial Hold Out Duration
  const [isRunning, setIsRunning] = useState(false); // Track if cycle is running
  const [phase, setPhase] = useState('Inhale');      // Current phase
  const [timeLeft, setTimeLeft] = useState(inhaleTime); // Time left in the current phase
  const intervalRef = useRef(null);                  // Reference for interval control

  // Define phases and dynamically link to slider values
  const phases = [
    { name: 'Inhale', duration: inhaleTime },
    { name: 'Hold In', duration: holdInTime },
    { name: 'Exhale', duration: exhaleTime },
    { name: 'Hold Out', duration: holdOutTime }
  ];

  // Function to start the breathing cycle
  const startBreathingCycle = () => {
    let currentPhaseIndex = phases.findIndex(p => p.name === phase); // Find current phase index
    setTimeLeft(phases[currentPhaseIndex].duration);                 // Set time for current phase

    intervalRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime > 1) {
          return prevTime - 1;   // Countdown the time left
        } else {
          // Move to the next phase in the sequence
          currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
          setPhase(phases[currentPhaseIndex].name);    // Update to the next phase
          setTimeLeft(phases[currentPhaseIndex].duration); // Reset timer for the next phase
          return phases[currentPhaseIndex].duration;
        }
      });
    }, 1000);  // Timer updates every second
  };

  // Start or pause the breathing cycle
  const handleStart = () => {
    if (!isRunning) {
      startBreathingCycle(); // Start the cycle
    } else {
      clearInterval(intervalRef.current); // Pause the cycle
    }
    setIsRunning(!isRunning); // Toggle running state
  };

  // Restart the cycle whenever the slider values change, but only when paused
  useEffect(() => {
    if (isRunning) {
      clearInterval(intervalRef.current); // Clear current interval
      startBreathingCycle();  // Restart with updated slider values
    }
  }, [inhaleTime, holdInTime, exhaleTime, holdOutTime]);

  return (
    <div className="custom-breathing">
      <h1>Breathing Timer</h1>

      <div className="slider-container">
        <label>Breathe In: {inhaleTime} sec</label>
        <input
          type="range"
          min="1"
          max="15"
          value={inhaleTime}
          onChange={(e) => setInhaleTime(parseInt(e.target.value, 10))}
        />

        <label>Hold Breath In: {holdInTime} sec</label>
        <input
          type="range"
          min="0"
          max="15"
          value={holdInTime}
          onChange={(e) => setHoldInTime(parseInt(e.target.value, 10))}
        />

        <label>Breathe Out: {exhaleTime} sec</label>
        <input
          type="range"
          min="1"
          max="15"
          value={exhaleTime}
          onChange={(e) => setExhaleTime(parseInt(e.target.value, 10))}
        />

        <label>Hold Breath Out: {holdOutTime} sec</label>
        <input
          type="range"
          min="0"
          max="15"
          value={holdOutTime}
          onChange={(e) => setHoldOutTime(parseInt(e.target.value, 10))}
        />
      </div>

      <button className="start-button" onClick={handleStart}>
        {isRunning ? 'Pause' : 'Start'}
      </button>

      <div className={`breathing-visual ${phase}`}>
        <h2>{phase}</h2>
        <p>{timeLeft} seconds left</p>
      </div>
    </div>
  );
};

export default CustomBreathing;
