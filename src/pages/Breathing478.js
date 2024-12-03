import React, { useState, useEffect, useRef } from 'react';
import './Breathing478.css';

const Breathing478 = () => {
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
    { name: 'Inhale', duration: 4 },   // Inhale for 4 seconds
    { name: 'Hold Inhale', duration: 7 },   // Hold for 7 seconds
    { name: 'Exhale', duration: 8 }    // Exhale for 8 seconds
  ];

  const [pointerPosition, setPointerPosition] = useState(0); // Start at the first phase

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
            setPointerPosition((currentPhaseIndex + 1) % phases.length); // Update pointer position
            return nextPhase.duration;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, phase, phases]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      // Immediately update the pointer position on start
      const currentPhaseIndex = phases.findIndex((p) => p.name === phase);
      setPointerPosition(currentPhaseIndex % phases.length);
    }
  };

  const handleMusicPlayPause = async () => {
    try {
      if (audioRef.current) {
        if (isPlaying) {
          // Pause both audio and audio context
          audioRef.current.pause();
          if (audioContextRef.current) {
            await audioContextRef.current.suspend();
          }
          setIsPlaying(false);
        } else {
          // Play the audio and initialize visualizer if needed
          await audioRef.current.play();
          if (!audioInitialized) {
            initializeAudioVisualizer();
            setAudioInitialized(true);
          } else if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
          }
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Error toggling audio playback:', error);
    }
  };

  const initializeAudioVisualizer = () => {
    if (!audioContextRef.current) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      drawVisualizer();
    }
  };

  const drawVisualizer = () => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const draw = () => {
      if (!isPlaying) {
        cancelAnimationFrame(animationFrameRef.current);
        return;
      }

      analyser.getByteFrequencyData(dataArray);
      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      const barWidth = (WIDTH / dataArray.length) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i] / 2;
        canvasCtx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  return (
    <div className="breathing-page">
      <h1 className="bubble-text">4-7-8 Breathing</h1>
      <div className="breathing-container">
        <h2>{phase}</h2>
        <p>{timeLeft}s</p>
        <button className="breathing-button" onClick={handleStartStop}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>

      <div className="visual">
        <div className="visual-circle">
          <span>{phase}</span>
        </div>
      </div>

      <div className="audio-controls">
        <audio ref={audioRef} loop>
          <source src="/audio/serene-music.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <button className="audio-button" onClick={handleMusicPlayPause}>
          {isPlaying ? 'Pause Music' : 'Play Music'}
        </button>
      </div>

      <canvas ref={canvasRef} className="audio-visualizer" width="600" height="150"></canvas>
    </div>
  );
};

export default Breathing478;
