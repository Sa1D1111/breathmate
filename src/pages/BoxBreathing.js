import React, { useState, useEffect } from 'react';
import './BoxBreathing.css';

const BoxBreathing = () => {
  // Default box breathing times (4 seconds for each phase)
  const [phase, setPhase] = useState('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [isRunning, setIsRunning] = useState(false);

  const phases = [
    { name: 'Inhale', duration: 4 },
    { name: 'Hold', duration: 4 },
    { name: 'Exhale', duration: 4 },
    { name: 'Hold', duration: 4 }
  ];

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime > 1) {
            return prevTime - 1;
          } else {
            const currentPhaseIndex = phases.findIndex(p => p.name === phase);
            const nextPhase = phases[(currentPhaseIndex + 1) % phases.length];
            setPhase(nextPhase.name);
            return nextPhase.duration;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, phase]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="box-breathing-page">
      <h1>Box Breathing</h1>
      <div className="breathing-container">
        <h2>{phase}</h2>
        <p>{timeLeft}s</p>
        <button className="breathing-button" onClick={handleStartStop}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default BoxBreathing;
