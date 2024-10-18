import React, { useState, useEffect, useRef } from 'react';
import './CustomBreathing.css';

const CustomBreathing = () => {
  const [inhaleTime, setInhaleTime] = useState(4);
  const [holdInTime, setHoldInTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(4);
  const [holdOutTime, setHoldOutTime] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('Inhale');
  const [timeLeft, setTimeLeft] = useState(inhaleTime);
  const intervalRef = useRef(null);

  const phases = [
    { name: 'Inhale', duration: inhaleTime },
    { name: 'Hold In', duration: holdInTime },
    { name: 'Exhale', duration: exhaleTime },
    { name: 'Hold Out', duration: holdOutTime }
  ];

  const startBreathingCycle = () => {
    let currentPhaseIndex = phases.findIndex(p => p.name === phase);

    intervalRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime > 1) {
          return prevTime - 1;
        } else {
          // Move to the next phase
          currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
          setPhase(phases[currentPhaseIndex].name);
          setTimeLeft(phases[currentPhaseIndex].duration);
          return phases[currentPhaseIndex].duration;
        }
      });
    }, 1000);
  };

  const handleStart = () => {
    if (!isRunning) {
      startBreathingCycle();
    } else {
      clearInterval(intervalRef.current);
    }
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      startBreathingCycle();
    }
  }, [inhaleTime, holdInTime, exhaleTime, holdOutTime]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, []);

  return (
    <div className="custom-breathing">
      <h1>Custom Breathing App</h1>

      <div className="phase-display">
        <h2>{phase}</h2>
        <p>{timeLeft}s</p>
      </div>

      <div className="slider-container">
        <label>Inhale Duration: {inhaleTime}s</label>
        <input
          type="range"
          min="1"
          max="10"
          value={inhaleTime}
          onChange={(e) => setInhaleTime(Number(e.target.value))}
        />

        <label>Hold In Duration: {holdInTime}s</label>
        <input
          type="range"
          min="1"
          max="10"
          value={holdInTime}
          onChange={(e) => setHoldInTime(Number(e.target.value))}
        />

        <label>Exhale Duration: {exhaleTime}s</label>
        <input
          type="range"
          min="1"
          max="10"
          value={exhaleTime}
          onChange={(e) => setExhaleTime(Number(e.target.value))}
        />

        <label>Hold Out Duration: {holdOutTime}s</label>
        <input
          type="range"
          min="1"
          max="10"
          value={holdOutTime}
          onChange={(e) => setHoldOutTime(Number(e.target.value))}
        />
      </div>

      <button className="start-button" onClick={handleStart}>
        {isRunning ? 'Pause' : 'Start'}
      </button>

      <div className="timer-display">
        <h2>{phase}</h2>
        <p>{timeLeft}s</p>
      </div>
    </div>
  );
};

export default CustomBreathing;
