import React, { useState, useEffect, useRef } from 'react';
import './BoxBreathing.css';

const BoxBreathing = () => {
  const [phase, setPhase] = useState('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // State to handle audio play/pause
  const audioRef = useRef(null); // Ref for audio element
  const canvasRef = useRef(null); // Ref for the canvas element for the visualizer
  const audioContextRef = useRef(null); // Ref for Web Audio API context
  const analyserRef = useRef(null); // Ref for audio analyser
  const dataArrayRef = useRef(null); // Ref to store audio frequency data

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

  const handleMusicPlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (audioContextRef.current) {
          audioContextRef.current.suspend(); // Pause the audio context
        }
      } else {
        audioRef.current.play();
        if (audioContextRef.current) {
          audioContextRef.current.resume(); // Resume the audio context
        } else {
          initializeAudioVisualizer(); // Initialize the audio visualizer on first play
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const initializeAudioVisualizer = () => {
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
  };

  const drawVisualizer = () => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const draw = () => {
      if (!isPlaying) return; // Stop drawing if the music is paused

      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      const barWidth = (WIDTH / dataArray.length) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i];

        canvasCtx.fillStyle = `rgb(${barHeight + 100},50,150)`;
        canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }
    };

    draw();
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

      {/* Audio Visualizer */}
      <canvas ref={canvasRef} className="audio-visualizer"></canvas>
    </div>
  );
};

export default BoxBreathing;
