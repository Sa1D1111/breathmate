import React, { useState, useEffect, useRef } from 'react';
import './BoxBreathing.css';

const BoxBreathing = () => {
  const [phase, setPhase] = useState('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // For music play/pause
  const [audioInitialized, setAudioInitialized] = useState(false); // Track if audio is initialized

  const audioRef = useRef(null); // Ref for audio element
  const canvasRef = useRef(null); // Ref for canvas element
  const audioContextRef = useRef(null); // Ref for the AudioContext
  const analyserRef = useRef(null); // Ref for the AnalyserNode
  const dataArrayRef = useRef(null); // Ref for the frequency data
  const animationFrameRef = useRef(null); // Ref for animation frame

  const phases = [
    { name: 'Inhale', duration: 4 },
    { name: 'Hold Inhale', duration: 4 },
    { name: 'Exhale', duration: 4 },
    { name: 'Hold Exhale', duration: 4 }
  ];

  const [pointerPosition, setPointerPosition] = useState(0); // Start at top-left corner

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 1) {
            return prevTime - 1;
          } else {
            const currentPhaseIndex = phases.findIndex((p) => p.name === phase);
            const nextPhase = phases[(currentPhaseIndex + 1) % phases.length];
            setPhase(nextPhase.name);
            setPointerPosition((currentPhaseIndex + 1) % 4); // Update pointer position
            return nextPhase.duration;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, phase]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      // Immediately update the pointer position on start
      const currentPhaseIndex = phases.findIndex((p) => p.name === phase);
      setPointerPosition(currentPhaseIndex % 4);
    }
  };

  // Initialize audio context and analyser
  const initializeAudioVisualizer = () => {
    if (!audioContextRef.current) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256; // Smaller size to speed up visualization

      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      console.log("Audio visualizer initialized");

      // Start the visualizer drawing
      drawVisualizer();
    }
  };

  // Visualizer drawing function
  const drawVisualizer = () => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    if (!canvasCtx || !analyser || !dataArray) {
      console.error("Canvas context or analyser is not set.");
      return;
    }

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    console.log("Visualizer: Drawing canvas.");

    const draw = () => {
      if (!audioRef.current || audioRef.current.paused) {
        cancelAnimationFrame(animationFrameRef.current);
        console.log("Visualizer: Audio is not playing, stopping draw.");
        return; // Stop drawing if not playing
      }

      analyser.getByteFrequencyData(dataArray);
      console.log('Frequency Data:', dataArray); // Log frequency data for debugging

      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT); // Clear the canvas

      const barWidth = (WIDTH / dataArray.length) * 2.5;
      let barHeight;
      let x = 0;

      // Loop through the frequency data and draw bars
      for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i];
        canvasCtx.fillStyle = `rgb(${barHeight + 100},50,150)`; // Color based on bar height
        canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2); // Draw the bar
        x += barWidth + 1; // Move to next bar
      }

      animationFrameRef.current = requestAnimationFrame(draw); // Loop the drawing function
    };

    draw(); // Start drawing
  };

  const handleMusicPlayPause = async () => {
    try {
      if (audioRef.current) {
        if (isPlaying) {
          // Pause both audio and audio context
          audioRef.current.pause();
          if (audioContextRef.current) {
            audioContextRef.current.suspend();
          }
          setIsPlaying(false);
        } else {
          // Play the audio and resume audio context
          await audioRef.current.play();
          if (!audioInitialized) {
            // Initialize visualizer only on the first play
            initializeAudioVisualizer();
            setAudioInitialized(true);
          } else if (audioContextRef.current.state === 'suspended') {
            // Resume the AudioContext if it was suspended
            await audioContextRef.current.resume();
          }
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  return (
    <div className="box-breathing-page">
      <h1 className='bubble-text'>Box Breathing</h1>
      <div className="breathing-container">
        <h2>{phase}</h2>
        <p>{timeLeft}s</p>
        <button className="breathing-button" onClick={handleStartStop}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>

      {/* Box Visual with pointer */}
      <div className="box-visual">
        <div className="box">
          <div className={`pointer position-${pointerPosition}`}></div>
        </div>
      </div>

      {/* Audio Player */}
      <div className="audio-controls">
        <audio ref={audioRef} loop>
          <source src="/audio/serene-music.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <button className="audio-button" onClick={handleMusicPlayPause}>
          {isPlaying ? 'Pause Music' : 'Play Music'}
        </button>
      </div>



{/* Informational Content */}
<div className="info-content">
        <h2>How Box Breathing Works</h2>
        <h3>Set up for Box Breathing</h3>
        <p>
          Find a comfortable seated position with your back straight. Place your
          feet flat on the floor and rest your hands on your lap. Take a deep
          breath in and slowly exhale before starting the exercise.
        </p>
        <p>
          Box breathing helps calm the mind, reduce stress, and improve
          focus by balancing your nervous system. This practice involves
          inhaling, holding, exhaling, and holding again in equal counts.
        </p>
      </div>

      


 {/* Add YouTube video embed here */}
 <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/tEmt1Znux58"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>


      {/* Audio Visualizer */}
      {/* <canvas ref={canvasRef} className="audio-visualizer" width="600" height="150"></canvas> */}
    </div>
  );
};

export default BoxBreathing;
