import React, { useState, useEffect } from 'react';
import './AlternateNostril.css';

const AlternateNostril = () => {
  const [currentStep, setCurrentStep] = useState('inhale-left'); // inhale-left, exhale-right, inhale-right, exhale-left
  const [timeLeft, setTimeLeft] = useState(4); // Timer for each step
  const [isRunning, setIsRunning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = React.useRef(null);

  const steps = [
    { name: 'inhale-left', duration: 4, instruction: 'Inhale through your left nostril' },
    { name: 'exhale-right', duration: 4, instruction: 'Exhale through your right nostril' },
    { name: 'inhale-right', duration: 4, instruction: 'Inhale through your right nostril' },
    { name: 'exhale-left', duration: 4, instruction: 'Exhale through your left nostril' }
  ];

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 1) return prev - 1;

          // Move to next step
          const currentIndex = steps.findIndex((step) => step.name === currentStep);
          const nextStep = steps[(currentIndex + 1) % steps.length];
          setCurrentStep(nextStep.name);
          setTimeLeft(nextStep.duration);

          return nextStep.duration;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, currentStep]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
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
    <div className="alternate-nostril-page">
      <h1 className="bubble-text">Alternate Nostril Breathing</h1>
      <p className="instruction">{steps.find((step) => step.name === currentStep).instruction}</p>
      <div className="visual">
        <div className={`nostril nostril-left ${currentStep.includes('left') ? 'active' : ''}`}></div>
        <div className={`nostril nostril-right ${currentStep.includes('right') ? 'active' : ''}`}></div>
      </div>
      <p className="timer">{timeLeft}s</p>
      <div className="controls">
        <button onClick={handleStartStop} className="control-button">
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleMusicPlayPause} className="control-button">
          {isPlaying ? 'Pause Music' : 'Play Music'}
        </button>
      </div>
      <audio ref={audioRef} loop>
        <source src="/audio/music3.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <h2>How to do
      </h2>
      <p>
      Also know as <b>Nadi Shodhana,</b> sit comfortably, bring your <b>Right</b> hand to your nose, use your thumb to block your right nostril, inhale through your <b>Left </b> nostril, then close your <b>Left </b> nostril with your index finger, exhale through your <b>Right</b> nostril, then switch sides by inhaling through your <b>Right</b> nostril and exhaling through your <b>Left </b>, repeating the cycle by alternating between nostrils for several rounds

      </p>

      {/* Spotify Embed */}
      <div className="spotify-player">
        <iframe
          src="https://open.spotify.com/embed/episode/2ympasYzQj7NWSvmtSV1Wi?utm_source=generator&theme=0"
          width="50%"
          height="80"
          frameBorder="0"
          allow="encrypted-media"
          title="Spotify Player"
        ></iframe>
      </div>


      <h2>What is Alternate Nostril Breathing (ANB)?
      </h2>
      <p>
      Alternate nostril breathing is an original a yogic breath control practice. Most yoga breathing techniques involve regulating the breath frequency, rhythm, phase duration, as well as the nostril through which a practitioner breathes. Primarily this is about conscious control of the breath with enhanced focus on breath awareness and precision. In general, this awareness technique is called pranayama (prana = life and yama = force).

The technique of breathing alternately through the left and right nostril is known in Sanskrit as nadi shodhana pranayama, which translates to “subtle energy clearing breathing technique.” This audio will teach you how to perform alternate nostril breathing with step-by-step guided direction.
      </p>



      <header className="intro-section">

         <img src={require('../images/AlternateNostril.png')} alt="Breathwork" className="hero-image" />

       </header>


    </div>
  );
};

export default AlternateNostril;
