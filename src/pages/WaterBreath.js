import React, { useState, useEffect, useRef } from 'react';
import './WaterBreath.css'; // Ensure this import is correct

const WaterBreath = () => {
  const [currentState, setCurrentState] = useState('ready');
  const [description, setDescription] = useState(
    'Diaphragmatic breathing consists of a 4-second inhale followed by a 4-second exhale, repeated for 10 cycles.'
  );
  const [currentCount, setCurrentCount] = useState(1);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [currentDirection, setCurrentDirection] = useState('in');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // Progress for the meter bar

  const audioRef = useRef(null);

  const targetInCount = 5;
  const targetOutCount = 4;
  const targetCycleCount = 10;

  useEffect(() => {
    let interval;

    if (currentState === 'running') {
      interval = setInterval(() => {
        handleTick();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [currentState, currentCount, currentCycle, currentDirection]);

  useEffect(() => {
    // Update progress percentage based on current count
    const duration =
      currentDirection === 'in' ? targetInCount : targetOutCount;
    setProgress((currentCount / duration) * 100);
  }, [currentCount, currentDirection]);

  const startBreathing = () => {
    setCurrentState('running');
    setDescription(`Cycle: 1 — In: 1`);
  };

  const stopBreathing = () => {
    setCurrentState('done');
    setDescription('Practice');
  };

  const restartBreathing = () => {
    setCurrentState('running');
    setCurrentCycle(1);
    setCurrentCount(1);
    setCurrentDirection('in');
    setProgress(0);
    setDescription(`Cycle: 1 — In: 1`);
  };

  const handleTick = () => {
    if (currentDirection === 'in') {
      if (currentCount >= targetInCount) {
        setCurrentDirection('out');
        setCurrentCount(targetOutCount);
      } else {
        setCurrentCount((prev) => prev + 1);
        setDescription(`Cycle: ${currentCycle} — In: ${currentCount}`);
      }
    } else {
      if (currentCount <= 0) {
        if (currentCycle >= targetCycleCount) {
          stopBreathing();
        } else {
          setCurrentDirection('in');
          setCurrentCount(1);
          setCurrentCycle((prev) => prev + 1);
        }
      } else {
        setCurrentCount((prev) => prev - 1);
        setDescription(`Cycle: ${currentCycle} — Out: ${currentCount}`);
      }
    }
  };

  const handleMusicPlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (

    
    <div className="states">


{/* Informational Content */}
<div className="info-content">
        <h2>Diaphragmatic breathing</h2>
        <p>Also known as deep breathing, the diaphragm muscle must contract in this type of respiration. As the muscle contracts, breath passively leaves the lung</p>

        <p>
        Diaphragmatic or deep breathing, on the other hand, stimulates the parasympathetic nervous system, which is part of the peripheral nervous system responsible for regulating heartbeat, blood flow, breathing, and digestion.

This type of breathing is deep, even breathing that engages your diaphragm, allowing your lungs to expand and creating negative pressure that drives air in through the nose and mouth, filling your lungs.10 This is the way newborn babies naturally breathe. You're also probably using this pattern of breathing when you're in a relaxed stage of sleep.
        </p>

        <audio ref={audioRef} loop>
          <source src="/audio/music3.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <button className="audio-button" onClick={handleMusicPlayPause}>
          {isPlaying ? 'Pause Music' : 'Play Music'}
        </button>

         {/* Add YouTube video embed here */}
<div className="video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/OXjlR4mXxSk"
    title="Diaphragmatic Breathing Technique"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>


        
      </div>


      


      {currentState === 'ready' && (
        <div className="states__state states__state--ready states__state--active">
          <div className="states__content">
            <h1 className="bubble-text">Diaphragmatic Breathing Exercise</h1>
            <p className="description">{description}</p>
            <div className="buttons">
              <button className="button button--start" onClick={startBreathing}>
                Start breathing → Inhale first
              </button>
            </div>
          </div>

          

        </div>
      )}

      {currentState === 'running' && (
        <div className="states__state states__state--running states__state--active">
          <div className="states__content">
            <h1 className="bubble-text">Diaphragmatic Breathing Exercise</h1>
            <p className="description">{description}</p>
            <div className="meter">
              <div
                className="meter__bar"
                style={{
                  height: `${progress}%`, // Dynamically set height based on progress
                  transition: 'height 1s linear', // Smooth animation
                }}
              ></div>
            </div>
            <div className="buttons">
              <button className="button button--stop" onClick={stopBreathing}>
                Stop breathing
              </button>
            </div>
          </div>
        </div>
      )}




      {currentState === 'done' && (
        <div className="states__state states__state--done states__state--active">
          <div className="states__content">
            <h1 className="bubble-text">Diaphragmatic Breathing</h1>
            <p className="description">{description}</p>
            <div className="buttons">
              <button className="button button--restart" onClick={restartBreathing}>
                Go again
              </button>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default WaterBreath;
